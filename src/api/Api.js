import axios from "axios";
const autoBuilder = axios.create({
    // baseURL:"https://miniwolrd-autobuilder.onrender.com"
    baseURL:"http://127.0.0.1:5000"
})

export default autoBuilder;