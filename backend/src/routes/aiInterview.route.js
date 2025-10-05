import express from "express"
import { 
    aiInterviewWay, 
    aiInterviewStart, 
    aiInterviewAnalysis, 
    aiHistory,
    aiResumeFile,
 } from "../controllers/aiInterview.controller.js"
import { generateFeedbackController } from "../controllers/feedback.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../utils/fileUpload.js";
const router = express.Router()

router.route("/aiUploadResume").post(verifyJWT,upload.single("resumePdf"), aiResumeFile);
router.route("/ai").post(verifyJWT, aiInterviewWay)
router.route("/aiAnalysis").post(aiInterviewAnalysis)
router.post("/nlpAnalysis", generateFeedbackController);
router.route("/aiHistory").get(verifyJWT, aiHistory)


export default router