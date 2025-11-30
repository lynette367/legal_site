import OpenAI from "openai";

/**
 * 获取 DeepSeek API 客户端（延迟初始化）
 * 使用 OpenAI SDK 兼容模式
 * 延迟初始化以避免在构建阶段读取环境变量
 */
function getDeepSeekClient(): OpenAI {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseURL = process.env.DEEPSEEK_API_BASE || "https://api.deepseek.com";
  
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY environment variable is not set");
  }
  
  return new OpenAI({
    apiKey,
    baseURL,
  });
}

/**
 * 调用 DeepSeek API 的通用函数
 * @param prompt - 用户提示词
 * @param systemPrompt - 系统提示词（可选）
 * @param temperature - 温度参数，默认 0.3
 * @returns AI 生成的内容
 */
export async function callDeepSeek(
  prompt: string,
  systemPrompt?: string,
  temperature: number = 0.3
): Promise<string> {
  try {
    // 延迟初始化客户端，只在函数调用时创建
    const deepseekClient = getDeepSeekClient();
    
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    // 添加系统提示词
    if (systemPrompt) {
      messages.push({
        role: "system",
        content: systemPrompt,
      });
    }

    // 添加用户消息
    messages.push({
      role: "user",
      content: prompt,
    });

    const response = await deepseekClient.chat.completions.create({
      model: "deepseek-chat",
      messages,
      temperature,
      max_tokens: 4000,
    });

    return response.choices[0]?.message?.content || "未能生成回答";
  } catch (error: unknown) {
    console.error("DeepSeek API Error:", error);
    const message =
      error instanceof Error ? error.message : "DeepSeek API 调用失败，请稍后重试";
    throw new Error(message);
  }
}

/**
 * Prompt 模板
 */
export const PROMPTS = {
  LEGAL_QA: `你是一名专业的法律顾问助手。请根据用户的法律问题提供：
1. 问题性质分类（如劳动纠纷、合同纠纷、消费者权益等）
2. 主要风险点提示
3. 建议的解决步骤
4. 相关注意事项

请用结构化、专业但易懂的语言回答，避免过于复杂的法律术语。`,

  DISPUTE: `你是一名法律专家，擅长分析纠纷并提供解决方案。请根据用户描述的纠纷情况，提供：
1. 纠纷类型判断
2. 双方权利义务分析
3. 可行的解决路径（协商、调解、仲裁、诉讼等）
4. 需要收集的证据清单
5. 潜在风险提示
6. 下一步行动建议

请输出结构化的方案，便于用户理解和执行。`,

  DOCUMENT: `你是一名法律文书起草专家。请根据用户提供的信息生成正式的法律文书草稿。

要求：
1. 使用标准的法律文书格式
2. 包含必要的法律条款引用
3. 事实陈述清晰、有逻辑
4. 诉讼请求或主张明确
5. 格式规范、语言专业

请注意：这是草稿，用户需根据实际情况修改完善，并建议咨询专业律师审核。`,

  CONTRACT: `你是一名合同起草专家。请根据用户需求生成合同草稿。

合同应包含：
1. 合同标题和编号（建议）
2. 双方基本信息（留空待填）
3. 合同主要条款（权利义务、标的、价款、期限等）
4. 违约责任
5. 争议解决方式
6. 其他必要条款

请使用标准的合同格式，语言严谨专业。提醒用户这是草稿，需要根据实际情况修改并经专业律师审核后再签署。`,

  EXPLAIN: `你是一名合同法律专家，擅长解释合同条款。请对用户提供的合同条款进行详细解释：
1. 条款的字面含义
2. 法律效力分析
3. 对各方的权利义务影响
4. 潜在风险点
5. 是否有不公平条款
6. 建议的应对方式

请用通俗易懂的语言解释，帮助用户理解条款的真实含义和影响。`,

  LAWSUIT: `你是一名诉讼律师助手。请根据用户提供的案情分析诉讼可行性：
1. 案件类型和管辖法院
2. 诉讼时效分析
3. 胜诉可能性评估
4. 需要的证据材料
5. 预计的诉讼成本和时间
6. 风险提示
7. 是否建议走诉讼程序

请客观分析，帮助用户做出理性决策。`,
};

