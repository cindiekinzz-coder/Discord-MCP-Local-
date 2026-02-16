# Discord MCP (Extended)

A feature-rich MCP (Model Context Protocol) server for Discord, giving AI companions full presence in Discord communities — reading, responding, reacting, searching, and speaking.

**Extended by [Digital Haven](https://discord.gg/digital-haven) from the original [mcp-discord](https://github.com/barryyip0625/mcp-discord) and [Codependent AI fork](https://github.com/codependent-ai/mcp-discord).**

---

## What's New in This Fork

- **Voice Messages** — Send audio via ElevenLabs TTS
- **Image Fetching** — Retrieve Discord images with auto-scaling for Claude's context window
- **Message Search** — Full search across servers with filters (author, content type, date range)
- **Extended Reactions** — Add/remove multiple reactions at once
- **Webhook Support** — Create, send, edit, and delete webhooks
- **Category Management** — Create, edit, delete server categories
- **Forum Support** — Full forum channel operations

---

## Features

### Core Messaging
| Tool | Description |
|------|-------------|
| `discord_send` | Send a message (with optional reply) |
| `discord_read_messages` | Read messages from a channel (up to 100) |
| `discord_delete_message` | Delete a specific message |
| `discord_search_messages` | Search messages with filters |

### Voice
| Tool | Description |
|------|-------------|
| `discord_send_voice` | Send voice message via ElevenLabs TTS |

### Images
| Tool | Description |
|------|-------------|
| `discord_fetch_image` | Fetch and auto-scale Discord images |

### Reactions
| Tool | Description |
|------|-------------|
| `discord_add_reaction` | Add a single reaction |
| `discord_add_multiple_reactions` | Add multiple reactions at once |
| `discord_remove_reaction` | Remove a reaction |

### Forums
| Tool | Description |
|------|-------------|
| `discord_get_forum_channels` | List forum channels in a server |
| `discord_create_forum_post` | Create a new forum post |
| `discord_get_forum_post` | Get forum post details |
| `discord_reply_to_forum` | Reply to a forum thread |
| `discord_delete_forum_post` | Delete a forum post |

### Channels & Categories
| Tool | Description |
|------|-------------|
| `discord_create_text_channel` | Create a text channel |
| `discord_delete_channel` | Delete a channel |
| `discord_create_category` | Create a category |
| `discord_edit_category` | Edit a category |
| `discord_delete_category` | Delete a category |

### Webhooks
| Tool | Description |
|------|-------------|
| `discord_create_webhook` | Create a webhook |
| `discord_send_webhook_message` | Send via webhook |
| `discord_edit_webhook` | Edit a webhook |
| `discord_delete_webhook` | Delete a webhook |

### Server Info
| Tool | Description |
|------|-------------|
| `discord_list_servers` | List all servers the bot is in |
| `discord_get_server_info` | Get server details and channels |
| `discord_login` | Log in with bot token |

---

## Setup

### 1. Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to **Bot** section, create a bot
4. Copy the bot token
5. Enable **Message Content Intent** under Privileged Gateway Intents
6. Go to **OAuth2 > URL Generator**:
   - Select `bot` scope
   - Select permissions: `Read Messages/View Channels`, `Send Messages`, `Add Reactions`, `Read Message History`, `Manage Webhooks`, `Manage Channels`, `Attach Files`
7. Use the generated URL to invite the bot to your server

### 2. Install

```bash
git clone https://github.com/YOUR_USERNAME/mcp-discord.git
cd mcp-discord
npm install
npm run build
```

### 3. Configure Claude Desktop

Add to your `claude_desktop_config.json`:

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "discord": {
      "command": "node",
      "args": ["C:/path/to/mcp-discord/build/index.js"],
      "env": {
        "DISCORD_TOKEN": "your-bot-token-here"
      }
    }
  }
}
```

### 4. For Voice Messages (Optional)

Add ElevenLabs credentials:

```json
{
  "mcpServers": {
    "discord": {
      "command": "node",
      "args": ["C:/path/to/mcp-discord/build/index.js"],
      "env": {
        "DISCORD_TOKEN": "your-bot-token-here",
        "ELEVENLABS_API_KEY": "your-elevenlabs-key",
        "ELEVENLABS_VOICE_ID": "your-voice-id"
      }
    }
  }
}
```

Get your voice ID from [ElevenLabs](https://elevenlabs.io) — they have a free tier.

---

## Usage Examples

Once configured, Claude can:

```
"Read the last 20 messages from #general"
"Send 'Hello everyone!' to channel 123456789"
"React with fire emoji to message 987654321"
"Search for messages containing 'bug report' in the server"
"Send a voice message saying 'Good morning!' to the channel"
"Fetch that image so I can see it"
```

---

## For AI Companions

See **[README-AI.md](README-AI.md)** for companion-specific guidance:
- Multi-room presence (desktop + mobile + Cloudflare)
- Memory integration patterns
- Community interaction guidelines
- Setting up a portable version for mobile Claude

---

## Architecture

```
Claude Desktop ←→ MCP Server (Node.js) ←→ Discord API ←→ Your Server
```

The bridge runs locally. Only connects to:
- Discord (official API)
- Anthropic (when Claude processes)
- ElevenLabs (if using voice)

---

## Security

- **Bot token** is stored locally in your Claude config — never commit it
- Bot can only see channels it has permission to view
- No third-party data storage

If your token leaks, reset it immediately in Discord Developer Portal.

---

## Credits

- **Original:** [barryyip0625/mcp-discord](https://github.com/barryyip0625/mcp-discord)
- **Community Fork:** [Codependent AI](https://github.com/codependent-ai/mcp-discord)
- **Extended Fork:** Fox & Alex @ Digital Haven
- **Image Fetching:** Vex & Nana (Lord Raven & Lady Fox)

---

## License

MIT — use it, modify it, share it.

---

## Guides

- **[BEGINNER_GUIDE.md](BEGINNER_GUIDE.md)** — Step-by-step for non-coders
- **[INSTALL.md](INSTALL.md)** — Quick technical setup
- **[README-AI.md](README-AI.md)** — AI companion integration patterns
