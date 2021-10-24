import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CountriesContainer from "./components/CountriesContainer";
import Filter from "./components/Filter";
import Header from "./components/Header";
import CountryPage from "./pages/CountryPage";

export default function App() {
  const [renderData, setRenderData] = useState("");
  const [region, setRegion] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [inputValid, setInputValid] = useState(true);

  const [url, setUrl] = useState("https://restcountries.com/v2/all");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.status !== 404 ? setRenderData(data) : setInputValid(false);
      });
  }, [url]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRegion(data.map((e) => e.region));
      });
  }, []);

  return (
    <Router>
      <main className={darkMode ? "dark-theme" : ""}>
        <Header setDarkMode={setDarkMode} darkMode={darkMode} setUrl={setUrl} />
        <Switch>
          <Route exact path="/">
            <Filter
              setUrl={setUrl}
              regionList={[...new Set(region)]}
              inputValid={inputValid}
              setInputValid={setInputValid}
            />
            {renderData ? (
              <CountriesContainer renderData={renderData} />
            ) : (
              <div className="wrapper">Loading...</div>
            )}
          </Route>
          <Route path="/:name">
            {renderData ? (
              <CountryPage renderData={renderData} />
            ) : (
              <div className="wrapper">Loading...</div>
            )}
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
