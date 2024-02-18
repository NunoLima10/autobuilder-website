import axios from "axios";
const autoBuilder = axios.create({
    baseURL:"https://miniwolrd-autobuilder.onrender.com"
})

export default autoBuilder;