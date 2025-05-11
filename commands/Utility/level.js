const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { color, footer, pic, e, em } = require('../../config.json');
const { User } = require('../../database.js');
const LE = ''

module.exports = {
  data: new SlashCommandBuilder()
    .setName('level')
    .setDescription('Displays a users level!')
    .addUserOption(option => option.setName('user').setDescription('Select a user you wish to find the level of')),

  async execute(interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    const userId = target.id;
    const guildId = interaction.guild.id;

    try {
      let user = await User.findOne({ guildId, userId });

      if (!user) {
        return interaction.reply({ content: `No data found for ${target.tag}.`, ephemeral: true });
      }

      const level = user.level || 0;
      const xp = user.xp || 0;
      const xpNeeded = level * 750 + 750; 
      const prestige = user.prestige || 'Stone'; 

      const embed = new EmbedBuilder()
        .setDescription(`# ${LE} ${target.tag}'s Level`)
        .setColor(
          user.prestige === 'Champion' ? '#8E44AD' :
          user.prestige === 'Warden' ? '#27AE60' :
          user.prestige === 'Vanguard' ? '#F39C12' :
          user.prestige === 'Explorer' ? '#5DADE2' : '#1d1e21' 
        )
        .setFooter({ text: footer })
        .setThumbnail(target.displayAvatarURL())
        .setTimestamp()
        .addFields(
          { name: 'Level', value: `**Level ${level}**`, inline: true },
          { name: 'XP', value: `**${xp}/${xpNeeded} XP**`, inline: true },
          { name: 'Prestige', value: `**${prestige}**`, inline: true }
        );

      await interaction.reply({ embeds: [embed] });

      console.log(`Command: Level | User: ${interaction.user.tag} / ${interaction.user.id} | Guild: ${interaction.guild.name} / ${interaction.guild.id}`);
    } catch (error) {
      console.error(error);
      interaction.reply({ content: e, ephemeral: true });
    }
  },
};
