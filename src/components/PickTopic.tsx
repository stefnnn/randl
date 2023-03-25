import React, { useMemo } from "preact/compat";
import useSWR from "swr";

type Topic = string;

export const PickTopic: React.FC = () => {
  const { data, error, isLoading } = useSWR<{ topics: Topic[] }>("topics");
  const topics = data?.topics || [];
  const sortedTopics = useMemo(() => topics.sort(), [topics]);

  const onClick = (topic: string) => {
    if (topic) {
      alert(topic);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-4 md:px-16">
      {topics?.map((topic) => (
        <div className="pill bg-purple-300 hover:bg-purple-700">{topic.toLocaleLowerCase()}</div>
      ))}
    </div>
  );
};
