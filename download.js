
require("babel-register");
require('babel-polyfill');

const download = require('download');
const fetch = require('./lib/fetch');
const db = require('./publish/db');

const init = async function (source) {
    var queue = [];

    db.forEach((item) => {
        queue.push(item.url);
    });

    queue.length && download(queue.shift(), './publish/', function a() {
        queue.length && download(queue.shift(), './publish/', a);
    });
}

init();
