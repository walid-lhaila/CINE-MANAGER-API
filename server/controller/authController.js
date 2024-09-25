import { addTokenToBlacklist } from "../middleware/tokenBlacklist.js";
import authService from "../services/authService.js";


const create = async (req, res) => {
   try {
    const savedClient = await authService.registerClient(req.body);
    res.status(201).json({ message: "client registered successfully", client: savedClient});
   } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while creating a client" });
   }
};


const login = async (req, res) => {
    try {
        const { token, role } = await authService.login(req.body.email, req.body.password);
         if (role === "admin") {
            return res.status(200).json({ message: "Admin Logged In Successfully", token});
         } else {
            return res.status(200).json({ message: "Client logged in successfully", token });
         }
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
}

const logout = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    addTokenToBlacklist(token);

    res.status(200).send({ message: "logged out successfuly."});
};

export default { create, login, logout };