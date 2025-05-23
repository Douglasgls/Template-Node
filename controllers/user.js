import utils from "../utils/auth.js";
import User from "../models/users.js";

export class UserController {
    hello(req, res) {
        res.json({ message: "Hello World" });
    }

    async profile(req, res) {
        const user = await utils.getUserFromRequest(req);

        if (!user) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const isExistUser = await User.findOne(
            {
                attributes: ['id', 'nome', 'email','CPF','position', 'imgLink', 'createdAt', 'updatedAt'],
                where: {email: user.email}
            }
        );

        if(!isExistUser){
           return res.status(400).json({message: "Email not exist"})
        }

        const userProfile = isExistUser.get({ plain: true });

        userProfile.createdAt = userProfile.createdAt.toISOString().split('T')[0];
        userProfile.updatedAt = userProfile.updatedAt.toISOString().split('T')[0];

        res.json({ userProfile });
    }

    async updateProfile(req, res) {
        const user = await utils.getUserFromRequest(req);

        if (!user) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const isExistUser = await User.findOne(
            {
                attributes: ['id', 'nome', 'email', 'CPF','position', 'imgLink', 'createdAt', 'updatedAt'],
                where: {email: user.email}
            }
        );

        if(!isExistUser){
           return res.status(400).json({message: "Email not exist"})
        }

        if(isExistUser.email !== user.email){
            return res.status(401).json({message: "You can not change your email."});
        }

        const userProfile = isExistUser.get({ plain: true });
        let newEmail = false;
        for (const [key, value] of Object.entries(req.body)) {
            if (userProfile[key] !== value) {
                if(key === 'password') {
                    userProfile[key] = await utils.hashPassword(value, 10);
                }
                if(key === 'email'){
                    const validEmail = await User.findOne(
                        {
                            attributes: ['id'],
                            where: {email: value}
                        })

                        if(validEmail){
                            return res.status(400).json({message: "Email already exist"});
                        }

                    newEmail = true;
                }
                if(key === 'CPF'){
                    if(value.length !== 11){
                        return res.status(400).json({message: "Invalid CPF"});
                    }
                }
                userProfile[key] = value;
            }
        }

        var token = null
        if(newEmail){
            token = await utils.generatedToken({
                email: userProfile.email,
                position: userProfile.position
            })
        }
        
        userProfile.updatedAt = new Date();

        await User.update(userProfile, { where: { email: user.email } });

        if(newEmail){
            res.json({ userProfile, message: "Perfil atualizado com sucesso", token});
            return;
        }else{
            res.json({ userProfile, message: "Perfil atualizado com sucesso"});
            return;
        }
    }

    async AllUsers(req, res) {
        const users = await User.findAll();
        users.forEach(user => {
            user.password = undefined
        })
        res.json({ users });
    }
}