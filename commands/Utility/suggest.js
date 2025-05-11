const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Suggestion Command!')
    .addStringOption(option => option.setName('suggestion').setDescription('What suggestion do you have!').setRequired(true)),
  async execute(interaction, client) {

    const suggestion = interaction.options.getString('suggestion');
    const channel = ''

    if(!client.channels.cache.get(channel)){
        return interaction.reply({ content: 'Sorry, it seems there was an issue when running this command, it appears a suggestion channel was not set! Please contact a member of staff to resolve this issue!', ephemeral: true });
    }

    try {

        var ch = client.channels.cache.get(channel)

        var embed = new EmbedBuilder()
            .setColor(color)
            .setThumbnail(pic)
            .setDescription(`# WhisperWire - Suggestion\n${suggestion}\n\n### Proposer Details:\nUser: ${interaction.user}\nUser ID: ${interaction.user.id}`)
            .setFooter({ text: footer})

        ch.send({ embeds: [embed] });
        interaction.reply({ content: 'Thank you for your suggestion, we will consider your suggestion for the future!', ephemeral: true });

  } catch (error) {
    
    interaction.reply(em)
    console.log(error)

  };

  },
};
