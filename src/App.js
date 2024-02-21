import { useState } from "react";
import Banner  from "./components/Banner/Banner";
import PaletteView from "./components/PaletteView/PaletteView";
import VoxUploader from "./components/VoxUploader/VoxUploader";


function App() {
  const [customPalette , setCustomPalette] = useState()
  return (
    <div className="app">
      <Banner />
      <PaletteView customPalette={customPalette} />
      <VoxUploader onChangePalette={setCustomPalette} />
    </div>
  );
}

export default App;
