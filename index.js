const discord = require('discord.js');
const { OpusEncoder } = require('@discordjs/opus');
const bot = new discord.Client();
const token = 'NzIwMzE0NTM1OTUyNzc3Mjg3.XuFCog.ItO5ia-FaHRSrFu096-PH1e0AQ4';
const dados = require('./dados.json');

bot.login(token);
bot.on('ready', () => {
    console.log('Bot On');
})

let dSize = 0;
let tempo = 0;

function numeroAleatorio(range) {
    const numero = Math.floor(Math.random() * range);

    return numero;
}

function audio(file, message) {
    /*if (!message.member.voice.channel) {
        message.reply('Você não está conectado em nenhum canal de voz, se fudeu pra caralho');
    } else {
        const con = message.member.voice.channel.join().then(connection => {
            const dispatcher = connection.play(file, {volume: 0.75});
        })
    }*/
    try {
        const con = message.member.voice.channel.join().then(connection => {
            const dispatcher = connection.play(file, {volume: 0.75});
        })
    } catch(e) {
        message.reply('Você não está conectado em nenhum canal de voz, se fudeu pra caralho');
    }
}

function dorme(message) {
    const horario = new Date();
    
    if (horario.getHours() > 3 && horario.getHours() < 13) {
        return message.channel.send('ooooo da sleeping tym sleep so many dreams', {files: ['japa.jpg']});
    } else {
        return message.channel.send('oooo da mooscles r getting biger', {files: ['japa1.jpg']});
    }
}

function frasesAleat(message) {
    const numero = numeroAleatorio(dados.frases.length);
    message.channel.send(dados.frases[numero]);
}

function imagemAleat(message) {
    const numero = numeroAleatorio(dados.imagens.length);
    message.channel.send({files: [dados.imagens[numero]]});
}

function japaDorme(message) {
    message.guild.members.fetch().then(fetchedMembers => {
        const japaStatus = fetchedMembers.filter(member => member.presence.userID == '334478262199648257').map(member => member.presence.status);

        if (japaStatus != 'offline') {
            return message.channel.send('oooo da mooscles r getting biger', {files: ['japa1.jpg']});
        } else {
            return message.channel.send('ooooo da sleeping tym sleep so many dreams', {files: ['japa.jpg']});
        }
    })
}

setInterval(() => {
    let horario = new Date();
    const hora = horario.getHours() - 3;

    if (hora == 0 && horario.getMinutes() == 0 && horario.getSeconds() == 0) {
        let channel = bot.channels.cache.get('689224482568798262');
        channel.join().then(connection => {
            connection.play('Audios/meia.wav', {volume: 0.75});
        })
    }
}, 1000)

setInterval(() => {
    tempo++;
}, 3600000)

/*setInterval(function () {
    let horario = new Date();
    console.log(horario.getSeconds());
    if (horario.getSeconds() == 50) {
        meiaNoite();
    }
}, 1000)*/


bot.on('message', msg => {
    const arrayMessage = msg.content.split(' ');

    try {
        if (arrayMessage[0] == '-japa') {
            if (arrayMessage.slice(1) == 'help') {
                msg.reply(dados.comandos);
            } else if (arrayMessage.slice(1) == 'status') {
                msg.reply(`Meu pau se encontra com ${dSize}km de tamanho e expessura`);
            } else if (arrayMessage.slice(1) == 'salve') {
                dSize++;
                msg.reply('Você é legal, meu pau acabou de aumentar 1km e está cada vez maior!');
            } else if (arrayMessage.slice(1) == 'meia') {
                audio('Audios/meia.wav', msg);
            } else if (arrayMessage.slice(1) == 'dorme') {
                japaDorme(msg);
            } else if (arrayMessage.slice(1) == 'moo') {
                audio('Audios/sleepso.mp3', msg);
            } else if (arrayMessage.slice(1) == 'slk') {
                audio('Audios/seloco.mp3', msg);
            } else if (arrayMessage.slice(1) == 'obama') {
                audio('Audios/beatbox.mp3', msg);
            } else if (arrayMessage.slice(1) == 'bigman') {
                audio('Audios/bigman.mp3', msg);
            }else if (arrayMessage.slice(1) == 'melody') {
                audio('Audios/japamelody.mp3', msg);
            } else if (arrayMessage.slice(1) == 'eduardo') {
                audio('Audios/eduardomelody.mp3', msg);
            } else if (arrayMessage.slice(1) == 'online') {
                msg.reply(`Estou online fazem ${tempo} horas de pura dor e sofrimento!`);
            } else if (arrayMessage.slice(1) == 'pao') {
                audio('Audios/3paes.mp3', msg);
            } else if (arrayMessage.slice(1) == 'coca') {
                audio('Audios/cocalatao.mp3', msg);
            } else if (arrayMessage.slice(1) == 'delicia') {
                audio('Audios/quedelicia.mp3', msg);
            } else if (arrayMessage.slice(1) == 'recalque') {
                audio('Audios/conhece.mp3', msg);
            } else if (arrayMessage.slice(1) == 'talks') {
                audio('Audios/bigtalks.mp3', msg);
            } else if (arrayMessage.slice(1) == 'forga') {
                audio('Audios/forga.wav', msg);
            } else if (arrayMessage.slice(1) == 'ednaldo') {
                audio('Audios/ednaldo.mp3', msg);
            } else if (arrayMessage.slice(1) == 'terraria') {
                audio('Audios/terraria.wav', msg);
            } else if (arrayMessage.slice(1) == 'frases') {
                frasesAleat(msg);
            } else if (arrayMessage.slice(1) == 'foto') {
                imagemAleat(msg);
            } else if (arrayMessage.slice(1) == 'porta') {
                audio('Audios/porta.wav', msg);
            }
        }
    } catch(e) {
        console.log(e);
    }
})
