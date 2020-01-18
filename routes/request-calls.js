const request = require('request');

function requestExternalApi() {
    const option = {
        url: 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=065d9c6eba8e893060612ca00107ea5c',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return new Promise((resolve, reject) => {
        request(option, (err, resp, body) => {
            if (err)
                reject(err);
            else{
                resolve(JSON.parse(resp.body));
            }
        });
    }); 
}

module.exports = {
    requestExternalApi
};