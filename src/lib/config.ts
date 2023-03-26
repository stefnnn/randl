const hostname = document.location.hostname;
export const DEV = hostname == "localhost" || hostname == "127.0.0.1";
export const PROD = !DEV;
export const BASE = PROD ? "" : "http://127.0.0.1:5001";
export const API_BASE = BASE + "/api/";

const Config = { DEV, PROD, API_BASE, BASE };
export default Config;
