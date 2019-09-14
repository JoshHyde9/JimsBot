const Discord = require("discord.js");

exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);

  if (!fetched) {
    return message.channel.send("There isn't any music in the queue!");
  }

  let queue = fetched.queue;
  let nowPlaying = queue[0];

  let resp = `Now playing: **${nowPlaying.songTitle}** | Requested by: ${nowPlaying.requester}\n\n **Queue: **\n`;

  for (var i = 1; i < queue.length; i++) {
    resp += `${i}) **${queue[i].songTitle}** | Requested by: ${nowPlaying.requester}\n`;
  }

  let embed = new Discord.RichEmbed()
    .setTitle("**Song Queue**")
    .setColor("RANDOM")
    .setDescription(resp);

  message.channel.send({ embed });
};

module.exports.help = {
  name: "queue",
  description: "views the song queue"
};
