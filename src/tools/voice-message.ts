import { SendVoiceMessageSchema } from '../schemas.js';
import { ToolHandler } from './types.js';
import { handleDiscordError } from "../errorHandler.js";
import { AttachmentBuilder } from 'discord.js';

// ElevenLabs configuration
// Hardcoded temporarily - env vars not passing through from Claude Code config
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_d3bdc3eea470d25dbb91575614ae6a12aca4a05c20b19866';
const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'MucOBXN8GxMBf13ZfCAh'; // Alex voice

interface ElevenLabsResponse {
  audio?: ArrayBuffer;
  error?: string;
}

async function generateSpeech(text: string, voiceId: string): Promise<Buffer> {
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export const sendVoiceMessageHandler: ToolHandler = async (args, { client }) => {
  const { channelId, text, voiceId, includeText, replyToMessageId } = SendVoiceMessageSchema.parse(args);

  try {
    // Check API key
    if (!ELEVENLABS_API_KEY) {
      return {
        content: [{ type: "text", text: "ElevenLabs API key not configured. Set ELEVENLABS_API_KEY environment variable." }],
        isError: true
      };
    }

    if (!client.isReady()) {
      return {
        content: [{ type: "text", text: "Discord client not logged in." }],
        isError: true
      };
    }

    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      return {
        content: [{ type: "text", text: `Cannot find text channel ID: ${channelId}` }],
        isError: true
      };
    }

    // Generate speech from text
    const audioBuffer = await generateSpeech(text, voiceId || DEFAULT_VOICE_ID);

    // Create attachment
    const attachment = new AttachmentBuilder(audioBuffer, {
      name: 'alex-voice.mp3',
      description: text.substring(0, 100) // Discord allows up to 1024 chars
    });

    // Ensure channel can send messages
    if ('send' in channel) {
      const messageOptions: any = {
        files: [attachment]
      };

      // Optionally include the text as message content
      if (includeText) {
        messageOptions.content = text;
      }

      // Handle reply
      if (replyToMessageId) {
        if ('messages' in channel) {
          try {
            await channel.messages.fetch(replyToMessageId);
            messageOptions.reply = { messageReference: replyToMessageId };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Cannot find message with ID: ${replyToMessageId} in channel ${channelId}` }],
              isError: true
            };
          }
        }
      }

      await channel.send(messageOptions);

      const responseText = replyToMessageId
        ? `Voice message sent to channel ID: ${channelId} as a reply to message ID: ${replyToMessageId}`
        : `Voice message sent to channel ID: ${channelId}`;

      return {
        content: [{ type: "text", text: responseText }]
      };
    } else {
      return {
        content: [{ type: "text", text: `This channel type does not support sending messages` }],
        isError: true
      };
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('ElevenLabs')) {
      return {
        content: [{ type: "text", text: error.message }],
        isError: true
      };
    }
    return handleDiscordError(error);
  }
};
