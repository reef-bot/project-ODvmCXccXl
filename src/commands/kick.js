// File: src/commands/kick.js

const Discord = require('discord.js');
const { kickUser } = require('../utils/logging');

module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply('You do not have permission to use this command');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('You need to mention a user to kick');
    }

    const member = message.guild.member(user);
    if (!member) {
      return message.reply('That user is not in this server');
    }

    if (!member.kickable) {
      return message.reply('I cannot kick that user');
    }

    member.kick()
      .then(() => {
        kickUser(member);
        message.reply(`Successfully kicked ${user.tag}`);
      })
      .catch((error) => {
        console.error(error);
        message.reply('An error occurred while trying to kick the user');
      });
  },
};