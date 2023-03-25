import React from "preact/compat";
import useSWR from "swr";
import { Spinner } from "./Spinner";
import { Topic } from "./PickTopic";
import { Language } from "./PickLanguage";
import { useAtom } from "jotai";
import { articleAtom } from "src/lib/atoms";

export type Article = {
  doc_id: string;
  title: string;
  image: string;
  source: string;
  url: string;
  text?: string;
  sentences?: Sentence[];
  sentences_translated?: Sentence[];
  audio?: string;
  questions?: Question[];
};

export type Sentence = string;

export type Question = {
  question: string;
  answer: string;
};

export const PickArticle: React.FC<{ topic: Topic; language: Language }> = ({ topic, language }) => {
  const path = `articles?language=${language.code}&topic=${encodeURI(topic.toLowerCase())}`;
  const { data, error, isLoading } = useSWR<{ articles: Article[] }>(path);
  const articles = data?.articles;
  const [article, setArticle] = useAtom(articleAtom);

  const onClick = (article: Article) => {
    setArticle(article);
    window.scrollTo(0, 0);
  };

  if (error) console.error(error);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-8 mt-8">
      {articles?.map((art) => (
        <div
          className="bg-slate-200 shadow-lg rounded cursor-pointer hover:animate-grow hover:shadow-xl h-full flex flex-col"
          onClick={() => onClick(art)}
        >
          <img src={art.image} className="object-cover rounded-t" />
          <div className="p-2 flex-grow h-auto flex flex-col justify-between">
            <h3 className="text-xs font-bold">{art.title}</h3>
            <p className="text-xs text-neutral-400 text-right mt-2">{art.source}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
