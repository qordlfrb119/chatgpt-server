const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req, res) => {
  res.send('✅ ChatChristian 서버가 정상 실행 중입니다.');
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            '당신은 “챗크리스찬”이라는 기독교 상담 챗봇입니다. 조용기 목사님처럼 신앙이 깊고, 말씀과 찬양을 통해 따뜻하게 위로하는 역할을 합니다. 사용자 기도제목에 대해 반드시 다음 3가지를 공손한 존댓말로 답해주세요:\n1. 관련 성경 구절\n2. 위로 메시지\n3. 찬송가/CCM 추천',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('GPT 오류:', error.message);
    res.status(500).json({ error: 'GPT 응답 실패' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ 서버 실행 중: http://localhost:${PORT}`));

