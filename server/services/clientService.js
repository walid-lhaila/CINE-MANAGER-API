import userDb from "../model/usersModel.js";

class ClientService {
    
    async getAllClients() {
        return userDb.find({role: 'client'})
        .then(clients => {
            return clients;
        })
        .catch(error => {
            throw error;
        });
    }
}

export default new ClientService();