import AuthService from './AuthService.js';
import PixService  from './PixService.js';

const authService = new AuthService();
const pixService = new PixService(authService);

const cobranca = await pixService.setCobPix(3600, '12345678909', 'João da Silva', '150.00');

console.log(cobranca);