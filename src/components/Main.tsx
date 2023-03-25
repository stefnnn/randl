import React from "preact/compat";
import { PickTopic } from "./PickTopic";
import { SelectLanguage } from "./SelectLanguage";

export const Main: React.FC = () => {
  return (
    <div className="">
      <SelectLanguage />
      <PickTopic />
    </div>
  );
};
