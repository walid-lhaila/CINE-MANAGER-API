    import movieDb from "../model/movieModel.js";
    import dotenv from 'dotenv';

    dotenv.config();

    class MovieService {

        async addMovie(movieData) {
            const { title, description } = movieData;

            const movie = new movieDb ({
                title,
                description
            });

            return await movie.save();
        }


        async updateMovie(movieId, updatedData) {

            const updateMovie = await movieDb.findByIdAndUpdate(movieId, updatedData, { new: true });

            if(!updatedData) {
                throw new Error (`movie with ID ${movieId} not found`);
            }
            return updateMovie;
        }


        async deleteMovie(movieId) {
            const deleteMovie = await movieDb.findByIdAndDelete(movieId);

            return deleteMovie;
        }

        async getAllMovies() {
            const movies = await movieDb.find();
            return movies;
        }
    }



    export default new MovieService();