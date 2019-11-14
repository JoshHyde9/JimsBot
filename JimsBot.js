const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const token = config.token;
const prefix = config.prefix;

const ownerID = "197955018828152833";
const active = new Map();

fs.readdir("./cmds/", (err, files) => {
  if (err) {
    console.error(err);
  }
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No commands to load!");
  }
  if (jsfiles.length == 1) {
    console.log(`Loading ${jsfiles.length} command!`);
  } else {
    console.log(`Loading ${jsfiles.length} commands!`);
  }

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
});

client.on("ready", async () => {
  console.log(
    `${client.user.username} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`
  );
  console.log(client.commands);

  if (client.guilds.size == 1) {
    client.user.setActivity(`${client.guilds.size} server!`, {
      type: "WATCHING"
    });
  } else {
    client.user.setActivity(`${client.guilds.size} servers!`, {
      type: "WATCHING"
    });
  }
});

client.on("guildCreate", guild => {
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(`${client.guilds.size} servers!`, {
    type: "WATCHING"
  });
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from ${guild.name} (id: ${guild.id}).`);
  client.user.setActivity(`${client.guilds.size} servers!`, {
    type: "WATCHING"
  });
});

client.on("messageDelete", messageDelete => {
  if (
    !messageDelete.guild.member(client.user).hasPermission("MANAGE_CHANNELS")
  ) {
    return messageDelete.channel.send(
      "I do not have the **Manage Channels** permission in this server."
    );
  }

  let logs = messageDelete.guild.channels.find("name", "logs");

  let embed = new Discord.RichEmbed()
    .setColor("#F7699C")
    .setTitle("Message Deleted")
    .addField(
      "User: ",
      `${messageDelete.author.tag}, ID ${messageDelete.author.id}`
    )
    .addField("Deleted: ", messageDelete.content)
    .addField("Channel: ", messageDelete.channel)
    .setTimestamp();

  logs.send({ embed });
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
    return oldMessage.channel.send(
      "I do not have the **Manage Channels** permission in this server."
    );
  }

  let logs = newMessage.guild.channels.find("name", "logs");

  if (oldMessage.content !== newMessage.content) {
    let embed = new Discord.RichEmbed()
      .setColor("#A7DB4B")
      .setTitle("Message Updated")
      .addField(
        "User: ",
        `${oldMessage.author.tag}, ID ${oldMessage.author.id}`
      )
      .addField("Original Message: ", oldMessage.content)
      .addField("New Message: ", newMessage.content)
      .addField("Channel: ", oldMessage.channel)
      .setTimestamp();

    logs.send({ embed });
  }
});

client.on("presenceUpdate", (oldMember, newMember) => {
  if (newMember.presence.game == null) {
    return;
  }

  if (newMember.presence.game.name == "Fortnite") {
    return newMember
      .ban()
      .then(() => {
        let logs = newMessage.guild.channels.find("name", "logs");

        let embed = new Discord.RichEmbed()
          .setColor("#FF0000")
          .setTitle("User Banned")
          .addField(
            "Banned User: ",
            `${newMember.user}, ID ${NewMember.user.id}`
          )
          .addField("Reason: ", "Playing Fortnite")
          .setTimestamp();

        logs.send({ embed });
      })
      .catch(console.error);
  }
});

client.on("message", async message => {
  let ops = {
    ownerID: ownerID,
    active: active
  };

  if (message.author.bot) {
    return;
  }
  if (message.channel.type === "dm") {
    return;
  }

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (!command.startsWith(prefix)) {
    return;
  }

  let cmd = client.commands.get(command.slice(prefix.length));
  if (cmd) {
    cmd.run(client, message, args, ops);
  }
});

client.login(token);
