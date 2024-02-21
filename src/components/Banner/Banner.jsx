import BannerImage from "../../assets/mini-world-background-2.jpg";
import LogoImage from "../../assets/text_logo_branco.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="title-container">
        <img src={LogoImage} className="logo-image" alt="logo" />
        <h2 className="title">
          Trasformado
          <br />
          <span className="title-highlight">modelos</span> em{" "}
          <span className="title-highlight">contruções</span>
        </h2>
      </div>
      <div className="custom-shape-divider-bottom-1708381704">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <img src={BannerImage} className="banner-image" alt="banner" />
    </div>
  );
};

export default Banner;
