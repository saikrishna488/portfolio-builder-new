require('dotenv').config();
const { VertexAI } = require('@google-cloud/vertexai');
const { getSubtitles } = require('youtube-captions-scraper');

// Initialize Vertex AI
const vertex_ai = new VertexAI({ project: "flowing-banner-403116", location: 'us-central1' });
const model = 'gemini-1.5-flash-001';

async function summarizeVideo(videoUrl, text) {
    try {
        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            throw new Error('Invalid YouTube video URL');
        }

        let captions = await getCaptions(videoId);
        captions += text + " summarize this text";

        const summary = await generateContent(captions);
        return summary;

    } catch (err) {
        console.error('Error in summarizeVideo:', err);
        return "YouTube video is not in English or an error occurred.";
    }
}

function extractVideoId(url) {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get('v');
}

async function getCaptions(videoId) {
    try {
        const subtitles = await getSubtitles({ videoID: videoId });
        const captions = subtitles.map(sub => sub.text).join(' ');
        return captions;
    } catch (error) {
        console.error('Error fetching captions:', error);
        throw new Error('Could not fetch captions');
    }
}

async function generateContent(text) {
    try {
        const generativeModel = vertex_ai.preview.getGenerativeModel({
            model: model,
            generationConfig: {
                maxOutputTokens: 8192,
                temperature: 1,
                topP: 0.95,
            },
            safetySettings: [],
        });

        const request = {
            contents: [{ role: 'user', parts: [{ text }] }],
        };
        const result = await generativeModel.generateContent(request);
        const response = result.response.candidates[0].content.parts[0].text;
        return response;
    } catch (error) {
        console.error('Error generating content:', error);
        throw new Error('Content generation failed');
    }
}


module.exports = { summarizeVideo, generateContent };