const mongoose = require('mongoose');

const uri = '';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Level Database'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const userSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    level: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    prestige: { type: String, default: 'Initiate' },
    xpMultiplier: { type: Number, default: 1 }
});

const messageCountSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    count: { type: Number, default: 0 }
});

const giveawaySchema = new mongoose.Schema({
    guildId: String,
    endTime: Date,
    status: { type: String, default: 'inactive' },
    participants: [String]
});

const User = mongoose.model('User', userSchema);
const MessageCount = mongoose.model('MessageCount', messageCountSchema);
const Giveaway = mongoose.model('Giveaway', giveawaySchema);

module.exports = { User, MessageCount, Giveaway };
