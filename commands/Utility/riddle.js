const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { color, footer, pic, em } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('riddle')
    .setDescription('Sends a riddle!')
    .addStringOption(option => option.setName('riddle').setDescription('What is the riddle?').setRequired(true))
    .addStringOption(option => option.setName('answer').setDescription('What is the answer to the riddle?').setRequired(true)),
  async execute(interaction) {
    
    const riddle = interaction.options.getString('riddle')
    const answer = interaction.options.getString('answer')
    
    if (interaction.member.id != '') {
      return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
    }
    
    try {
    
      const embed = new EmbedBuilder()
        .setColor(color)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFooter({ text: footer })
        .setTimestamp()
        .setDescription(`# Beerus - Riddle of the Day\n\n${riddle}`);

      await interaction.reply({ embeds: [embed] });
      await interaction.followUp('-# Riddle answer will be told in 10 minutes!')
      setTimeout(() => {
        interaction.followUp({ content: `## Riddle of the day answer: ${answer}` });
      }, 600000);


    } catch (error) {
      console.error(error);

      const errorEmbed = new EmbedBuilder()
        .setColor(color)
        .setFooter({ text: footer })
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setDescription(`# WhisperWire - Error\n\nSorry ${interaction.user}, there was an error fetching the riddle. Please try again later.`);

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};
