module.exports = {
  name: 'ping',
  catergory: 'Information ',
  aliases: ['ms', 'timecheck'],
  description: 'Command Description',
  async execute(client, message, args, Discord) {
    message.channel.send(`:hourglass: Bot latency: ${Date.now() - message.createdTimestamp}ms`)
  }
}
