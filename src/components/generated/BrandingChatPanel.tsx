import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, MessageSquare } from 'lucide-react';
import { sendMessageToBrandingAI, BrandingContext } from './brandingAiConfig';
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};
type BrandingChatPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  brandingContext: BrandingContext;
};
export const BrandingChatPanel: React.FC<BrandingChatPanelProps> = ({
  isOpen,
  onClose,
  brandingContext
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `Welcome to Branding Connoisseur AI. I've been trained to help you understand your Branding Score™ and sharpen your brand.

Your score: **${brandingContext.totalScore}/100** – **${brandingContext.tier}** tier.

Tell me about your brand in one sentence and I'll show you what to fix first.`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, brandingContext]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, isThinking]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);
    try {
      // Call the AI function (currently mocked, will be replaced with real API)
      const aiResponse = await sendMessageToBrandingAI(userMessage.content, brandingContext);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message to AI:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };
  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting for bold text
    return content.split('**').map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold">{part}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };
  if (!isOpen) return null;
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" />

          {/* Chat Panel */}
          <motion.div initial={{
        x: '100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '100%'
      }} transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300
      }} className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Branding Connoisseur AI</h2>
                  <p className="text-xs text-neutral-300">AI Assistant</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Close chat">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-neutral-50">
              {messages.map(message => <motion.div key={message.id} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.2
          }} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === 'user' ? 'bg-neutral-900 text-white ml-auto' : 'bg-white text-neutral-900 border border-neutral-200'}`}>
                    {message.role === 'assistant' && <div className="text-xs font-semibold text-neutral-500 mb-1">
                        Branding Connoisseur AI
                      </div>}
                    <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
                      {formatMessageContent(message.content)}
                    </div>
                  </div>
                </motion.div>)}

              {/* Thinking Indicator */}
              {isThinking && <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} className="flex justify-start">
                  <div className="bg-white text-neutral-900 border border-neutral-200 rounded-2xl px-4 py-3 max-w-[85%]">
                    <div className="text-xs font-semibold text-neutral-500 mb-1">
                      Branding Connoisseur AI
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </motion.div>}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-neutral-200 bg-white px-6 py-4">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input ref={inputRef} type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Ask anything about your brand, your score, or your next steps…" disabled={isThinking} className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 transition-colors disabled:bg-neutral-50 disabled:text-neutral-400" />
                <button type="submit" disabled={!inputValue.trim() || isThinking} className="bg-neutral-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" aria-label="Send message">
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="text-xs text-neutral-500 mt-3">
                This is an AI assistant. Responses are generated by AI and should be reviewed by a professional.
              </p>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};