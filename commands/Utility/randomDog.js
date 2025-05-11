const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json')
const axios = require('axios');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('random-dog')
    .setDescription('Generate a random dog image!'),

  async execute(interaction) {
    try {
      const response = await axios.get('https://random.dog/woof.json');
      const dogImageUrl = response.data.url;

      const embed = new EmbedBuilder()
      	.setDescription(`# WhisperWire - Random Dog\n## Requested by: ${interaction.user.username}\n\n*This could take a couple of minutes due to api's being slow*`)
        .setColor(color)
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setImage(dogImageUrl)
        .setThumbnail(pic)

      interaction.reply({ embeds: [embed] });
      await interaction.channel.send('-# ➼ Make sure to check out [BDB Development](https://discord.gg/cHNGGB6R4d)')
    } catch (error) {
      console.error(error);
    }
  },
};
