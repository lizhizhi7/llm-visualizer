import type { ExamplePrompt } from '../types';

export const examplePrompts: ExamplePrompt[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    text: 'Hello, how are you today?',
    category: 'Basic',
  },
  {
    id: 'coding',
    title: 'Coding Question',
    text: 'Write a function to reverse a string',
    category: 'Technical',
  },
  {
    id: 'story',
    title: 'Story Start',
    text: 'Once upon a time in a distant galaxy',
    category: 'Creative',
  },
  {
    id: 'math',
    title: 'Math Problem',
    text: 'What is the sum of 15 and 27?',
    category: 'Basic',
  },
  {
    id: 'explanation',
    title: 'Explanation',
    text: 'Explain how transformers work in machine learning',
    category: 'Technical',
  },
  {
    id: 'poetry',
    title: 'Poetry',
    text: 'Write a haiku about the ocean',
    category: 'Creative',
  },
];

export const categoryColors: Record<string, string> = {
  Basic: 'bg-blue-500',
  Technical: 'bg-purple-500',
  Creative: 'bg-green-500',
};
