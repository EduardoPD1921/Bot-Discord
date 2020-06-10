const discord = require('discord.js');
const bot = new discord.Client();
const token = 'NzIwMzE0NTM1OTUyNzc3Mjg3.XuEQSQ.-7UcPpDNTNV1Xt36JWls8tp6oMg';

bot.login(token);
bot.on('ready', () => {
    console.log('Bot On');
})

let dSize = 0;

bot.on('message', msg => {
    if (msg.content == 'salve japa') {
        dSize++;
        msg.reply(`salve, meu pau acabou de crescer mais 1km estando com ${dSize}km de pura massa de pênis.`);
    } else if (msg.content == 'japa status') {
        msg.reply(`O tamanho atual do meu pênis é ${dSize}km`);
    }
})