const ytdl = require("ytdl-core");

exports.run = async (client, message, args, ops) => {
  if (!message.member.voiceChannel)
    return message.channel.send("Please connect to a voice channel");

  if (!args[0]) return message.channel.send("Please input a URL");

  let validURL = await ytdl.validateURL(args[0]);

  if (!validURL) {
    let commandFile = require(`./search.js`);
    return commandFile.run(client, message, args, ops);
  }

  let data = ops.active.get(message.guild.id) || {};

  if (!data.connection) {
    data.connection = await message.member.voiceChannel.join();
  }

  if (!data.queue) data.queue = [];

  data.guildID = message.guild.id;

  let info = await ytdl.getInfo(args[0]);

  data.queue.push({
    songTitle: info.title,
    url: args[0],
    requester: message.author.toString(),
    annouceChannel: message.channel.id
  });

  if (!data.dispatcher) {
    play(client, ops, data);
  } else {
    message.channel.send(
      `Added to queue: **${
        info.title
      }** | Requested By: ${message.author.toString()}`
    );
  }

  ops.active.set(message.guild.id, data);
};

async function play(client, ops, data) {
  client.channels
    .get(data.queue[0].annouceChannel)
    .send(
      `Now playing: **${data.queue[0].songTitle}** | Requested By: ${data.queue[0].requester}`
    );

  data.dispatcher = await data.connection.playStream(
    ytdl(data.queue[0].url, { filter: "audioonly" })
  );
  data.dispatcher.guildID = data.guildID;

  data.dispatcher.on("end", function() {
    finish(client, ops, this);
  });
}

function finish(client, ops, dispatcher) {
  let fetched = ops.active.get(dispatcher.guildID);
  fetched.queue.shift();

  if (fetched.queue.length > 0) {
    ops.active.set(dispatcher.guildID, fetched);
    play(client, ops, fetched);
  } else {
    ops.active.delete(dispatcher.guildID);
  }
}

module.exports.help = {
  name: "play",
  description: "Plays song from YouTube"
};
