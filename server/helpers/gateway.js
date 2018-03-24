const http = require('http');

function get(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(JSON.parse(data));
                resolve(data)
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    })

}

exports.get = get;