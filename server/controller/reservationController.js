import reservationService from "../services/reservationService.js";
import reservationDb from "../model/reservationModel.js";


const reserveSeat = async (req, res) => {
        try {
            const { sessionId, seatNumber, userId } = req.body;

            const resevation = await reservationService.reserveSeat(sessionId, seatNumber, userId)
            res.status(200).json({
                message : `Seat number ${seatNumber} reserved successfully`,
                resevation,
            });
        } catch (err) {
            res.status(500).json({
                message: err.message || "Cannot reserved ",
            });
        }
};

const updateReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const updateData = req.body;

        const updatedReservation = await reservationService.updateReservation(reservationId, updateData);
        res.status(200).json({
            message: "reservation updated successfully", updatedReservation
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "cannot update reservation"
        });
    };
}

const deleteReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;

        const deleteResrvation = await reservationService.deleteReservation(reservationId);
        res.status(200).json({
            message: "reservation deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "cannot deleted this reservation"
        });
    }
}

export default { reserveSeat, updateReservation, deleteReservation };