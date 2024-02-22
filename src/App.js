import { useState } from "react";
import Banner  from "./components/Banner/Banner";
import PaletteView from "./components/PaletteView/PaletteView";
import VoxUploader from "./components/VoxUploader/VoxUploader";
import DonateButton from "./components/DonateButton/DonateButton";


function App() {
  const [customPalette , setCustomPalette] = useState()
  return (
    <div className="app">
      <Banner />
      <PaletteView customPalette={customPalette} />
      <VoxUploader onChangePalette={setCustomPalette} />
      <DonateButton/>
    </div>
  );
}

export default App;
