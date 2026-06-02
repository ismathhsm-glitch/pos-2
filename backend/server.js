const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcrypt');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// seed admin user
async function seedAdmin() {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      const hashed = await bcrypt.hash('admin123', 10);
      await User.create({ email: 'admin@pos.local', password: hashed, role: 'admin' });
      console.log('Seeded admin: admin@pos.local / admin123');
    }
  } catch (err) {
    console.error('Seed error', err);
  }
}
seedAdmin();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/sales', require('./routes/sales'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
