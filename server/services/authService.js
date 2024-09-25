import userDb from '../model/usersModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class AuthService {

    async registerClient(clientData) {
        const { name, email, password } = clientData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const client = new userDb({
            name, 
            role : 'client',
            email,
            password : hashedPassword
        });

        return await client.save();
    }

    async login (email, password) {
        const user = await userDb.findOne({ email });
        if(!user) throw new Error ("User Not Found!");

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new Error ("Invalid Credentials!");

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        return { token, role: user.role };
    }
}

export default new AuthService();