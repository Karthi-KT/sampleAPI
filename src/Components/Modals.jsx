// import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "../style.css";

Modal.setAppElement("#root");

const Modals = ({ isOpen, country, weather, onRequestClose }) => {
  const styles = {
    content: {
      height: "45%",
      width: "30%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%,-50%)",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={styles}>
      {country && (
        <>
          <h3>{country.name.common}</h3>
          <div>
            <strong>Capital: </strong>
            {country.capital[0]}
          </div>
          <div>
            <strong>Population: </strong>
            {country.population}
          </div>
          {weather && (
            <div>
              <h3>Weather Details</h3>
              <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Description: {weather.weather[0].description}</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          )}
          <button className="closeBtn" onClick={onRequestClose}>
            OK
          </button>
        </>
      )}
    </Modal>
  );
};
Modals.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  country: PropTypes.object,
  weather: PropTypes.object,
  onRequestClose: PropTypes.func.isRequired,
};

export default Modals;
