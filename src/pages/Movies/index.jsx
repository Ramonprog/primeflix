import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

import { toast } from "react-toastify";

const Movies = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const navgate = useNavigate();

  const getDetails = async () => {
    try {
      const response = await api.get(`/movie/${id}`, {
        params: {
          api_key: "7c2648c14a71133c026e52e8531ca450",
          language: "pt-BR",
          page: 1,
        },
      });
      setMovieDetail(response.data);
    } catch (error) {
      console.log(error.message);
      navgate("/");
      return;
    }
  };

  useEffect(() => {
    getDetails();
    setLoading(false);
  }, []);

  const favoriteMovie = () => {
    const myList = localStorage.getItem("@primeflix");

    let savedMovies = JSON.parse(myList) ? JSON.parse(myList) : [];

    const hasMovies = savedMovies.some((item) => item.id === movieDetail.id);

    if (hasMovies) {
      toast.warn("Este filme já está na sua lista");
      return;
    }

    savedMovies.push(movieDetail);
    localStorage.setItem("@primeflix", JSON.stringify(savedMovies));

    toast.success("filme salvo");
  };

  if (loading) {
    return (
      <div className="movies-loading">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <div className="moviesDetail">
      <h1>{movieDetail.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
        alt="filme detalhado"
      />
      <h3>Sinopse</h3>
      <span>{movieDetail.overview}</span>

      <strong>Avaliação: {movieDetail.vote_average}</strong>

      <div className="area-buttons">
        <button onClick={favoriteMovie}>Salvar</button>

        <a
          target="blank"
          rel="external"
          href={`https://www.youtube.com/results?search_query=${movieDetail.title} trailer`}
        >
          Treiler
        </a>
      </div>
    </div>
  );
};

export default Movies;
