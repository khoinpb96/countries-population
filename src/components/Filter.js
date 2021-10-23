import { useState } from "react";
import "./Filter.scss";

export default function Filter({ setUrl, regionList }) {
  const [inputVal, setInputVal] = useState("");

  function formSubmitHandler(e) {
    if (!inputVal) return;
    e.preventDefault();
    setUrl(`https://restcountries.com/v2/name/${inputVal}`);
  }

  function filterByRegion(continent) {
    setUrl(`https://restcountries.com/v2/region/${continent}
    `);
  }

  return (
    <div className="filter ">
      <div className="wrapper">
        <form className="searchBox" onSubmit={formSubmitHandler}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for a country..."
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
          />
          <i className="fas fa-search" />
        </form>

        <div className="options-container">
          Filter by Region
          <i className="fas fa-chevron-down" />
          <div className="options">
            {regionList.map((region) => {
              return (
                <p
                  key={region}
                  onClick={() => {
                    filterByRegion(region.toLowerCase());
                  }}
                >
                  {region}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
