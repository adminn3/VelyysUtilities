# It's official.
welp, after a long, long time of thinking I've decided to release and publish [Velyys Communitys](https://discord.gg/fezSE6HQTw) utility bot. (Velyy's Utilities). You can fork it, file zip it. etc.

# Note.
It's been a long journey thats for sure, but I can asure the person who Is reading this the code of this bot will make you happy how it did to me. - Thank you all.

# Instructions: 
Please rename the token value key in: `config.json` to your bots token. On the [Discord Developer Portal](https://discord.com/developers/applications). You should be greated by logging in with your email used for your discord account. and password. please do the following:
1. Make a new app. Rename it to whatever and go to category "Bot" and add a bot.
2. Give it All the Intents on the bottom, and press the button: "Reset Token". if you have OAuth2 (Which you should have on ;-;) please fill your OAuth2 key in. (6-8 Numbers.)
3. You should be greeted by a long generated "token".
4. Please insert this into your value key in `config.json`.
5. Mongoose is required to work the warning commands to work, please follow a tutorial for your MongooseConnectionString. - **Required**
6. One more thing I dont have a ton of time to help others with the bots needings please refer to a tutorial for help.

Your `config.json` should look like the following. 

```js
{
  
  "prefix": "prefix-gos-here(e.g: >, <, ?, //, -, etc.)",

  "owners": "name-or-id", // this can be used to identify the owner of the bot for example using eval command. ({prefix}eval client.config.owners)
    
  "moderatorRoleId": "DONT FILL THIS OUT", //with this if any command has this like const { moderatorRoleId } = bla bla **Delete it!** its useless. any thing with moderatorRoleId Delete it!
  
  "token": "token-gos-here.",

  "mongo": "mongo-key-gos-here."
  
}
```
# This should be good for now.
I dont plan to keep up with this repo so whatever files are uploaded are uploaded. Please do not beg me to upload recent files to the repo.
I'm not responding to bug dms. If they are **Severe** then I'll try my best to reach out to you.
