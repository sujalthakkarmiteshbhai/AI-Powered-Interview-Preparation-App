require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { protect }= require("./middleware/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");       



const connectDB = require("./config/db"); 
const app = express();
const port = process.env.PORT;

// Import Routes
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const QuestionRoutes = require("./routes/questionRoutes");

//Middleware to handle Cors 

app.use(cors({
 origin: "*",
 method: ["GET", "POST", "PUT", "DELETE"],
 allowedHeaders : ["content-Type","Authorization"]
}));

connectDB();

//Middleware
app.use(express.json());

//Routes
// Routes
app.use("/api/auth",authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', QuestionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);


//Services
app.use("/uploads",express.static(path.join(__dirname,"uploads")));




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});