// Filename: ban.js

const Discord = require('discord.js');
const { logBan } = require('../utils/logging');

module.exports = {
  name: 'ban',
  description: 'Ban a user from the server',
  execute(message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply('You do not have permission to use this command');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention the user you want to ban');
    }

    const member = message.guild.member(user);
    if (!member) {
      return message.reply('That user is not in this server');
    }

    if (!member.bannable) {
      return message.reply('I cannot ban that user');
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    member.ban({ reason })
      .then(() => {
        logBan(member, message.author, reason);
        message.channel.send(`${user.tag} has been banned`);
      })
      .catch((error) => {
        console.error(error);
        message.reply('There was an error trying to ban that user');
      });
  },
};