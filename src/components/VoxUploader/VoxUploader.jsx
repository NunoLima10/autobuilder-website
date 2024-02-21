import { useState } from "react";
import UploadFiles from "../../api/Api";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import DropZone from "../DropZone/DropZone";
import FilePreviewer from "../FilePreviewer/FilePreviewer";
import LocationInputs from "../LocationInputs/LocationInputs";
import "./VoxUploader.css";

import CopyIcon from "../../assets/CopyIcon/CopyIcon";
import DownloadIcon from "../../assets/DownLoadIcon/DownloadIcon";
import GearIcon from "../../assets/GearIcon/GearIcon";

function DownloadFile(file, saveName) {
  const url = window.URL.createObjectURL(
    new Blob([file], { type: "text/plain" })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${saveName}.lua`);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
}
function CopyFileTextToClipBoard(fileText) {
  navigator.clipboard.writeText(fileText);
}

const VoxUploader = ({ onChangePalette }) => {
  const [generateScript, setGenerateScript] = useState(null)
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
    setGenerationState("action-button");
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

  function HandelFileDownload(event) {
    event.preventDefault();
    const fileName = voxFile.name.split(".")[0];
    DownloadFile(generateScript, fileName);
  }
  function HandelFileCopy(event) {
    event.preventDefault();
    CopyFileTextToClipBoard(generateScript);
  }

  function FormDataValidation() {
    const megaByte = 1048576;
    if (!voxFile) return "Sem ficheiro selecionado";

    if (voxFile > megaByte * 5) return "Arquivo Vox é maior que 5mb";

    if (useLocation)
      if (buildLocation.length !== 3) return "Local de construção não é valido";

    if (useDefaultPalette)
      if (!paletteFile) return "Paleta não foi selecionada";

    if (useDefaultPalette)
      if (paletteFile > megaByte) return "Paleta selecionada é maior que 1mb";

    if (useFillBlock)
      if (typeof fillBlockId !== Number)
        return "Id bloco Preenchimento não é valido";

    if (fillBlockId <= 0) return "Id bloco Preenchimento não é valido";
  }
  async function GenerateScript(event) {
    event.preventDefault();

    const errorMessage = FormDataValidation();
    if (errorMessage) {
      //call notification
      alert(errorMessage);
      return;
    }

    const fromData = new FormData();
    fromData.append("vox", voxFile);

    if (useLocation) fromData.append("location", buildLocation);

    if (useDefaultPalette) fromData.append("palette", paletteFile);

    if (useFillBlock) fromData.append("block", fillBlockId);

    try {
      setGenerationState("loading-action-button");

      const ApiResponse = await UploadFiles(fromData);
      if (!ApiResponse.error) {
        setGenerateScript(ApiResponse.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGenerationState("finished-action-button");
    }
  }

  return (
    <form className="uploader-container">
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
                <span>Selecionar</span>
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
                  min={1}
                />
              </label>
            </div>
          </div>
          <div className="submit-buttons">
            <button
              type="submit"
              onClick={GenerateScript}
              className={generationState}
            >
              <span>Gerar Script</span>
              <GearIcon />
            </button>
            {generationState === "finished-action-button" ? (
              <>
                <button className="action-button" onClick={HandelFileDownload}>
                  <span>Baixar</span>
                  <DownloadIcon />
                </button>
                <button className="action-button" onClick={HandelFileCopy}>
                  <span>Copiar</span>
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
