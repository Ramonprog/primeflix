import "./style.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Link to={"/"} className="logo">
        Prime Flix
      </Link>
      <Link to={"/favoritos"} className="favorites">
        Meus filmes
      </Link>
    </header>
  );
};

export default Header;
