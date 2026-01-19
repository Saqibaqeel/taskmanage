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
app.use(
  cors({
    origin: "http://https://taskmanagement-3tqy.onrender.com/:5173", // React deployed server
    credentials: true, 
  })
);



app.use('/api/auth', authRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/boardList', boardListRoutes);

app.listen(port,()=>{
    console.log(`listening on ${port}`);
    connectDb();
})
