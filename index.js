const { Client } = require("discord.js-selfbot-v13");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client();

const trackChannelIds = [
  "1339321496379592829",
  "737394785135886346",
  "1339321102249492591",
]; // Channels to track

const trackUserIds = ["1175575988390866976"]; // Optionally add author IDs here later

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);

  // try {
  //   // Fetch the channel
  //   const channel = await client.channels.fetch("1031947891582980117");

  //   if (!channel) {
  //     console.error("Channel not found.");
  //     return;
  //   }

  //   // Fetch the message from the channel
  //   const message = await channel.messages.fetch("1325855169031835760");

  //   if (!message) {
  //     console.error("Message not found.");
  //     return;
  //   }

  //   // Log message content and other details
  //   console.log(message.components[0]);

  //   await message.clickButton("5265bb295db155a68949561cb9e50715");
  // } catch (error) {
  //   console.error("Error fetching the message:", error);
  // }
});

client.on("messageCreate", async (message) => {
  // Check if the message is from a tracked channel
  if (trackChannelIds.includes(message.channel.id)) {
    // Optionally filter by specific authors
    if (trackUserIds.length > 0 && !trackUserIds.includes(message.author.id))
      return;

    // Check if the message contains embeds
    if (message.embeds.length > 0) {
      const embed = message.embeds[0]; // Get the first embed

      // Check if the embed description contains the desired text
      if (
        embed.description &&
        embed.description.includes(
          "Click the button below to enter the rain event!"
        )
      ) {
        try {
          setTimeout(async () => {
            await message.clickButton();
            console.log(
              `Successfully clicked the button for message: ${message.id}`
            );
          }, 4000);
        } catch (error) {
          console.error("Error forwarding the message:", error);
        }
      }
    }
  }
});

client.login(process.env.TOKEN);
