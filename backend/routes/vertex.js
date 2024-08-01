const express = require('express')
const router = express.Router()

//models
const User = require('../models/User')

const { summerizeVideo, generateContent, summarizeVideo } = require('../vertex_ai')



//text response
router.post('/vertex', async (req, res) => {
    try {

        const { text, id } = req.body;

        if (!text || !id) {
            return res.json({
                message: false
            })
        }

        const user = User.find({ id })

        if (!user) {

            return res.json({
                message: false
            })
        }

        const response = await generateContent(text)

        return res.json({
            message : true,
            response
        })



    }
    catch (err) {
        console.log(err)
        res.json({
            message: false
        })
    }
})

//video summary
router.post('/videoai', async(req,res)=>{
    try {

        const { videoUrl, text, id } = req.body;

        if (!text || !id || !videoUrl) {
            return res.json({
                message: false
            })
        }

        const user = User.find({ id })

        if (!user) {

            return res.json({
                message: false
            })
        }

        const response = await summarizeVideo(videoUrl,text)

        return res.json({
            message : true,
            response
        })



    }
    catch (err) {
        console.log(err)
        res.json({
            message: false
        })
    }
})

//text summerizer
router.post('/summerize', async(req,res)=>{
    try {

        let { text, id } = req.body;

        if (!text || !id ) {
            return res.json({
                message: false
            })
        }

        const user = User.find({ id })

        if (!user) {

            return res.json({
                message: false
            })
        }

        text += "("+text+")"+" summerrize this text"

        const response = await generateContent(text)

        return res.json({
            message : true,
            response
        })



    }
    catch (err) {
        console.log(err)
        res.json({
            message: false
        })
    }
})





module.exports = router