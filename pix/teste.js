import AuthService from '../pix/authService.js';
import PixService  from './PixService.js';

const authService = new AuthService();
const pixService = new PixService(authService);

const cobranca = await pixService.setCobPix(3600, '12345678909', 'douglas paz da silva', '0.01');

const token = await authService.getValidToken(); 
const qrCode = await pixService.getQrCode(cobranca.loc.id,token);

console.log(qrCode);