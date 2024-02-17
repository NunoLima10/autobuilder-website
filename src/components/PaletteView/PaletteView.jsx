import "./PaletteView.css";

import DefaultPalette from "../../assets/Mini_World_color_palette.png";

const PaletteView = () => {
  return (
    <div className="palette-container">
      <h3 className="palette-title">Paleta de Cores</h3>
      <img src={DefaultPalette} className="palette" />
    </div>
  );
};

export default PaletteView;
