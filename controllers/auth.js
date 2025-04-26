import utils from "../utils/auth.js";
import User from "../models/users.js"

export class AuthController {
    hello(req, res) {
        res.json({ message: "Hello World" });
    }

    async registerUser(req, res) {
        const allowedPositions = ['ADMIN', 'SELLER'];

        const { name, email, password, position, imgLink } = req.body;

        if(!allowedPositions.includes(req.body.position)){
            return res.status(400).json({message: "position not allowed choice ADMIN or SELLER"})
        }

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        var isExist = await User.findOne({where: {email: email}});

        if(isExist){
            res.status(400).json({message: "Email already exist"})
        }

        const userCreated = {name, email, password,position:position}
        
        const passwordHash = await utils.hashPassword(password,10)

        const user = await User.create({nome: userCreated.name,email:userCreated.email,password: passwordHash,position:position, imgLink: imgLink});

        res.json({id: user.id, email, message: "Usuário criado com sucesso"});
    }

    async login(req, res) {
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({message:"required Email and Password"})
        }

        var isExistUser = await User.findOne({where: {email: email}});

        if(!isExistUser){
            res.status(400).json({message: "Email not exist"})
        }

        const match = await utils.compareHash(password,isExistUser.password)

        if(!match){
            res.status(401).json({message: "Not Authorized"})
        }

        const token = await utils.generatedToken({
            email:isExistUser.email,
            position:isExistUser.position
        })

        res.status(200).json({message:"Login realizado com sucesso.", token})
    }

    async refreshToken(req, res){
        const tokenUser = utils.getUserFromRequest(req);

        if (!tokenUser) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const refreshToken = await utils.generatedToken({
            email:tokenUser.email,
            position:tokenUser.position
        }) 

        res.status(200).json({message:"Token valido, tome um novo ",refreshToken})

    }
}