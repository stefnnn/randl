import React from "preact/compat";
import { PickTopic } from "./PickTopic";
import { PickLanguage } from "./PickLanguage";
import { useAtomValue } from "jotai";
import { articleAtom, languageAtom, topicAtom } from "src/lib/atoms";
import { PickArticle } from "./PickArticle";
import { ArticlePage } from "./Article";

export const Main: React.FC = () => {
  const topic = useAtomValue(topicAtom);
  const language = useAtomValue(languageAtom);
  const article = useAtomValue(articleAtom);

  return (
    <div className="">
      {article ? (
        <ArticlePage article={article} />
      ) : (
        <>
          <PickLanguage />
          {language && <PickTopic />}
          {language && topic && <PickArticle language={language} topic={topic} />}
        </>
      )}
    </div>
  );
};
