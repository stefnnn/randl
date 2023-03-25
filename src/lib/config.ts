const hostname = document.location.hostname;
export const DEV = hostname == "localhost" || hostname == "127.0.0.1";
export const PROD = !DEV;
export const API_BASE = PROD ? "/api/" : "http://127.0.0.1:5000/api/";

const Config = { DEV, PROD, API_BASE };
export default Config;
