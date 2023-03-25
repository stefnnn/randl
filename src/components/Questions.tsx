import React from "preact/compat";
import { Question } from "./PickArticle";

export const QuestionsBox: React.FC<{ questions: Question[] }> = ({ questions }) => {
  return (
    <div className="">
      <h3 className="mt-10 text-lg">Questions of Understanding</h3>
      {questions.map((question) => (
        <div className="box bg-slate-200 my-2">{question.question}</div>
      ))}
    </div>
  );
};
