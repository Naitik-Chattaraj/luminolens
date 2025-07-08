const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your_jwt_secret_key';

// Middlewares
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Load users from users.json
const usersFile = path.join(__dirname, 'users.json');
let users = fs.existsSync(usersFile)
  ? JSON.parse(fs.readFileSync(usersFile))
  : [];

function saveUsers() {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// ---------------------- AUTH ROUTES ----------------------

// Register API
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ msg: 'All fields required' });

  if (users.find(u => u.email === email))
    return res.status(400).json({ msg: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers();

  res.json({ msg: 'Registered successfully', id: newUser.id });
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ msg: 'Login success', token, id: user.id });
});

// Get user data by ID
app.get('/api/user/:userId', (req, res) => {
  const user = users.find(u => u.id === req.params.userId);
  if (!user) return res.status(404).json({ msg: 'User not found' });

  res.json({ name: user.name, email: user.email });
});

// ---------------------- PRODUCTS API ----------------------

const products = [
  { id: 1, name: "Lumino-Flexo", price: 999, image: "/media/p1_1.jpg" },
  { id: 2, name: "Lovino Smart", price: 1299, image: "/media/p2_1.jpg" },
  { id: 3, name: "Vision Pro", price: 899, image: "/media/p3_1.jpg" },
  { id: 4, name: "EyeGuard Elite", price: 1499, image: "/media/p4_1.jpg" }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ msg: 'Product not found' });

  res.json(product);
});
app.use('/login', express.static(path.join(__dirname, 'login')));
app.use('/register', express.static(path.join(__dirname, 'register')));

// ---------------------- START SERVER ----------------------

app.listen(PORT, () => {
  console.log(`🚀 LuminoLens running on http://localhost:${PORT}`);
});
