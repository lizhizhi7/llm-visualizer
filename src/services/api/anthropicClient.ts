import Anthropic from '@anthropic-ai/sdk';

let client: Anthropic | null = null;

export function initAnthropic(apiKey: string): Anthropic {
  client = new Anthropic({
    apiKey,
  });
  return client;
}

export function getAnthropicClient(): Anthropic | null {
  return client;
}

export async function streamMessage(
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
    throw new Error('Anthropic client not initialized');
  }

  const stream = client.messages.stream({
    model,
    max_tokens: options?.maxTokens ?? 100,
    messages: [{ role: 'user', content: prompt }],
    temperature: options?.temperature ?? 1,
    top_p: options?.topP ?? 1,
  });

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      onToken(event.delta.text);
    }
  }
}

export async function getMessage(
  prompt: string,
  model: string,
  options?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
  }
): Promise<string> {
  if (!client) {
    throw new Error('Anthropic client not initialized');
  }

  const response = await client.messages.create({
    model,
    max_tokens: options?.maxTokens ?? 100,
    messages: [{ role: 'user', content: prompt }],
    temperature: options?.temperature ?? 1,
    top_p: options?.topP ?? 1,
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return textBlock?.type === 'text' ? textBlock.text : '';
}
