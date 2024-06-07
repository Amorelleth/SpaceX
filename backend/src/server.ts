// index.js
const express = require('express');
const https = require('https');

const app = express();
const port = 3000;

// Function to fetch data from SpaceX API using https module
const fetchLaunches = () => {
    return new Promise((resolve, reject) => {
        https.get('https://api.spacexdata.com/v4/launches', (res: any) => {
            let data = '';

            // A chunk of data has been received.
            res.on('data', (chunk: any) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            res.on('end', () => {
                resolve(JSON.parse(data));
            });

        }).on('error', (err: any) => {
            reject(err);
        });
    });
};

// Endpoint to fetch launches from SpaceX API
app.get('/api/launches', async (req: any, res: any) => {
    try {
        const launches = await fetchLaunches();
        res.json(launches);
    } catch (error) {
        res.status(500).send('Error fetching launches');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});