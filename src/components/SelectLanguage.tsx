import React from "preact/compat";
import useSWR from "swr";

export const SelectLanguage: React.FC = () => {
  const { data: languages, error, isLoading } = useSWR("/api/languages");

  const onSelect = (language: string) => {
    if (language) {
      alert(language);
    }
  };

  return (
    <form>
      <select onChange={(evt) => onSelect(evt.currentTarget.value)}>
        {languages.map((lang) => (
          <option>{lang}</option>
        ))}
      </select>
    </form>
  );
};
