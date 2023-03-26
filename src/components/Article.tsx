import React, { useState } from "preact/compat";
import { useAtomValue, useSetAtom } from "jotai";
import { articleAtom, languageAtom, topicAtom } from "src/lib/atoms";
import { Spinner } from "./Spinner";
import { Article } from "./PickArticle";
import { QuestionsBox } from "./Questions";
import { Sentences } from "./Sentences";

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
      <WarnBox condition={!article.audio} text="This article does not have audio transcriptions yet." />
      <WarnBox condition={!article.sentences_translated} text="This article has not yet been translated." />
      <WarnBox condition={!article.questions} text="Questions have not yet been generated." />

      <h2 className="mt-8 mb-4">{article.title}</h2>
      {article.sentences ? <Sentences article={article} /> : <p className="whitespace-pre-wrap">{article.text}</p>}

      <p className="mt-4 text-sm text-neutral-400 text-right">
        Source:{" "}
        <a href={article.url} className="underline" target="_blank">
          {article.source}
        </a>
      </p>
      {article.questions && <QuestionsBox questions={article.questions} />}
      <Export article={article} />
    </div>
  ) : (
    <Spinner />
  );
};

const WarnBox: React.FC<{ text: string; condition: boolean }> = ({ text, condition }) => {
  return condition ? <div className="box bg-orange-200 text-orange-700 my-2">{text}</div> : null;
};

const Export: React.FC<{ article: Article }> = ({ article }) => {
  const [showExport, setShowExport] = useState(false);
  return (
    <div className="text-right">
      {showExport && (
        <div className="bg-slate-500 text-left mt-8 p-4 whitespace-pre-wrap text-xs font-mono rounded-lg text-white">
          # {article.title}
          <br />
          <br />
          {article.sentences?.map((s) => s.trimStart()).join("\n\n")}
          <br />
          <br />
          {article.questions?.map((q) => (
            <>
              [.essay]
              <br />
              [!{q.question}?]
              <br />
              <br />
            </>
          ))}
        </div>
      )}
      <button className="btn mt-8 bg-purple-600" onClick={() => setShowExport((val) => !val)}>
        {showExport ? "Copy Code" : "Export Bitmark!"}
      </button>
    </div>
  );
};
