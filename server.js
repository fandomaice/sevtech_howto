const express = require('express')
const http = require('http');
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('test/keys/key.pem'),
    cert: fs.readFileSync('test/keys/cert.pem')
};

const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => {
    console.log(`home page: ${req}`);
    fs.readFile('public/SevTechAgesInstall.txt', (err, data) => {
        if (err) {
            let msg = 'failed to read howto file from disk'
            console.log(msg);
            res.writeHead(500);
            res.end(msg);
        }
        else {
            res.writeHead(200);
            res.end(data);
        }
    });
}); 
app.listen(80);

https.createServer(options, app).listen(443);

console.log('server successfully started :)');