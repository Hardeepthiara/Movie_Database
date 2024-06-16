import Link from 'next/link';

const MovieCard = ({ movie }) => (
  <div className="movie-card">
    <img src={movie.Poster} alt={movie.Title} />
    <h2>{movie.Title}</h2>
    <p>{movie.Year}</p>
    <Link href={`/movie?id=${movie.imdbID}`}>
      <div className="link-wrapper">
        <span>More Details</span>
      </div>
    </Link>
  </div>
);

export default MovieCard;
