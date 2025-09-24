const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

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
    }
];

let orders = [];
let customers = [];

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: '服务器运行正常' });
});

// 登录
app.post('/api/auth/login', (req, res) => {
    console.log('Login request:', req.body);
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

// 认证检查
app.get('/api/auth/me', (req, res) => {
    res.json({ user: { id: '1', username: 'admin', role: 'admin' } });
});

// 相机列表
app.get('/api/cameras', (req, res) => {
    res.json({ cameras });
});

// 添加相机
app.post('/api/cameras', (req, res) => {
    const newCamera = {
        _id: (cameras.length + 1).toString(),
        ...req.body
    };
    cameras.push(newCamera);
    res.json({ camera: newCamera });
});

// 客户
app.post('/api/customers', (req, res) => {
    const newCustomer = {
        _id: (customers.length + 1).toString(),
        ...req.body
    };
    customers.push(newCustomer);
    res.json({ customer: newCustomer });
});

// 订单
app.get('/api/orders', (req, res) => {
    res.json({ orders });
});

app.post('/api/orders', (req, res) => {
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

// 佣金
app.get('/api/commission/summary', (req, res) => {
    res.json({
        summary: {
            totalRentIncome: 0,
            totalDepositIncome: 0,
            totalBookingFees: 0,
            totalCommission: 0,
            netIncome: 0
        }
    });
});

app.get('/api/commission/details', (req, res) => {
    res.json({ orders });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 测试服务器运行在端口 ${PORT}`);
    console.log(`📱 API地址: http://localhost:3000/api`);
    console.log(`🔑 测试账号:`);
    console.log(`   管理员: admin@camerarental.com / admin123`);
    console.log(`   员工: staff@camerarental.com / staff123`);
});
