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

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

client.on("message", async (message) => { 
   let question = message.body; 
     if (message.hasMedia) { 
       //No response 
     }
     else{
     (async () => { 
       const chat = await message.getChat(); 

       //Bot is typing
       chat.sendStateTyping(); 

      //Cool down
       await sleep(5000);

       //Send reply
       let answer = await bot.ask(question); 
       message.reply(answer);
      })();
       
     }
   
 });

client.initialize();
