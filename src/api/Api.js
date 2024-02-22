import axios from "axios";
const autoBuilder = axios.create({
  baseURL: "https://miniwolrd-autobuilder.onrender.com",
});

async function UploadFiles(formData) {
  var ApiResponse = { error: null };
  try {
    var response = await autoBuilder.post("/converter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    ApiResponse.data = response.data;
    return ApiResponse;
  } catch (error) {
    ApiResponse.error = error.response.data
    return ApiResponse;
  }
}

export default UploadFiles;
