const express = require("express");

const PORT = 3010;
const app = express();

app.use((req, res, next) => {
    // CSP provides different headers to control script loading
    // Allowed sources
    // eg. default-src img-src media-src font-src to which you can assign N no of values
    // for inine css you can give "unsafe-inline"
    // 
    // Script Nonces
    // To restrict user from only loading inline script with particular nonce/key
    // eg.script-src 'nonce-randomKey' //only script with nonce='randomKey'
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self';" +
        "script-src 'self' 'nonce-randomKey' 'unsafe-inline' http://unsecure.com;"
    );
    next();
})

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log(req.url);
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server started at http://locolhost:${PORT}`);
});