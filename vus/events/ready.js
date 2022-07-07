const { Client } = require('discord.js');

/**
 * 
 * @param {Client} client
 */
module.exports = async (client) => {
  try {
    console.log(`[Client] ${client.user.tag} is ready to use.`)
  } catch (err) {
    client.error('[Client - Error]:', err)
  };
};