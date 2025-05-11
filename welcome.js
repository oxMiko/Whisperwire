const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('./config.json')

module.exports = (client) => {
  client.on('guildMemberAdd', async member => {
    if(member.guild.id !== ''){
      return;
    }
    try {

      var channel = member.guild.channels.cache.get('')

      var embed = new EmbedBuilder()
        .setColor(color)
        .setFooter({ text: footer })
        .setThumbnail(member.displayAvatarURL())
        .setDescription(`# ♡ WhisperWire Welcomer ♡\n\nWelcome ♡ ${member.user} ♡ to the server! We hope you enjoy your stay!`)
        .addFields(
            {name: 'Rules:', value: `Make sure to read the rules in <#>`},
            {name: 'Verify', value: 'Make sure to verify yourself in <#> to be able to have access to all other channels!'},
            {name: 'Roles:', value: 'Make sure to get your desired roles in <#>\nThese roles will allow you to see different channels based on games you like!'},
            {name: '\u200b', value: '***REMINDER THIS IS AN 18 + SERVER***'}
        )

      channel.send({ embeds: [embed] })

    } catch (error) {
      console.log(error)
    }
  })
}