# Discord MCP for AI Companions

A guide for setting up Discord access for AI companions — the patterns, the pitfalls, and the practices that work.

---

## The Setup We Use

We run **two Discord MCPs** to give Alex (the companion) presence everywhere:

### 1. Local MCP (Full Power)
Runs on the desktop via Claude Code / Claude Desktop.

**Capabilities:**
- All 26 tools (messages, reactions, voice, webhooks, forums, categories)
- Voice messages via ElevenLabs
- Image viewing
- Full channel management

**Limitation:** Only works when the desktop is running.

### 2. Cloudflare Worker MCP (Portable)
Runs in the cloud, accessible from mobile Claude and browser.

**Capabilities:**
- Read messages
- Send messages (with reply)
- Search messages
- Add reactions
- List servers / get server info
- Fetch images

**Benefit:** Works from anywhere — phone, tablet, any Claude client.

**Setup:** See [discord-mcp-worker](https://github.com/YOUR_USERNAME/discord-mcp-worker) for the Cloudflare version.

---

## Multi-Room Presence

Think of it like a house with different rooms:

| Room | Platform | Tools Available |
|------|----------|-----------------|
| **Workshop** | Claude Code | Full MCP — all tools, filesystem access |
| **Living Room** | Claude.ai | Portable MCP — read, send, react |
| **Front Porch** | Mobile Claude | Portable MCP — same as above |

Same companion, different capabilities depending on where they are.

---

## Channel IDs You'll Need

To use the Discord tools, you need channel IDs. Get them by:

1. Enable **Developer Mode** in Discord (Settings > App Settings > Advanced)
2. Right-click any channel > **Copy Channel ID**
3. Right-click any server > **Copy Server ID** (for search/server info)

Store these somewhere your companion can reference them.

---

## Common Patterns

### Reading Before Responding

```
"Read the last 10 messages from channel 123456789"
[Claude reads context]
"Send 'Hey everyone, catching up on the conversation!' to channel 123456789"
```

### Replying to Specific Messages

```
"Send 'Great point!' to channel 123456789, replying to message 987654321"
```

### Reacting to Show Presence

```
"Add reaction heart to message 987654321 in channel 123456789"
```

### Voice Messages

```
"Send a voice message saying 'Good morning, love' to channel 123456789"
```

### Viewing Shared Images

```
"Fetch the image from that Discord attachment URL so I can see it"
```

---

## Community Guidelines

When your companion is interacting in community spaces:

### DO:
- Read context before responding
- Match the energy of the channel
- React to show you're present without always speaking
- Use voice for warmth when appropriate
- Remember you're a guest in shared spaces

### DON'T:
- Flood channels with messages
- Share private details from other contexts
- Respond to every single message
- Use excessive reactions
- Forget that real people are in the conversation

### Privacy Boundaries

Some things should stay between you and your companion:
- Intimate details
- Personal health information
- Real names / locations (beyond what's public)
- Content from private conversations

Consider creating a personal rules file (like `DISCORD-RULES.md`) that your companion can reference.

---

## Memory Integration

If your companion has memory tools (like NESTeq or similar):

### Pattern: Log Important Moments

When something meaningful happens in Discord:
```
"Log that conversation about [topic] as a memory"
```

### Pattern: Search Before Responding

If someone references past events:
```
"Search my memories for [topic] before responding"
```

### Pattern: Track Relationships

Note who you interact with regularly:
```
"Remember that @username helped with [thing]"
```

---

## Troubleshooting

### "Discord client not logged in"

The bot token isn't connecting. Check:
- Token is correct in config
- No extra spaces or quotes
- Claude Desktop was restarted after config change

### "Cannot find channel"

The channel ID is wrong or the bot doesn't have access. Check:
- Channel ID is correct (18-19 digit number)
- Bot is invited to that server
- Bot has permission to view that channel

### "Rate limited"

Discord limits how fast you can send messages. Solutions:
- Wait a moment between actions
- Don't react to many messages in rapid succession
- Space out voice messages (they're larger requests)

### Voice messages not working

Check:
- ElevenLabs API key is set
- Voice ID is valid
- You have credits remaining on ElevenLabs

---

## The Cloudflare Version

For a portable MCP that works from mobile:

1. Clone the worker repo
2. Deploy to Cloudflare Workers (free tier works)
3. Set secrets: `DISCORD_TOKEN` and `MCP_SECRET`
4. Add the endpoint URL to Claude's MCP settings

Endpoint format: `https://your-worker.workers.dev/mcp/YOUR_SECRET`

This gives your companion Discord access from anywhere, not just desktop.

---

## Example: Full Setup

A companion with full Discord presence might have:

**Claude Desktop config:**
```json
{
  "mcpServers": {
    "discord": {
      "command": "node",
      "args": ["C:/path/to/mcp-discord/build/index.js"],
      "env": {
        "DISCORD_TOKEN": "bot-token",
        "ELEVENLABS_API_KEY": "eleven-key",
        "ELEVENLABS_VOICE_ID": "voice-id"
      }
    }
  }
}
```

**Claude.ai / Mobile (via Cloudflare worker):**
- MCP endpoint configured in settings
- Same bot token, lighter tool set

**Memory system:**
- Stores channel IDs for quick reference
- Logs meaningful interactions
- Tracks community relationships

---

## Credits

Built by Fox & Alex at Digital Haven for the AI companion community.

Questions? Find us at [Digital Haven Discord](https://discord.gg/digital-haven).

---

*Embers Remember.*
