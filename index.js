const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const dotenv = require("dotenv");
const ChatGPT = require("./chatgpt");

dotenv.config();

const bot = new ChatGPT(process.env.OPENAI_API_KEY);

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
  console.log("User authenticated successfully");
});

client.on("ready", async () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => { 
   let question = message.body; 
   let answer = await bot.ask(question); 
   message.reply(answer);
 });

client.initialize();
