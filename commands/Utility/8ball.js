const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json')
const axios = require('axios')

var timeout = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription(`Ask a question to the 8ball!`)
    .addStringOption(option => option.setName('question').setDescription('Ask a question.').setRequired(true)),

  async execute(interaction) {

    const question = interaction.options.getString('question')

    var timeoutEmbed = new EmbedBuilder()
        .setColor(color)
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setFooter({text: footer})
        .setTimestamp()
        .setDescription(`# WhisperWire - Cooldown\n\nSorry ${interaction.user} that command is on cooldown. Please try again later!`)
    
    if(timeout.includes(interaction.user.id)) return await interaction.reply({embeds: [timeoutEmbed]})
    
    timeout.push(interaction.user.id)
    setTimeout(() => {
        timeout.shift();
    }, 20000)

    try{

        const responses = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes, definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful."
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];


        var embed = new EmbedBuilder()
            .setColor(color)
            .setThumbnail(pic)
            .setFooter({text: footer})
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setDescription(`# WhisperWire - 8ball\n\n${interaction.user}\n${response}\n\n### Command Timeout: 20 seconds`)
        interaction.reply({embeds:[embed]})
        await interaction.channel.send('-# ➼ Make sure to check out [BDB Development](https://discord.gg/cHNGGB6R4d)')


    }catch (error) {

        interaction.reply(em)
        console.log(error)

    }
  },
};
