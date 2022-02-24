const db = require("quick.db")

module.exports = {
  name: "removewarns",
  aliases: ["rwarns"],
  usage: "rwarns <@user>",
  catergory: "Moderation",
  description: "Reset warnings of mentioned person",
  run: async (client, message, args) => {
    
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(":x: | You need admin to remove someones warnings.")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
    return message.channel.send("I can not remove someone warnings without knowing who to remove them from.")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("Sadly, discord bots cant have warnings")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("You are not allowed to remove your own warnings")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} does not have any warnings.`)
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)
    user.send(`Your all warnings have been removed by ${message.author.username} from ${message.guild.name}`)
    await message.channel.send(`Removed all warnings from ${message.mentions.users.first().username}`)
    
  
    
}
}
