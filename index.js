const Discord = require('discord.js')
const { Client, GatewayIntentBits, EmbedBuilder, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { color, footer, em, token, pic } = require('./config.json')

const client = new Discord.Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildInvites, GatewayIntentBits.MessageContent, ]
  })

// ----------------------------------------------------------------------------------- \\

const welcome = require('./welcome.js')
const level = require('./level.js')
const axios = require('axios')

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  welcome(client)
  level(client)
    
  client.user.setPresence({
  activities: [{ name: `Your personal assistant!`, type: ActivityType.Streaming, url: '' }],
  status: 'streaming',
  });
});

// ----------------------------------------------------------------------------------- \\
// ------------------------------------- MongoDB ------------------------------------- \\
// ----------------------------------------------------------------------------------- \\

const mongoose = require('mongoose');

const uri = '';

async function connectDB() {
    try {
       await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
       console.log('Connected to MongoDB');
   } catch (err) {
     console.error('Failed to connect to MongoDB', err);
  }
}

client.once('ready', async () => {
    await connectDB();
});

// ----------------------------------------------------------------------------------- \\
// ------------------------------Command Handler-------------------------------------- \\
// ----------------------------------------------------------------------------------- \\

client.commands = new Collection();
const commands = [];

const loadCommands = (dir) => {
    const commandFiles = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of commandFiles) {
        if (file.isDirectory()) {
            loadCommands(`${dir}/${file.name}`);
        } else if (file.name.endsWith('.js')) {
            const command = require(`${dir}/${file.name}`);
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }
    }
};

loadCommands('./commands');

const rest = new REST({ version: '9' }).setToken(token);

client.once('ready', () => {

    rest.put(Routes.applicationCommands(client.user.id), { body: commands })
        .then(() => console.log('Registered slash commands!'))
        .catch(console.error);

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: em, ephemeral: true });
    }
});

// ------------------------------------------------------------------- \\
// ------------------------------------------------------------------- \\
// ------------------------------------------------------------------- \\

const { MessageCount, Giveaway } = require('./database.js'); // Ensure this path is correct based on your project structure

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const guildId = message.guild.id;
  const userId = message.author.id;

  // Find the user and update their message count
  let userMessageCount = await MessageCount.findOne({ guildId, userId });

  if (!userMessageCount) {
    // If the user doesn't have a record, create one
    userMessageCount = new MessageCount({ guildId, userId, count: 1 });
  } else {
    // Otherwise, increment their message count
    userMessageCount.count += 1;
    console.log(`${message.author.username} ${userMessageCount}`)
  }

  await userMessageCount.save();
});

// ------------------------------------------------------------------- \\
// ------------------------------------------------------------------- \\
// ------------------------------------------------------------------- \\

async function getAIResponse(prompt) {
  try {
      const response = await fetch("https://api.cloudflare.com/client/v4/accounts/???/ai/run/@hf/google/gemma-7b-it", {
          method: "POST",
          headers: {
              "Authorization": "Bearer ???",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt: prompt })
      });

      const data = await response.json();

      if (data.result && data.result.response) {
          return data.result.response.trim();
      } else {
          return "Sorry, I couldn't generate a response.";
      }
  } catch (error) {
      console.error("Error getting AI response:", error);
      return "Sorry, I encountered an error.";
  }
}


client.on('messageCreate', async (message) => {
    if (message.author.bot) return; 

    const isMentioned = message.mentions.has(client.user);
    const isInSpecificChannel = message.channel.id === '???';

    if (isMentioned || isInSpecificChannel) {
        try {
            await message.channel.sendTyping(); 

            const content = message.content.replace(/<@!?(\d+)>/g, '').trim(); 
            if (!content) return;

            const aiResponse = await getAIResponse(content); 

            if (aiResponse.length <= 2000) {
                await message.reply(aiResponse); 
            } else {
                const chunks = aiResponse.match(/.{1,2000}/g) || []; 
                for (const chunk of chunks) { 
                    await message.channel.send(chunk); 
                } 
            } 
        } catch (error) { 
            console.error('Error processing message:', error); 
            message.reply('Sorry, I had trouble generating a response.'); 
        }
    }
}); 

//

const { startBot } = require('./botLogic');
startBot(client);

client.login(token);