const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, footer, pic, e, em } = require('./config.json');
const { User } = require('./database.js');

module.exports = (client) => {
  client.on('messageCreate', async message => {
    if (!message.author.bot) {
      xp(message);
    }

    async function xp(message) {
      if (!message.author.bot) {
        const guildId = message.guild.id;
        const userId = message.author.id;

        let user = await User.findOne({ guildId, userId });
        if (!user) {
          user = new User({ guildId, userId });
        }

        const powerLevel = user.xpMultiplier || 1;
        const rand = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
        const randint = rand * powerLevel;

        user.xp += randint;

        const level = user.level;
        const xpNeeded = level * 750 + 750;

        if (xpNeeded <= user.xp) {
          user.level += 1;
          user.xp -= xpNeeded;

          if (user.level >= 20) {
            user.prestige = 'Champion';
            user.xpMultiplier = 2.5;
          } else if (user.level >= 15) {
            user.prestige = 'Warden';
            user.xpMultiplier = 2.25;
          } else if (user.level >= 10) {
            user.prestige = 'Vanguard';
            user.xpMultiplier = 2;
          } else if (user.level >= 5) {
            user.prestige = 'Explorer';
            user.xpMultiplier = 1.75;
          } else {
            user.prestige = 'Initiate';
          }

          const embed = new EmbedBuilder()
            .setColor(user.prestige === 'Champion' ? '#8E44AD' :
              user.prestige === 'Warden' ? '#27AE60' :
              user.prestige === 'Vanguard' ? '#F39C12' :
              user.prestige === 'Explorer' ? '#5DADE2' : '#1d1e21')
            .setFooter({ text: footer })
            .setThumbnail(pic)
            .setTimestamp()
            .setDescription(`# 🏅 WhisperWire - Levelled Up!\n\nCongrats ${message.author}, you have levelled up!`)
            .addFields(
              { name: 'New Level:', value: `Level ${user.level}`, inline: true },
              { name: 'Current XP:', value: `${user.xp}/${xpNeeded}XP`, inline: true },
              { name: 'Rank:', value: `${user.prestige}`, inline: true }
            );

          message.channel.send({ embeds: [embed] });
        }

        await user.save();
      }
    }
  });
};
