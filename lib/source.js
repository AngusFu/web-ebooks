// let data = require('./meta.json');

var data = {};
let i = 0;
while(i++< 160) {
    data[i] = {
        // "url": `http://www.allitebooks.com/page/${i}/?s=JavaScript`,
        "url": `http://www.allitebooks.com/web-development/page/${i}`,
        "column": ".entry-body",
        "href": ".entry-title a",
        "title": ".entry-title a",
        "time": ".entry-meta",
        "max": 20
    }
};

let keys = Object.keys(data);

let source = {
    keys,
    length: keys.length
};

source.map = function(callback) {
    let i = 0, ret = [];
    for (let k in data) {
        ret.push(callback(k, data[k]));
    }
    return ret
};

source.get = function(key) {
    return data[key];
};
module.exports = source;
