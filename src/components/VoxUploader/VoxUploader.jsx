import Api from "../../api/Api";
import { useState } from "react";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import DropZone from "../DropZone/DropZone";
import FilePreviewer from "../FilePreviewer/FilePreviewer";
import LocationInputs from "../LocationInputs/LocationInputs";
import "./VoxUploader.css";

import DownloadIcon from "../../assets/DownLoadIcon/DownloadIcon";
import CopyIcon from "../../assets/CopyIcon/CopyIcon";
import GearIcon from "../../assets/GearIcon/GearIcon";

const VoxUploader = ({ onChangePalette }) => {
  const [voxFile, setVoxFile] = useState();
  const [useLocation, setUseLocation] = useState(false);
  const [buildLocation, setBuildLocation] = useState([]);
  const [useDefaultPalette, setUseDefaultPalette] = useState();
  const [paletteFile, setPaletteFile] = useState(null);
  const [useFillBlock, setUseFillBlock] = useState(false);
  const [fillBlockId, setFillBlockId] = useState();

  const [generationState, setGenerationState] = useState("action-button");

  function HandelFileSelection(file) {
    setVoxFile(file);
  }
  function HandelFileDeletion() {
    setVoxFile(null);
  }

  function HandelUseCustomPalette() {
    setUseDefaultPalette(() => !useDefaultPalette);
    if (useDefaultPalette) onChangePalette(() => null);
    setUseFillBlock(false);
  }
  function HandelSelectPalette(event) {
    event.preventDefault();
    setPaletteFile(event.target.files[0]);
    onChangePalette(event.target.files[0]);
  }
  function HandelUseFillBlock() {
    setUseDefaultPalette(false);
    onChangePalette(() => null);
    setUseFillBlock(() => !useFillBlock);
  }

  function HandelSelectBlockId(event) {
    event.preventDefault();
    setFillBlockId(event.target.value);
  }

  async function upload_files(event) {
    event.preventDefault();
    const fromData = new FormData();
    fromData.append("vox", voxFile);
    fromData.append("palette", paletteFile);

    try {
      setGenerationState("loading-action-button");

      const response = await Api.post("/converter", fromData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const contentType = response.headers["content-type"];
      navigator.clipboard.writeText(response.data)

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
    } finally {
      setGenerationState("finished-action-button");
    }
  }

  return (
    <form className="uploader-container">
      {/* <label class="vox-uploader">
        Vox Uploader <UploadIcon />
        <input
          type="file"
          className="vox-file"
          accept=".vox"
          onChange={(e) => }
        />
      </label> */}
      {voxFile ? (
        <div className="custom-settings">
          <FilePreviewer
            fileName={voxFile.name}
            onDelete={HandelFileDeletion}
          />

          <p className="settings-title">Configurações Avançadas</p>
          <div className="advanced-settings">
            <div className="build-location-container">
              <CustomCheckbox
                label={"Local da Construção"}
                isChecked={useLocation}
                onSelect={() => setUseLocation(!useLocation)}
              />
              <LocationInputs
                isVisible={useLocation}
                onChange={setBuildLocation}
              />
            </div>
            <div className="custom-palette-container">
              <CustomCheckbox
                label={"Usa Paleta Customizada"}
                isChecked={useDefaultPalette}
                onSelect={HandelUseCustomPalette}
              />
              <label
                className={
                  useDefaultPalette ? "select-palette" : "select-palette-off"
                }
              >
                Selecionar
                <input
                  type="file"
                  id="palette_file"
                  accept=".png"
                  onChange={HandelSelectPalette}
                />
              </label>
            </div>

            <div className="fill-block-container">
              <CustomCheckbox
                label={"Bloco de Preenchimento"}
                isChecked={useFillBlock}
                onSelect={HandelUseFillBlock}
              />
              <label
                className={useFillBlock ? "select-block" : "select-block-off"}
              >
                <input
                  type="number"
                  placeholder="Id do Bloco"
                  onChange={HandelSelectBlockId}
                />
              </label>
            </div>
          </div>
          <div className="submit-buttons">
            <button
              type="submit"
              onClick={upload_files}
              className={generationState}
            >
              Gerar Script
              <GearIcon />
            </button>
            {generationState == "finished-action-button" ? (
              <>
                <button onClick={upload_files} className="action-button">
                  Baixar
                  <DownloadIcon />
                </button>
                <button onClick={upload_files} className="action-button">
                  Copiar
                  <CopyIcon />
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <DropZone onChangeFile={HandelFileSelection} />
      )}
    </form>
  );
};

export default VoxUploader;
