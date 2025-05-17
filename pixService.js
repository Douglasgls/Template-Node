import fs from 'fs';
import https from 'https';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


export class PixService{
    constructor(){
        this.clientId = process.env.EFI_CLIENT_ID;
        this.clientSecret = process.env.EFI_CLIENT_SECRET;
        this.urlToken = process.env.EFI_URL_TOKEN_HOM;

        this.certHom = fs.readFileSync('./certs/homologacao-757630-Template-Node.p12');
        this.certProd = fs.readFileSync('./certs/producao-757630-Template-Node.p12');

        this.token = null;
        this.tokenExpiresAt = null;
        
    }

    async getToken(){
        var data = JSON.stringify({ grant_type: "client_credentials" });

        var data_credentials = process.env.EFI_CLIENT_ID + ":" + process.env.EFI_CLIENT_SECRET;

        var auth = Buffer.from(data_credentials).toString("base64");

        const agent = new https.Agent({
        pfx: this.certHom,
        passphrase: "",
        });

        var config = {
            method: "POST",
            url: process.env.EFI_URL_TOKEN_HOM,
            headers: {
              Authorization: "Basic " + auth,
              "Content-Type": "application/json",
            },
            httpsAgent: agent,
            data: data,
          };

        try {
            const response = await axios(config);
            const token = response.data.access_token;
            const expiresAt = new Date().getTime() + response.data.expires_in * 1000;
    
            this.token = token;
            this.tokenExpiresAt = expiresAt;
    
            return token;
        } catch (error) {
            console.error("Erro ao obter token:", error);
            return null;
        }
    }

    async setCob(calendar,cpf,name,value){
        const payload = {
            calendario: {
              expiracao: calendar
            },
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

        const agent = new https.Agent({
            pfx: this.certHom,
            passphrase: "",
            });

        const config = {
            method: "POST",
            url: process.env.EFI_URL_PIX,
            headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
            },
            httpsAgent: agent,
            data: payload,
        };

        try {
            const response = await axios(config);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter token:", error);
            return null;
        }
    }

    async getQrCode(cobId){
        const agent = new https.Agent({
            pfx: this.certHom,
            passphrase: "",
            });

        const config = {
            method: "GET",
            url: process.env.EFI_URL_HUM_BASE + "/v2/loc/" + cobId + "/qrcode",
            headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
            },
            httpsAgent: agent,
        };

        try {
            const response = await axios(config);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter token:", error);
            return null;
        }
    }
} 

// const pixService = new PixService();

// const token = await pixService.getToken();

// const cob = await pixService.setCob(3600, '12345678909', 'Francisco da Silva', '124.45');

// if (cob?.loc?.id) {
//     const qrCode = await pixService.getQrCode(cob.loc.id);
//     console.log("--------------" + cob.loc.id + "--------------");
//     console.log(qrCode);
//   } else {
//     console.error("ID do QR Code não encontrado.");
//   }