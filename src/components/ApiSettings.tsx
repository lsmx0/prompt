import React, { useState, useEffect } from 'react';
import { KeyIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const ApiSettings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [testStatus, setTestStatus] = useState<'none' | 'loading' | 'success' | 'error'>('none');
  const [testMessage, setTestMessage] = useState('');

  // 从localStorage加载API密钥
  useEffect(() => {
    const savedApiKey = localStorage.getItem('siliconFlowApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsSaved(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('siliconFlowApiKey', apiKey.trim());
      setIsSaved(true);

      // 成功保存后，可以显示提示消息或进行其他操作
      // 这里可以添加通知组件来显示"API密钥已保存"的消息
    }
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setTestStatus('error');
      setTestMessage('请先输入API密钥');
      return;
    }

    setTestStatus('loading');
    setTestMessage('正在测试连接...');

    try {
      // 发送测试请求到SiliconFlow API
      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'Qwen/QwQ-32B',
          messages: [
            { role: 'user', content: 'Hello' }
          ],
          max_tokens: 5
        })
      });

      if (response.ok) {
        setTestStatus('success');
        setTestMessage('连接成功！API密钥有效。');
      } else {
        const errorData = await response.json();
        setTestStatus('error');
        setTestMessage(`连接失败: ${errorData.error?.message || '未知错误'}`);
      }
    } catch (error) {
      setTestStatus('error');
      setTestMessage(`连接失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <KeyIcon className="h-6 w-6 mr-2 text-primary-400" />
          API设置
        </h2>

        <div className="mb-6">
          <p className="text-slate-300 mb-2">
            设置您的SiliconFlow API密钥，以便应用能够连接到大模型服务。如果您还没有API密钥，请访问
            <a 
              href="https://docs.siliconflow.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:underline ml-1"
            >
              SiliconFlow官网
            </a>
            获取。
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-slate-300 mb-1">
              API密钥
            </label>
            <div className="flex">
              <input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                className="flex-1 bg-slate-900 rounded-l-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleSaveApiKey}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md"
              >
                保存
              </button>
            </div>
            {isSaved && (
              <p className="text-green-500 text-sm mt-1 flex items-center">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                API密钥已保存到本地存储
              </p>
            )}
          </div>

          <div>
            <button
              onClick={handleTestConnection}
              disabled={testStatus === 'loading'}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md w-full"
            >
              {testStatus === 'loading' ? '测试中...' : '测试API连接'}
            </button>

            {testStatus !== 'none' && (
              <div className={`mt-2 text-sm flex items-center ${
                testStatus === 'success' ? 'text-green-500' : 
                testStatus === 'error' ? 'text-red-500' : 'text-slate-400'
              }`}>
                {testStatus === 'success' ? (
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                ) : testStatus === 'error' ? (
                  <XCircleIcon className="h-4 w-4 mr-1" />
                ) : null}
                {testMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">API使用说明</h3>
        
        <div className="space-y-3 text-slate-300 text-sm">
          <p>
            本应用使用SiliconFlow API进行提示词优化，该API提供多种大语言模型供选择。
          </p>
          
          <p>
            <strong className="text-primary-300">API密钥安全提示：</strong> 您的API密钥仅保存在浏览器的本地存储中，不会发送到任何第三方服务器。
            但请注意，本地存储不是绝对安全的，请勿在共享设备上保存您的API密钥。
          </p>
          
          <p>
            <strong className="text-primary-300">使用限制：</strong> 根据您的SiliconFlow账户类型，可能存在API调用频率和数量的限制。
            请查阅SiliconFlow的官方文档了解详情。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings; 