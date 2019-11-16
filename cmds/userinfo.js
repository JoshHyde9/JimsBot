const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!args[0]) {
    const userSelf = message.author;
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("User Info")
      .setThumbnail(userSelf.displayAvatarURL)
      .addField("Username: ", userSelf.tag)
      .addField("ID: ", userSelf.id)
      .addField("Status: ", userSelf.presence.status)
      .addField("Currently Playing: ", userSelf.presence.game.name)
      .addField("Joined Server At: ", message.guild.joinedAt)
      .addField("Is Bot: ", userSelf.bot)
      .addField("User Created At: ", userSelf.createdAt)
      .setTimestamp();

    message.channel.send({ embed });
  } else {
    const mentionedUser = message.mentions.users.first();
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("User Info")
      .setThumbnail(mentionedUser.displayAvatarURL)
      .addField("Username: ", mentionedUser.tag)
      .addField("ID: ", mentionedUser.id)
      .addField("Status: ", mentionedUser.presence.status)
      .addField("Currently Playing: ", mentionedUser.presence.game.name)
      .addField("Joined Server At: ", message.member.joinedAt)
      .addField("Is Bot: ", mentionedUser.bot)
      .addField("User Created At: ", mentionedUser.createdAt)
      .setTimestamp();

    message.channel.send({ embed });
  }
};

module.exports.help = {
  name: "info",
  description: "Displays user info"
};
