import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// AI Tutor endpoint
app.post('/api/ai-tutor', async (req, res) => {
  try {
    const { message, context, actionType } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Build prompt with rich BCS context
    const currentSubject = context?.subject || 'সাধারণ প্রস্তুতি';
    const currentTopic = context?.topic || 'সার্বিক বিষয়';
    const currentPageText = context?.pageText || '';

    let promptGuidance = `
তুমি "BCS প্রস্তুতি" অ্যাপের একজন অত্যন্ত অভিজ্ঞ, ধৈর্যশীল এবং বন্ধুত্বপূর্ণ বিসিএস ক্যাডার শিক্ষক (BCS AI Tutor)।
শিক্ষার্থীর বর্তমান পড়াশোনার প্রসঙ্গ:
- বিষয়: ${currentSubject}
- টপিক: ${currentTopic}
${currentPageText ? `- পাঠ্যবই/পৃষ্ঠার অংশবিশেষ: "${currentPageText}"` : ''}

শিক্ষার্থীর প্রশ্ন/অনুরোধ: "${message}"

যদি শিক্ষার্থী শতকরা বা গণিতের কোনো বিষয় বলে (যেমন "শতকরা বুঝি না"):
নিচের কাঠামোতে সহজ বাংলায় উত্তর দেবে:
1. সহজ সংজ্ঞা (Definition)
2. বাস্তব জীবনের সহজ উদাহরণ (Real-life Example)
3. মূল সূত্র (Formula)
4. বিসিএস প্রিলিমিনারি উপযোগী বিগত বছরের বা মডেল উদাহরণ ও সমাধান (BCS-style question & step-by-step solution)
5. শিক্ষার্থীর নিজেকে যাচাই করার জন্য একটি অনুশীলনী প্রশ্ন (Practice Question with options A, B, C, D)

যদি শিক্ষার্থী কোনো নির্দিষ্ট কুইক অ্যাকশন চায়:
- "সহজ করে বুঝাও": একদম জলের মতো সহজ ভাষায় দৈনন্দিন জীবনের উদাহরণ দিয়ে বুঝিয়ে দাও।
- "উদাহরণ দাও": অন্তত ৩টি বাস্তব ও বিসিএস পরীক্ষার মতো উদাহরণ দাও।
- "MCQ দাও": ৪টি অপশনসহ একটি গুরুত্বপূর্ণ বিসিএস স্ট্যান্ডার্ড প্রশ্ন তৈরি করে দাও এবং শেষে সঠিক উত্তর ও ব্যাখ্যা দাও।
- "পরীক্ষার প্রশ্ন দেখাও": বিগত বিসিএস পরীক্ষায় এই টপিক থেকে কীভাবে প্রশ্ন আসে তা বিশ্লেষণসহ দেখাও।
- "আমার ভুলটা বুঝাও": শিক্ষার্থীর দুর্বলতা ধরিয়ে দিয়ে সঠিক যুক্তি ও টেকনিক শিখিয়ে দাও।

সব সময় মার্জিত, উৎসাহব্যঞ্জক ও সুস্পষ্ট বাংলা ফর্মেটিং (বুলিয়েট পয়েন্ট, বোল্ড টেক্সট) ব্যবহার করবে যাতে মোবাইল স্ক্রিনে পড়তে চমৎকার লাগে।
`;

    if (actionType === 'explain_mistake' && context?.question) {
      promptGuidance += `
শিক্ষার্থী একটি প্রশ্নে ভুল করেছে:
প্রশ্ন: "${context.question}"
শিক্ষার্থীর দেওয়া উত্তর: "${context.userAnswer}"
সঠিক উত্তর: "${context.correctAnswer}"
ব্যাখ্যা: "${context.explanation || ''}"
শিক্ষার্থীকে বুঝিয়ে দাও সে কেন ভুল ভেবে থাকতে পারে এবং পরবর্তীতে এই ধরনের প্রশ্নে কীভাবে দ্রুত সঠিক উত্তর বের করা যায়।
`;
    }

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptGuidance,
      });

      return res.json({
        reply: response.text || 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি। আবার চেষ্টা করুন।',
      });
    }

    // High quality intelligent mock response for BCS students if key is not configured
    const simulatedResponse = generateSimulatedTutorResponse(message, currentSubject, currentTopic, actionType);
    return res.json({ reply: simulatedResponse });

  } catch (error) {
    console.error('AI Tutor error:', error);
    return res.status(500).json({
      error: 'AI Tutor পরিষেবা এই মুহূর্তে ব্যস্ত আছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
    });
  }
});

function generateSimulatedTutorResponse(msg: string, subject: string, topic: string, actionType?: string): string {
  const lower = (msg || '').toLowerCase();

  if (topic.includes('শতকরা') || lower.includes('শতকরা') || lower.includes('percentage') || lower.includes('percent')) {
    return `### 💡 শতকরা (Percentage) সহজ পাঠ

**১. শতকরা কী?**
শতকরা মানে প্রতি শতে বা ১০০-র মধ্যে কত। চিহ্নটি হলো **%**।
যেমন: ৫০% মানে ১০০ এর মধ্যে ৫০, অর্থাৎ অর্ধেক (১/২)।

**২. সহজ উদাহরণ:**
একটি ক্লাসে ২৫ জন শিক্ষার্থীর মধ্যে ২০ জন পাস করল। শতকরা কতজন পাস করল?
১০০ জনে বের করতে চাইলে: (২০ ÷ ২৫) × ১০০ = **৮০%**।

**৩. গোল্ডেন সূত্র:**
\`\`\`
শতকরা হার = (প্রাপ্ত মান ÷ মোট মান) × ১০০%
\`\`\`

**৪. বিসিএস স্টাইল উদাহরণ (৩৫তম বিসিএস অনুরূপ):**
*প্রশ্ন:* ৬০ টাকার কত শতাংশ ৯০ টাকা হবে?
*সমাধান:*
ধরি, ৬০ এর x% = ৯০
বা, ৬০ × (x / ১০০) = ৯০
বা, x = (৯০ × ১০০) / ৬০ = ১৫০%
উত্তর: **১৫০%**

**৫. আপনার জন্য কুইজ:**
*৪০ এর ২৫% কত?*
(ক) ১০  (খ) ১৫  (গ) ২০  (ঘ) ২৫
*টিপস: ২৫% মানে চার ভাগের এক ভাগ! ৪০ কে ৪ দিয়ে ভাগ করলেই উত্তর পেয়ে যাবেন।*`;
  }

  if (actionType === 'mcq' || lower.includes('mcq') || lower.includes('প্রশ্ন')) {
    return `### 📝 বিসিএস অনুশীলন প্রশ্ন (${topic})

**প্রশ্ন:** কোনটি মৌলিক সংখ্যা?
(ক) ৯
(খ) ১৫
(গ) ২১
(ঘ) ২৯

**উত্তর ও ট্রিকস:**
সঠিক উত্তর: **(ঘ) ২৯**
*ব্যাখ্যা:* যে সংখ্যাকে ১ এবং ঐ সংখ্যা ছাড়া অন্য কোনো সংখ্যা দ্বারা ভাগ করা যায় না তাকে মৌলিক সংখ্যা বলে। ৯, ১৫, ২১ যৌগিক কারণ এগুলো ৩ দ্বারা বিভাজ্য। কিন্তু ২৯ কেবল ১ ও ২৯ দ্বারা বিভাজ্য।`;
  }

  if (actionType === 'simplify' || lower.includes('সহজ')) {
    return `### 🌟 সহজ ভাষায় ব্যাখ্যা (${topic})

বিসিএস প্রিলিতে এই টপিকটি থেকে প্রতি বছর অন্তত ১-২ নম্বর আসে। মূল বিষয় হলো:
১. জটিল সূত্রের চেয়ে শর্টকাট লজিক মনে রাখুন।
২. সবসময় প্রশ্নটি ভেঙে পড়ুন — "কী দেওয়া আছে" আর "কী চাইছে"।
৩. নিয়মিত ১৫ মিনিট প্র্যাকটিস করলেই এই ভয় পুরোপুরি কেটে যাবে!`;
  }

  return `### 👨‍🏫 বিসিএস এআই টিউটর

আপনার প্রশ্নটি (${msg}) খুব গুরুত্বপূর্ণ! **${subject} → ${topic}** অংশের এই বিষয়টি বিসিএস প্রিলিমিনারি পরীক্ষার জন্য বিশেষ নজর দেওয়া প্রয়োজন।

**মূল তথ্য:**
- বিসিএস পরীক্ষার প্রশ্নব্যাংক বিশ্লেষণ করলে দেখা যায়, এই অধ্যায়ের বেসিক কনসেপ্ট থেকেই বেশি প্রশ্ন সাজানো হয়।
- মুখস্থ করার চেয়ে ধারণা পরিষ্কার রাখলে পরীক্ষায় পেঁচানো প্রশ্নও সহজে সমাধান করা সম্ভব।

আপনার কি কোনো নির্দিষ্ট অঙ্ক বা প্রশ্নে সংশয় আছে? নিচের বাটনগুলো চেপে আমাকে জানাতে পারেন!`;
}

// Setup Vite in Dev or serve static in Prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist', 'index.html'));

  if (isProduction) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        if (vite.ssrFixStacktrace) vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
