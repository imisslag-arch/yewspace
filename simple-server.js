const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: '服务器内部错误', error: err.message });
});

// 模拟数据
let cameras = [
    {
        _id: '1',
        model: 'EOS R5',
        brand: 'Canon',
        serialNumber: 'CN001',
        category: 'Mirrorless',
        dailyRate: 150,
        deposit: 2000,
        status: 'available',
        description: '专业级无反相机'
    },
    {
        _id: '2',
        model: 'A7R IV',
        brand: 'Sony',
        serialNumber: 'SN001',
        category: 'Mirrorless',
        dailyRate: 180,
        deposit: 2500,
        status: 'available',
        description: '高像素全画幅相机'
    },
    {
        _id: '3',
        model: 'D850',
        brand: 'Nikon',
        serialNumber: 'NK001',
        category: 'DSLR',
        dailyRate: 120,
        deposit: 1800,
        status: 'maintenance',
        description: '专业单反相机'
    }
];

let orders = [];
let customers = [];

// 认证中间件
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: '访问令牌缺失' });
    }
    
    // 简单的token验证（实际应用中应该使用JWT）
    if (token === 'test-token') {
        req.user = { id: '1', username: 'admin', role: 'admin' };
        next();
    } else {
        return res.status(403).json({ message: '无效的访问令牌' });
    }
};

// 路由
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: '服务器运行正常' });
});

// 认证路由
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (email === 'admin@camerarental.com' && password === 'admin123') {
        res.json({
            token: 'test-token',
            user: { id: '1', username: 'admin', role: 'admin' }
        });
    } else if (email === 'staff@camerarental.com' && password === 'staff123') {
        res.json({
            token: 'test-token',
            user: { id: '2', username: 'staff', role: 'staff' }
        });
    } else {
        res.status(401).json({ message: '用户名或密码错误' });
    }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

// 相机路由
app.get('/api/cameras', authenticateToken, (req, res) => {
    const { status, all } = req.query;
    let filteredCameras = cameras;
    
    if (status && !all) {
        filteredCameras = cameras.filter(camera => camera.status === status);
    }
    
    res.json({ cameras: filteredCameras });
});

app.post('/api/cameras', authenticateToken, (req, res) => {
    const newCamera = {
        _id: (cameras.length + 1).toString(),
        ...req.body,
        status: req.body.status || 'available'
    };
    cameras.push(newCamera);
    res.json({ camera: newCamera });
});

app.put('/api/cameras/:id', authenticateToken, (req, res) => {
    const cameraId = req.params.id;
    const cameraIndex = cameras.findIndex(c => c._id === cameraId);
    
    if (cameraIndex === -1) {
        return res.status(404).json({ message: '相机未找到' });
    }
    
    cameras[cameraIndex] = { ...cameras[cameraIndex], ...req.body };
    res.json({ camera: cameras[cameraIndex] });
});

app.put('/api/cameras/:id/status', authenticateToken, (req, res) => {
    const cameraId = req.params.id;
    const cameraIndex = cameras.findIndex(c => c._id === cameraId);
    
    if (cameraIndex === -1) {
        return res.status(404).json({ message: '相机未找到' });
    }
    
    cameras[cameraIndex].status = req.body.status;
    res.json({ camera: cameras[cameraIndex] });
});

// 客户路由
app.post('/api/customers', authenticateToken, (req, res) => {
    const newCustomer = {
        _id: (customers.length + 1).toString(),
        ...req.body
    };
    customers.push(newCustomer);
    res.json({ customer: newCustomer });
});

// 订单路由
app.get('/api/orders', authenticateToken, (req, res) => {
    res.json({ orders });
});

app.post('/api/orders', authenticateToken, (req, res) => {
    const orderNumber = 'ORD' + Date.now().toString().slice(-6);
    const newOrder = {
        _id: (orders.length + 1).toString(),
        orderNumber,
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    res.json({ order: newOrder });
});

app.put('/api/orders/:id/status', authenticateToken, (req, res) => {
    const orderId = req.params.id;
    const orderIndex = orders.findIndex(o => o._id === orderId);
    
    if (orderIndex === -1) {
        return res.status(404).json({ message: '订单未找到' });
    }
    
    orders[orderIndex].status = req.body.status;
    res.json({ order: orders[orderIndex] });
});

// 佣金路由
app.get('/api/commission/summary', authenticateToken, (req, res) => {
    const totalRentIncome = orders.reduce((sum, order) => sum + (order.pricing?.rentTotal || 0), 0);
    const totalDepositIncome = orders.reduce((sum, order) => sum + (order.pricing?.deposit || 0), 0);
    const totalBookingFees = orders.reduce((sum, order) => sum + (order.pricing?.bookingFee || 0), 0);
    const totalCommission = totalRentIncome * 0.1; // 10% 佣金
    const netIncome = totalRentIncome + totalDepositIncome + totalBookingFees - totalCommission;
    
    res.json({
        summary: {
            totalRentIncome,
            totalDepositIncome,
            totalBookingFees,
            totalCommission,
            netIncome
        }
    });
});

app.get('/api/commission/details', authenticateToken, (req, res) => {
    res.json({ orders });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 简化服务器运行在端口 ${PORT}`);
    console.log(`📱 API地址: http://localhost:${PORT}/api`);
    console.log(`🔑 测试账号:`);
    console.log(`   管理员: admin@camerarental.com / admin123`);
    console.log(`   员工: staff@camerarental.com / staff123`);
    console.log(`\n按 Ctrl+C 停止服务器`);
});
