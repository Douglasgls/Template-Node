import fs from 'fs';
import https from 'https';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export function createHttpClient(token) {
    const cert = fs.readFileSync('./certs/homologacao-757630-Template-Node.p12');

    const agent = new https.Agent({
        pfx: cert,
        passphrase: "",
    });

    return axios.create({
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
}
