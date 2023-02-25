const { color, white, red } = require("console-log-colors");
const { Client, GatewayIntentBits } = require("discord.js");

const http = require("http");
const https = require("http");
const figlet = require("figlet");
const lolcatjs = require("lolcatjs");

//----------------Set to var so we can redefine client later------
var client = new Client({ intents: [GatewayIntentBits.Guilds] });
//----------------------DISCORD TOKEN OF MAIN BOT------------------

const TOKEN = "";

//-----------------------------------------------------------------

//DO NOT TOUCH THESE VALUESS
let websiteOfflineLogged = false;
let websiteOnlineLogged = false;
let online = "";
let botRunning = false;
let confirmedoff = false;

//----------------START UP MESSAGE-------------------------------
var banner = figlet.textSync("Backup UTIL Bot", {
  font: "Small",
  horizontalLayout: "default",
  width: 1000,
  whitespaceBreak: true,
});
console.clear();
lolcatjs.options.seed = Math.round(Math.random() * 1000);
lolcatjs.options.colors = true;
lolcatjs.fromString(banner);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(color.green.bold(`${color.yellowBright("Logs| ")}Launched BackUp UTILS Succesfully...`));
console.log(color.magenta(`${color.yellowBright("Logs| ")}Version:${color.cyan("1.0")}`));
console.log(color.magenta(`${color.yellowBright("Logs| ")}Made by: ${color.cyan("Nolan#9000")}`));
console.log(color.magenta(`${color.yellowBright("Logs| ")}${color.gray("Checking the bot status...Please wait.")} `));
//-----------------------------------------------------------------

function checkWebsite() {
  // Define the URL of the external website to check (including the port number)
  const urlToCheck = "http://localhost:8080";

  // Parse the URL to extract the hostname and path
  const { hostname, port, path, protocol } = new URL(urlToCheck);
  const module = protocol === "https:" ? https : http;
  // Make a request to the URL using HTTP

  module.get({ hostname, port, path }, (res) => {
      // If the response status code is 200 (OK)
      if (res.statusCode === 200) {
        let data = "";

        // Receive the data in chunks
        res.on("data", (chunk) => {
          data += chunk;
        });

        // When all data is received
        res.on("end", () => {
          // Check if the response body contains the word "online"
          if (data.includes("online")) {
            online = true; //make sure not to delete this
          }
        });
      } else {
        online = false; //make sure not to delete this
        confirmedoff = true; //make sure not to delete this
      }
    })
    .on("error", (err) => {
      online = false;
      confirmedoff = true;
      // console.log(err)
    });

  if (online) {
    if (!websiteOnlineLogged) {
      console.log(color.green(`${color.yellowBright("Logs| ")}${white("MainBOT")} is Online!`));
      websiteOnlineLogged = true; //make sure not to delete this
      websiteOfflineLogged = false; //make sure not to delete this

      if (botRunning) {
        console.log(color.green(`${color.redBright("Logs| ")}${white("Back up bot")} is now Offline!`));
        client.destroy();
      }
    }
  }

  if (!online && confirmedoff) {
    if (!websiteOfflineLogged) {
      console.log(color.red(`${color.yellowBright("Logs| ")}${white("MainBOT")} is offline!`));
      websiteOfflineLogged = true; //make sure not to delete this
      websiteOnlineLogged = false; //make sure not to delete this

      client = new Client({ intents: [GatewayIntentBits.Guilds] });
      console.log(color.green(`${color.redBright("Logs| ")}${white("Back up bot is now")} Online!`));
      //bot start
      client.on("ready", () => {
        console.log(color.green(`${color.redBright("Logs| ")}${white("Back up bot")} Logged in ${color.white("as")} ${client.user.tag}!!`));
        // console.log(`Logged in as ${client.user.tag}!`);
      });
      //ur bot code
      botRunning = true; //make sure not to delete this
      client.login(TOKEN);
    }
  }
}

// Call the checkWebsite function every 2 seconds
setInterval(checkWebsite, 2 * 1000);

// Check the website status every 10 seconds and log a message if it's offline
setInterval(() => {
  if (!online) {
    console.log(color.red(`${color.yellowBright("Logs| ")}${white("MainBOT is")} ${red.bold("Still")} offline!`));
    confirmedoff = true; //make sure not to delete this
  }
}, 10 * 1000);




