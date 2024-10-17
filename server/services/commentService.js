import movieDb from "../model/movieModel.js";

class commentService {

        async addComment(movieId, clientId, comment) {
            const movie = await movieDb.findById(movieId);
            if(!movie) {
                throw new error(`Movie With Id ${movieId} Not Found`)
            }

            movie.comments.push({
                client: clientId,
                comment: comment,
                createdAt: new Date(),
            });

            return await movie.save();
        }
}

export default new commentService();