const fs = require('fs');
const ejs = require('ejs');
const Promise = require('bluebird');
const mkdirp  = Promise.promisify(require('mkdirp'));
const writeFile = Promise.promisify(fs.writeFile);
const readFile  = Promise.promisify(fs.readFile);
const rename = Promise.promisify(fs.rename);

module.exports = async function(data) {

    data = data.reduce((prev, next) => {
        return prev.concat(next.res);
    }, []);

    try {
        await mkdirp('./publish/');
        let tmpl = await readFile('./index.html');
        let html = ejs.render(tmpl.toString(), {data: JSON.stringify(data)});
        
        try {
            await rename('./publish/index.html', './publish/index_' + (Date.now()) + '.html');
        } catch (e) {}

        await writeFile('./publish/index.html', html, 'utf-8');
        await writeFile('./publish/db.json', JSON.stringify(data, null, 4), 'utf-8');
    } catch (e) {
        console.log(e);
    }
};
