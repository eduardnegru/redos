const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "index.html"))
);

app.get("/validate", (req, res) => {
    console.log("Received request")
    const { str } = req.query;
    let regex;

    // Regex matches all strings with repeating ab characters. For example ab, abab, ababab 
    if (regexType === VULNERABLE)
        regex = /^(\w+\s?)*$/;
    else
        regex = /^((?=(\w+))\2\s?)*$/;
    
    const match = regex.test(str);
    
    if (match) {
        res.json({
            message: "The string matches"
        });
    } else {
        res.json({
            message: "The string does not match"
        });
    }
});

const port = Number(process.env.PORT) || 3000;
const args = process.argv.slice(2);

const VULNERABLE = "vulnerable"
const NOT_VULNERABLE = "not-vulnerable"

if (args.length !== 1) {
    console.log("Only one argument is expected. Provided " + args.length);
    return;
}

const regexType = args[0]

if (regexType !== VULNERABLE && regexType !== NOT_VULNERABLE) {
    console.log(`Argument must be either ${VULNERABLE} or ${NOT_VULNERABLE}`);
    return;
}

const timeout = require('connect-timeout');
app.use(timeout('5s'));

const server = app.listen(port, () =>
    console.log(`listening on http://localhost:${port}`)
);
server.setTimeout(500000);
