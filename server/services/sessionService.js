import sessionDb from '../model/sessionModel.js';
import dotenv from 'dotenv';

dotenv.config();

class SessionService {

    async addSession(sessionData) {
        const { startTime, endTime, movieId, hallId, price } = sessionData;

        const session = new sessionDb ({
            startTime,
            endTime,
            movieId,
            hallId,
            price
        });

        return await session.save();
    }

    async updateSession(sessionId, updatedData) {
        const updateSession = await sessionDb.findByIdAndUpdate(sessionId, updatedData, { new: true });
        if(!updatedData) {
            throw new Error (`session with ID ${sessionId} not found`);
        }
        return updateSession;
    }

    async deleteSession(sessionId) {
        const deleteSession = await sessionDb.findByIdAndDelete(sessionId);
        return deleteSession;
    }

    async getAvailableSessions() {
        const getSessions = await sessionDb.find({ availability : true});
        return getSessions;
    }
}


export default new SessionService();