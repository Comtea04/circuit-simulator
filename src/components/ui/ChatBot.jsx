import { useState } from 'react';

// AI 챗봇 껍데기(모달 틀). 실제 AI 연동은 후순위 — 지금은 버튼 + 모달 UI + 입력 폼까지만.
// 나중에 handleSend 안에서 API 호출로 답변을 채우면 됨.
const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: '안녕하세요! 이 회로에 대해 궁금한 점을 물어보세요. (AI 연동 준비 중)' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    // TODO: 여기서 AI API를 호출해 답변을 받아오도록 연동 (현재는 임시 안내 메시지)
    setMessages((prev) => [
      ...prev,
      { role: 'user', text },
      { role: 'bot', text: 'AI 연동 준비 중이에요. 곧 답변할 수 있게 될 거예요!' },
    ]);
    setInput('');
  };

  return (
    <>
      {/* 우측 패널에서 노출하는 챗봇 열기 버튼 */}
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
            className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="font-bold text-gray-800">🤖 AI 학습 도우미</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                aria-label="닫기"
              >
                ×
              </button>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm rounded-lg px-3 py-2 max-w-[80%] ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white self-end'
                      : 'bg-gray-100 text-gray-700 self-start'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* 입력 폼 */}
            <form onSubmit={handleSend} className="flex gap-2 p-3 border-t">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="질문을 입력하세요..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 text-sm font-semibold transition-colors"
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
