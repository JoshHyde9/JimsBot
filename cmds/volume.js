module.exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);

  if (!fetched) {
    return message.channel.send("There currently isn't any music playing!");
  }

  if (message.member.voiceChannel !== message.guild.me.voiceChannel) {
    return message.channel.send(
      "Sorry, you aren't connected to the same voice channel."
    );
  }

  if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) {
    return message.channel.send("Please input a value between 0 - 200");
  }

  let volume = args[0] / 200;
  fetched.dispatcher.setVolume(volume);

  let volumePercentage = volume * 100;

  message.channel.send(`Volume set to ${volumePercentage}%`);
};

module.exports.help = {
  name: "volume",
  description: "Changes song volume"
};
