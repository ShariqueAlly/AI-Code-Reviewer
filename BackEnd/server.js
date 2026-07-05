require('dotenv').config()
const app = require('./src/app')

// Render का पोर्ट इस्तेमाल करें, अगर वो न मिले तो 3004 का इस्तेमाल करें
const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})