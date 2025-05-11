const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json')
const axios = require('axios')

var timeout = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fact')
    .setDescription(`Sends a random fact!`),

  async execute(interaction) {

    var timeoutEmbed = new EmbedBuilder()
        .setColor(color)
        .setFooter({text: footer})
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setDescription(`# WhisperWire - Cooldown\n\nSorry ${interaction.user} that command is on cooldown. Please try again later!`)
    
    if(timeout.includes(interaction.user.id)) return await interaction.reply({embeds: [timeoutEmbed]})
    
    timeout.push(interaction.user.id)
    setTimeout(() => {
        timeout.shift();
    }, 20000)

    const target = interaction.options.getMember('user');

    try{

        const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        const fact = response.data.text;

        var embed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(pic)
            .setFooter({text: footer})
            .setTimestamp()
            .setDescription(`# WhisperWire - Random Fact\n\n${fact}\n\n### Command Timeout: 20 seconds`)
        interaction.reply({embeds:[embed]})
        await interaction.channel.send('-# ➼ Make sure to check out [BDB Development](https://discord.gg/cHNGGB6R4d)')


    }catch (error) {

        interaction.reply(em)
        console.log(error)

    }
  },
};
