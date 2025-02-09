const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getAIResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required." });
        }

        const result = await model.generateContentStream(prompt);
        let responseText = "";

        for await (const chunk of result.stream) {
            responseText += chunk.text();
        }

        res.status(200).json({ response: responseText });
        console.log("AI response generated");
        
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({ error: "Failed to generate response." });
    }
};

const getAIBudgetOptimization = async (req, res) => {
    try {
        const { expenses, income, goals } = req.body;
        if (!expenses || !income || !goals) {
            return res.status(400).json({ error: "Expenses, income, and goals are required." });
        }

        const prompt = `Given the following financial data:
        - Income: ${income}
        - Expenses: ${JSON.stringify(expenses)}
        - Goals: ${JSON.stringify(goals)}
        Provide personalized budgeting advice with optimizations.`;

        const result = await model.generateContentStream(prompt);
        let responseText = "";

        for await (const chunk of result.stream) {
            responseText += chunk.text();
        }

        res.status(200).json({ advice: responseText });
        console.log("AI Budget Optimization response generated");

    } catch (error) {
        console.error("Error generating AI Budget Optimization response:", error);
        res.status(500).json({ error: "Failed to generate budget optimization response." });
    }
};

module.exports = { getAIResponse, getAIBudgetOptimization };
