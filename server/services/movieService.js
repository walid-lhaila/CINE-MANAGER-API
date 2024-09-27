    import movieDb from "../model/movieModel.js";
    import dotenv from 'dotenv';
    import minio from '../../minio.js';

    dotenv.config();

    class MovieService {

        async addMovie(movieData) {
            const { title, description, picture } = movieData;

            const movie = new movieDb ({
                title,
                description,
                picture
            });

            if (file) {
                const posterUrl = await this.uploadMoviePoster(file);
                    movie.picture = posterUrl;
            }

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

        async uploadMoviePoster(file) {
            const bucketName = 'cinemanager';
            const fileName = `posters/${file.originalname}`;

            const exists = await minio.bucketExists(bucketName);
            if (!exists) {
                await minio.makeBucket(bucketName, 'us-east-1');
            }


            await minio.fPutObject(bucketName, fileName, file.path);
            return `http://127.0.0.1:9000/${bucketName}/${fileName}`;
        }
    }



    export default new MovieService();