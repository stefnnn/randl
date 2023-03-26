import React, { useState } from "preact/compat";
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
  const [started, setStarted] = useState(true);

  return started ? (
    <div className="">
      {article ? (
        <ArticlePage article={article} />
      ) : (
        <div className="my-4">
          <div className="flex justify-center">
            <img src="/randl_logo.svg" className="my-8 w-40" />
          </div>
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
  ) : (
    <div className="flex justify-center items-center h-full">
      <img src="/randl_logo.svg" className="w-1/2 my-16 cursor-pointer" onClick={() => setStarted(true)} />
    </div>
  );
};
