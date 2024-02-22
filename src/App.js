import { useEffect, useState } from "react";
import Banner from "./components/Banner/Banner";
import PaletteView from "./components/PaletteView/PaletteView";
import VoxUploader from "./components/VoxUploader/VoxUploader";
import DonateButton from "./components/DonateButton/DonateButton";
import ReactGA from "react-ga4";
import Notification from "./components/Notification/Notification";

function App() {
  ReactGA.initialize("G-QM9R0JSXDV");
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
  const [customPalette, setCustomPalette] = useState();
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  function HandelNotification(contend) {
    setNotification(contend);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification((prevState) => ({
        ...prevState,
        isVisible: false,
      }));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [notification]);

  return (
    <div className="app">
      <Banner />
      <PaletteView customPalette={customPalette} />
      <VoxUploader
        onChangePalette={setCustomPalette}
        onNotification={HandelNotification}
      />
      <DonateButton />
      <Notification contend={notification} />
    </div>
  );
}

export default App;
