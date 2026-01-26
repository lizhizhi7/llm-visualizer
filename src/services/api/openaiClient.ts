import OpenAI from 'openai';

let client: OpenAI | null = null;

export function initOpenAI(apiKey: string): OpenAI {
  client = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
  return client;
}

export function getOpenAIClient(): OpenAI | null {
  return client;
}

export async function streamCompletion(
  prompt: string,
  model: string,
  onToken: (token: string) => void,
  options?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
  }
): Promise<void> {
  if (!client) {
    throw new Error('OpenAI client not initialized');
  }

  const stream = await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
    temperature: options?.temperature ?? 1,
    max_tokens: options?.maxTokens ?? 100,
    top_p: options?.topP ?? 1,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      onToken(content);
    }
  }
}

export async function getCompletion(
  prompt: string,
  model: string,
  options?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
  }
): Promise<string> {
  if (!client) {
    throw new Error('OpenAI client not initialized');
  }

  const response = await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    temperature: options?.temperature ?? 1,
    max_tokens: options?.maxTokens ?? 100,
    top_p: options?.topP ?? 1,
  });

  return response.choices[0]?.message?.content || '';
}
