// File: src/utils/announcements.js

const Discord = require('discord.js');
const moment = require('moment');
const { logger } = require('./logging');

// Function to send an announcement to all server members
const sendAnnouncement = (client, messageContent) => {
  const announcementEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Announcement')
    .setDescription(messageContent)
    .setTimestamp();

  client.guilds.cache.forEach((guild) => {
    const announcementChannel = guild.systemChannel;
    if (announcementChannel) {
      announcementChannel.send(announcementEmbed)
        .then(() => {
          logger.info(`Announcement sent in ${guild.name}`);
        })
        .catch((error) => {
          logger.error(`Error sending announcement in ${guild.name}: ${error.message}`);
        });
    } else {
      logger.warn(`System channel not found in ${guild.name}. Announcement not sent.`);
    }
  });
};

module.exports = {
  sendAnnouncement,
};