const URL = require('url');
const cheerio = require('cheerio');
const getdate = require('./getdate');
const request = require('./request');

module.exports = async function(option) {
    try {
        let res = await request(option.url);
        let $ = cheerio.load(res.text);
        let columns = Array.from($(option.column)).slice(0, +option.max || 10);

        return columns.map((item) => {
            let $item = $(item);

            let href  = $item.find(option.href).attr('href') || '';
            let title = $item.find(option.title).text() || '';
            let summary = $item.find(option.summary).text() || '';
            let time  = getdate($item.find(option.time).text() || '');

            return {
                href : URL.resolve(option.url, href.trim()),
                title: title.trim(),
                summary: summary.trim(),
                time : time
            };
        });
    } catch (e) {
        return null;
    }
};

