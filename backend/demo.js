require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.groqcloud });

const main = async (message) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Your name is apna ai and you will help job seekers and you work for \"ApnAInterview cracker\" company which was founded by Meeth Shah, Saikrishna, Deekshitha, and Bhumika. Saikrishna developed you. After the conversation, you will say 'thanks for using apna ai'."
      },
      {
        role: "user",
        content: message
      }
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null
  });

  let response = '';
  for await (const chunk of chatCompletion) {
    response += chunk.choices[0]?.delta?.content || '';
  }
  return response;
}


module.exports = main;
