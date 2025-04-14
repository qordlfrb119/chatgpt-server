const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // 🔥 이 부분 중요

app.get('/', (req, res) => {
  res.send('🔥 서버가 성공적으로 배포되었습니다!');
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
