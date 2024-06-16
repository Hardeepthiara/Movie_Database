"use client"; // This is a client component 👈🏽
import { useState } from "react";
import axios from 'axios';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchMovies = async (page = 1) => {
    try {
      //https://www.omdbapi.com/?s=kabhi&page=1&apikey=74476016
      const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
      const encodedQuery = encodeURIComponent(query);

      const url = `https://www.omdbapi.com/?s=${encodedQuery}&page=${page}&apikey=${apiKey}`;
    console.log('API Request URL:', url);

    const response = await axios.get(url);
    console.log('API Response:', response.data);

      //const response = await axios.get(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`);
      setMovies(response.data.Search || []);
      setTotalPages(Math.ceil(response.data.totalResults / 10));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies();
  };

  return <>
    <div className="container mx-auto px-4 py-8">
      <nav className="flex justify-between items-center">
        <a className="text-lg md:text-xl font-black" href="/">
        Stream Search
        </a>
        <span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 w-10"
            href="https://github.com/Hardeepthiara/Movie_Database"
          >
            <svg
              stroke="currentColor"
              fill="black"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-base"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.68c-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.12-1.49-1.12-1.49-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.35-2.24-.25-4.6-1.12-4.6-5.01 0-1.1.39-2 .98-2.7-.1-.25-.43-1.28.09-2.66 0 0 .84-.27 2.75 1.03.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.3 2.75-1.03 2.75-1.03.52 1.38.19 2.41.09 2.66.59.69.98 1.59.98 2.7 0 3.89-2.36 4.76-4.6 5.01.36.31.68.92.68 1.86v2.77c0 .26.18.57.69.48C19.13 20.16 22 16.41 22 12c0-5.52-4.48-10-10-10z"
              ></path>      
            </svg>
          </a>
        </span>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Search for movies, tv shows, and more!</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="form-control border-0 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="btn btn-primary ml-2"
          >
            Search
          </button>
        </div>
      </form>
      <MovieList movies={movies} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={searchMovies}
        />
      )}
    </div>
</>;
};