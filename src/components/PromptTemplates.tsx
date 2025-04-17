import React from 'react';
import { DocumentTextIcon, CodeBracketIcon, AcademicCapIcon, PencilIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

interface TemplateCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div 
      className="bg-slate-800 rounded-lg p-5 hover:bg-slate-700 cursor-pointer transition-colors duration-200 flex items-start space-x-4"
      onClick={onClick}
    >
      <div className="text-primary-400 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

interface PromptTemplatesProps {
  onSelectTemplate: (template: string) => void;
}

const PromptTemplates: React.FC<PromptTemplatesProps> = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 'professional',
      title: '专业分析报告',
      description: '生成针对特定主题的详细专业分析报告',
      icon: <DocumentTextIcon className="h-6 w-6" />,
      prompt: '请针对[主题]提供一份详细的专业分析报告。报告应包括：\n1. 当前形势概述\n2. 关键趋势分析\n3. 存在的主要挑战\n4. 未来发展预测\n5. 建议的应对策略\n\n请确保分析深入、全面，引用相关数据和研究支持您的观点。'
    },
    {
      id: 'content',
      title: '内容创作助手',
      description: '帮助创作各类内容，包括文章、故事、脚本等',
      icon: <PencilIcon className="h-6 w-6" />,
      prompt: '请帮我创作一篇关于[主题]的[文章/故事/脚本]。内容应该具有以下特点：\n1. 吸引人的开头\n2. 流畅的结构\n3. 生动的描述\n4. 引人入胜的情节发展\n5. 有意义的结尾\n\n风格应该是[风格类型]，适合[目标受众]阅读。大约[字数]字。'
    },
    {
      id: 'programming',
      title: '编程辅助',
      description: '协助编写、调试和优化代码的提示模板',
      icon: <CodeBracketIcon className="h-6 w-6" />,
      prompt: '我正在使用[编程语言]开发一个[项目/功能]。我需要实现以下功能：\n\n[功能描述]\n\n请提供实现此功能的代码，包括：\n1. 清晰的代码结构\n2. 必要的注释\n3. 高效的算法\n4. 潜在错误的处理方法\n\n代码应遵循[编程语言]的最佳实践和设计模式。'
    },
    {
      id: 'education',
      title: '学习辅导',
      description: '为学习各种主题提供解释和辅导的模板',
      icon: <AcademicCapIcon className="h-6 w-6" />,
      prompt: '请以一位经验丰富的[学科]教师的身份，为[教育水平]的学生解释[概念/主题]。\n\n解释应包含：\n1. 简明易懂的定义\n2. 关键原理的详细说明\n3. 生活中的实际应用例子\n4. 相关概念的联系\n5. 常见误解的澄清\n\n请使用简单的语言，并提供类比来帮助理解复杂概念。'
    },
    {
      id: 'conversation',
      title: '对话场景',
      description: '模拟各种对话场景，如面试、辩论等',
      icon: <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />,
      prompt: '请模拟一次关于[主题]的[面试/辩论/讨论]。\n\n你将扮演[角色1]，我将扮演[角色2]。\n\n场景设定：\n[详细描述场景背景和条件]\n\n请开始第一轮对话，并根据我的回应继续对话。确保对话符合情境，态度专业，信息准确，并展示[特定特质或技能]。'
    },
    {
      id: 'business',
      title: '商业方案',
      description: '帮助制定商业计划、营销策略等商业文档',
      icon: <DocumentTextIcon className="h-6 w-6" />,
      prompt: '请为一家[行业类型]的[初创/成熟]公司制定[商业计划/营销策略/市场分析]。\n\n公司基本情况：\n[公司描述]\n\n目标：\n[商业目标]\n\n文档应包括：\n1. 执行摘要\n2. 市场分析\n3. 竞争对手分析\n4. 策略详情\n5. 实施时间表\n6. 预算考量\n7. 预期效果和评估方法\n\n请确保提案专业、实用且基于数据驱动的见解。'
    }
  ];

  const handleTemplateClick = (template: typeof templates[0]) => {
    onSelectTemplate(template.prompt);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">提示词模板</h2>
      <p className="text-slate-300 mb-6">
        选择一个预设模板，快速创建高质量的AI提示词。点击模板将其加载到编辑器中进行自定义。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(template => (
          <TemplateCard 
            key={template.id}
            title={template.title}
            description={template.description}
            icon={template.icon}
            onClick={() => handleTemplateClick(template)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromptTemplates; 