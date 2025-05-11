const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('Slap someone!')
    .addUserOption(option => option.setName('user').setDescription('The user you want to slap!').setRequired(true)),

  async execute(interaction) {
    try {

        const targetUser = interaction.options.getMember('user');

        const slaps = [
          "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmowdG9zZHlhdzE2ZThhb3hoeTJuNHlrd2MwMXZzdWwyOHJudHlxcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/k1uYB5LvlBZqU/giphy.gif",
          "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzg2ZWxiZ3hoZzUyaHRsMmE0NzhuMm5iajZwcmsydjIxN2w2czhocCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUNd9HZq1itMkiK652/giphy.gif",
          "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGV5OXJ0b3BrYWV6bjByamJvOWRwaTJxNjlvOXh2a24wNjBtc3o5eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Gf3AUz3eBNbTW/giphy.gif",
          "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMW9ubWk2ZHB2bmhhcWtsNGdyNHkzbmhmaWxpc3BjZ2hrNnZjYXRkZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EONkCBe2XNky48CyUq/giphy.gif",
          "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXBsb2p3eW4xYzczYmdzbnkxczVhdG45aTB3eWtldDczNTg0cWhnMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WvzGVdiVRNq8qtWPKu/giphy.gif",
          "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2xxdTI1NTVjMHE1ajZlOWJjMjFmZGhhdXY2eGh3eHg2dzhvOGwyMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tX29X2Dx3sAXS/giphy.gif",
          "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExejA1emczeGNrbXE0MHZhNTI4N3Q1cnQyN3JvdWl6NTh0ZHpwOGtzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OQ7phVSLg3xio/giphy.gif",
          "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTAybGgwanU4OGgwNjU2NTFhbmdmZTV0ejB2YWQ1dzRyYmhrOHlyZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6Fad0loHc6Cbe/giphy.gif",
          "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzdncTBwZnhoZGU2bG1kMTF0ZWNqM2k0c2U5YmQ2a2JlOXVoOG5keSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/52e690K0r2O4w/giphy.gif",
          "https://i.pinimg.com/originals/7c/20/89/7c2089abf87dc52deb4179a6835088b6.gif",
          "https://i.pinimg.com/originals/fe/39/cf/fe39cfc3be04e3cbd7ffdcabb2e1837b.gif",
          "https://media1.tenor.com/m/L0fsdBYmh_wAAAAC/kokoro-connect-slap-anime.gif",
          "https://media1.tenor.com/m/MrhME3n9Z2UAAAAC/dungeong.gif"
        ];
        
        const randomIndex = Math.floor(Math.random() * slaps.length);
        
        var embed = new EmbedBuilder()
          .setDescription(`# WhisperWire - Slap Interaction\n\n## ${targetUser} you have been slapped by: ${interaction.user}`)
          .setColor(color)
          .setThumbnail(pic)
          .setTimestamp()
          .setImage(slaps[randomIndex])
          .setFooter({text: footer})
        
        await interaction.reply({ content: `You have slapped ${targetUser}`, ephemeral: true})
        await interaction.channel.send(`|| ${targetUser} & ${interaction.user} ||`)
        await interaction.channel.send({embeds: [embed]})

    }catch (error){

    }
  }
}