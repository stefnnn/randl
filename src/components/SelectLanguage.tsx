import React from "preact/compat";
import useSWR from "swr";

type Language = {
  code: string;
  name: string;
};

const LANGUAGE_SELECT = { code: "", name: "Select a language" };

export const SelectLanguage: React.FC = () => {
  const { data, error, isLoading } = useSWR<{ languages: Language[] }>("languages");
  const { languages } = data;
  languages.unshift(LANGUAGE_SELECT);

  const onSelect = (code: string) => {
    if (code) {
      alert(code);
    }
  };

  return (
    <form>
      <select onChange={(evt) => onSelect(evt.currentTarget.value)}>
        {languages?.map((lang) => (
          <option value={lang.code}>{lang.name}</option>
        ))}
      </select>
    </form>
  );
};
