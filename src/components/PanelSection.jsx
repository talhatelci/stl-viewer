import React from "react";

const PanelSection = ({ name, children }) => {
  return (
    <div className="flex w-full gap-x-6">
      <p className="w-16 border border-green-600">{name}:</p>

      <div>{children}</div>
    </div>
  );
};

export default PanelSection;
