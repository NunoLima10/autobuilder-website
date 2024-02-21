import "./PaletteView.css";

import DefaultPalette from "../../assets/Mini_World_color_palette.png";

const PaletteView = ({ customPalette }) => {
  let paletteImage = DefaultPalette;
  let fileName = "Paleta de Cores Padrão";

  if(customPalette) {
    paletteImage = window.URL.createObjectURL(customPalette);
    fileName = customPalette.name;
  }
  return (
    <div className="palette-container">
      <h3 className="palette-title">{fileName}</h3>
      <img src={paletteImage} className="palette" alt="palette" />
    </div>
  );
};

export default PaletteView;
