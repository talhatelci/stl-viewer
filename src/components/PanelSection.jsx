const PanelSection = ({ name, children }) => {
  return (
    <div className="flex w-full gap-x-6">
      <p className="w-20">{name}:</p>

      <div>{children}</div>
    </div>
  );
};

export default PanelSection;
