const discord = require('discord.js');
const { OpusEncoder } = require('@discordjs/opus');
const bot = new discord.Client();
const dados = require('./dados.json');
const ytdl = require('ytdl-core');
const Youtube = require('discord-youtube-api');
const youtube = new Youtube(dados.ytToken);

bot.login(dados.token);

bot.on('ready', () => {
    console.log('Bot On');
    const channel = bot.channels.cache.get('721868283695071282');
    channel.send('Olá, sou o Japa real e irei ser seu escravo para viver em intensa dor e sofrimento constante! Para saber os códigos, digite -japa help.');
})

let dSize = 0;
let tempo = 0;
let queue = new Array();
let queuePosition = 0;
let isPlaying = false;

function numeroAleatorio(range) {
    const numero = Math.floor(Math.random() * range);

    return numero;
}

function musicCurrentlyPlaying(num) {
    const channel = bot.channels.cache.get('721868283695071282');
    return channel.send(`Pode pá que está tocando ${queue[num]} neste momento`);
}

function queueMusic(dispatcher, message, queue, queuePosition, stream, connection, streamOptions) {
    queuePosition++;

    if (!queue[queuePosition]) {
        const channel = bot.channels.cache.get('721868283695071282');
        channel.send('A fila acabou!');
        queue.splice(0, queuePosition);
        queuePosition = 0;
        isPlaying = false;
    } else {
        stream = ytdl(queue[queuePosition], {filter: 'audioonly'}, {type: 'opus'});
        dispatcher = connection.play(stream, streamOptions);
        musicCurrentlyPlaying(queuePosition);
        dispatcher.on('finish', () => {
            queueLoop(dispatcher, message, queue, queuePosition, stream, connection, streamOptions);
        })
    }
}

function queueLoop(dispatcher, message, queue, queuePosition, stream, connection, streamOptions) {
    queuePosition++;

    if (!queue[queuePosition]) {
        const channel = bot.channels.cache.get('721868283695071282');
        channel.send('A fila acabou!');
        queue.splice(0, queuePosition);
        queuePosition = 0;
        isPlaying = false;
        
    } else {
        stream = ytdl(queue[queuePosition], {filter: 'audioonly'}, {type: 'opus'});
        dispatcher = connection.play(stream, streamOptions);
        musicCurrentlyPlaying(queuePosition);
        dispatcher.on('finish', () => {
            queueMusic(dispatcher, message, queue, queuePosition, stream, connection, streamOptions);
        })
    }
}

function youtubeMusic(message, search) {
    try{
        if (isPlaying == false) {
            const streamOptions = {seek: 0, volume: 1};
            isPlaying = true;

            const con = message.member.voice.channel.join().then(connection => {
                const searching = youtube.searchVideos(search).then(result => {
                    queue.push(result.url);
                    let stream = ytdl(queue[queuePosition], {highWaterMark: 1<<25}, {type: 'opus'});
                    let dispatcher = connection.play(stream, streamOptions);
                    musicCurrentlyPlaying(queuePosition);
                    dispatcher.on('finish', () => {
                        queueMusic(dispatcher, message, queue, queuePosition, stream, connection, streamOptions);
                    });
                })
            })
        } else if (isPlaying == true) {
            const searching = youtube.searchVideos(search).then(result => {
                queue.push(result.url);
                const channel = bot.channels.cache.get('721868283695071282');
                channel.send(`${result.url} foi adicionado na fila`);
            })
        }
    } catch(e) {
        message.reply('Você não está conectado em nenhum canal de voz, se fudeu pra caralho');
    }
}

function audio(file, message) {
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
        } else if (command[1] == 'status') {
            msg.reply(`Meu pau se encontra com ${dSize}km de tamanho e expessura`);
        } else if (command[1] == 'fila') {
            if (queue = ' ') {
                msg.reply('A fila está vazia!');
            } else {
                msg.reply(queue);
            }
        }
    }
})
