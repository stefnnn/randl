import React from "preact/compat";
import { useAtomValue, useSetAtom } from "jotai";
import { articleAtom, languageAtom, topicAtom } from "src/lib/atoms";
import { Spinner } from "./Spinner";
import { Article } from "./PickArticle";

export const ArticlePage: React.FC<{ article: Article }> = ({ article }) => {
  const topic = useAtomValue(topicAtom);
  const language = useAtomValue(languageAtom);
  const setArticle = useSetAtom(articleAtom);

  return article ? (
    <div className="">
      <a onClick={() => setArticle(false)} className="hover:underline text-sm cursor-pointer">
        &lt; Back
      </a>
      <img src={article.image} className="object-contain rounded-lg mt-4" />
      <h2 className="mt-4">{article.title}</h2>
      <p>{article.text}</p>
    </div>
  ) : (
    <Spinner />
  );
};
