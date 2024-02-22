import "./DonateButton.css";

import DonateButtonImage from "../../assets/bmc-button.png";
import LogoImage from "../../assets/contact-image.jpg";

const DonateButton = () => {
  return (
    <div className="donation-container">
      <div className="donation-box">
        <a href="https://nunolima.netlify.app/" target="_blank"  rel="noreferrer">
          <img
            src={LogoImage}
            alt="logo-button"
            className="personal-logo-image"
          ></img>
        </a>
        <a href="https://www.buymeacoffee.com/nunolima" target="_blank" rel="noreferrer">
          <img
            src={DonateButtonImage}
            alt="donate-button"
            className="donation-image"
          ></img>
        </a>
      </div>
    </div>
  );
};

export default DonateButton;
