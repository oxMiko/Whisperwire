const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { color, footer, pic, em } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays all information about the bot'),
  async execute(interaction) {
    try {
      const embed = new EmbedBuilder()
        .setDescription('# WhisperWire - Help Centre')
        .setColor(color)
        .setThumbnail(pic)
        .setFooter({ text: footer })
        .addFields(
          { name: 'Page 1:', value: 'Regular Permission Commands 1' },
          { name: 'Page 2:', value: 'Regular Permission Commands 2' },
          { name: 'Page 3:', value: 'Regular Permission Commands 3' }
        );

      const embed2 = new EmbedBuilder()
        .setDescription('# WhisperWire - Regular Commands 1')
        .setColor(color)
        .setThumbnail(pic)
        .setFooter({ text: footer })
        .addFields(
          { name: '\u200b', value: '**/8ball**\n Ask the 8ball a question!' },
          { name: '\u200b', value: '**/bully <user>**\n Sends a random bully message about a user!' },
          { name: '\u200b', value: '**/champions** *Coming Soon*\n Lists the top 5 champions based on coins gained from tournaments!' },
          { name: '\u200b', value: '**/compliment <user>**\n Sends a random compliment message about a user!' },
          { name: '\u200b', value: '**/dadJoke**\n Generates a random dad joke!' },
          { name: '\u200b', value: '**/fact**\n Generates a random fact!' },
          { name: '\u200b', value: '**/fortune**\n Generates a random fortune!' }
        );

      const embed3 = new EmbedBuilder()
        .setDescription('# WhisperWire - Regular Commands 2')
        .setColor(color)
        .setThumbnail(pic)
        .setFooter({ text: footer })
        .addFields(
          { name: '\u200b', value: '**/help**\n Sends this message' },
          { name: '\u200b', value: '**/kick <user>**\n Sends a random gif of kicking a user!' },
          { name: '\u200b', value: '**/leaderboard**\n Displays the server leaderboard!' },
          { name: '\u200b', value: '**/level**\n Shows your current level!' },
          { name: '\u200b', value: '**/oldEnglish <text>**\n Converts text into Old English style!' },
          { name: '\u200b', value: `**/ping**\n Displays the bot's latency!` }
        );

      const embed4 = new EmbedBuilder()
        .setDescription('# WhisperWire - Regular Commands 3')
        .setColor(color)
        .setThumbnail(pic)
        .setFooter({ text: footer })
        .addFields(
          { name: '\u200b', value: '**/randomCat**\n Generates a random cat image!' },
          { name: '\u200b', value: '**/randomDog**\n Generates a random dog image!' },
          { name: '\u200b', value: '**/say <message>**\n Makes the bot say anything you want. [This is logged]' },
          { name: '\u200b', value: '**/slap <user>**\n Sends a random gif of slapping a user!' },
          { name: '\u200b', value: `**/socials**\n Sends a message of all owner's social media links` },
          { name: '\u200b', value: '**/suggest <suggestion>**\n Submits a suggestion to the staff team!' }
        );

      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('page1')
            .setLabel('Page 1')
            .setEmoji('1️⃣')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('page2')
            .setLabel('Page 2')
            .setEmoji('2️⃣')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('page3')
            .setLabel('Page 3')
            .setEmoji('3️⃣')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('home')
            .setLabel('Home')
            .setEmoji('🏠')
            .setStyle(ButtonStyle.Success)
        );

      const message = await interaction.reply({ embeds: [embed], components: [button] });
      const collector = message.createMessageComponentCollector();

      collector.on('collect', async i => {
        if (i.customId === 'page1') {
          await i.update({ embeds: [embed2], components: [button] });
        } else if (i.customId === 'page2') {
          await i.update({ embeds: [embed3], components: [button] });
        } else if (i.customId === 'page3') {
          await i.update({ embeds: [embed4], components: [button] });
        } else if (i.customId === 'home') {
          await i.update({ embeds: [embed], components: [button] });
        }
      });
    } catch (error) {
      interaction.reply(em);
      console.log(error);
    }
  },
};