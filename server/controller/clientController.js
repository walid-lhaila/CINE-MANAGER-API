import clientService from "../services/clientService.js";

const getAllClients = (req, res) => {
    clientService.getAllClients()
    .then(clients => {
        res.status(200).json(clients)
    })
    .catch(error => {
        res.status(500).json({
            message : 'cannot get All Clients'
        });
    });
}


export default {getAllClients};