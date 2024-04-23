// import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Modals = ({ isOpen, country, onRequestClose }) => {
  const styles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%,-50%)",
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={styles}>
      {country && (
        <>
          <h3>{country.name}</h3>
          <div>
            <strong>Population: </strong>
            {country.population}
          </div>
        </>
      )}
    </Modal>
  );
};
Modals.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  country: PropTypes.object,
  onRequestClose: PropTypes.func.isRequired,
};

export default Modals;
