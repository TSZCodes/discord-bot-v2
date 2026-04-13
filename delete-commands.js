const { REST, Routes } = require('discord.js');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const clientId = '888073036618690560';

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log('Fetching global commands...');

    // 1. Get all current commands
    const commands = await rest.get(Routes.applicationCommands(clientId));

    if (commands.length === 0) {
      console.log('No commands found to delete.');
      return;
    }

    console.log(`Found ${commands.length} commands. Deleting them individually...`);

    // 2. Loop through and delete each one by its specific ID
    for (const command of commands) {
      try {
        await rest.delete(Routes.applicationCommand(clientId, command.id));
        console.log(`✅ Deleted command: ${command.name}`);
      } catch (err) {
        // If it hits the Entry Point command, it might still complain, but the rest will be deleted!
        console.log(`❌ Failed to delete ${command.name}: ${err.message}`);
      }
    }

    console.log('Cleanup routine finished!');
  } catch (error) {
    console.error('Error fetching commands:', error);
  }
})();
