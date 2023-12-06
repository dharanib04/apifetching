import "/Users/dharanibaskaran/apifetching/src/App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function Version4() {
  const [data, setData] = useState([]);
  const [isXml, setXml] = useState(false);

  function SettingToast() {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [message, setMessage] = useState("");

    const fetchApi = (e) => {
      const ip = document.getElementById("ipaddress").value;
      const format = document.getElementById("format").value;
      if (ip === "") {
        e.preventDefault();
        setMessage("Please enter an IP address");
        return toggleShowA();
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
          if (res.error) {
            e.preventDefault();
            setMessage("Please enter a valid IP address");
            return toggleShowA();
          }
          if (format === "xml") {
            var ans = jsonToXml(res);
            setXml(true);
          } else if (format === "json") {
            ans = res;
          }
          setData(ans);
        });
    };

    return (
      <Row>
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
              <option value="xml">xml</option>
            </select>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary button" type="submit">
              Search
            </button>
          </div>
        </form>
        <Col md={{ span: 6, offset: 6 }} className="mb-2">
          <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>
              <p>{message}</p>
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }

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
      <SettingToast />
      <div id="ipdata">
        {isXml ? (
          <div className="xmldata">{data}</div>
        ) : (
          <div>
            {Object.entries(data).map((entry) => {
              const [key, value] = entry;
              return (
                <div className="data">
                  {key}: {value}
                </div>
              );
            })}
          </div>
        )}

        {/* {Object.entries(data).map((entry) => {
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
        })} */}
      </div>
    </div>
  );
}

function jsonToXml(json) {
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
  return xml;
}

export default Version4;
