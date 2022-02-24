const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "Moderation ",
  description: "Kick anyone",
  usage: "kick <@user> <raeson>",
  run: (client, message, args) => {
    
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, you do not have enough permission to use this command`)
    }
    
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
    }
    
    let target = message.mentions.members.first();
    
    if(!target) {
      return message.channel.send(`**${message.author.username}**, you must tell me whom you want to kick`)
    }
    
    if(target.id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, I can not allow you to kick your self`)
    }
    
  if(!args[1]) {
    return message.channel.send(`**${message.author.username}* you must give a reason to kick the user.`)
  }
    
    let embed = new discord.MessageEmbed()
    .setTitle("Action: Kick")
    .setDescription(`Kicked ${target} (${target.id})`)
    .setColor("#ff2050")
    .setFooter(`Kicked by ${message.author.username}`);
    
    message.channel.send(embed)
    
    target.kick(args[1]);
    
    
    
  }
}
