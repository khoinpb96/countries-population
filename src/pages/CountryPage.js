import "./CountryPage.scss";
import { useHistory, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CountryPage({ renderData }) {
  let history = useHistory();
  let param = useParams();

  const [borderCountriesName, setBCN] = useState([]);

  const data = renderData.find((e) => {
    return e.name.toLowerCase() === param.name;
  });

  useEffect(() => {
    setBCN([]);
    data.borders &&
      data.borders.map((e) => {
        fetch(`https://restcountries.com/v2/alpha?codes=${e}`)
          .then((res) => res.json())
          .then((data) => data.map((e) => setBCN((prev) => [...prev, e.name])))
          .catch((err) => console.log(err));
      });
  }, [param.name]);

  return (
    <div className="country-page">
      <div className="wrapper">
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          <i className="fas fa-long-arrow-alt-left" />
          Back
        </button>
        {data && (
          <div className="country-detail">
            <div
              className="country-detail__image"
              style={{
                background: `url(${data.flags.svg}) center center / cover no-repeat`,
              }}
            />
            <div className="country-detail__content">
              <h5>{data.name}</h5>
              <div className="row">
                <div className="col">
                  <p>
                    <span> Native Name:</span> {data.nativeName}
                  </p>
                  <p>
                    <span> Population:</span> {data.population.toLocaleString()}
                  </p>
                  <p>
                    <span> Region:</span> {data.region}
                  </p>
                  <p>
                    <span> Sub Region:</span> {data.subregion}
                  </p>
                  <p>
                    <span> Capital:</span> {data.capital}
                  </p>
                </div>
                <div className="col">
                  <p>
                    <span> Top Level Domain:</span> {[...data.topLevelDomain]}
                  </p>
                  <p>
                    <span> Currencies:</span>{" "}
                    {data.currencies.map((e) => e.name).join(", ")}
                  </p>
                  <p>
                    <span> Languagues:</span>{" "}
                    {data.languages.map((e) => e.name).join(", ")}
                  </p>
                </div>
              </div>
              <div>
                <span>Border Countries: </span>{" "}
                {borderCountriesName.map((e) => {
                  return (
                    <Link
                      to={`/${e.toLowerCase()}`}
                      className="border-countries"
                      key={e}
                    >
                      {e}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
