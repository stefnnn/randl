import React, { useMemo } from "preact/compat";
import useSWR from "swr";
import { useAtom } from "jotai";
import { topicAtom } from "src/lib/atoms";
import { Spinner } from "./Spinner";

export type Topic = string;

export const PickTopic: React.FC = () => {
  const { data, error, isLoading } = useSWR<{ topics: Topic[] }>("topics");
  const topics = data?.topics || [];
  const sortedTopics = useMemo(() => topics.sort(), [topics]);
  const [topic, setTopic] = useAtom(topicAtom);
  const pillClasses =
    "pill text-sm cursor-pointer hover:animate-wiggle hover:shadow-lg bg-purple-600 hover:bg-pink-500";

  const onClick = (t: string) => {
    setTopic(t);

    setTimeout(() => window.scrollBy({ top: 450, behavior: "smooth" }), 100);
  };

  if (error) console.error(error);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex flex-wrap gap-3 justify-center md:px-16">
      {sortedTopics?.map((t) => (
        <div
          className={`${pillClasses} ${
            t == topic ? "bg-pink-500 hover:bg-pink-500 text-white border-transparent" : ""
          }`}
          onClick={() => onClick(t)}
        >
          {t.toLocaleLowerCase()}
        </div>
      ))}
    </div>
  );
};
