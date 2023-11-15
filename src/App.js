import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function App() {
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

  function DismissibleExample() {
    const [showA, setShowA] = useState(true);

    const toggleShowA = () => setShowA(!showA);

    return (
      <Row>
        <Col md={6} className="mb-2">
          <Button onClick={toggleShowA} className="mb-2">
            Toggle Toast <strong>with</strong> Animation
          </Button>
          <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>
              Woohoo, you're reading this text in a Toast!
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }

  const fetchApi = (e) => {
    const ip = document.getElementById("ipaddress").value;
    const format = document.getElementById("format").value;
    if (ip === "") {
      e.preventDefault();
      // return alert("Please enter an IP address");
      console.log("Please enter an IP address");
      // $(".toast").toast("show");
      // return <DismissibleExample />
      // return Toast("Please enter an IP address");
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
      <h3 className="heading">IP Address Tracker</h3>
      <DismissibleExample />
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
  );
}

export default App;
