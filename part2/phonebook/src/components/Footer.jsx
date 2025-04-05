import React from "react";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
    marginTop: "20px"
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Phonebook app Department of Computer Science, University of Helsinki 2025
      </em>
    </div>
  );
};

export default Footer;
