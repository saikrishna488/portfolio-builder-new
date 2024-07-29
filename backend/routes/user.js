const express = require('express');
const router = express.Router();
const pdfParser = require('pdf-parse');
const fs = require('fs');
const User = require('../models/User');
const UserDetails = require('../models/UserDetails');
const jwt = require('jsonwebtoken');
const Template = require('../models/templates');
const portfolio = require('../templates/portfolio');
const ResumeModel = require('../models/ResumeModel')
const QuestionModel = require('../models/Questions')
const ResultModel = require('../models/Result');
const AdminModel = require('../models/Admin')
const Ai = require('../demo')
const keywords = require('../keywords/keywords')

router.post('/add', async (req, res) => {
    
    let data = "";
    let score = 60;
    if (!req.file) {
        res.json({
            score: "No file uploaded"
        });
        return;
    }
    // Process the uploaded file using pdfParser or any other method
    let result = await pdfParser(req.file.path)

    data = await result.text;
    data = data.toUpperCase();

    for (const keyword of keywords) {
        if (data.includes(keyword)) {
            if(score < 100){
                score++;
            }
        }
    }

    // Delete the uploaded file after processing 
    await fs.unlinkSync(req.file.path);

    res.json({
        score
    });
});

router.post('/register', async (req, res) => {
    if (req.body.name) {
        let { username, name, email, password } = { ...req.body };
        try {
            // Check if username or email already exists
            let user = await User.findOne({ $or: [{ username }, { email }] });
            
            if (!user) {
                // Create a new user
                let newUser = new User({
                    username,
                    name,
                    email,
                    password
                });

                await newUser.save();
                console.log(name + " user logged in")
                res.json({
                    login: true,
                    username,
                    name,
                    email
                });
            } else {
                // Username or email already exists
                res.json({
                    login: false,
                    message: 'Username or email already exists'
                });
            }
        } catch (err) {
            console.log(err);
            res.json({
                login: false,
                message: 'An error occurred'
            });
        }
    } else {
        res.json({
            login: false,
            message: 'Name is required'
        });
    }
});


router.post('/login', async (req, res) => {
    if (req.body.username) {
        let { username, password } = { ...req.body };
        let user = await User.findOne({
            username
        });
        if (user) {
            if (user.password == password) {
                console.log(username + "user logged in");
                req.user = user;

                let token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
                    expiresIn: '30d'
                });
                res.json({
                    login: true,
                    username,
                    name: user.name,
                    email: user.email,
                    token
                });
            }
            else {
                res.json({
                    login: false
                });
            }
        }
        else {
            res.json({
                login: false
            });
        }
    }
    else {
        res.json({
            login: false,
        })
    }
});

router.post('/jwt', async (req, res) => {
    if (req.body.token) {
        let token = req.body.token;
        try {
            let decode = jwt.verify(token, process.env.JWT_KEY);
            req.user = await User.findById(decode.id).select('-password');
            if (req.user) {
                res.json({
                    login: true,
                    name: req.user.name,
                    username: req.user.username,
                    email: req.user.email
                });
            }
            else {
                throw new Error("fail");
            }

        }
        catch (err) {
            res.json({
                login: false
            })
        }

    }
    else {
        res.json({
            login: false
        })
    }
});

router.post('/userdata', async (req, res) => {
    const { id, name, description, field, role, skills, certifications, projects, college } = req.body;

    if (id) {
        try {
            // Check if user exists
            const userExists = await User.findOne({ username: id });
            if (!userExists) {
                return res.status(404).json({ message: "User not found" });
            }

            // Update or create user details
            const userDetails = await UserDetails.findOneAndUpdate(
                { id },
                { name, description, field, role, skills, certifications, projects, college },
                { new: true, upsert: true }
            );

            // Return updated or created user details
            res.json({
                ...userDetails.toObject(),
                successful: true
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    } else {
        res.status(400).json({ login: false, message: "ID is required" });
    }
});


router.get('/userdata/:id', async (req, res) => {
    let id = req.params.id;

    try {
        if (id) {
            let user = await UserDetails.findOne({ id });
            if (user) {
                res.json(user);
            }
            else {
                res.json({
                    message: "user data not found"
                })
            }
        }
        else {
            res.json({
                message: "user data not found"
            })
        }
    }
    catch (err) {
        console.log(err);
        res.json({
            message: "user data not found"
        })
    }
});

router.get('/portfolio', async (req, res) => {
    try {
        let temp = await Template.find({});
        res.json(temp);
    }
    catch (err) {
        console.log(err);
        res.json({
            message: false
        })
    }
});

router.post('/portfolio', async (req, res) => {
    try {
        if (req.body.name) {
            let { id, tem } = req.body;
            console.log(id)

            id = id.toLowerCase();
            if (fs.existsSync('public/' + id)) {
                console.log("already exists");
            }
            else {
                fs.mkdirSync('public/' + id);
            }
            let data = portfolio(tem, req.body);
            fs.writeFileSync('public/' + id + "/index.html", data);
            res.json({
                message: true,
                url: id
            })
            console.log("site created");
        }
        else {
            res.json({
                message: false
            })
            console.log("failed");
        }
    }
    catch (err) {
        res.json({
            message: false
        })
        console.log(err);
    }
});

//get resumes

router.get('/resume', async (req, res) => {

    try {

        const resumeData = await ResumeModel.find({})
        res.json(resumeData)
    }
    catch (err) {
        console.log(err)
        res.json({
            message: false
        })
    }
})

//post questions

router.post('/question', async (req, res) => {
    console.log(req.body)
    try {
        if (req.body.question) {
            let question = req.body.question
            let role = req.body.role

            let newEntry = await QuestionModel.create({
                role,
                question
            })

            newEntry.save();

            res.json({
                message: true
            })
        }
    }
    catch (err) {
        console.log(err)
        res.json({
            message: false
        })
    }

})

//delete question
router.delete("/question", async (req, res) => {
    try {
        const { role, question } = req.body;

        if (!role || !question) {
            return res.status(400).json({
                message: false,
                error: "Role and question are required"
            });
        }

        const deleteResult = await QuestionModel.deleteOne({ role, question });

        if (deleteResult.deletedCount > 0) {
            return res.status(200).json({
                message: true,
                info: "Question deleted successfully"
            });
        } else {
            return res.status(404).json({
                message: false,
                error: "Question not found"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: false,
            error: "Internal server error"
        });
    }
});


//get questions
router.get("/questions", async (req, res) => {
    const { role } = req.query

    try {
        if (role) {
            const questions = await QuestionModel.find({role:role})



            res.json({
                message :true,
                questions : questions
            })
        }

        
    }
    catch (err) {
        console.log(err)
        req.json({
            message: false
        })
    }


})

//upload result
router.post('/result',async (req,res)=>{
    try{

        const {result} = req.body
        console.log(result)

        if (!Array.isArray(result)) {
            return res.status(400).json({ message: 'Invalid input, `result` should be an array.' });
        }

        for (let entry of result) {
            const existingEntry = await ResultModel.findOne({ email: entry.email, question: entry.question });
            if (existingEntry) {
                
            }
            else{
                await ResultModel.create(entry);
            }
        }
        res.status(201).json({
            message: true,
        });
    }
    catch(err){
        console.log(err)
        res.json({
            message : false
        })
    }
})

//delete result
router.delete('/result',async (req,res)=>{
    try{

        const {answer} = req.body
        
        if (answer){

            let deleteResponse = await ResultModel.deleteOne({answer})

            if (deleteResponse.deletedCount > 0) {
                return res.status(200).json({
                    message: true,
                    info: "Response deleted successfully"
                });
            } else {
                return res.status(404).json({
                    message: false,
                    error: "Response not found"
                });
            }
        }
        else{
            return res.status(404).json({
                message: false,
                error: "Response not found"
            });
        }
    }
    catch(err){
        console.log(err)
        res.json({
            message : false
        })
    }
})

// post resumes
router.post("/resume", async(req,res)=>{

    try {

        const {name,url,description} = req.body

        if (name && url && description){
            let newEntry = await ResumeModel.create({
                name,
                url,
                description
            })
            res.json({
                message : true
            })
        }
    }
    catch(err){
        console.log(err)
        res.json({
            message : false
        })
    }
})

//add admins
router.post('/admin', async (req,res)=>{
    try{
        const {name, key} = req.body

        if(name && key){
            let newEntry = await AdminModel.create({
                name,key
            })

            res.json({
                message :true
            })
        }
    }
    catch(err){
        console.log(err)
        
        res.json({
            message :false
        })
    }
})

//get admins
router.get('/admin', async (req,res)=>{
    try{
        const {key} = req.query

        if(key){
            const newEntry = await AdminModel.findOne({ key });

            if(newEntry){
                res.json({
                message :true
            })
            }
            else{
                res.json({
                    message :false
                })
            }

            
        }
    }
    catch(err){
        console.log(err)
        
        res.json({
            message :false
        })
    }
})

// get users
router.get('/users', async (req, res) => {
    try {
        const { key } = req.query;

        if (key) {
            const check = await AdminModel.findOne({ key });

            if (check) {
                const users = await ResultModel.find({}).select('-question -answer');

                const emails = users.map((user) => user.email);

                const uniqueEmail = [...new Set(emails)]

                res.json({
                    message: true,
                    users: uniqueEmail
                });
            } else {
                res.json({
                    message: false
                });
            }
        } else {
            res.json({
                message: false,
                error: 'Key is required'
            });
        }
    } catch (err) {
        console.log(err);

        res.json({
            message: false,
            error: 'An error occurred'
        });
    }
});


//get responses of user
router.get('/result', async (req, res) => {
    try {
        const { email, key } = req.query;
        console.log(email)

        if (!email || !key) {
            return res.json({
                message: false,
                error: 'Email and key are required'
            });
        }

        const check = await AdminModel.findOne({ key });

        if (check) {
            const responses = await ResultModel.find({email});

            if (responses.length > 0) {
                return res.json({
                    message: true,
                    responses: responses
                });
            } else {
                return res.json({
                    message: true,
                    responses: [],
                    info: 'No responses found for this email'
                });
            }
        } else {
            return res.json({
                message: false,
                error: 'Invalid key'
            });
        }
    } catch (err) {
        console.log(err);
        return res.json({
            message: false,
            error: 'An error occurred'
        });
    }
});

//ai

router.post('/ai', async (req, res) => {
    try {
        const { username, text } = req.body;

        // Validate input
        if (!username || !text) {
            return res.status(400).json({
                message: 'Username and text are required.'
            });
        }

        // Check if user exists
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        // Call the AI function and get the response
        const response = await Ai(text);

        // Return the response
        return res.status(200).json({
            message: true,
            response
        });
    } catch (err) {
        console.error('Error occurred:', err); // Log the error for debugging
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
});



module.exports = router;