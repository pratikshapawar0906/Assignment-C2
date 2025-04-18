const express=require('express');
const errorHandler = require('./Middleware/errorhandling');
const app=express();
const taskRouter= require('./Routes/taskRoutes')

const PORT=process.env.PORT|| 3000

app.use(express.json());
app.use('/tasks',taskRouter)

//fallback error handler
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})