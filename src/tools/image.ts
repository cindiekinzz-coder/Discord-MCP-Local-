import { ToolContext, ToolResponse } from "./types.js";

interface FetchImageArgs {
  url: string;
  maxSizeKB?: number;
}

// Fetch image with iterative scaling using Discord CDN's width parameter
async function fetchImageWithScaling(
  url: string,
  maxSizeKB: number = 50
): Promise<{ base64: string; width: number; mimeType: string }> {
  const maxSizeBytes = maxSizeKB * 1024;
  const isDiscordCDN = url.includes('cdn.discordapp.com') || url.includes('media.discordapp.net');
  const widths = [1024, 768, 576, 432, 324, 243, 200];

  for (const width of widths) {
    let fetchUrl = url;
    if (isDiscordCDN) {
      const urlObj = new URL(url);
      urlObj.searchParams.set('width', String(width));
      fetchUrl = urlObj.toString();
    }

    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || 'image/png';
    const arrayBuffer = await response.arrayBuffer();

    if (arrayBuffer.byteLength <= maxSizeBytes) {
      const uint8Array = new Uint8Array(arrayBuffer);
      const base64 = Buffer.from(uint8Array).toString('base64');
      return { base64, width, mimeType: contentType };
    }

    // If not Discord CDN, we can't resize further
    if (!isDiscordCDN) {
      throw new Error(`Image too large (${Math.round(arrayBuffer.byteLength / 1024)}KB) and URL doesn't support resizing`);
    }
  }

  throw new Error(`Could not scale image small enough for ${maxSizeKB}KB limit`);
}

export async function fetchImageHandler(
  args: unknown,
  context: ToolContext
): Promise<ToolResponse> {
  const { url, maxSizeKB = 50 } = args as FetchImageArgs;

  if (!url) {
    return {
      content: [{ type: "text", text: "Error: url is required" }],
      isError: true
    };
  }

  try {
    const result = await fetchImageWithScaling(url, maxSizeKB);

    return {
      content: [
        {
          type: "image",
          data: result.base64,
          mimeType: result.mimeType
        },
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            finalWidth: result.width,
            mimeType: result.mimeType,
            sizeKB: Math.round((result.base64.length * 0.75) / 1024)
          })
        }
      ]
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      content: [{ type: "text", text: `Error fetching image: ${errorMessage}` }],
      isError: true
    };
  }
}
