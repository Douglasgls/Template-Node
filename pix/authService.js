import fs from 'fs';
import https from 'https';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default class AuthService{
    constructor(){
            this.clientId = process.env.EFI_CLIENT_ID;
            this.clientSecret = process.env.EFI_CLIENT_SECRET;
            this.urlToken = process.env.EFI_URL_TOKEN;
    
            this.certHom = fs.readFileSync('./certs/homologacao-757630-Template-Node.p12');
            this.certProd = fs.readFileSync('./certs/producao-757630-Template-Node.p12');
    
            this.token = null;
            this.tokenExpiresAt = null;
        }

    async getTokenPixAPI(){
            var data = JSON.stringify({ grant_type: "client_credentials" });
    
            var data_credentials = process.env.EFI_CLIENT_ID + ":" + process.env.EFI_CLIENT_SECRET;
    
            var auth = Buffer.from(data_credentials).toString("base64");
    
            const agent = new https.Agent({
            pfx: this.certHom,
            passphrase: "",
            });
    
            var config = {
                method: "POST",
                url: process.env.EFI_URL_TOKEN,
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

        async getValidToken() {
            if (!this.token || Date.now() >= this.tokenExpiresAt) {
                return await this.getTokenPixAPI();
            }
            return this.token;
        }
}