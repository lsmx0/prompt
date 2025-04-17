import React, { useState } from 'react';
import { SparklesIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

// 导入组件
import PromptOptimizer from './components/PromptOptimizer';
import PromptTemplates from './components/PromptTemplates';
import PromptHistory from './components/PromptHistory';
import ApiSettings from './components/ApiSettings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('optimize');
  const [inputPrompt, setInputPrompt] = useState('');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSelectTemplate = (template: string) => {
    setInputPrompt(template);
    setActiveTab('optimize');
  };

  const handleSelectHistoryItem = (prompt: string) => {
    setInputPrompt(prompt);
    setActiveTab('optimize');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="h-6 w-6 text-primary-400" />
          <h1 className="text-2xl font-bold text-primary-400">AI提示词优化器</h1>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => handleTabChange('optimize')}
            className={`px-3 py-1 rounded-md ${activeTab === 'optimize' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
          >
            优化
          </button>
          <button 
            onClick={() => handleTabChange('templates')}
            className={`px-3 py-1 rounded-md ${activeTab === 'templates' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
          >
            模板
          </button>
          <button 
            onClick={() => handleTabChange('history')}
            className={`px-3 py-1 rounded-md ${activeTab === 'history' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
          >
            历史
          </button>
          <button 
            onClick={() => handleTabChange('settings')}
            className={`px-3 py-1 rounded-md ${activeTab === 'settings' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
            title="API设置"
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 max-w-5xl">
        {activeTab === 'optimize' && <PromptOptimizer inputPrompt={inputPrompt} />}
        {activeTab === 'templates' && <PromptTemplates onSelectTemplate={handleSelectTemplate} />}
        {activeTab === 'history' && <PromptHistory onSelectHistoryItem={handleSelectHistoryItem} />}
        {activeTab === 'settings' && <ApiSettings />}
      </main>

      <footer className="bg-slate-800 py-4 px-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} AI提示词优化器 | 使用先进的人工智能技术优化您的提示词</p>
        <p className="mt-1 text-xs">
          <a 
            href="https://docs.siliconflow.cn/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-400 hover:underline"
          >
            SiliconFlow API
          </a> 提供技术支持
        </p>
      </footer>
    </div>
  );
};

export default App;
