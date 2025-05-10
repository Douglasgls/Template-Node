import fs from 'fs';
import https from 'https';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export function createHttpClient(token) {
    const certHomlog = fs.readFileSync('./certs/homologacao-757630-Template-Node.p12');
    const certProd = fs.readFileSync('./certs/producao-757630-Template-Node.p12');

    const agent = new https.Agent({
        pfx: certHomlog,
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
