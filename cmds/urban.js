const urban = require("relevant-urban");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send(`Please specify some text!`);
  }

  let res = await urban(args.join(" ")).catch(e => {
    return message.channel.send("Sorry, that word was not found!");
  });

  const embed = new Discord.RichEmbed()

    .setColor("RANDOM")
    .setTitle(res.word)
    .setURL(res.urbanURL)
    .setThumbnail(
      "https://pbs.twimg.com/profile_images/838627383057920000/m5vutv9g.jpg"
    )
    .setDescription(
      `**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`
    )
    .addField(
      "**Rating: **",
      `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`
    )
    .setFooter(`Author: ${res.author}`);

  if (res.tags.length > 0 && res.tags.join(" ").length < 1024) {
    embed.addField("Tags", res.tags.join(", "), true);
  }

  message.channel.send(embed);
};

module.exports.help = {
  name: "urban",
  description: "Searches the urban dictionary"
};
