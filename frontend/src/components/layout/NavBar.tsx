import { NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
            <Link to={"/"}>
                <span className="hotel-color">lakeSide Hotel</span>
            </Link>
            <button
                className="navbar-toggle"
                type="button"
                data-bs-toggle='collapse'
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toogle navigation"
            >
                <span className="navbar-toggler-icon">
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to={"/browse-all-rooms"}
                        >
                            Browse all rooms
                        </NavLink>
                    </li>
                    <li className="nav-item"></li>
                    <li className="nav-item"></li>
                    <li className="nav-item"></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar