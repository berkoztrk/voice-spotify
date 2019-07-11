"use strict";
const speech = require('@google-cloud/speech');
const fs = require('fs');

class Client {
    constructor() {
        this._client = new speech.SpeechClient();
    }

    get client() {
        return this._client;
    }
}

module.exports = Client;