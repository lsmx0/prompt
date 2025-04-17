import React, { useEffect } from 'react';
import { ClockIcon, TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

interface HistoryItem {
  id: string;
  date: string;
  inputPrompt: string;
  outputPrompt: string;
  model?: string;
  mode?: string;
}

interface PromptHistoryProps {
  onSelectHistoryItem: (inputPrompt: string) => void;
}

const PromptHistory: React.FC<PromptHistoryProps> = ({ onSelectHistoryItem }) => {
  // 从localStorage加载历史记录
  const [historyItems, setHistoryItems] = React.useState<HistoryItem[]>([]);

  // 首次加载组件时从localStorage加载历史记录
  useEffect(() => {
    loadHistoryFromStorage();
  }, []);

  // 从localStorage加载历史记录
  const loadHistoryFromStorage = () => {
    try {
      const historyJson = localStorage.getItem('promptHistory');
      if (historyJson) {
        const history = JSON.parse(historyJson) as HistoryItem[];
        setHistoryItems(history);
      }
    } catch (error) {
      console.error('加载历史记录失败:', error);
    }
  };

  const handleDeleteItem = (id: string) => {
    const updatedHistory = historyItems.filter(item => item.id !== id);
    setHistoryItems(updatedHistory);
    
    // 保存更新后的历史记录到localStorage
    localStorage.setItem('promptHistory', JSON.stringify(updatedHistory));
  };

  const handleReuse = (inputPrompt: string) => {
    onSelectHistoryItem(inputPrompt);
  };

  const handleClearAll = () => {
    setHistoryItems([]);
    // 清空localStorage中的历史记录
    localStorage.removeItem('promptHistory');
  };

  if (historyItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-slate-800 rounded-lg">
        <ClockIcon className="h-12 w-12 text-slate-500 mb-4" />
        <p className="text-slate-400 text-lg">暂无历史记录</p>
        <p className="text-slate-500 text-sm mt-2">您的提示词优化历史将显示在这里</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">历史记录</h2>
        <button 
          className="text-slate-400 text-sm hover:text-slate-300 flex items-center"
          onClick={handleClearAll}
        >
          <TrashIcon className="h-4 w-4 mr-1" />
          清除全部
        </button>
      </div>
      
      <div className="space-y-4">
        {historyItems.map(item => (
          <div key={item.id} className="bg-slate-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-slate-400 text-sm flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {item.date}
                </span>
                {item.model && (
                  <div className="mt-1 flex items-center">
                    <span className="bg-slate-700 text-xs px-2 py-0.5 rounded-full text-primary-300">
                      {item.model}
                    </span>
                    {item.mode && (
                      <span className="bg-slate-700 text-xs px-2 py-0.5 rounded-full text-primary-300 ml-2">
                        {item.mode}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button 
                  className="text-slate-400 hover:text-primary-400 transition-colors"
                  title="重新使用此提示词"
                  onClick={() => handleReuse(item.inputPrompt)}
                >
                  <ArrowUturnLeftIcon className="h-5 w-5" />
                </button>
                <button 
                  className="text-slate-400 hover:text-red-400 transition-colors"
                  title="删除此记录"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="text-sm font-medium text-slate-300 mb-1">原始提示词：</h4>
              <p className="bg-slate-900 p-2 rounded text-sm">{item.inputPrompt}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-1">优化后：</h4>
              <p className="bg-slate-900 p-2 rounded text-sm whitespace-pre-line">{item.outputPrompt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptHistory; 