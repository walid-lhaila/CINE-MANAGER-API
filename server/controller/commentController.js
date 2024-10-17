import commentService from "../services/commentService.js";
import jwt from 'jsonwebtoken';


const addComment = async (req, res) => {
    try {
        const token = req.headers["authorization"]?.split(' ')[1];
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const clientId = decoded.id;

        const movieId =  req.params.id;
        const comment = req.body.comment;

        const updateMovie = await commentService.addComment(movieId, clientId, comment);

        res.status(200).json({
            message: "Comment Added Succeessfully",
            movie: updateMovie,
        });
    } catch (err) {
        res.status(500).json({
            message: "Cannot add comment to this movie: " + err.message,
        });
    }
};

const deleteComment = async (req, res) => {
    try  {
            const token = req.headers["authorization"]?.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const clientId = decoded.id;

            const movieId = req.params.movieId;
            const commentId = req.params.commentId;

            const updatedMovie = await commentService.deleteComment(movieId, commentId, clientId);

            res.status(200).json({
                mesaage: "Comment Deleted Succeessfullly",
                movie: updatedMovie,
            });
    }catch (error) {
        res.status(500).json({
            message: "Cannot Delete This Comment" + error.message
        });
    }
};


const updateComment = async (req, res) => {
    
}

export default {addComment, deleteComment};    