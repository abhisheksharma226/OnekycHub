require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const connectToMongoDB = require('./db/db');
const loginRoutes = require('./routes/login');
const singupRoutes = require('./routes/singup')
const dashboardRoutes = require('./routes/dashboard');



// Middleware
app.use(express.json());
app.use(cors());
const path = require('path');

// Connect to MongoDB
connectToMongoDB();

app.use('/api/', loginRoutes);
app.use('/api/', singupRoutes);
app.use('/api/', dashboardRoutes);

app.get('/', (req, res) => {
  res.send('Hi From Onekyc Backend');
});

app.get('/health', (req, res) => {
  res.send('Server is up and running');
});




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);

})