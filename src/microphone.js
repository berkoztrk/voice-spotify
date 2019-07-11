"use strict";
const speech = require('@google-cloud/speech'),
    record = require('node-record-lpcm16'),
    config = require("../config")

class Microphone {

    constructor(speechClient) {
        this._speechClient = speechClient;
        this._config = config.audioRecordConfig;
        this._request = {
            config: this._config,
            interimResults: true
        }
        this._recognizeStream = null;
    }

    _initRecognizeStream() {
        const self = this;
        self._recognizeStream = self._speechClient
            .streamingRecognize(self._request)
            .on('error', console.error)
            .on('data', self._onStreamData.bind(this));
    }

    _onStreamData(data) {
        console.log(
            data.results[0] && data.results[0].alternatives[0] ?
            `Transcription: ${data.results[0].alternatives[0].transcript}\n` :
            `\n\nReached transcription time limit, press Ctrl+C\n`
        )
    }

    _startRecord() {
        const self = this;
        if (!self._recognizeStream)
            throw "Recognize stream should be initialized before calling startRecord.";
        record
            .start({
                sampleRate: self._config.sampleRateHertz,
                threshold: 0, //silence threshold
                recordProgram: 'rec', // Try also "arecord" or "sox"
                silence: '5.0', //seconds of silence before ending
                verbose: false,
                channels: 1
            })
            .on('error', console.error)
            .pipe(self._recognizeStream);
    }

    record() {
        const self = this;
        self._initRecognizeStream();
        self._startRecord();
        console.log('Listening, press Ctrl+C to stop.');
    }

}

module.exports = Microphone;