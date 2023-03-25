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
        <div className="my-4">
          <h2 className="prompt animate-character">1) Pick a Language</h2>
          <PickLanguage />

          {language && (
            <>
              <h2 className="mt-16 prompt animate-character">2) Pick a Topic</h2>
              <PickTopic />
            </>
          )}
          {language && topic ? (
            <>
              <h2 className="mt-16 prompt animate-character">3) Pick an Article</h2>
              <PickArticle language={language} topic={topic} />
            </>
          ) : (
            <div className="h-48" />
          )}
        </div>
      )}
    </div>
  );
};
