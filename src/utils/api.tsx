import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:2000",
  timeout: 60000
});
