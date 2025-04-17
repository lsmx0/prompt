import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { optimizePrompt, DEFAULT_MODEL } from '../services/siliconFlowApi';

interface PromptOptimizerProps {
  inputPrompt?: string; // 添加输入提示词属性
}

const PromptOptimizer: React.FC<PromptOptimizerProps> = ({ inputPrompt: initialInputPrompt }) => {
  const [inputPrompt, setInputPrompt] = useState(initialInputPrompt || '');
  const [outputPrompt, setOutputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState('清晰');
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 当传入的initialInputPrompt改变时更新内部state
  useEffect(() => {
    if (initialInputPrompt) {
      setInputPrompt(initialInputPrompt);
    }
  }, [initialInputPrompt]);

  const modes = ['清晰', '创意', '专业', '简洁', '学术'];

  const handleOptimize = async () => {
    if (!inputPrompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 调用API优化提示词
      const optimizedPrompt = await optimizePrompt(
        inputPrompt,
        selectedMode
      );
      
      setOutputPrompt(optimizedPrompt);
    } catch (err) {
      console.error('优化提示词失败:', err);
      setError('API请求失败，请检查您的API密钥或网络连接');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputPrompt);
  };

  const selectMode = (mode: string) => {
    setSelectedMode(mode);
    setIsModeDropdownOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-semibold">输入提示词</h2>
            <div className="flex space-x-2">
              <div className="bg-slate-800 px-3 py-1 rounded-md flex items-center text-sm">
                <span className="text-primary-400">{DEFAULT_MODEL}</span>
              </div>
              <div className="relative">
                <button 
                  className="bg-slate-800 px-3 py-1 rounded-md flex items-center text-sm"
                  onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                >
                  {selectedMode}
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                {isModeDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-40 bg-slate-800 rounded-md shadow-lg z-10">
                    {modes.map(mode => (
                      <button
                        key={mode}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
                        onClick={() => selectMode(mode)}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="在这里输入您的提示词..."
            className="w-full h-64 bg-slate-800 rounded-lg p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={handleOptimize}
            disabled={isLoading || !inputPrompt.trim()}
            className={`mt-3 w-full py-2 rounded-md font-medium flex items-center justify-center ${
              isLoading || !inputPrompt.trim() ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                优化中...
              </>
            ) : (
              '优化提示词'
            )}
          </button>
          
          {error && (
            <div className="mt-2 text-red-500 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">优化结果</h2>
          <div className="relative">
            <textarea
              value={outputPrompt}
              readOnly
              className="w-full h-64 bg-slate-800 rounded-lg p-4 text-white resize-none focus:outline-none"
              placeholder="优化后的提示词将显示在这里..."
            />
            {outputPrompt && (
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 p-1 rounded"
                title="复制到剪贴板"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            )}
          </div>
          <div className="mt-3 text-sm text-slate-400">
            <p>优化提示：使用这些提示词可以更好地引导AI生成您期望的内容。</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">提示词优化技巧</h2>
        <ul className="space-y-2 text-slate-300">
          <li className="flex items-start">
            <span className="text-primary-400 mr-2">•</span>
            <span>使用清晰具体的描述，避免模糊的表述</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-400 mr-2">•</span>
            <span>指定您期望的回答格式和长度</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-400 mr-2">•</span>
            <span>提供相关背景信息和上下文</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-400 mr-2">•</span>
            <span>使用角色扮演来获得特定专业领域的回答</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-400 mr-2">•</span>
            <span>分步骤提问复杂问题，获得更好的结果</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PromptOptimizer; 