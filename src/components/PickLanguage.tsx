import React from "preact/compat";
import { languageAtom } from "src/lib/atoms";
import useSWR from "swr";
import { Spinner } from "./Spinner";
import { useAtom } from "jotai";

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export const PickLanguage: React.FC = () => {
  const { data, error, isLoading } = useSWR<{ languages: Language[] }>("languages");
  const languages = data?.languages || [];
  const [language, setLanguage] = useAtom(languageAtom);
  const pillClasses =
    "cursor-pointer text-lg pill border-2 border-purple-400 bg-white text-neutral-800 hover:bg-purple-100 hover:animate-wiggle";

  const onClick = (lang: Language) => {
    setLanguage(() => lang);
  };

  if (error) console.error(error);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex flex-wrap gap-2 justify-center">
      {languages?.map((lang) => (
        <div
          className={`${pillClasses} ${
            language == lang ? "bg-purple-600 hover:bg-purple-600 text-white border-transparent" : ""
          }`}
          onClick={() => onClick(lang)}
        >
          {lang.flag} {lang.name}
        </div>
      ))}
    </div>
  );
};
