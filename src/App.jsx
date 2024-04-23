import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
import Modals from "./Components/Modals";

function App() {
  const [countries, setCountries] = useState([]);
  const [displayDetails, setDisplayDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network Error");
        }
        return response.data;
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log("Error Occurred:", error);
      });
  }, []);
  const openModal = (country) => {
    setDisplayDetails(country);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div className="container">
        {countries.map((country, index) => (
          <div
            className="listView"
            key={index}
            onClick={() => {
              openModal(country);
            }}
          >
            <img src={country.flags.png} alt={country.name.common}></img>
            <div className="countryName">{country.name.common}</div>
          </div>
        ))}
      </div>
      <Modals
        isOpen={modalOpen}
        country={displayDetails}
        onRequestClose={closeModal}
      ></Modals>
    </>
  );
}

export default App;
