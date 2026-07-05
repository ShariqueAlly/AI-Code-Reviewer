const express = require("express");
const aiRoutes = require("./routes/ai.routes")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors({
   origin: 'https://ai-code-reviewer-frontend.onrender.com',
   methods: ["GET", "POST"]
}));

app.get('/',(req, res)=>{
    res.send("Hellow World")
})

app.use('/ai', aiRoutes)

module.exports = app;


