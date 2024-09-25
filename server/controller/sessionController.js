import sessionService from "../services/sessionService.js";


const addSession = async (req, res) => {
    try {
        const savedSeesion = await sessionService.addSession(req.body);
        res.status(200).json({
            message: "session created successfully", savedSeesion
        });
    } catch (err) {
        res.status(500).josn({
            message : err.message || "Cannot create a session"
        });
    }

};

const updatedSession = async (req, res) => {
    try {
        const sessionId = req.params.id;
        const updatedData = req.body;

        const updatedSession = await sessionService.updateSession(sessionId, updatedData);

        res.status(200).json({
            message : "Session update Successfully", updatedSession
        });
    } catch (err) {
        res.status(500).josn({
                    message : err.message || "Cannot create a session"
                });  
      };
}

const deleteSession = async (req, res) => {
    try {
        const sessionId = req.params.id;

        const deleteSession = await sessionService.deleteSession(sessionId);

        res.status(200).json({
            message: "session deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting a session" 
        });
    }
}

const getAvailableSessions = async (req, res) => {
    try {
        const getSession = await sessionService.getAvailableSessions();
        res.status(200).json({
            message : "sessions : ", getSession
        });
    } catch (err) {
        res.satatus(500).json({
            message : err.message || "cannot get availble session"
        });
    }
}

export default { addSession, updatedSession, deleteSession, getAvailableSessions };