import React from "react";
import { Fetcher, SWRConfig } from "swr";
import Config from "./config";

const fetcher: Fetcher<any, string> = async (path) => {
  const url = Config.API_BASE + path;
  const response = await fetch(url);
  return response.json();
};

export const ApiProvider: React.FC<{ children: any }> = ({ children }) => {
  const options = { fetcher };
  return <SWRConfig value={options}>{children}</SWRConfig>;
};
