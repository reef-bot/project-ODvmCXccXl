// File: src/reports/report.js

const Discord = require('discord.js');
const moment = require('moment');
const { logReport } = require('../utils/logging');

module.exports = {
  name: 'report',
  description: 'Submit a report of a rule violation',

  execute(message, args) {
    if (args.length < 2) {
      return message.reply('Please provide the user and reason for the report.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('User not found. Please mention the user to report.');
    }

    const reportReason = args.slice(1).join(' ');

    const reportEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('User Report')
      .setAuthor(user.tag, user.displayAvatarURL())
      .setDescription(`Reported by ${message.author.tag}`)
      .addField('Reported User', user, true)
      .addField('Reason', reportReason, true)
      .setTimestamp()
      .setFooter('Reported at');

    logReport(reportEmbed); // Log the report

    message.channel.send('Report submitted successfully. Thank you for your contribution.');
  },
};