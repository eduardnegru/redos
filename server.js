const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "index.html"))
);

app.get("/validate", (req, res) => {
    req.setTimeout(10000);
    const { str } = req.query;

    const badRegex = /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/;
    const goodRegex = /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/;
    
    const match = badRegex.test(str);
    
    if (match) {
        res.json({
            message: "The e-mail is correct"
        });
    } else {
        res.json({
            message: "The e-mail is not correct"
        });
    }
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () =>
    console.log(`listening on http://localhost:${port}`)
);
