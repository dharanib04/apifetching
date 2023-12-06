import "/Users/dharanibaskaran/apifetching/src/App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Version2() {
  const [data, setData] = useState([]);

  const fetchApi = (e) => {
    const ip = document.getElementById("ipaddress").value;
    if (ip === "") {
      e.preventDefault();
      return alert("Please enter an IP address");
    }
    const url = "https://ipapi.co/" + ip + "/json/";
    e.preventDefault();
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setData(res);
      });
  };

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
      <h3 className="heading">IP Address Tracker</h3>

      <form onSubmit={fetchApi} method="post">
        <div class="mb-3">
          <input
            className="form-control w-auto search"
            id="ipaddress"
            name="ipaddress"
            placeholder="IP Address"
            type="text"
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary button" type="submit">
            Search
          </button>
        </div>
      </form>

      <div>
        {Object.entries(data).map((entry) => {
          const [key, value] = entry;
          console.log(key, value);
          return (
            <div className="data">
              {key}: {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Version2;
