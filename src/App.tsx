// Styles
import s from "./app.module.scss";
// Axios
import axios from "axios";
// React
import { useState } from "react";
function App() {
  // Data
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  // Api
  const API_KEY = "6d6623e0ab0d4d74aa1fce9aca6ab7fd";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
  // Func search location
  const searchLocation = (event: any) => {
    if (event.key === "Enter") {
      setData("");
      axios
        .get(URL)
        .then((resp) => {
          setData(resp.data);
        })
        .catch((err) => {
          setError(true), setData({});
        });
      setError(false);
      setLocation("");
    }
  };

  return (
    <>
      <section
        className={`${s.weatherApp_wrapper} ${
          data.name != undefined ? "bgHide" : ""
        }`}
      >
        {data.weather ? (
          <figure className={s.bg}>
            <img src={`/bg/${data.weather[0].main}.jpg`} alt="" />
          </figure>
        ) : null}

        <article>
          <div className={s.output}>
            <input
              className={error ? s.error : ""}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              type="text"
              placeholder="Search location..."
            />
          </div>
          <section className={s.top}>
            {data.name != undefined && (
              <>
                <section className={s.top_content}>
                  <div className={s.location}>
                    <p>{data.name}</p>
                  </div>
                  <div className={s.temp}>
                    {data.main ? <p>{data.main.temp.toFixed()}°C</p> : null}
                  </div>
                  <div className={s.description}>
                    {data.weather ? <p>{data.weather[0].description}</p> : null}
                    {data.weather ? (
                      <img src={`/icons/${data.weather[0].main}.png`} alt="" />
                    ) : null}
                  </div>
                </section>
                <div className={s.region}>
                  {data.sys ? <span>{data.sys.country}</span> : null}
                </div>
              </>
            )}
          </section>
          <section className={s.bottom}>
            {data.name != undefined && (
              <>
                <section className={s.bottom_content}>
                  <div className={s.feels}>
                    {data.main ? (
                      <p>{data.main.feels_like.toFixed()}°C</p>
                    ) : null}
                    <span>Feels Like</span>
                  </div>
                  <div className={s.humidity}>
                    {data.main ? <p>{data.main.humidity}%</p> : null}
                    <span>Humidity</span>
                  </div>
                  <div className={s.wind}>
                    {data.wind ? <p>{data.wind.speed}MPH</p> : null}
                    <span>Wind Speed</span>
                  </div>
                </section>
              </>
            )}
          </section>
        </article>
      </section>
    </>
  );
}

export default App;
