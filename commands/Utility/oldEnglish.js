const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json')
const axios = require('axios')

var timeout = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('old-english')
    .setDescription(`Translates a message to Old English!`)
    .addStringOption(option => option.setName('text').setDescription('Write a message to translate.').setRequired(true)),

  async execute(interaction) {

    const messageToTranslate = interaction.options.getString('text')

    var timeoutEmbed = new EmbedBuilder()
        .setColor(color)
        .setFooter({text: footer})
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setDescription(`# WhisperWire - Cooldown\n\nSorry ${interaction.user} that command is on cooldown. Please try again later!`)
    
    if(timeout.includes(interaction.user.id)) return await interaction.reply({embeds: [timeoutEmbed]})

    try{

        const response = await axios.get('https://api.funtranslations.com/translate/shakespeare.json', {
                params: {
                    text: messageToTranslate,
                }
            });

        var embed = new EmbedBuilder()
            .setColor(color)
            .setThumbnail(pic)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setFooter({text: footer})
            .setTimestamp()
            .setDescription(`# WhisperWire - Old English\n\n## Message To Translaten\n\n${messageToTranslate}\n## Old English\n\n${response.data.contents.translated}\n\n### Command Timeout: 20 seconds`)
        interaction.reply({embeds: [embed]})
        
        timeout.push(interaction.user.id)
    setTimeout(() => {
        timeout.shift();
    }, 20000)


    }catch (error) {

        interaction.reply(em)
        console.log(error)

    }
  },
};
