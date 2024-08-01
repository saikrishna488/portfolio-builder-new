const express = require("express")
const router = express.Router()

//models
const TestModel = require('../models/Test')
const User = require('../models/User')
const AdminModel = require('../models/Admin')
const TestResultModel = require('../models/TestResults')
const print = console.log


//post questions
router.post('/test', async (req, res) => {
    try {
        const { questions } = req.body;

        // Check if the request contains multiple questions or a single question
        if (Array.isArray(questions)) {
            // Handle multiple questions
            const addQuestions = await TestModel.insertMany(questions);
            res.json({
                message: true,
                data: addQuestions // Optionally send the created questions as part of the response
            });
        } else {
            // Handle a single question
            const { role, question, options, answer } = req.body;

            if (role && question && options && answer) {
                const addQuestion = await TestModel.create({
                    role,
                    question,
                    options,
                    answer
                });

                res.json({
                    message: true,
                    data: addQuestion // Optionally send the created question as part of the response
                });
            } else {
                res.status(400).json({
                    message: false,
                    error: 'Required fields are missing'
                });
            }
        }
    } catch (err) {
        console.error(err); // Use console.error to log the error
        res.status(500).json({
            message: false,
            error: 'Internal server error'
        });
    }
});


//get questions with options

router.get('/test', async (req, res) => {
    try {
        const { role, username } = req.query;

        if (role && username) {

            let user = await User.find({ username })

            if (!user) {
                return res.json({
                    message: false,
                })
            }

            let questions = await TestModel.find({ role }).select('-answer');

            return res.json({
                message: true,
                questions: questions
            })
        }
        else {
            res.json({
                message: false
            })
        }
    }
    catch (err) {
        print(err)
        res.json({
            message: false
        })
    }
})


//get only question
router.get('/testquestions', async (req, res) => {
    try {
        const { role, adminKey } = req.query;
        // console.log(adminkey,role)

        if (role && adminKey) {
            // Check if the admin exists
            const admin = await AdminModel.findOne({ key: adminKey });

            if (!admin) {
                return res.status(403).json({
                    message: 'Unauthorized access'
                });
            }

            // Fetch questions based on the role
            const questions = await TestModel.find({ role })
                .select('-answer -options -role');

            return res.json({
                message: true,
                questions: questions
            });
        } else {
            return res.status(400).json({
                message: 'Missing required parameters'
            });
        }
    } catch (err) {
        console.error('Error fetching test questions:', err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});



// evalute results
router.post('/evaluate', async (req, res) => {
    try {
        const { responses, role, username } = req.body;

        let score = 0;

        if (role && username && responses && Array.isArray(responses)) {
            for (const response of responses) {
                const { question, answer } = response;

                const find = await TestModel.findOne({ question, answer });

                if (find) {
                    score += 1;
                }
            }


            let result = TestResultModel.create({
                role,
                username,
                result: score
            })

            const answers = await TestModel.find({})

            return res.status(200).json({
                message: true,
                result: score,
                answers: answers
            });
        } else {
            return res.status(400).json({
                message: false,
                error: 'No responses found or invalid format'
            });
        }
    } catch (err) {
        console.error(err); // Use console.error to log the error
        return res.status(500).json({
            message: false,
            error: 'Internal server error'
        });
    }
})

//delete question
router.delete('/test', async (req, res) => {
    try {
        const { question, adminKey } = req.body;

        if (question && adminKey) {
            // Check if the admin exists
            const admin = await AdminModel.findOne({ key: adminKey });

            if (!admin) {
                return res.status(403).json({
                    message: 'Unauthorized access'
                });
            }

            // Delete the question
            const deleted = await TestModel.deleteOne({ question });

            if (deleted.deletedCount > 0) {
                return res.json({
                    message: 'Question deleted successfully'
                });
            } else {
                return res.status(404).json({
                    message: 'Question not found'
                });
            }

        } else {
            return res.status(400).json({
                message: 'Missing required parameters'
            });
        }
    } catch (err) {
        console.error('Error deleting question:', err);
        return res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
});


// check attempt

router.post('/attempts', async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.json({
                message: false,
                days: 'Username is required',
            });
        }

        let results = await TestResultModel.find({ username }).sort({ createdAt: -1 }).limit(1);

        if (!results || results.length === 0) {
            return res.json({
                message: true,
                days: 1
            });
        }

        let date = new Date(results[0].createdAt);
        let today = new Date();

        const diffTime = Math.abs(today - date);
        const diffHours = diffTime / (1000 * 60 * 60);  // Difference in hours

        let diffDays;
        if (diffHours < 24) {
            diffDays = 0;
        } else {
            diffDays = Math.ceil(diffHours / 24);  // Difference in days
        }

        return res.json({
            message: true,
            days: diffDays,
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: false,
            error: 'An error occurred',
        });
    }
});


router.post('/results', async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.json({
                message: false,
                days: 'Username is required',
            });
        }

        let results = await TestResultModel.find({ username })

        if (!results || results.length === 0) {
            return res.json({
                message: false,
            });
        }

        return res.json({
            message: true,
            results
        });


    } catch (err) {
        console.log(err);
        return res.json({
            message: false,
            error: 'An error occurred',
        });
    }
});



module.exports = router;