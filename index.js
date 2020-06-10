const discord = require('discord.js');
const bot = new discord.Client();
const token = 'NzIwMzE0NTM1OTUyNzc3Mjg3.XuEkfg.J3wR1nKYegwawgcg6t-T5jnUbz4';

bot.login(token);
bot.on('ready', () => {
    console.log('Bot On');
})

bot.on('message', msg => {
    const arrayMessage = msg.content.split(' ');

    try {
        if (arrayMessage[0] == '-japa') {
            if (arrayMessage.slice(1) == 'comandos') {
                msg.reply('Lista de comandos');
            }
        }
    } catch(e) {
        console.log(e);
    }
})