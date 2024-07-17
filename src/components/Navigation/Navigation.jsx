import { NavLink } from "react-router-dom";
import css from './Navigation.module.css'

const Navigation = () => {
    return (
        <header>
            <nav className={css.navigation}>
                <NavLink className={css.link} to="/">Home</NavLink>
                <NavLink className={css.link} to="/movies">Movies</NavLink>

            </nav>
        </header>
    )
}

export default Navigation;