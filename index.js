const discord = require('discord.js');
const { OpusEncoder } = require('@discordjs/opus');
const bot = new discord.Client();
const dados = require('./dados.json');
const ytdl = require('ytdl-core');
const Youtube = require('discord-youtube-api');
const youtube = new Youtube('AIzaSyBPY6kY5Fl2QBVqbA0pf9dUUvG0ftJRuN8');

bot.login(dados.token);
bot.on('ready', () => {
    console.log('Bot On');
})

let dSize = 0;
let tempo = 0;

function numeroAleatorio(range) {
    const numero = Math.floor(Math.random() * range);

    return numero;
}

function youtubeMusic(message, search) {
    const streamOptions = {seek: 0, volume: 1};

    const con = message.member.voice.channel.join().then(connection => {
        console.log('entrou');
        console.log(search);
        const teste = youtube.searchVideos(search).then(result => {
            const searchResult = result.url;
            const stream = ytdl(searchResult, {filter: 'audioonly'});
            const dispatcher = connection.play(stream, streamOptions);
        })
    })
    /*const voiceChannel = message.member.voiceChannel;

    voiceChannel.join().then(connection => {
        console.log('teste');
        const stream = ytdl('https://www.youtube.com/watch?v=FxVRXGraRtc', {filter: 'audioonly'});
        const dispatcher = connection.playStream(stream, streamOptions);
        dispatcher.on('end', end => {
            console.log('teste2');
            voiceChannel.leave();
        })
    })*/
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
    if (msg.content.startsWith(dados.prefix)) {
        const command = msg.content.split(' ');
        if (command[1] == 'play') {
            const search = msg.content.split('!')[1];
            youtubeMusic(msg, search);
        } else if (command[1] == 'ednaldo') {
            audio('Audios/ednaldo.mp3', msg);
        } else if (command[1] == 'help') {
            msg.reply(dados.comandos);
        } else if (command[1] == 'salve') {
            dSize++;
            msg.reply('Você é legal, meu pau acabou de aumentar 1km e está cada vez maior!');
        } else if (command[1] == 'meia') {
            audio('Audios/meia.wav', msg);
        } else if (command[1] == 'dorme') {
            japaDorme(msg);
        } else if (command[1] == 'moo') {
            audio('Audios/sleepso.mp3', msg);
        } else if (command[1] == 'slk') {
            audio('Audios/seloco.mp3', msg);
        } else if (command[1] == 'obama') {
            audio('Audios/beatbox.mp3', msg);
        } else if (command[1] == 'bigman') {
            audio('Audios/bigman.mp3', msg);
        } else if (command[1] == 'melody') {
            audio('Audios/japamelody.mp3', msg);
        } else if (command[1] == 'eduardo') {
            audio('Audios/eduardomelody.mp3', msg);
        } else if (command[1] == 'online') {
            msg.reply(`Estou online fazem ${tempo} horas de pura dor e sofrimento!`);
        } else if (command[1] == 'pao') {
            audio('Audios/3paes.mp3', msg);
        } else if (command[1] == 'coca') {
            audio('Audios/cocalatao.mp3', msg);
        } else if (command[1] == 'deicia') {
            audio('Audios/quedelicia.mp3', msg);
        } else if (command[1] == 'recalque') {
            audio('Audios/conhece.mp3', msg);
        } else if (command[1] == 'talks') {
            audio('Audios/bigtalks.mp3', msg);
        } else if (command[1] == 'forga') {
            audio('Audios/forga.wav', msg);
        } else if (command[1] == 'terraria') {
            audio('Audios/terraria.wav', msg);
        } else if (command[1] == 'frases') {
            frasesAleat(msg);
        } else if (command[1] == 'foto') {
            imagemAleat(msg);
        } else if (command[1] == 'porta') {
            audio('Audios/porta.wav', msg);
        }
    }
})
