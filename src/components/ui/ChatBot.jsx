import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `당신은 디지털 논리 회로와 컴퓨터 구조를 친절하게 가르쳐주는 '회로 학습 도우미 AI'입니다.
사용자는 현재 웹 기반 논리 회로 시뮬레이터(AND, OR, NOT, NAND, NOR, XOR, SR Latch, D Flip-Flop 등을 지원)를 사용하고 있습니다.
질문에 대해 친절하고 알기 쉽게 설명해주세요. 마크다운 포맷을 적절히 사용하여 가독성을 높여주세요.`;

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  
  // 키는 빌드 시 주입된다. 로컬은 .env(.env.example 참고),
  // 배포는 GitHub Actions 시크릿(GEMINI_API_KEY)에서 온다.
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const [messages, setMessages] = useState([
    { role: 'bot', text: '안녕하세요! 회로와 관련된 무엇이든 물어보세요.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 메시지 업데이트 시 스크롤 아래로
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInput('');

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'error',
          text: 'API 키가 설정되지 않았습니다.\n.env.example을 .env로 복사한 뒤 VITE_GEMINI_API_KEY 값을 넣고 dev 서버를 다시 시작해주세요.'
        }
      ]);
      return;
    }

    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        // 버전 고정 모델명(gemini-1.5-flash 등)은 서비스 종료 시 404가 나므로
        // 항상 최신 flash를 가리키는 별칭을 사용한다.
        model: 'gemini-flash-latest',
        systemInstruction: SYSTEM_INSTRUCTION
      });

      // 히스토리 변환
      const history = messages
        .filter((m) => m.role !== 'system' && m.role !== 'error')
        .map((m) => ({
          role: m.role === 'bot' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }));

      // Gemini API 제약: history는 반드시 user 역할부터 시작해야 합니다.
      while (history.length > 0 && history[0].role === 'model') {
        history.shift();
      }

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(text);
      const response = await result.response;
      
      setMessages((prev) => [...prev, { role: 'bot', text: response.text() }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'error',
          text: `API 호출 중 오류가 발생했습니다.\n${error?.message ?? error}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 챗봇 열기 버튼 */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 transition-colors"
      >
        🤖 AI에게 질문하기
      </button>

      {/* 모달 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col h-[600px] max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-800">🤖 AI 학습 도우미</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                aria-label="닫기"
              >
                ×
              </button>
            </div>

            {/* 메인 영역 (항상 채팅 UI) */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm rounded-lg px-3 py-2 max-w-[85%] ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white self-end'
                      : m.role === 'error'
                      ? 'bg-red-100 text-red-700 self-center text-center w-full'
                      : 'bg-gray-100 text-gray-700 self-start'
                  }`}
                >
                  {m.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              ))}
              {isLoading && (
                <div className="text-sm bg-gray-100 text-gray-500 self-start rounded-lg px-4 py-2 flex items-center gap-2">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 입력 폼 */}
            <form onSubmit={handleSend} className="flex gap-2 p-3 border-t">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="질문을 입력하세요..."
                disabled={isLoading}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg px-4 text-sm font-semibold transition-colors shrink-0"
              >
                전송
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
