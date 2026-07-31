import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `당신은 디지털 논리 회로와 컴퓨터 구조를 친절하게 가르쳐주는 '회로 학습 도우미 AI'입니다.
사용자는 현재 웹 기반 논리 회로 시뮬레이터(AND, OR, NOT, NAND, NOR, XOR, SR Latch, D Flip-Flop 등을 지원)를 사용하고 있습니다.
질문에 대해 친절하고 알기 쉽게 설명해주세요. 마크다운 포맷을 적절히 사용하여 가독성을 높여주세요.`;

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 로컬 스토리지에서 API 키 불러오기
  useEffect(() => {
    const savedKey = localStorage.getItem('GEMINI_API_KEY');
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeySaved(true);
      setMessages([{ role: 'bot', text: '안녕하세요! 회로와 관련된 무엇이든 물어보세요.' }]);
    }
  }, []);

  // 메시지 업데이트 시 스크롤 아래로
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const saveApiKey = (e) => {
    e.preventDefault();
    const key = apiKey.trim();
    if (!key) return;
    localStorage.setItem('GEMINI_API_KEY', key);
    setIsKeySaved(true);
    setMessages([{ role: 'bot', text: 'API 키가 저장되었습니다. 무엇을 도와드릴까요?' }]);
  };

  const removeApiKey = () => {
    localStorage.removeItem('GEMINI_API_KEY');
    setApiKey('');
    setIsKeySaved(false);
    setMessages([]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !isKeySaved || isLoading) return;

    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction: SYSTEM_INSTRUCTION
      });

      // 히스토리 변환
      const history = messages
        .filter((m) => m.role !== 'system' && m.role !== 'error')
        .map((m) => ({
          role: m.role === 'bot' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(text);
      const response = await result.response;
      
      setMessages((prev) => [...prev, { role: 'bot', text: response.text() }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'error', text: 'API 호출 중 오류가 발생했습니다. API 키가 유효한지 확인해주세요.' }
      ]);
      // 에러 발생 시 키를 리셋할 기회 제공 (선택적)
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
                {isKeySaved && (
                  <button onClick={removeApiKey} className="text-xs text-red-500 hover:underline px-2">
                    (키 삭제)
                  </button>
                )}
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

            {/* 메인 영역 */}
            {!isKeySaved ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-blue-50 text-blue-700 p-4 rounded-lg mb-6 text-sm">
                  <p className="font-bold mb-2">Gemini API 키가 필요합니다</p>
                  <p>이 기능은 무료로 제공되는 Google Gemini API를 사용합니다.</p>
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noreferrer"
                    className="underline font-semibold mt-2 inline-block text-blue-600"
                  >
                    API 키 발급받기 (무료)
                  </a>
                </div>
                <form onSubmit={saveApiKey} className="w-full flex flex-col gap-3">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 text-white rounded-lg px-4 py-2 font-semibold transition-colors"
                  >
                    키 저장 및 시작
                  </button>
                  <p className="text-xs text-gray-400 mt-2">
                    입력하신 키는 브라우저 내부에만 안전하게 저장됩니다.
                  </p>
                </form>
              </div>
            ) : (
              <>
                {/* 메시지 영역 */}
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
                      {/* 간단한 줄바꿈 처리 */}
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
