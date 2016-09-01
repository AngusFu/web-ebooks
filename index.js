
require("babel-register");
require('babel-polyfill');

const fetch = require('./lib/fetch');
const render = require('./render');

const init = async function (source) {
    let promises = source.map(function (key, item) {
        return {
            key,
            p: fetch(item)
        }
    });

    let results = [], i = 0;

    for (let promise of promises) {
        results.push({
            key: promise.key,
            url: source.get([promise.key])['url'],
            res: await promise.p
        });
    }

    await render(results);
}

const source = require('./lib/source');

init(source);

module.exports = init;