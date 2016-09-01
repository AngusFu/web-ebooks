
require("babel-register");
require('babel-polyfill');

const download = require('download');
const fetch = require('./lib/fetch');
const db = require('./publish/db');

const init = async function (source) {
    var queue = [];

    db.forEach(async (item) => {
        queue.push(await fetch({url: item.url, column: '..download-links a'}));
    });

    var downloadOne = async function() {
        var item = await queue.shift();
        item && download(item.url, './publish/', function () {
            downloadOne();
        });
    };

    downloadOne();
}

init();
