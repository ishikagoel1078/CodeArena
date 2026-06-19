const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Problem =
require("./models/problem");
const Submission =
require("./models/submission");

const app = express();

app.use(cors());
app.use(express.json());
app.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.json({
            success: true,
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});
mongoose.connect(
  "mongodb+srv://ishikagoel1078_db_user:cQMiYVBydBX590eB@cluster0.jqkcpxj.mongodb.net/CodeArena?appName=Cluster0"
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});
app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            });
        }

        if (user.password !== password) {
            return res.json({
                success: false,
                message: "Invalid Password"
            });
        }

        res.json({
    success: true,
    message: "Login Successful",
    user: {
        name: user.name,
        email: user.email
    }
});
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

app.get("/", (req, res) => {
    res.send("CodeArena Backend Running");
});

const PORT = 5000;

app.get("/users/count", async (req, res) => {

    try {

        const count = await User.countDocuments();

        res.json({
            success: true,
            count
        });

    } catch(error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});
app.get("/users", async (req, res) => {

    try {

        const users = await User.find().select(
            "name email"
        );

        res.json({
            success: true,
            users
        });

    } catch(error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});
app.get("/problems", async (req,res)=>{

    const problems =
    await Problem.find();

    res.json({
        success:true,
        problems
    });

});
app.get("/problem/:title", async (req, res) => {

    const problem =
        await Problem.findOne({
            title: req.params.title
        });

    res.json({
        success: true,
        problem
    });

});
app.post("/submit", async (req, res) => {

    try {

        console.log("BODY RECEIVED:");
        console.log(req.body);

        const {
            userName,
            problemTitle,
            code
        } = req.body;

        const submission =
            new Submission({
                userName,
                problemTitle,
                code,
                score: 100
            });

        await submission.save();
        console.log("Submission Saved");

        res.json({
            success: true,
            message:
                "Submission Saved"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });

    }

});
app.get("/leaderboard", async (req, res) => {

    try {

        const submissions =
            await Submission.find()
            .sort({ score: -1 });

        res.json({
            success: true,
            submissions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});