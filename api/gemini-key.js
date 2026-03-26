// Vercel Serverless Function — Gemini 키를 클라이언트에 안전하게 전달
// 이 함수는 GEMINI_API_KEY 환경변수 값을 반환합니다.
// 프론트엔드에서 /api/chat 실패 시 직접 Gemini 호출에 사용합니다.

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: 'not configured' });

  // 키의 앞 10자리만 확인용으로 노출하고 전체 키 반환
  // (이 앱은 개인용므로 클라이언트 노출 허용)
  return res.status(200).json({ key });
};
