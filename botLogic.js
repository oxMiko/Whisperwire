const axios = require('axios');
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, PermissionsBitField } = require('discord.js');
const {footer, pic} = require('./config.json')

const channelId = '';
const messageId = '';
const serverIp = '';

const roleMentions = new Collection();

async function checkServerStatus() {
    try {
        const response = await axios.get(`https://api.mcsrvstat.us/2/${serverIp}`);
        if (response.data.online) {
            return {
                status: '🟢 Online',
                playersOnline: response.data.players.online || 0,
                maxPlayers: response.data.players.max || 0,
                version: response.data.version || 'Unknown',
                motd: response.data.motd.clean.join('\n') || 'No MOTD',
                playerList: response.data.players.list || []
            };
        } else {
            return {
                status: '🔴 Offline',
                playersOnline: 0,
                maxPlayers: 0,
                version: 'N/A',
                motd: 'Server is Offline',
                playerList: []
            };
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        return {
            status: '🔴 Offline',
            playersOnline: 0,
            maxPlayers: 0,
            version: 'N/A',
            motd: 'Server is Offline',
            playerList: []
        };
    }
}

async function updateMessage(client) {
    const channel = client.channels.cache.get(channelId);
    if (!channel) {
        console.error('Channel not found!');
        return;
    }

    setInterval(async () => {
        const serverInfo = await checkServerStatus();

        const updatedEmbed = new EmbedBuilder()
            .setColor(serverInfo.status === '🟢 Online' ? 0x00FF00 : 0xFF0000)
            .setDescription(`# Minecraft Server Status\n\nCurrent status: **${serverInfo.status}**\n\n### Server IP: ${serverIp}\n### Version: ${serverInfo.version}\n### MOTD: \n${serverInfo.motd}`)
            .addFields(
                { name: 'Players Online', value: `${serverInfo.playersOnline}/${serverInfo.maxPlayers}`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: footer })
            .setThumbnail(pic);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('showPlayers')
                    .setLabel('Show Online Players')
                    .setStyle(ButtonStyle.Primary)
            );

        try {
            const message = await channel.messages.fetch(messageId);
            if (message) {
                await message.edit({ embeds: [updatedEmbed], components: [row] });
            } else {
                console.error('Message not found!');
            }
        } catch (error) {
            console.error('Error editing the message:', error);
        }
    }, 30000);
}

async function handleInteraction(interaction) {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'showPlayers') {
        const serverInfo = await checkServerStatus();
        const playersMessage = serverInfo.playersOnline > 0
            ? `Players currently online:\n- ${serverInfo.playerList.join('\n- ')}`
            : 'No players are currently online.';

        try {
            await interaction.reply({ content: playersMessage, ephemeral: true });
        } catch (error) {
            console.error('Error sending the ephemeral message:', error);
            await interaction.reply({ content: 'There was an error showing the player list. Please try again.', ephemeral: true });
        }
    }
}

async function handleRoleMentionSpam(message) {
    if (message.author.bot || !message.mentions.roles.size) return;

    const mentionedRoles = message.mentions.roles;
    const authorId = message.author.id;
    const currentTimestamp = Date.now();

    const member = message.guild.members.cache.get(authorId);

    if (member && member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return;
    }

    const TIME_LIMIT = 5 * 60 * 1000;
    const MENTION_LIMIT = 4;

    mentionedRoles.forEach(async (role) => {
        if (!roleMentions.has(role.id)) {
            roleMentions.set(role.id, new Collection());
        }

        const roleMentionedUsers = roleMentions.get(role.id);

        if (!roleMentionedUsers.has(authorId)) {
            roleMentionedUsers.set(authorId, []);
        }

        const userMentions = roleMentionedUsers.get(authorId);
        userMentions.push(currentTimestamp);

        const recentMentions = userMentions.filter((timestamp) => currentTimestamp - timestamp < TIME_LIMIT);

        roleMentionedUsers.set(authorId, recentMentions);

        if (recentMentions.length > MENTION_LIMIT) {
            if (member) {
                try {
                    await member.timeout(20 * 60 * 1000, `Spammed role ${role.name} too many times.`);
                    message.channel.send(`${member} has been timed out for spamming the role ${role.name}.`);
                } catch (err) {
                    console.error(`Failed to timeout ${member.displayName}:`, err);
                }
            }
        }
    });
}

async function startBot(client) {
    client.once('ready', () => {
        console.log('Bot is online and ready!');
        updateMessage(client);
    });

    client.on('interactionCreate', handleInteraction);
    client.on('messageCreate', handleRoleMentionSpam);
}

module.exports = { startBot };
