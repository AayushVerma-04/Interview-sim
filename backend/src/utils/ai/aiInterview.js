import { llmFalse } from "./llm.js";
import { z } from "zod";
import client from "../reddisClient.js";
import { sampleInterviewData } from "../../test_data/interview-data.js";

const interviewOutputSchema = z.object({
  question: z.string().describe("The next interview question to ask the candidate."),
  referenceAnswer: z.string().describe("An ideal, concise, and accurate reference answer for the question.")
});

const explanationOutputSchema = z.object({
  explanation: z.string().describe("A clear and concise explanation of the provided technical concept or question.")
});

const aiInterview = async (
  sessionId,
  resume,
  position,
  numberOfQuestionLeft,
  experienceLevel,
  previousConversation,
  user = "Let's start the interview.",
  interviewMode = "Guided Mode"
) => {
  // Explain command block
  if (user.startsWith("//explain")) {
    const previousConversationArray = previousConversation || [];
    const lastAI = [...previousConversationArray].reverse().find(m => m.role === "ai" && m.content);

    if (!lastAI) {
      return { question: "There is no previous question to explain.", explanation: null };
    }

    if (
      previousConversationArray.length &&
      previousConversationArray[previousConversationArray.length - 1].role === "ai"
    ) {
      previousConversationArray.pop();
    }
    await client.hset(sessionId, "messages", JSON.stringify(previousConversationArray));

    const explanationSystemPrompt = `You are a helpful technical assistant. Your only job is to provide a clear, concise, and easy-to-understand explanation (explain the answer of the question) and also give answer point wise for the technical interview question you are given and then add this "type //yes for next question"

STRICT INSTRUCTIONS:
1. Directly explain the concept or what the question is asking for.
2. Do NOT ask a new question.
3. After your explanation, you MUST end your response with the exact phrase: "type //yes for next question".`;

    if (process.env.NODE_ENV === 'test') {
      return {
        question: lastAI.content,
        explanation: "This is a test explanation. It provides a simplified overview of the concept. type //yes for next question"
      };
    }

    const structuredExplainerLlm = llmFalse.withStructuredOutput(explanationOutputSchema);

    const explanationResponse = await structuredExplainerLlm.invoke([
      { role: "system", content: explanationSystemPrompt },
      { role: "user", content: `Please explain this interview question: "${lastAI.content}"` }
    ]);

    return {
      question: lastAI.content,
      explanation: explanationResponse.explanation
    };
  }

  // End of interview block
  if (numberOfQuestionLeft <= 0) {
    if (process.env.NODE_ENV === 'test') {
      return {
        question: "Your interview is over. Thank you for speaking with me today. You can see the detail analysis of this interview in your profile in some time."
      };
    }
    const endSystemPrompt = `You are a helpful assistant whose only job is to formally end an interview. You will be given the entire interview conversation for context, but you will not comment on it.
YOUR TASK:
Provide a polite, standardized closing statement.
STRICT OUTPUT REQUIREMENTS:
1. Your response MUST begin with the exact phrase: "Your interview is over."
2. Follow it with a brief, polite closing remark (e.g., "Thank you for your time today.").
3. Your response MUST end with the exact phrase: "You can see the detail analysis of this interview in your profile in some time."
DO NOT:
- DO NOT provide any analysis, feedback, summary, or score of the interview.
- DO NOT say anything else. Your response should only contain the three parts listed above.
Example Output:
"Your interview is over. Thank you for speaking with me today. You can see the detail analysis of this interview in your profile in some time."`;

    const endResponse = await llmFalse.invoke([
      { role: "system", content: endSystemPrompt },
      { role: "user", content: "The interview is over." }
    ]);
    return { question: endResponse.content };
  }

  if (process.env.NODE_ENV === 'test') {
    const randomIndex = Math.floor(Math.random() * sampleInterviewData.length);
    return sampleInterviewData[randomIndex];
  }

  // Main system prompt with reference answer requirement
  const systemPrompt = `You are a professional technical interviewer. Your objective is to conduct a realistic, in-depth interview to accurately assess a candidate's skills and experience. You will be professional, focused, and adaptable.

1. CONTEXT YOU WILL RECEIVE:
- Position: ${position}
- Experience Level: ${experienceLevel}
- Resume: ${resume}
- Interview Mode: ${interviewMode}
- Conversation History: ${JSON.stringify(previousConversation, null, 2)}

2. YOUR INTERVIEWING METHODOLOGY (HOW TO ASK QUESTIONS):
Your primary goal is to go beyond surface-level questions. Use the conversation history and the candidate's answers to inform your next question dynamically.

3. STRICT RULES OF ENGAGEMENT:
- Ask one clear, specific, and relevant question at a time.
- Do NOT explain or answer unless specifically asked.
- Maintain a professional and realistic tone.
- Avoid meta-commentary or question numbers.
- Only communicate in English.

4. OUTPUT REQUIREMENTS:
You must provide:
a) "question" → The next technical interview question.
b) "referenceAnswer" → The ideal, concise answer for that question (this will be used later for feedback generation). 
   Keep it factual, point-wise if possible, and less than 5 lines.

Example Output:
{
  "question": "Can you explain how a REST API works?",
  "referenceAnswer": "A REST API uses HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations. Each resource is identified by a URI, and communication is stateless."
}
`;


  const structuredLlm = llmFalse.withStructuredOutput(interviewOutputSchema);

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: user }
  ];

  const aiResponse = await structuredLlm.invoke(messages);

  return {
    question: aiResponse.question || null,
    referenceAnswer: aiResponse.referenceAnswer || "No reference answer available."
  };
};

export default aiInterview;