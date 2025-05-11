const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, em } = require('../../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with the latency!'),
  async execute(interaction) {

    try {

      const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
      const timeDiff = (sent.createdTimestamp - interaction.createdTimestamp);

      var embed = new EmbedBuilder()
        .setColor(color)
        .setThumbnail(pic)
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`# WhisperWire - Ping\n\nThe current latency is ${timeDiff}ms`)
        .setFooter({ text: footer})
        .setTimestamp()

      interaction.channel.send({ embeds: [embed] });


  } catch (error) {
    
    interaction.reply(em)
    console.log(error)

  };

  },
};
