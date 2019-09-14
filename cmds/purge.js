const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let logs = message.guild.channels.find("name", "logs");

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(
      "Sorry, but you do not have the **Manage Messages** permission!"
    );
  }
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(
      "I do not have the **Manage Messages** permission in this server."
    );
  }

  if (!args[0]) {
    return message.channel.send("You must specify a number of messages.");
  }
  if (args[0] < 1) {
    return message.channel.send(
      "Please provide a number greater than or equal to 1."
    );
  }
  if (args[0] > 100) {
    return message.channel.send(
      "Please provide a number less than or equal to 100."
    );
  }
  if (isNaN(args[0])) {
    return message.channel.send("Please provide a number.");
  }

  message.channel.bulkDelete(args[0], false);

  let embed = new Discord.RichEmbed()
    .setColor("#00CDFF")
    .setTitle("Deleted Messages")
    .addField("Amount: ", args[0] - 1)
    .addField("Moderator: ", `${message.author}, ID: ${message.author.id}`)
    .addField("Channel: ", message.channel)
    .setTimestamp();

  logs.send({ embed });
};

module.exports.help = {
  name: "delete",
  description: "Deletes an x amount of messages"
};
