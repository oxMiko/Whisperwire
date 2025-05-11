const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json')
var timeout = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something!')
    .addStringOption(option => option.setName('message').setDescription('What do you want the bot to say?').setRequired(true)),
  async execute(interaction, client) {

    const sayMessage = interaction.options.getString('message');

    try{
        
        var timeoutEmbed = new EmbedBuilder()
        .setColor(color)
        .setFooter({text: footer})
        .setTimestamp()
        .setDescription(`# WhisperWire - Cooldown\n\nSorry ${interaction.user} that command is on cooldown. Please try again later!`)
    
        if(timeout.includes(interaction.user.id)) return await interaction.reply({embeds: [timeoutEmbed]})

        timeout.push(interaction.user.id)
        setTimeout(() => {
            timeout.shift();
        }, 20000)
            
        await interaction.reply({content: 'Command has been executed! This command has been logged so please ensure you follow the rules!\n### Command Timeout: 20 seconds!', ephemeral: true})
        await interaction.channel.send(sayMessage)
    
        var logEmbed = new EmbedBuilder()
        	.setColor(color)
        	.setThumbnail(pic)
        	.setFooter({text: footer})
        	.setDescription(`User: ${interaction.user} | ${interaction.user.id}\nGuild: ${interaction.guild.name} | ${interaction.guild.id}\nChannel: ${interaction.channel.name} | ${interaction.channel.id}\nMessage:\n${sayMessage}\n\nTimestamp: ${new Date()}`)
        
        client.channels.cache.get('').send({embeds: [logEmbed]})

    }catch (error) {

        interaction.reply(em)
        console.log(error)

    }

  },
};
