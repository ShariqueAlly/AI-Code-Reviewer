require('dotenv').config()
const app = require('./src/app')


app.listen(3004, () => {
    console.log("Server is running on http://localhost:3004")
})