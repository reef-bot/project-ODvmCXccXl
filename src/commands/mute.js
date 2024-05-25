// File: src/commands/mute.js

const { Client, Message, MessageEmbed } = require('discord.js');
const { muteUser } = require('../utils/serverInfo');

/**
 * Mute a user in the server
 * @param {Client} client - The Discord client
 * @param {Message} message - The message sent by the user
 * @param {Array} args - The command arguments
 */
const execute = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.reply('You do not have permission to use this command.');
    }

    const target = message.mentions.members.first();
    if (!target) {
        return message.reply('Please mention the user you want to mute.');
    }

    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    if (!muteRole) {
        return message.reply('Mute role not found. Please create a role named "Muted" for muting users.');
    }

    try {
        await target.roles.add(muteRole);
        await muteUser(target.id);
        message.channel.send(`${target} has been muted.`);
    } catch (error) {
        console.error(error);
        message.reply('An error occurred while muting the user.');
    }
};

module.exports = {
    name: 'mute',
    description: 'Mute a user in the server',
    execute,
};