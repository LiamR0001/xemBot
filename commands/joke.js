const { Random } = require("something-random-on-discord")

module.exports = {
  name: "joke",
  category: "Fun ",

  description: "Get a joke from your bot",
  run: async (client, message, args) => {

    let data = await Random.getJoke()
    message.channel.send(data)

  }
}
