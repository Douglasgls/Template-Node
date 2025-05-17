import PixService  from '../pix/PixService.js';
import User from '../models/users.js';
import Order from '../models/order.js';
import AuthService from '../pix/authService.js';



export class CobController {
    hello(req, res) {
        res.send('Cob funcionando 🎉');
    }

    async cobPixImediate(req, res) {
        const user = req.user;

        const userDB = await User.findOne({
            attributes: ['id', 'nome', 'email','CPF','position', 'imgLink', 'createdAt', 'updatedAt'],
            where: { id: user.id }
        })

        if(!userDB){
            return res.status(400).json({message: "Email not exist"})
        }

        const order = await Order.findOne({where: { userId: user.id }})

        if(!order){
            return res.status(400).json({message: "Order not exist"})
        }

        if(order.status !== 'PENDING'){ // Lembrar de alterar para PENDING no model order
            return res.status(400).json({message: "Order not pending"})
        }

        if(!order.cartId){
            return res.status(400).json({message: "Cart not exist"})
        }

        console.log(userDB.CPF)
        console.log(userDB.nome)
        console.log(order.total)

        const authService = new AuthService();
        const pixService = new PixService(authService);

        const cobranca = await pixService.setCobPix(3600, userDB.CPF, userDB.nome,'0.01'); // Lembrar de tratar o dinheiro da cobranca

        const token = await authService.getValidToken(); 
        const qrCode = await pixService.getQrCode(cobranca.loc.id,token);

        return res.status(200).json({
            qrcode: qrCode.qrcode,
            imagemQrcode: qrCode.imagemQrcode,
            txid: cobranca.txid,
            locId: cobranca.loc.id
        });
    }
}