import movieService from '../services/movieService.js';

const addMovie = async (req, res) => {
    try {
        const savedMovie = await movieService.addMovie(req.body, req.file);
        res.status(200).json( {
            message: "movie created successfully", movie: savedMovie
        });
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while creating a movie" });
    }
};

const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const updatedData = req.body;

        const updatedMovie = await movieService.updateMovie(movieId, updatedData);

        res.status(200).json({
            message: "movie updated successfully", movie: updatedMovie 
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating a movie" 
        });
    }
}

const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;

        const deleteMovie = await movieService.deleteMovie(movieId);
        
        res.status(200).json({
            message: "movie deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting a movie" 
        });
    }
}

const getAllMovies = async (req, res) => {
    try {
        const getAllMovie = await movieService.getAllMovies();
        res.status(200).json({
            message: "all movies : ", getAllMovie
        });
    }catch (err) {
        res.status(500).json({
            message : err.message || "cannot get moviee"
        });
    }
}


export default { addMovie, updateMovie, deleteMovie, getAllMovies };