import "./Banner.css";
import BannerImage from "../../assets/mini-world-background-2.jpg";
import LogoImage from "../../assets/text_logo.png";

export const Banner = () => {
  return (
    <div className="banner-container">
      <header className="App-header">
        {/* <h1>MiniWorld AutoBuilder</h1> */}
        <img src={LogoImage} className="logo-image"  alt="logo"/>
        <img src={BannerImage} className="banner-image"  alt="banner"/>
      </header>
    </div>
  );
};
