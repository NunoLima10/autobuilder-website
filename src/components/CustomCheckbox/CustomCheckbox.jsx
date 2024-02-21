import "./CustomCheckbox.css";

const CustomCheckbox = ({ label, isChecked, onSelect }) => {
  function HandelClick(event) {
    event.preventDefault();
    onSelect()
  }
  return (
    <div className="checkbox-container">
      <p>{label}</p>
      <button className={isChecked?"checked-on": "checked-off"} onClick={HandelClick}></button>
    </div>
  );
};

export default CustomCheckbox;
