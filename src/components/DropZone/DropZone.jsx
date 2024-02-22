import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import UploadIcon from "../../assets/UploadIcon/UploadIcon";
import "./DropZone.css";

const DropZone = ({ onChangeFile, onNotification }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      onChangeFile(acceptedFiles[0]);
      return;
    }
    onNotification({
      message: "Tente usar um arquivo Voxel",
      type: "error",
      isVisible: true,
    });
  },[onChangeFile, onNotification]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "model/vox": [".vox"] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5242880,
  });

  return (
    <div {...getRootProps({ className: "drop-zone" })}>
      <input {...getInputProps()} />
      <p className="drop-zone-description">
        <span>
          <UploadIcon />
        </span>
        Arrate ou Clique para adicionar modelo Vox
      </p>
    </div>
  );
};

export default DropZone;
