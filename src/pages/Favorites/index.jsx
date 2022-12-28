import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { toast } from "react-toastify";

const Favorites = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@primeflix");
    setMovie(JSON.parse(myList || []));
  }, []);

  const handleDeleteMovie = (id) => {
    toast.success("Filme removido com sucesso");
    let filter = movie.filter((item) => item.id !== id);

    setMovie(filter);

    localStorage.setItem("@primeflix", JSON.stringify(filter));
  };

  return (
    <div className="my-movies">
      <h1>Meus filmes</h1>

      {movie.length === 0 && <span className='no-movie'>Você não tem Filme 😭</span>}

      <ul>
        {movie.map((item) => (
          <li key={item.id}>
            <div className="title">
              <span>{item.title}</span>
            </div>
            <div>
              <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
              <button onClick={() => handleDeleteMovie(item.id)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
