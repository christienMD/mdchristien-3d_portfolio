import React from "react";

const CompanyIcon = ({
  name,
  size = 300,
  backgroundColor = "#1d1836",
  textColor = "#fff",
}) => {
  const getInitials = (companyName) => {
    if (!companyName) return "??";

    const parts = companyName.split(" ");

    if (parts.length === 1) {
      return companyName.substring(0, 2).toUpperCase();
    } else {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
  };

  const initials = getInitials(name);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: `${size / 10}px`,
        fontWeight: "bold",
        color: textColor,
      }}
    >
      {initials}
    </div>
  );
};

export default CompanyIcon;
