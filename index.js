const Client = require("./src/client"),
    Microphone = require("./src/microphone");

class VoiceSpotify {
    constructor() {
        this._client = new Client();
        this._microphone = new Microphone(this._client.client);
    }

    start() {
        this._microphone.record();
    }
}

const vs = new VoiceSpotify();
vs.start();

// var fs = require('fs')
// var record = require('node-record-lpcm16')

 
// var file = fs.createWriteStream('test.wav', { encoding: 'binary' })
 
// record.start({
//   sampleRate : 44100,
//   verbose : true,
//   recordProgram : 'sox'
// })
// .pipe(file)