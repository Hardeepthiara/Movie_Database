// src/pages/movie.js
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
          const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
          const response = await axios.get(url);
          setMovie(response.data);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    // <div className="movie-detail">
    //   <h1>{movie.Title}</h1>
    //   <img src={movie.Poster} alt={movie.Title} />
    //   <p><strong>Year:</strong> {movie.Year}</p>
    //   <p><strong>Genre:</strong> {movie.Genre}</p>
    //   <p><strong>Plot:</strong> {movie.Plot}</p>
    //   <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
    // </div>
    <div className="container mt-4">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <Image
            src={movie.Poster}
            alt={movie.Title}
            className="img-fluid rounded-start"
            width={400}  // Specify the width of the image
            height={600} // Specify the height of the image
            />          
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{movie.Title}</h1>
              <p className="card-text"><strong>Year:</strong> {movie.Year}</p>
              <p className="card-text"><strong>Genre:</strong> {movie.Genre}</p>
              <p className="card-text"><strong>Plot:</strong> {movie.Plot}</p>
              <p className="card-text"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
