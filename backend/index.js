const express=require('express');
const cookieParser=require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const {connectDb}=require('./db/connDb');
const methodOverride = require("method-override");
const authRoutes=require('./routes/authRoute');
const boardRoutes=require('./routes/boardRoutes');
const adminRoutes=require('./routes/adminRoutes');
const boardListRoutes=require('./routes/boardListRoutes');

const app=express();
const port=process.env.PORT

app.use(methodOverride("_method")); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',                // local dev
  'http://localhost:5174',                // another local dev port
  'https://taskmanagement-3tqy.onrender.com' // deployed frontend
];
app.use(cors({
  origin:  'https://taskmanagement-3tqy.onrender.com',
  credentials: true
}));





app.use('/api/auth', authRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/boardList', boardListRoutes);

app.listen(port,()=>{
    console.log(`listening on ${port}`);
    connectDb();
})
