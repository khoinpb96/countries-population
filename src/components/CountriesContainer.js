import { Link } from "react-router-dom";
import "./CountriesContainer.scss";

export default function CountriesContainer({ renderData }) {
  return (
    <section className="CountriesContainer ">
      <div className="wrapper">
        {renderData.map((item) => (
          <Link to={item.name.toLowerCase()} className="card" key={item.name}>
            <div
              className="card__image"
              style={{
                background: `url(${item.flags.svg}) center no-repeat`,
                backgroundSize: "cover",
                minHeight: 150,
              }}
            />

            <div className="card__content">
              <h4>{item.name}</h4>
              <p>
                <span>Population: </span>
                {item.population.toLocaleString()}
              </p>
              <p>
                <span>Region: </span>
                {item.region}
              </p>
              <p>
                <span>Capital: </span>
                {item.capital}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
