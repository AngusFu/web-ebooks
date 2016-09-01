const fs = require('fs');
const Promise = require('bluebird');
const mkdirp  = Promise.promisify(require('mkdirp'));
const writeFile = Promise.promisify(fs.writeFile);
const readFile  = Promise.promisify(fs.readFile);
const rename = Promise.promisify(fs.rename);

const ejs = require('ejs');
const render = function(filename, data, options = {}) {
    return new Promise(function(resolve, reject) {
            console.log(filename, data, options);
        (filename, data, options, function(err, str){
            if (err) reject();
            resolve(str);
        });      
    });
};

module.exports = async function(data) {
    try {
        await mkdirp('./publish/');
        let tmpl = await readFile('./index.html');
        let html = ejs.render(tmpl.toString(), {data: data});
        
        try {
            await rename('./publish/index.html', './publish/index_' + (Date.now()) + '.html');
        } catch (e) {}

        await writeFile('./publish/index.html', html, 'utf-8');
        
        // temp
        data = data.reduce((prev, next) => {
            return prev.concat(next.res);
        }, []);

        await writeFile('./publish/db.json', JSON.stringify(data, null, 4), 'utf-8');
    } catch (e) {
        console.log(e);
    }
};