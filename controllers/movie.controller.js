const Movie = require("../models/movie.model");
const movieCtrl = {};

//Función que devuelve todas las películas
movieCtrl.getMovies = async (req, res) => {
  const movies = await Movie.find()
    .then((data) => res.status(200).json({ status: data }))
    .catch((err) => res.status(400).send({ status: err }));
};

movieCtrl.getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id)
    .then((data) => {
      if (data != null) res.status(200).json({ status: data });
      else res.status(404).json({ status: "Movie Not Found" });
    })
    .catch((err) => res.status(400).send({ status: err }));
};

movieCtrl.addMovie = async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save()
    .then((data) => {
      res.status(201).json({ status: "Movie Successfully Inserted" });
    })
    .catch((err) => res.status(400).send({ status: err }));
};

movieCtrl.updateMovie = async (req, res) => {
  const movie = req.body;
  await Movie.findByIdAndUpdate(req.params.id, { $set: movie }, { new: true })
    .then((data) => {
      if (data) res.status(200).json({ status: "Movie Successfully Updated" });
      else res.status(404).json({ status: "Movie Not Found" });
    })
    .catch((err) => res.status(400).send({ status: err }));
};

movieCtrl.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) res.status(200).json({ status: "Movie Successfully Deleted" });
      else res.status(404).json({ status: "Movie Not Found" });
    })
    .catch((err) => res.status(400).send({ status: err }));
};

movieCtrl.getGenres = async (req, res) => {
    const genres = await Movie.find().distinct("genres")
      .then((data) => res.status(200).json({ status: data }))
      .catch((err) => res.status(400).send({ status: err }));
  };

module.exports = movieCtrl;
