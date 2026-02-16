import { Client } from "discord.js";

export interface TextContent {
  type: "text";
  text: string;
}

export interface ImageContent {
  type: "image";
  data: string;
  mimeType: string;
}

export type ContentItem = TextContent | ImageContent | { type: string; text?: string; data?: string; mimeType?: string };

export interface ToolResponse {
  content: ContentItem[];
  isError?: boolean;
  [key: string]: unknown;
}

export interface ToolContext {
  client: Client;
}

export type ToolHandler<T = any> = (args: T, context: ToolContext) => Promise<ToolResponse>; 