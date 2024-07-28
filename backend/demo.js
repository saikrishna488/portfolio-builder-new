// Default
require('dotenv').config();

const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.groqcloud });

const main = async (message) => {
    let response = "";
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama3-8b-8192",
        });
        response = completion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error('Error occurred:', error);
    }
    return response;
}

module.exports = main
