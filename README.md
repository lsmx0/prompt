# AI提示词优化器

AI提示词优化器是一个现代化的Web应用，帮助用户优化与人工智能大模型交互的提示词。通过该应用，用户可以轻松创建、优化和管理高质量的提示词，以获得更好的AI回复效果。

![AI提示词优化器](public/screenshot.png)

## 功能特点

- 🚀 **提示词优化**：根据不同场景优化您的提示词，使其更加清晰、专业或创意
- 📚 **预设模板**：提供多种预设模板，涵盖不同使用场景
- 📝 **历史记录**：保存您的优化记录，方便重复使用
- 🔄 **AI模型选择**：支持多种AI模型，针对不同模型优化提示词
- 📱 **响应式设计**：在各种设备上都有良好的使用体验
- 🌐 **SiliconFlow API集成**：使用先进的大模型API进行提示词优化

## 技术栈

- React + TypeScript
- Tailwind CSS
- Headless UI
- Heroicons
- SiliconFlow API

## 快速开始

### 配置环境变量

在项目根目录创建`.env`文件（或复制`.env.example`），并设置以下变量：

```bash
# SiliconFlow API配置
REACT_APP_SILICONFLOW_API_KEY=your_api_key_here
```

您需要从SiliconFlow获取API密钥，并替换上述`your_api_key_here`。

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

这将在 [http://localhost:3000](http://localhost:3000) 启动应用。

### 构建生产版本

```bash
npm run build
```

## 使用指南

1. 在"优化"标签页的文本框中输入您的原始提示词
2. 选择目标AI模型和优化模式
3. 点击"优化提示词"按钮
4. 复制优化后的提示词使用
5. 您还可以通过"模板"标签页使用预设模板
6. 所有历史记录将保存在"历史"标签页中

## API配置说明

本应用使用SiliconFlow API进行提示词优化。以下是支持的主要模型：

- Qwen/QwQ-32B（默认）
- THUDM/GLM-4-9B-0414
- Qwen/Qwen2.5-7B-Instruct
- deepseek-ai/DeepSeek-R1
- TeleAI/TeleChat2

更多模型详情请参考[SiliconFlow API文档](https://docs.siliconflow.cn/cn/api-reference/chat-completions/chat-completions)。

## 贡献

欢迎对项目进行贡献！请随时提交问题或拉取请求。

## 许可证

MIT
