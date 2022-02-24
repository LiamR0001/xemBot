const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  description: "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "Information ",
    run: async (client, message, args) => {
      if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.reply("There is no command in the bot with name **" + args[0] + "**.");
      }

      let embed = new MessageEmbed()
        .setTitle(command.name[0].toUpperCase() + command.name.slice(1) + " Command")
        .setDescription(command.description || "**:x: | The command has no desciption :sob:")
        .addField("Command usage", command.usage ? "```js\n" + default_prefix + command.usage + "```" : "Not Provided")
        .setColor("GREEN")


      if(command.aliases && command.aliases.length) embed.addField("Aliases", command.aliases.map(x => "`" + x +"`").join(", "))
      if(command.botPermission && command.botPermission.length) embed.addField("Bot Permissions", command.botPermission.map(x => "`" + x +"`").join(", "), true)
      if(command.authorPermission && command.authorPermission.length) embed.addField("Author Permissions", command.authorPermission.map(x => "`" + x +"`").join(", "), true)

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setDescription("Help")
        .setColor("GREEN")
        .setFooter(`xemBot | Requested by ${message.author.username}` client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "**:x: | The catergory is unknown of these commands.**";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }

      return message.channel.send(emx);
    }
  }
};
