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
                attributes: ['id', 'nome', 'email', 'position', 'imgLink', 'createdAt', 'updatedAt'],
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
                attributes: ['id', 'nome', 'email', 'position', 'imgLink', 'createdAt', 'updatedAt'],
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

        for (const [key, value] of Object.entries(req.body)) {
            if (userProfile[key] !== value) {
                if(key === 'password') {
                    userProfile[key] = await utils.hashPassword(value, 10);
                }

                if(key === 'email'){
                    const validEmail = await User.findOne(
                        {
                            attributes: ['id', 'nome', 'email', 'position', 'imgLink', 'createdAt', 'updatedAt'],
                            where: {email: value}
                        })
                    if(validEmail){
                        return res.status(400).json({message: "Email already exist"});
                    }
                }

                userProfile[key] = value;
            }
        }

        userProfile.updatedAt = new Date();

        await User.update(userProfile, { where: { email: user.email } });

        res.json({ userProfile, message: "Perfil atualizado com sucesso" });
    }

    async AllUsers(req, res) {
        const users = await User.findAll();
        users.forEach(user => {
            user.password = undefined
        })
        res.json({ users });
    }
}