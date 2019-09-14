const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Commands`)
    .setThumbnail(client.user.displayAvatarURL)
    .addField(
      "General Commands",
      `**Meme:** Posts a nice meme.
       **Insult:** Insults selected user.
       **Urban:** Searches the urban dictionary with your query.
       **Userinfo:** Display's the selected user's info.
       **Ping:** Pings the API and edits message to calcualte average ping.
       **Help:** Displays this helpful embed.`,
      true
    )
    .addBlankField()
    .addField(
      "Music Commands",
      `**Play:** Plays given YouTube URL or searched input.
        **Queue:** Views the current song queue.
        **Skip:** Skips playing song.
        **Pause:** Pauses the current song playing.
        **Resume:** Resumes the paused song.
        **Volume:** Sets the current song's volume.
        **Leave:** Leaves the voice channel.`,
      true
    )
    .addBlankField()
    .addField(
      "Admin Commands",
      `**Ban:** Bans mentioned user.
       **Delete:** Deletes a given amount of messages
       **Moderation:** Creates a Moderation category and a log text channel. | Requires Administrator role.`,
      true
    )
    .setTimestamp();

  message.channel.send({ embed });
};

module.exports.help = {
  name: "help",
  description: "lists all commands available"
};
