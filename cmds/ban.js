const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
    return message.channel.send(
      "I do not have the **Ban Members** permission in this server."
    );
  }

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(
      "Sorry, but you do not have the **Ban Members** permission!"
    );
  }

  let logs = message.guild.channels.find(x => x.name === "logs");

  let user = message.mentions.users.first();
  if (!user) {
    message.reply("Please mention a user");
    return;
  }

  let reason = args.join(" ");
  if (!reason) {
    reason = "No reason given";
  }

  message.guild.member(user).ban(reason);

  let embed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setTitle("User Banned")
    .addField("Banned User: ", `${user}, ID ${user.id}`)
    .addField("Reason: ", reason)
    .addField("Moderator: ", `${message.author}, ID: ${message.author.id}`)
    .addField("Channel: ", message.channel)
    .setTimestamp();

  logs.send(embed);
};

module.exports.help = {
  name: "ban",
  description: "Bans selected user"
};
