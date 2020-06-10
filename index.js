const discord = require('discord.js');
const bot = new discord.Client();
const token = 'NzIwMzE0NTM1OTUyNzc3Mjg3.XuELnA.cikqmLSK6wC8cd_AbDXB3gJptaY';

bot.login(token);
bot.on('ready', () => {
    console.log('Bot On');
})
bot.on('message', msg => {
    if (msg.content == 'salve japa') {
        msg.reply('salve, meu pau acabou de crescer mais 8km e neste instante está passando a estratosfera');
    }
})