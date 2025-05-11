const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json')
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random-cat')
    .setDescription('Generate a random cat image!'),

  async execute(interaction) {
    try {

      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      const catImageUrl = response.data[0].url;

      const embed = new EmbedBuilder()
      	.setDescription(`# WhisperWire - Random Cat\n## Requested by: ${interaction.user.username}\n\n*This could take a couple of minutes due to api's being slow*`)
        .setColor(color)
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setImage(catImageUrl)
        .setThumbnail(pic)

      interaction.reply({ embeds: [embed] });
      await interaction.channel.send('-# ➼ Make sure to check out [BDB Development](https://discord.gg/cHNGGB6R4d)')
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while fetching the meme. Please try again later.');
    }
  },
};
