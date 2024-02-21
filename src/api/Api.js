import axios from "axios";
const autoBuilder = axios.create({
  // baseURL:"https://miniwolrd-autobuilder.onrender.com"
  baseURL: "http://127.0.0.1:5000",
});

async function UploadFiles(formData) {
  var ApiResponse = {error:null};
  const response = await autoBuilder.post("/converter", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status == 200) {
    ApiResponse.data = response.data;
    return ApiResponse;
  }

  ApiResponse.error = response.data.error
  return ApiResponse
}

export default UploadFiles;
