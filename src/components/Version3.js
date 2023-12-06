import "/Users/dharanibaskaran/apifetching/src/App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Version3() {
  const [data, setData] = useState([]);
  const [isXml, setXml] = useState(false);

  function jsonToXml(json) {
    console.log(json);
    let xml = "";

    for (const key in json) {
      xml += `<${key}>`;

      if (typeof json[key] === "object") {
        xml += jsonToXml(json[key]);
      } else {
        xml += json[key];
      }

      xml += `</${key}>`;
    }
    console.log(xml);
    return xml;
  }

  const fetchApi = (e) => {
    const ip = document.getElementById("ipaddress").value;
    const format = document.getElementById("format").value;
    if (ip === "") {
      e.preventDefault();
      return alert("Please enter an IP address");
    }
    const url = "https://ipapi.co/" + ip + "/json/";
    e.preventDefault();
    fetch(url)
      .catch((err) => {
        console.log("err");
        setData(err);
      })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((res) => {
        console.log(res);
        if (format === "xml") {
          var ans = jsonToXml(res);
          setXml(true);
        } else if (format === "json") {
          ans = res;
        }
        console.log(ans);
        setData(ans);
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

      <form onSubmit={fetchApi} method="get">
        <div className="mb-3">
          <input
            className="form-control w-auto search"
            id="ipaddress"
            name="ipaddress"
            placeholder="IP Address"
            type="text"
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select w-auto select"
            name="format"
            id="format"
          >
            <option value="json">json</option>
            <option value="jsonp">jsonp</option>
            <option value="xml">xml</option>
            <option value="csv">csv</option>
            <option value="yaml">yaml</option>
          </select>
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
          return (
            <div className="data">
              {isXml ? (
                <div>{data} </div>
              ) : (
                <div>
                  {key}: {value}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Version3;
