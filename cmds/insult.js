exports.run = async (client, message, args) => {
  let insults = [
    "Your parents hated you so much you bath toys were an iron and a toaster",
    "You're the reason why women earn 75 cents to the dollar.",
    "You're as useful as an ashtray on a motorcycle.",
    "Shock me, say something intelligent.",
    "Am I getting smart with you? How would you know?",
    "Suck butter from my ass.",
    "Your family tree is a circle.",
    "I'm not saying I hate you, but if you ever got hit by a bus, I'd probably be the one driving it.",
    "Interrupt my sleep and I'll interrupt your breathing.",
    "Your wife is like a brick; flat on both sides, dirty, and gets layed by Mexicans. ",
    "I fail to comprehend how you can continue to function on any level with an IQ that is three degrees below whale shit.",
    "Hurry up and die already so that I can piss in your grave.",
    "I don't exactly hate you, but if you were on fire and I had water, I would drink it.",
    "I don't hate you, I'm just not necessarily excited about your existence.",
    "I wish you were a pinata",
    "I wish I were a bird, not so I can fly but so I can shit on your head."
  ];

  var randInsult = insults[Math.floor(Math.random() * insults.length)];

  if (!args[0]) {
    return message.channel.send("Please mention a user.");
  }

  if (message.mentions.users.first().id == "197955018828152833") {
    return message.channel.send(
      `${mentionAuthor}, Do you really think I would insult the person who brought me to life? I would do no such thing!`
    );
  }

  if (message.mentions.users.first().id == "527738299713060884") {
    return message.channel.send(
      `${mentionAuthor}, How original. No one else had thought of trying to get the bot to insult itself. I applaud your creativity. Yawn. Perhaps this is why you don't have friends. You don't add anything new to any conversation. You are more of a bot than me, predictable answers, and absolutely dull to have an actual conversation with.`
    );
  }

  let mentionAuthor = message.mentions.users.first();
  message.channel.send(`${mentionAuthor} ${randInsult}`);
};

module.exports.help = {
  name: "insult",
  description: "insults selected user"
};
