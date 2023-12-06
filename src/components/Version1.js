import "/Users/dharanibaskaran/apifetching/src/App.css";
import { useState, useEffect } from "react";

function Version1() {
  const [data, setData] = useState([]);
  const Fetchapi = () => {
    return fetch("https://ipapi.co/json/")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setData(res);
      });
  };

  useEffect(() => {
    Fetchapi();
  }, []);

  return (
    <div>
      <nav class="navbar">
        <div class="container-fluid">
          <div class="navbar-brand"></div>
          <form class="d-flex" role="search">
            <a href="/" class="btn btn-outline-primary" type="submit">
              Back to Home
            </a>
          </form>
        </div>
      </nav>
      <h1>This is a webpage for api fetching.</h1>
      {Object.entries(data).map((entry) => {
        const [key, value] = entry;
        return (
          <div style={{ padding: "4px" }}>
            {key}: {value}
          </div>
        );
      })}
    </div>
  );
}

export default Version1;
