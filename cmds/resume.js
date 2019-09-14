exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);

  if (!fetched) {
    return message.channel.send(`There currently isn't any music playing!`);
  }

  if (message.member.voiceChannel !== message.guild.me.voiceChannel) {
    return message.channel.send(
      `You need to be in the same voice channel as me.`
    );
  }

  if (!fetched.dispatcher.paused) {
    return message.channel.send(`The music is already playing`);
  }

  fetched.dispatcher.resume();
  message.channel.send(
    `:play_pause: **${fetched.queue[0].songTitle}** resumed!`
  );
};

module.exports.help = {
  name: "resume",
  description: "resumes the song currently paused"
};
