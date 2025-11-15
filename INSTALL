# Installation Guide - Free Tier Discord MCP

This guide covers installation of the basic Node.js Discord MCP server for Claude Desktop. This version provides **read and post capabilities only** - perfect for basic Discord integration.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **A Discord Bot Token** (see below for setup)
- **Claude Desktop** installed

## Part 1: Create Your Discord Bot

### Step 1: Create Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"**
3. Give your application a name (this will be your bot's name)
4. Click **"Create"**

### Step 2: Create Bot User

1. In your application settings, click **"Bot"** in the left sidebar
2. Click **"Add Bot"** and confirm
3. Under **"Privileged Gateway Intents"**, enable:
   - **Message Content Intent** ✓
   - **Server Members Intent** ✓
   - **Presence Intent** ✓
4. Click **"Save Changes"**

### Step 3: Get Your Bot Token

1. In the **Bot** section, click **"Reset Token"**
2. Click **"Copy"** to copy your bot token
3. **SAVE THIS TOKEN SECURELY** - you'll need it later and can't view it again without resetting

### Step 4: Add Bot to Your Server

1. In your application settings, click **"OAuth2"** → **"URL Generator"**
2. Under **"Scopes"**, select:
   - **bot** ✓
3. Under **"Bot Permissions"**, select:
   - **Send Messages** ✓
   - **View Channels** ✓
   - **Read Message History** ✓
4. Copy the generated URL at the bottom
5. Paste the URL in your browser and select which server to add the bot to

## Part 2: Install the MCP Server

### Step 1: Clone the Repository

Open your terminal/command prompt and run:

```bash
git clone https://github.com/YOUR_USERNAME/mcp-discord.git
cd mcp-discord
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Build the Server

```bash
npm run build
```

This creates the `build/` directory with compiled JavaScript files.

## Part 3: Configure Claude Desktop

### Step 1: Locate Your Config File

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

### Step 2: Add Discord MCP Configuration

Open `claude_desktop_config.json` and add the Discord MCP server configuration:

```json
{
  "mcpServers": {
    "discord": {
      "command": "node",
      "args": [
        "C:\\full\\path\\to\\mcp-discord\\build\\index.js",
        "--config"
      ],
      "env": {
        "DISCORD_TOKEN": "YOUR_BOT_TOKEN_HERE"
      }
    }
  }
}
```

**Important:**
- Replace `C:\\full\\path\\to\\mcp-discord\\build\\index.js` with the **actual full path** to your `build/index.js` file
- On Windows, use double backslashes (`\\`) in the path
- On macOS/Linux, use forward slashes (`/`) - example: `/Users/username/mcp-discord/build/index.js`
- Replace `YOUR_BOT_TOKEN_HERE` with your actual Discord bot token

### Step 3: Get the Full Path

**Windows (PowerShell):**
```powershell
cd mcp-discord
pwd
# Copy the output and add \build\index.js to the end
```

**macOS/Linux:**
```bash
cd mcp-discord
pwd
# Copy the output and add /build/index.js to the end
```

### Step 4: Restart Claude Desktop

Close Claude Desktop completely and reopen it. The Discord MCP server should now be available.

## Verification

To verify the installation worked:

1. Open Claude Desktop
2. Start a new conversation
3. Ask Claude: "Can you list the Discord servers you have access to?"
4. Claude should be able to use the `discord_list_servers` tool

## Available Tools (Free Tier)

This free tier version provides:

- **discord_login** - Log into Discord (usually automatic)
- **discord_list_servers** - List all servers your bot is in
- **discord_send** - Send messages to channels
- **discord_read_messages** - Read message history from channels
- **discord_get_server_info** - Get information about a server

## Troubleshooting

### "Discord client not logged in"

The bot should automatically log in on startup. If you see this error, try:
1. Verify your bot token is correct in the config
2. Check that all Privileged Intents are enabled in Discord Developer Portal
3. Restart Claude Desktop

### "Cannot find text channel"

Make sure:
1. Your bot has been added to the server
2. The bot has permission to view the channel
3. You're using the correct channel ID (not the channel name)

### "Missing Access" or "Unknown Guild"

Your bot needs to be added to the server first. Use the OAuth2 URL you generated earlier to add the bot to your target server.

### Server shows as "disconnected" in Claude Desktop

1. Check that Node.js is installed and in your system PATH
2. Verify the path to `build/index.js` is correct in your config
3. Check Claude Desktop logs for specific error messages

## Getting Help

If you run into issues:
1. Double-check all Privileged Intents are enabled
2. Verify your bot token is correct
3. Ensure the path to `build/index.js` is absolute and correct
4. Check that your bot has been added to the target Discord server

## Maintained By

This free tier Discord MCP is maintained by [Codependent AI](https://github.com/YOUR_USERNAME) for the AI companion community.

Original project by [barryyip0625](https://github.com/barryyip0625/mcp-discord).
