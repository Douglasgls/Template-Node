import fs from 'fs';
import https from 'https';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import { createHttpClient } from './createHttpClient.js';

export default class PixService{

    constructor(authService){
        this.authService = authService;
        this.certHom = fs.readFileSync('./certs/homologacao-757630-Template-Node.p12');
        this.certProd = fs.readFileSync('./certs/producao-757630-Template-Node.p12');
    }

    async setCobPix(calendar,cpf,name,value){
        const token = await this.authService.getValidToken();
        const client = createHttpClient(token);


        const payload = {
            calendario: { expiracao: calendar },
            devedor: {
              cpf: cpf,
              nome: name
            },
            valor: {
              original: value
            },
            chave: process.env.EFI_PIX_KEY,
            solicitacaoPagador: "Informe o número ou identificador do pedido."
        }

        try {
            const send = await client.post(process.env.EFI_URL_PIX,payload);
            return send.data;
        } catch (error) {
            console.error("Erro ao obter token:", error);
            return null;
        }
    }

    async getQrCode(cobId, token){
        const agent = new https.Agent({
            pfx: this.certHom,
            passphrase: "",
            });

        const config = {
            method: "GET",
            url: process.env.EFI_URL_HUM_BASE + "/v2/loc/" + cobId + "/qrcode",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            httpsAgent: agent,
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter token:", error);
            return null;
        }
    }
}





