import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header({ setDarkMode, darkMode }) {
  return (
    <header>
      <div className="wrapper">
        <Link to="/">Where in the world?</Link>
        <label htmlFor="darkModeBtn">
          <input
            type="checkbox"
            id="darkModeBtn"
            onChange={() => {
              setDarkMode((prev) => !prev);
              console.log("click!");
            }}
          />
          {darkMode ? (
            <i className="fas fa-moon" />
          ) : (
            <i className="far fa-moon" />
          )}
          Dark Mode
        </label>
      </div>
    </header>
  );
}
