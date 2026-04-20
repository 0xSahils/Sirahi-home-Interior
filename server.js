const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const os = require('os');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'sirahi-admin-secret',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Helper to get data
const getData = () => {
    const dataPath = path.join(__dirname, 'data.json');
    if (!fs.existsSync(dataPath)) {
        // Provide empty baseline if none found
        return { general: {}, hero: {}, about: {}, services: {}, portfolio: {}, contact: {} };
    }
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
};

const saveData = (data) => {
    const dataPath = path.join(__dirname, 'data.json');
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Routes
app.get('/', (req, res) => {
    const data = getData();
    res.render('index', { data });
});

// Admin Auth Middleware
const auth = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return next();
    }
    res.redirect('/admin/login');
};

app.get('/admin/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        req.session.isLoggedIn = true;
        res.redirect('/admin');
    } else {
        res.render('login', { error: 'Invalid credentials' });
    }
});

app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/admin', auth, (req, res) => {
    const data = getData();
    res.render('admin', { data });
});

const upload = multer({ dest: os.tmpdir() });

app.post('/admin/update', auth, (req, res) => {
    const newData = req.body.data;
    if (newData) {
        try {
            const parsed = JSON.parse(newData);
            saveData(parsed);
        } catch (e) {
            console.error("Invalid JSON Update", e);
        }
    }
    res.redirect('/admin');
});

app.post('/admin/upload', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'sirahi_images'
        });
        
        fs.unlinkSync(req.file.path);
        
        res.json({ url: result.secure_url });
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        res.status(500).json({ error: error.message });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
module.exports = app;
