import ErroIcon from "../../assets/ErroIcon/ErroIcon";
import ValideIcon from "../../assets/ValideIcon/ValideIcon";
import "./Notification.css";

const Notification = ({ contend }) => {
  function getIcon(type) {
    if (type === "error") {
      return <ErroIcon />;
    } else if (type === "success") {
      return <ValideIcon />;
    }
    return <></>;
  }
  function getClassName(isVisible) {
    if (isVisible) {
      return "notification-container";
    }
    return "notification-container-close";
  }

  return (
    <div className={`${getClassName(contend.isVisible)} ${contend.type}`}>
      {getIcon(contend.type)}
      <p>{contend.message}</p>
    </div>
  );
};

export default Notification;
