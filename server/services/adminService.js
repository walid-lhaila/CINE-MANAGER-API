import userDb from '../model/usersModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

class AdminService {

    async addAdmin(adminData) {
        const { name, email, password } = adminData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new userDb ({
            name,
            role : 'admin',
            email,
            password : hashedPassword
        });

        return await admin.save();
    }

    async updateAdmin(adminId, updateData) {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updateAdmin = await userDb.findByIdAndUpdate(adminId, updateData, { new: true});

        if(!updateData) {
            throw new Error(`admin with ID ${adminId} not found`);
        }

        return updateAdmin;
    }

    async deleteAdmin(adminId) {
        const deleteAdmin = await userDb.findByIdAndDelete(adminId);

        if(!deleteAdmin) {
            throw Error (`Admin With ID ${adminId} Not Found`)
        }

        return deleteAdmin;
    }

    async getAllAdmins() {
        const admins = await userDb.find({ role: 'admin' });
        return admins;
    }

}

export default new AdminService();