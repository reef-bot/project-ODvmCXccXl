// File: src/commands/rules.js

const Discord = require('discord.js');
const { getServerRules } = require('../utils/serverInfo');

module.exports = {
  name: 'rules',
  description: 'Display server rules and guidelines',
  execute(message, args) {
    const rules = getServerRules(); // Get server rules from serverInfo.js
    const rulesEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Server Rules')
      .setDescription(rules);

    message.channel.send(rulesEmbed);
  },
};