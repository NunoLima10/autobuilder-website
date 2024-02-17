import axios from "axios";
import { useState } from "react";
import { Banner } from "./components/Banner/Banner";
import PaletteView from "./components/PaletteView/PaletteView";


function App() {
  const [voxFile, setVoxFile] = useState(null)
  const [paletteFile, setPaletteFile] = useState(null)

  async function upload_files(event){
    event.preventDefault()
    const fromData = new FormData()
    fromData.append("vox", voxFile)
    fromData.append("palette", paletteFile)

    try{
      const response = await axios.post(" http://127.0.0.1:5000/converter",fromData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })

      const contentType = response.headers['content-type'];

      if (contentType && contentType.includes('text/plain')) {
        
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/plain' }));
    
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'MiniWorld-AutoBuilder-Script.lua'); 
        document.body.appendChild(link);
    
        link.click();
    
        
        window.URL.revokeObjectURL(url);
      }

    }catch(error){
    
      console.log(error)
    }

  }
  return (
    <div className="app">
     <Banner/>
     <PaletteView/>

      <form>
        <input type="file" id="vox_file" accept=".vox" onChange={ (e) => setVoxFile(e.target.files[0])} />
        <input type="file" id="palette_file" accept=".png" onChange={ (e) => setPaletteFile(e.target.files[0])} />
        <button type="submit" onClick={upload_files}>Enviar</button>
      </form>


    </div>
  );
}

export default App;
