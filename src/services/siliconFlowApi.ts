// SiliconFlow API 服务
// 基于 https://docs.siliconflow.cn/cn/api-reference/chat-completions/chat-completions

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  stream?: boolean;
  max_tokens?: number;
  stop?: string | string[] | null;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  frequency_penalty?: number;
  n?: number;
  response_format?: {
    type: string;
  };
}

interface ToolCall {
  id: string;
  type: string;
  function: {
    name: string;
    arguments: string;
  };
}

interface ChatCompletionResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
      reasoning_content?: string;
      tool_calls?: ToolCall[];
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  created: number;
  model: string;
  object: string;
}

// 获取API密钥，优先从localStorage获取，其次从环境变量
const getApiKey = (): string => {
  const localStorageKey = localStorage.getItem('siliconFlowApiKey');
  if (localStorageKey) {
    return localStorageKey;
  }
  
  return process.env.REACT_APP_SILICONFLOW_API_KEY || '';
};

// 固定使用的模型名称
export const DEFAULT_MODEL = 'Qwen/QwQ-32B';

/**
 * 发送请求到SiliconFlow API
 * @param prompt 用户输入的提示词
 * @param mode 优化模式
 * @returns 优化后的提示词
 */
export async function optimizePrompt(
  prompt: string,
  mode: string
): Promise<string> {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error('未设置API密钥，请在设置页面配置API密钥');
    }
    
    // 构建系统消息，根据不同的优化模式
    let systemMessage = '你是一个专业的AI提示词优化专家。';
    
    switch (mode) {
      case '清晰':
        systemMessage += '请帮我优化以下提示词，使其更加清晰、详细，能得到具体的回答。';
        break;
      case '创意':
        systemMessage += '请帮我优化以下提示词，使其更有创意，能激发AI生成独特的、富有想象力的回答。';
        break;
      case '专业':
        systemMessage += '请帮我优化以下提示词，使其更加专业，包含领域术语和专业表述，以获得学术性或行业性的回答。';
        break;
      case '简洁':
        systemMessage += '请帮我优化以下提示词，使其更加简洁明了，直接表达核心需求，避免冗余文字。';
        break;
      case '学术':
        systemMessage += '请帮我优化以下提示词，使其符合学术论文的风格，包含研究问题、方法论等学术元素。';
        break;
      default:
        systemMessage += '请帮我优化以下提示词，提高其质量和效果。';
    }
    
    // 准备请求
    const request: ChatCompletionRequest = {
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: `原始提示词：${prompt}\n\n请只返回优化后的提示词，不需要任何解释。` }
      ],
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      frequency_penalty: 0.5,
      n: 1,
      response_format: {
        type: 'text'
      }
    };
    
    // 发送API请求
    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API请求失败: ${response.status} ${errorText}`);
    }
    
    const data = await response.json() as ChatCompletionResponse;
    
    // 记录到历史记录
    saveToHistory(prompt, data.choices[0].message.content, DEFAULT_MODEL, mode);
    
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('提示词优化出错:', error);
    throw error;
  }
}

/**
 * 保存到历史记录
 */
function saveToHistory(
  inputPrompt: string, 
  outputPrompt: string, 
  model: string, 
  mode: string
): void {
  try {
    // 从localStorage获取现有历史记录
    const historyJson = localStorage.getItem('promptHistory') || '[]';
    const history = JSON.parse(historyJson) as Array<{
      id: string;
      date: string;
      inputPrompt: string;
      outputPrompt: string;
      model?: string;
      mode?: string;
    }>;
    
    // 创建新的历史记录项
    const newHistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      inputPrompt,
      outputPrompt,
      model,
      mode
    };
    
    // 将新记录添加到历史记录的开头
    history.unshift(newHistoryItem);
    
    // 限制历史记录数量为最新的20条
    const limitedHistory = history.slice(0, 20);
    
    // 保存回localStorage
    localStorage.setItem('promptHistory', JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('保存历史记录出错:', error);
  }
} 