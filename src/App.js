import { Banner } from "./components/Banner/Banner";
import PaletteView from "./components/PaletteView/PaletteView";
import VoxUploader from "./components/VoxUploader/VoxUploader";

function App() {
  return (
    <div className="app">
      <Banner />
      <PaletteView />
      <VoxUploader />
    </div>
  );
}

export default App;
