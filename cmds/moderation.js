exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
    return message.channel.send(
      "I do not have the **Ban Members** permission in this server."
    );
  }

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(
      `You need the **ADMINISTRATOR** role to run this command!`
    );
  }

  let logs = message.guild.channels.find(x => x.name === "logs");
  if (!logs) {
    message.guild.createChannel("Moderation", {
      type: "category",
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: [
            "SEND_MESSAGES",
            "MANAGE_MESSAGES",
            "CREATE_INSTANT_INVITE",
            "MENTION_EVERYONE"
          ]
        }
      ]
    });
    message.guild
      .createChannel("logs", {
        type: "text",
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: [
              "SEND_MESSAGES",
              "MANAGE_MESSAGES",
              "CREATE_INSTANT_INVITE",
              "MENTION_EVERYONE"
            ]
          }
        ]
      })
      .then(channel => {
        let category = message.guild.channels.find(
          c => c.name == "Moderation" && c.type == "category"
        );
        channel.setParent(category.id);
      })
      .catch(console.error);
  }
};

module.exports.help = {
  name: "moderation",
  description: "sets up message logging"
};
