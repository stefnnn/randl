import React from "preact/compat";
import useSWR from "swr";
import { Spinner } from "./Spinner";
import { Topic } from "./PickTopic";
import { Language } from "./PickLanguage";
import { useAtom } from "jotai";
import { articleAtom } from "src/lib/atoms";

export type Article = {
  title: string;
  text: string;
  image: string;
  sentences: Sentence[];
};

export type Sentence = {
  text: string;
  translation: string;
  audio: string;
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {articles?.map((art) => (
        <div className="bg-slate-200 shadow rounded cursor-pointer hover:shadow-xl" onClick={() => onClick(art)}>
          <img src={art.image} className="object-cover rounded-t" />
          <div className="p-2">
            <h3 className="text-sm font-bold">{art.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
