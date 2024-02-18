import { useState } from "react";
import Api from "../../api/Api";
import UploadIcon from "../../assets/UploadIcon/UploadIcon";
import "./VoxUploader.css";

const VoxUploader = () => {
  const [voxFile, setVoxFile] = useState(null);
  const [paletteFile, setPaletteFile] = useState(null);
  const [isCustomPalette, setIsCustomPalette] = useState(false);

  async function upload_files(event) {
    event.preventDefault();
    const fromData = new FormData();
    fromData.append("vox", voxFile);
    fromData.append("palette", paletteFile);

    try {
      const response = await Api.post("/converter", fromData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const contentType = response.headers["content-type"];

      if (contentType && contentType.includes("text/plain")) {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "text/plain" })
        );

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "MiniWorld-AutoBuilder-Script.lua");
        document.body.appendChild(link);

        link.click();

        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className="uploader-container">
      <label class="vox-uploader">
        Vox Uploader <UploadIcon />
        <input
          type="file"
          className="vox-file"
          accept=".vox"
          onChange={(e) => setVoxFile(e.target.files[0])}
        />
      </label>

      <div className="custom-palette-container">
        <label
          class={isCustomPalette ? "image-uploader" : "image-uploader-off"}
        >
          Escolher Paleta
          <input
            type="file"
            id="palette_file"
            accept=".png"
            onChange={(e) => setPaletteFile(e.target.files[0])}
          />
        </label>
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={isCustomPalette}
            onChange={() => setIsCustomPalette(!isCustomPalette)}
          />
          <label>Paleta Customizada</label>
        </div>
      </div>

      <div className="submit-buttons">
        <button
          type="submit"
          onClick={upload_files}
          className="download-button"
        >
          Baixar
        </button>
        <button type="submit" onClick={upload_files} className="copy-button">
          Copiar
        </button>
      </div>
    </form>
  );
};

export default VoxUploader;
