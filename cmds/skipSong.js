exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);

  if (!fetched) {
    return message.channel.send("There isn't any music in the queue!");
  }

  message.channel.send(`Skipped Song!`);
  fetched.dispatcher.end();
};

module.exports.help = {
  name: "skip",
  description: "skips song"
};
