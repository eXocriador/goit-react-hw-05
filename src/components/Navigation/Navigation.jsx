import { Link } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => (
  <nav className={css.nav}>
    <Link to="/" className={css.link}>
      Home
    </Link>
    <Link to="/movies" className={css.link}>
      Movies
    </Link>
  </nav>
);

export default Navigation;
