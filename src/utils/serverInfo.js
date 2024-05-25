// File: src/utils/serverInfo.js

const moment = require('moment');
const winston = require('winston');

const serverInfo = {
  serverName: 'My Discord Server',
  memberCount: 1000,
  createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
  owner: 'John Doe',
  region: 'US West',
  features: ['Muting users', 'Kicking users', 'Banning users', 'Reporting system', 'Rule information command', 'Logging moderation actions', 'Announcements command'],

  displayInfo: function() {
    winston.info(`Server Name: ${this.serverName}`);
    winston.info(`Member Count: ${this.memberCount}`);
    winston.info(`Created At: ${this.createdAt}`);
    winston.info(`Owner: ${this.owner}`);
    winston.info(`Region: ${this.region}`);
    winston.info('Features:');
    this.features.forEach((feature, index) => {
      winston.info(`${index + 1}. ${feature}`);
    });
  }
};

module.exports = serverInfo;