import PropTypes from "prop-types";

const Notify = ({ message = null }) => {
  if (!message) return null;

  const style = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    border: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{message}</div>;
};

Notify.propTypes = {
  message: PropTypes.string,
};

export default Notify;
