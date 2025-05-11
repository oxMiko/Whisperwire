const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick someone!')
    .addUserOption(option => option.setName('user').setDescription('The user you want to kick!').setRequired(true)),

  async execute(interaction) {
    try {

        const targetUser = interaction.options.getMember('user');

        const kicks = [
            "https://i.pinimg.com/originals/3f/44/1b/3f441ba8a891512172fa1861af7dbedc.gif",
            "https://64.media.tumblr.com/a43e29dc80cbff3fb3455f76487b8988/c1ea0adedd1ed223-b2/s540x810/d34d531f0790f40668409edd090af0f1335127ae.gif",
            "https://i.gifer.com/J80.gif",
            "https://38.media.tumblr.com/ccfb562515974aafd5e879b75439ff18/tumblr_nece2jUD3p1tsd042o1_500.gif",
            "https://64.media.tumblr.com/99d57002b5a279c3a221c9abbc7d492d/tumblr_oxrobh5z2c1svpgkio6_500.gif",
            "https://lh3.googleusercontent.com/proxy/mRw7awRDOXy4unKRMI1CiQLv6jrKwNUkvm8fWBXeS8qw0ehwDu8XREFSW1xB2GM2uANpy2MWK2MZNzQPs1MXO6K6XzxQ1pqIdekJEpzavY9sJNqqtbXlBNthdlW6-SN80zfsSB8Oqgx-wBsoLqnonVDl",
            "https://64.media.tumblr.com/8906c084b9b1feac0bfbb758f31efcdd/4d2ad77351917378-40/s500x750/e3b3383bf97a528f529ae2a26ec790c3e8cd9c04.gifv",
            "https://media1.tenor.com/m/WXJF2QatHA4AAAAC/anime-ouch.gif",
            "https://media1.tenor.com/m/5JmSgyYNVO0AAAAC/asdf-movie.gif",
        ];
        
        const randomIndex = Math.floor(Math.random() * kicks.length);
        
        var embed = new EmbedBuilder()
          .setDescription(`# WhisperWire - Kick Interaction\n\n## ${targetUser} you have been kicked by: ${interaction.user}`)
          .setColor(color)
          .setThumbnail(pic)
          .setTimestamp()
          .setImage(kicks[randomIndex])
          .setFooter({text: footer})
        
        await interaction.reply({ content: `You have kicked ${targetUser}`, ephemeral: true})
        await interaction.channel.send(`|| ${targetUser} & ${interaction.user} ||`)
        await interaction.channel.send({embeds: [embed]})


    }catch (error){

    }
  }
}