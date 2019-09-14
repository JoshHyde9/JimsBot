exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(
      `You need the **ADMINISTRATOR** role to run this command!`
    );
  }

  let logs = message.guild.channels.find("name", "logs");
  if (!logs) {
    message.guild.createChannel("Moderation", "category", [
      {
        id: message.guild.id,
        deny: ["SEND_MESSAGES"],
        allow: ["MANAGE_MESSAGES"]
      }
    ]);
    message.guild
      .createChannel("logs", "text")
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
