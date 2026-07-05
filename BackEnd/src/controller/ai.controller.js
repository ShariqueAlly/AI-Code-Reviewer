const aiService = require("../services/ai.services")

module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code;

        if (!code) {
            return res.status(400).send("Prompt is required")
        }

        const response = await aiService(code);

        return res.status(200).json({response});
    } catch (error) {
        console.error("AI response error:", error);
        return res.status(500).json({ error: "Failed to get AI response" });
    }
};