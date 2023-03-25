import React from "preact/compat";
import { useAtomValue, useSetAtom } from "jotai";
import { articleAtom, languageAtom, topicAtom } from "src/lib/atoms";
import { Spinner } from "./Spinner";
import { Article } from "./PickArticle";
import { QuestionsBox } from "./Questions";

export const ArticlePage: React.FC<{ article: Article }> = ({ article }) => {
  const topic = useAtomValue(topicAtom);
  const language = useAtomValue(languageAtom);
  const setArticle = useSetAtom(articleAtom);
  console.log(article);

  return article ? (
    <div className="">
      <a onClick={() => setArticle(false)} className="hover:underline text-sm cursor-pointer">
        &lt; Back
      </a>
      <img src={article.image} className="object-contain rounded-lg mt-4" />
      <WarnBox condition={!article.audio} text="This article does not have audio transcriptions yet." />
      <WarnBox condition={!article.sentences_translated} text="This article has not yet been translated." />
      <WarnBox condition={!article.questions} text="Questions have not yet been generated." />

      <h2 className="mt-4">{article.title}</h2>
      <p className="whitespace-pre-wrap">{article.text}</p>
      <p className="mt-4 text-sm text-neutral-400 text-right">
        Source:{" "}
        <a href={article.url} className="underline" target="_blank">
          {article.source}
        </a>
      </p>
      {article.questions && <QuestionsBox questions={article.questions} />}
    </div>
  ) : (
    <Spinner />
  );
};

const WarnBox: React.FC<{ text: string; condition: boolean }> = ({ text, condition }) => {
  return condition ? <div className="box bg-orange-200 text-orange-700 my-2">{text}</div> : null;
};
