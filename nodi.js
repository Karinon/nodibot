#!/usr/local/bin/node

var config = {
    userName: "nodi",
    realName: "geh weg",
    channels: ["#stipkas"],
    server: "irc.iz-smart.net",
    botName: "nodi",
    port: 6697,
    secure: true,
    selfSigned: true,
    certExpired: true,
    autoRejoin: true
};

var sleep = require('sleep');
var irc = require('irc');

var verwirrtes = ["ups", "oh hi", "oh oh...", "na sowas", "oh.. du warst nicht gemeint", "oh.. hi", "argh, mist", "oh scheisse", "oh verdammt", "wenn man vom teufel spricht", "gutes timing", "hm, das ist jetzt unangenehm", "oh, peinlich.."];
var gruesse = ["hi", "hallo", "tag", "moin", "mahlzeit", "tach", "hallo fans"];
var boeseabschiede = ["und tschüss", "na endlich", "plötzlich riechts hier viel besser", "na also", "endlich weg", "auf nimmerwiedersehen", "dieser typ...", "ja, hau doch ab", "ja, geh doch", "genau, raus hier"];
var liebeabschiede = ["och :(", "verlass mich noch nicht :(", "schade", "oh nein :(", "bleib doch hier!", "wohin gehst du so schnell? :(", "ach schade", "den mag ich", "neeeein :("];


var beleidigungen = [
    " ist so ein depp",
    " ist so eine kleine dramaqueen",
    " ist ein schlappschwanz",
    " hat hier nichts beizutragen",
    " soll sich endlich verpissen",
    " ist eine ziemliche aufmerksamkeitshure",
    " ist ein ziemliches stück dreck, warum ist er noch hier?",
    " nervt",
    " ist ein wertloser Gnom",
    " keiner will den hier haben, aber sag ihm das nicht",
    " ist hier nicht sonderlich beliebt",
    " ist immer so",
    " weiß aber nichts davon?",
    " ist echt ein versager",
    " darf das aber nicht hören",
    " ist so ein spast",
    " ist ne fotze",
    " kann echt nichts",
    " hat sie nicht mehr alle",
    " hat wahrscheinlich psychische probleme",
    " kann mich mal kreuzweise",
    " mangelt es an esprit",
    " hat hier gar nichts zu melden",
    " braucht gar nicht mehr angekrochen zu kommen"
]; 

var lobe = [
    " ist ganz nett",
    " ist echt intelligent",
    " ist lieb",
    " mag fast jeder",
    " ist hier recht beliebt",
    " ist ziemich gebildet",
    " sieht glaube ich ganz hübsch aus",
    " ist zu gut für diese welt",
    " wird es noch weit bringen",
    " hat da wirklich talent",
    " ist ziemlich sexy",
    " ist wunderschön",
    " kann echt nett sein"
];

var eroeffnung = [
    "ja, ",
    "jo ",
    "absolut, ",
    "ernsthaft, ",
    "stimme 100%% zu, ",
    "volle zustimmung, ",
    "jeder wird mir da recht geben, ",
    "ja, der meinte neulich auch, ",
    "ich stimme da zu, ",
    "richtig, ",
    "korrekt, ",
    "absolut richtig, ",
    "wie gesagt, ",
    "da stimme ich absolut zu, ",
    "das sagen alle: "
];

var reaktionboese = [
    "hat jemand die null gewählt?",
    "was labert die denn schon wieder?",
    "so ein blödsinn",
    "totaler quatsch",
    "bist du wahnsinnig?",
    "gäääähn",
    "hackts?",
    "gehts noch?",
    "wie langweilig",
    "ach komm, das will keiner lesen",
    "ich kann mir das nicht länger durchlesen",
    "kann dem mal einer das maul stopfen?",
    "wir sind hier nicht bei knuddels...",
    "ruhe jetzt",
    "schnauze!",
    "es kann sprechen...",
    "immer der selbe blödsinn",
    "pff, blödsinn",
    "halt doch endlich die fresse",
    "schwachsinn",
    "was redest du so ein blech?",
    "kannst du auch mal was intelligentes sagen?",
    "keiner mag dich...",
    "ratte...",
    "schwein...",
    "-.-",
    "D:",
];

var reaktionlieb = [
    "stimmt",
    "du bist so klug!",
    "wow, so hab ich das noch nie gesehen :)",
    "du weißt echt viel",
    "haaach *_*",
    "du bist echt toll",
    "ich will dich nie verlieren :)",
    "hoffentlich bleibst du noch lange :)",
    "du bist so schön :)",
    "du bist so lieb <3",
    "erzähl mir mehr davon :)",
    "du bist einer der wenigen vernünftigen hier :)",
    "ich glaube ich mag dich :)"
];

var laune = -10;

var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
});
bot.addListener("registered", function(message) {
    console.log('Connected');
});
bot.addListener("motd", function(motd) {
    console.log('MOTD received');
});

function verbalLaune(laune) {
    if (laune < 0) {
        return "schlecht";
    } else {
        return "gut";
    }
}

function verabschieden(ziel) {
    var byebye = boeseabschiede[Math.floor(Math.random() * boeseabschiede.length)];
    var adieu = liebeabschiede[Math.floor(Math.random() * liebeabschiede.length)];
    if (laune < 0) {
        bot.say(ziel, byebye);
    } else {
        bot.say(ziel, adieu);
    }
}

function begruessen(ziel, person) {
    var beleidigung = beleidigungen[Math.floor(Math.random() * beleidigungen.length)];
    var liebe = lobe[Math.floor(Math.random() * lobe.length)];
    var start = eroeffnung[Math.floor(Math.random() * eroeffnung.length)];
    var oops = verwirrtes[Math.floor(Math.random() * verwirrtes.length)];
    switch (person) {
        case config.botName:
            console.log('successfully joined');
            break;

        default:
            if (Math.random() > 0.5) {
                if (laune < 0) {
                    sleep.sleep(2);
                    bot.say(ziel, start + person + beleidigung);
                    sleep.sleep(3);
                    bot.say(ziel, oops);
                    laune = laune + (100 * Math.random());
                } else {
                    bot.say(ziel, start + person + liebe);
                    laune = laune - (100 * Math.random());
                }
                break;
            }
    }
}

function reagieren(ziel, nachricht) {
    var antwortboese = reaktionboese[Math.floor(Math.random() * reaktionboese.length)];
    var antwortlieb = reaktionlieb[Math.floor(Math.random() * reaktionlieb.length)];

    if (Math.random() < 0.1) {
        if (laune < 0) {
            if (laune < 0) {
                sleep.sleep(2);
                bot.say(ziel, antwortboese);
                laune = laune + (100 * Math.random());
            } else {
                sleep.sleep(2);
                bot.say(ziel, antwortlieb);
                laune = laune - (100 * Math.random());
            }
        }
    }

    if (nachricht.indexOf(config.botName) > -1) {
        if (nachricht.indexOf("wie geht") == -1) {

            if (laune < 0) {
                sleep.sleep(2);
                bot.say(ziel, antwortboese);
            } else {
                sleep.sleep(2);
                bot.say(ziel, antwortlieb);
            }
        } else {
            sleep.sleep(2);
            bot.say(ziel, verbalLaune(laune));
            laune = laune - 5;
        }
    }

}


bot.addListener("topic", function(channel, topic, nick, message) {
    console.log("Topic for", channel + " is", topic);
    var gruss = gruesse[Math.floor(Math.random() * gruesse.length)];
    bot.say(channel, gruss);
});

bot.addListener("error", function(message) {
    console.log("Error: ", message);
});

bot.addListener("join", function(channel, who) {
    begruessen(channel, who); 
});

bot.addListener("message", function(from, to, text, message) {
    reagieren(to,text); 
});

bot.addListener("kick", function(channel, nick, by, reason, message) {
    verabschieden(channel);
    laune = laune + 5;
});

bot.addListener("quit", function(nick, reason, channels, message) {
    verabschieden(channels);
});

