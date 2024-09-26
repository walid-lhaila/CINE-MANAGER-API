import sessionDb from '../model/sessionModel.js';
import reservationDb from '../model/reservationModel.js';

class ReservationService {

    async reserveSeat(sessionId, seatNumber, userId) {
        const session = await sessionDb.findById(sessionId);
        if(!session) {
            throw new Error ('Session Not Found');
        }

        const seat = session.seats.find(s => s.seatNumber === seatNumber);
        if(!seat) {
            throw new Error (`seats number ${seatNumber} not found`);
        }

        if(seat.isReserved) {
            throw new Error (`seat number ${seatNumber} is already reserved`);
        }

        seat.isReserved = true;

        await session.save();

        const reservation = new reservationDb ({
            sessionId,
            userId,
            seatNumber,
        });

        return await reservation.save();
    }

    async updateReservation(reservationId, updateData) {
        const reservation = await reservationDb.findById(reservationId);
        if(!reservation) {
            throw new Error ('Reservation Not Found');
        }

        const session = await sessionDb.findById(reservation.sessionId);
        if(!session) {
            throw new Error ('Session Not Found');
        }

        if(updateData.seatNumber && updateData.seatNumber !== reservation.seatNumber) {
            const seat = session.seats.find(s => s.seatNumber === updateData.seatNumber);
            if(!seat) {
                throw new Error (`seat number ${updateData.seatNumber} not found`);
            }
            if(seat.isReserved) {
                throw new Error (`seat number ${updateData.seatNumber} is already reserved`);
            }

            const oldSeat = session.seats.find(s => s.seatNumber === reservation.seatNumber);
            if(oldSeat) {
               oldSeat.isReserved = false;
            }

            seat.isReserved = true;
            await session.save();
        }

        const updateReservation = await reservationDb.findByIdAndUpdate(reservationId, updateData, { new: true });

    }

    async deleteReservation(reservationId) {
        const reservation = await reservationDb.findByIdAndDelete(reservationId);

        if(!reservation) {
            throw new Error ('Reservation Not Found');
        }

        const session = await sessionDb.findById(reservation.sessionId);
        if(!session) {
            throw new Error ('Session Not Found');
        }

        const currentTime = new Date();
        const sessionDateTime = new Date(session.startTime);

        const timeDifference = sessionDateTime - currentTime;
        const oneHour = 60 * 60 * 1000;

        if(timeDifference <= oneHour) {
            throw new Error ('Cannot Delete This Reservation The Session Start Less Than One Hour')
        };

        const seat = session.seats.find(s => s.seatNumber === reservation.seatNUmber);
        if (seat) {
            seat.isReserved = false;
            await session.save();
        }

        await reservationDb.findByIdAndDelete(reservationId);
        return { message: "Reservation deleted successfully"};
    }
}


export default new ReservationService();