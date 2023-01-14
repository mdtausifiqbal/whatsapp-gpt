const { Configuration, OpenAIApi } = require("openai");

function ChatGPT(apiKey) {
  const configuration = new Configuration({
    apiKey: apiKey,
  });

  this.openai = new OpenAIApi(configuration);
}

ChatGPT.prototype.ask = async function (prompt) {
  const res = await this.openai.createCompletion({
    prompt: prompt,
    model: "text-davinci-002",
    temperature: 0.5,
    max_tokens: 500,
  });
  return res.data.choices[0].text;
};

module.exports = ChatGPT;
