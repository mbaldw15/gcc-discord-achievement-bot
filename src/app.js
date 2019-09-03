const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('../conf/auth.json');
const consts = require('../conf/constants.json');
function startup() {

  console.log('connecting to discord');
  client.login(auth.token);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
  if (msg.content.substring(0, 1) === '!') {
    processCommand(msg);
  }
});

function processCommand(msg) {
  const args = msg.content.substring(1).split(' ');
  const cmd = args[0];

  switch (cmd) {
    case 'ping':
      msg.channel.send('pong! ' + msg.author);
      break;
    case 'uptime':
      msg.channel.send(client.uptime)
      break;
    case 'admin':
      processAdminCommand(args, msg);
      break;
  }
}

function processAdminCommand(args, msg) {
  const allowedRole = msg.guild.roles.find("name", consts.adminRole)
  const roles = msg.member.roles;
  if(roles.has(allowedRole.id)) {
    msg.reply('you have the appropriate role');
  } else {
    msg.reply('UNAUTHORIZED');
  }
}

startup();