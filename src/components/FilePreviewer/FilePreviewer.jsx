import ModelIcon from "../../assets/model.png"
import TrashIcon from "../../assets/TrashIcon/TrashIcon";
import "./FilePreviewer.css";

const FilePreviewer = ({ fileName, onDelete }) => {
  function HandelDelete(event) {
    event.preventDefault();
    onDelete(true);
  }
  return (
    <div className="previewer-container">
      <div className="file-icon-container">
        <img src={ModelIcon} alt="model-icon"/>
      </div>
      <div className="file-name-container">
        <p className="file-name">{fileName}</p>
        <p>Arquivo voxel</p>
      </div>
      <div className="delete-icon-container">
        <button className="delete-button" onClick={HandelDelete}>
        <TrashIcon/>
        </button>
      </div>
    </div>
  );
};

export default FilePreviewer;
