var drama = require('./resources/drama.json');
var Promise = require('bluebird');

var laune = -10;

function verbalLaune(laune) {
    if (laune < 0) {
        return "schlecht";
    } else {
        return "gut";
    }
}

function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}

exports.join = function(say) {
    var gruss = drama.gruesse[Math.floor(Math.random() * drama.gruesse.length)];
    say(gruss);
}

exports.verabschieden = function(say) {
    var byebye = drama.boeseabschiede[Math.floor(Math.random() * drama.boeseabschiede.length)];
    var adieu = drama.liebeabschiede[Math.floor(Math.random() * drama.liebeabschiede.length)];
    if (laune < 0) {
        say(byebye);
    } else {
        say(adieu);
    }
    laune = laune + 5;
}

exports.begruessen = function (person, botname, say) {
    var beleidigung = drama.beleidigungen[Math.floor(Math.random() * drama.beleidigungen.length)];
    var liebe = drama.lobe[Math.floor(Math.random() * drama.lobe.length)];
    var start = drama.eroeffnung[Math.floor(Math.random() * drama.eroeffnung.length)];
    var oops = drama.verwirrtes[Math.floor(Math.random() * drama.verwirrtes.length)];
    switch (person) {
        case botname:
            console.log('successfully joined');
            break;
        default:
            if (Math.random() > 0.5) {
                if (laune < 0) {
                  sleep(2)
                    .then(function() {
                      say(start + person + beleidigung)
                    })
                    .then(function() {
                      return sleep(3);
                    })
                    .then(function () {
                      say(oops);
                    })
                    laune = laune + (100 * Math.random());
                } else {
                    say(start + person + liebe);
                    laune = laune - (100 * Math.random());
                }
                break;
            }
    }
}

exports.dramaFunc = function (absender, botname, nachricht, say) {
  var antwortboese = drama.reaktionboese[Math.floor(Math.random() * drama.reaktionboese.length)]
  var antwortlieb = drama.reaktionlieb[Math.floor(Math.random() * drama.reaktionlieb.length)];
  if(antwortboese.startsWith("%")) {
    antwortboese = absender + antwortboese.substring(1);
  }
  if(antwortlieb.startsWith("%")) {
    antwortlieb = absender + antwortlieb.substring(1);
  }
  if (Math.random() < 0.1) {
    if (laune < 0) {
      if (laune < 0) {
        sleep(2)
          .then(function() {
            say(antwortboese);
          })
        laune = laune + (100 * Math.random());
      } else {
        sleep(2)
          .then(function() {
            say(antwortlieb);
          })

        laune = laune - (100 * Math.random());
      }
    }
  }
  if (nachricht.indexOf(botname) > -1) {
    if (nachricht.indexOf("wie geht") == -1) {
      if (laune < 0) {
        sleep(2)
          .then(function() {
            say(antwortboese);
          })
      } else {
        sleep(2)
          .then(function() {
            say(antwortlieb);
          })
      }
    } else {
      sleep(2)
        .then(function() {
          say(verbalLaune(laune));
          laune = laune - 5;
        })
    }
  }
}
