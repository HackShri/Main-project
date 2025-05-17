const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
app.use('/api/prescriptions',require('./routes/prescriptions'));
app.use('/api/shop',require('./routes/shop'));
app.use('/api/verification',require('./routes/verification'));


const PORT = process.env.PRT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});