exports.run = (client, message, args, ops) => {
  if (!message.member.voiceChannel)
    return message.channel.send("Please connect to a voice channel");

  if (!message.guild.me.voiceChannel)
    return message.channel.send("I am not in a voice channel");

  if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) {
    return message.channel.send(
      "We are not connected to the same voice channel"
    );
  }
  let fetched = ops.active.get(message.guild.id);
  let queue = fetched.queue;

  queue.length = 0;
  fetched.dispatcher.end();

  message.guild.me.voiceChannel.leave();
};

module.exports.help = {
  name: "leave",
  description: "Leaves A Voice Channel"
};
