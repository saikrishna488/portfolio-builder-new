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
const ResultModel = require('../models/Result')

router.post('/add', async (req, res) => {
    const keywords = [
        "LEADERSHIP", "TEAMWORK", "COMMUNICATION", "PROBLEM-SOLVING", "CRITICAL THINKING", "ADAPTABILITY",
        "TIME MANAGEMENT", "PROJECT MANAGEMENT", "DECISION MAKING", "ANALYTICAL SKILLS", "CREATIVITY",
        "ATTENTION TO DETAIL", "MULTITASKING", "RESEARCH", "NEGOTIATION", "CONFLICT RESOLUTION",
        "CUSTOMER SERVICE", "SALES", "MARKETING", "DATA ANALYSIS", "STRATEGIC PLANNING", "BUDGET MANAGEMENT",
        "PUBLIC SPEAKING", "PRESENTATION SKILLS", "RISK MANAGEMENT", "QUALITY CONTROL", "INTERPERSONAL SKILLS",
        "LEADERSHIP DEVELOPMENT", "ORGANIZATIONAL SKILLS", "PROBLEM IDENTIFICATION", "SALES STRATEGY",
        "MARKET RESEARCH", "CLIENT RELATIONS", "TEAM LEADERSHIP", "CROSS-FUNCTIONAL COLLABORATION",
        "VENDOR MANAGEMENT", "CLIENT ACQUISITION", "MARKET ANALYSIS", "CUSTOMER RELATIONSHIP MANAGEMENT (CRM)",
        "BUSINESS DEVELOPMENT", "JAVASCRIPT", "PYTHON", "JAVA", "C++", "RUBY", "PHP", "SWIFT", "C#", "SQL", "HTML/CSS",
        "TYPESCRIPT", "GO", "KOTLIN", "RUST", "MATLAB", "PERL", "SHELL SCRIPTING", "R", "SCALA", "VB.NET",
        "OBJECTIVE-C", "ASSEMBLY", "DART", "COBOL", "LUA", "VBA", "GROOVY", "PL/SQL", "ABAP",
        "MICROSOFT OFFICE SUITE", "ADOBE CREATIVE SUITE", "SALESFORCE", "SAP", "TABLEAU", "GOOGLE ANALYTICS",
        "AUTOCAD", "MATLAB", "HADOOP", "DOCKER", "KUBERNETES", "AWS", "AZURE", "GIT/GITHUB", "JENKINS", "JIRA",
        "SLACK", "TRELLO", "WORDPRESS", "DRUPAL", "JOOMLA", "SHAREPOINT", "CRM SOFTWARE", "ERP SYSTEMS",
        "VIRTUALIZATION", "NETWORK ADMINISTRATION", "DEVOPS", "AGILE METHODOLOGY", "SCRUM", "BIG DATA",
        "HEALTHCARE", "FINANCE", "EDUCATION", "INFORMATION TECHNOLOGY (IT)", "RETAIL", "MANUFACTURING", "REAL ESTATE",
        "HOSPITALITY", "CONSTRUCTION", "NONPROFIT", "PHARMACEUTICALS", "MARKETING", "E-COMMERCE", "TELECOMMUNICATIONS",
        "AEROSPACE", "ENERGY", "ENTERTAINMENT", "AUTOMOTIVE", "GOVERNMENT", "ENVIRONMENTAL",
        "PMP (PROJECT MANAGEMENT PROFESSIONAL)", "CPA (CERTIFIED PUBLIC ACCOUNTANT)", "CFA (CHARTERED FINANCIAL ANALYST)",
        "PHR (PROFESSIONAL IN HUMAN RESOURCES)", "SHRM-CP (SHRM CERTIFIED PROFESSIONAL)",
        "CISSP (CERTIFIED INFORMATION SYSTEMS SECURITY PROFESSIONAL)",
        "CCNA (CISCO CERTIFIED NETWORK ASSOCIATE)", "COMPTIA A+",
        "AWS CERTIFIED SOLUTIONS ARCHITECT", "GOOGLE CLOUD PROFESSIONAL CLOUD ARCHITECT"
    ];

    let data = "";
    let score = 60;
    console.log('Received a POST request to /add');
    console.log(req.body); // This will contain any text fields from your form
    console.log(req.file); // This will contain information about the uploaded file
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
            score++;
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
            let user = await User.findOne({ username });
            console.log(user);
            if (!user) {
                let user = await User.create({
                    username,
                    name,
                    email,
                    password
                });

                user.save();
                console.log(name + " user logged in")
                res.json({
                    login: true,
                    username,
                    name,
                    email
                })
            }
            else {
                res.json({
                    login: false
                });
            }
        }
        catch (err) {
            console.log(err);
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
            const existingEntry = await ResultModel.findOne({ username: entry.username, question: entry.question });
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


module.exports = router;