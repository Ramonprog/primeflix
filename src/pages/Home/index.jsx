import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    try {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "7c2648c14a71133c026e52e8531ca450",
          language: "pt-BR",
          page: 1,
        },
      });
      setMovies(response.data.results.slice(0, 10));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMovies();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="list-movies">
        {movies.map((item) => (
          <article key={item.id}>
            <strong>{item.title}</strong>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              alt="file em cartaz"
            />
            <Link to={`/filme/${item.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
