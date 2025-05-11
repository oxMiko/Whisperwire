const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json');
const axios = require('axios');

var timeout = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('compliment')
    .setDescription(`Sends a simple compliment message to a user!`)
    .addUserOption(option => option.setName('user').setDescription('Pick a user to compliment.').setRequired(true)),

  async execute(interaction) {

    const user = interaction.options.getUser('user');

    var timeoutEmbed = new EmbedBuilder()
        .setColor(color)
        .setFooter({text: footer})
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setDescription(`# WhisperWire - Cooldown\n\nSorry ${interaction.user} that command is on cooldown. Please try again later!`);
    
    if(timeout.includes(interaction.user.id)) return await interaction.reply({embeds: [timeoutEmbed]});

    const target = interaction.options.getMember('user');

    try {
        const response = await axios.get('https://www.affirmations.dev/');
        const compliment = response.data.affirmation;
        var channel = interaction.guild.channels.cache.get('');

        var embed = new EmbedBuilder()
            .setColor(color)
            .setThumbnail(pic)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setFooter({text: footer})
            .setTimestamp()
            .setDescription(`# WhisperWire - Compliment\n\n${user}\n${compliment}\n\n### Command Timeout: 20 seconds`);
            if(interaction.guild.id === ''){

              interaction.reply({content: 'Go to <#> to see message!',ephemeral: true })
              channel.send({embeds: [embed]})
    
            }else{
    
              interaction.reply({embeds:[embed]})
    
            }
        
        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, 20000);

    } catch (error) {
        interaction.reply(em);
        console.log(error);
    }
  },
};
