const inventory = () => {
  const slots = Array.from({ length: 16 }).map((_, index) => (
    <div key={index} className="inventory-slot">
      <p className="inventory-item-count"></p>
      <p className="inventory-item"></p>
    </div>
  ));
  return <section className="inventory-container">{slots}</section>;
};

export default inventory;
