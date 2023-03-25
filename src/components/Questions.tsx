import React, { useState } from "preact/compat";
import { Question } from "./PickArticle";

export const QuestionsBox: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="">
      <h3 className="mt-10 text-lg">Questions of Understanding</h3>
      {questions.map((question) => (
        <>
          <div className="box bg-slate-200 my-2 cursor-pointer" onClick={() => setShowAnswer((val) => !val)}>
            {question.question}
          </div>
          <div className={`overflow-hidden h-0 transition-all duration-400 ${showAnswer ? "h-auto" : ""}`}>
            {question.answer}
          </div>
        </>
      ))}
    </div>
  );
};
