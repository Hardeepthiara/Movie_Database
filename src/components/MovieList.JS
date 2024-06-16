import MovieCard from './MovieCard';

const MovieList = ({ movies }) => (
  <div className="movie-list">
    {movies.map((movie) => (
      <MovieCard key={movie.imdbID} movie={movie} />
    ))}
  </div>
);

export default MovieList;
//add movie list