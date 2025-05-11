const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json')
const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('movie')
    .setDescription('Announce you are streaming a movie/series!'),
  async execute(interaction, client) {

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
      }

    if(interaction.guild.id !== ''){
      interaction.reply('Sorry. This command is not made for this server!')
    }

    try{
        
        const channel = client.channels.cache.get('1201297252736585871');

        var embed = new EmbedBuilder()
            .setColor(color)
            .setFooter({text: footer})
            .setThumbnail(pic)
            .setTimestamp()
            .setDescription(`# WhisperWire - Movie Alert\n\n<@&> make sure to join <#1224036095692636192> or <#1245088115027218623> as there is currently a movie / series being streamed! Please be quiet and respect everyone within the call!`)
        interaction.reply({content: 'Done!', ephemeral: true})
        await channel.send({embeds: [embed]})
        await channel.send('|| <@&> ||')

      
    }catch (error) {

        interaction.reply(em)
        console.log(error)

    }

  },
};
