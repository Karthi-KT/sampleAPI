import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
import Modal from "react-modal";
import Modals from "./Components/Modals";

Modal.setAppElement("#root");

function App() {
  const [countries, setCountries] = useState([]);
  const [displayDetails, setDisplayDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [filterText, setFilterText] = useState("");
  const apiKey = "a5fc2659337372e1a849ebb4e0874738";

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

  const getWeather = async (countryName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`
      );
      setWeather(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = (country) => {
    setDisplayDetails(country);
    getWeather(country.name.common);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <div className="title">Weather details of the countries</div>
      <div className="filter">
        <input
          type="text"
          value={filterText}
          onChange={handleFilter}
          placeholder="Filter by country name"
        />
      </div>
      <div className="container">
        {filteredCountries.map((country, index) => (
          <div
            className="listView"
            key={index}
            onClick={() => openModal(country)}
          >
            <img src={country.flags.png} alt={country.name.common} />
            <div className="countryName">{country.name.common}</div>
          </div>
        ))}
      </div>
      <Modals
        isOpen={modalOpen}
        country={displayDetails}
        weather={weather}
        onRequestClose={closeModal}
      />
    </>
  );
}

export default App;
