import React, { useState } from "preact/compat";
import { Question } from "./PickArticle";

export const QuestionsBox: React.FC<{ questions: Question[] }> = ({ questions }) => {
  return (
    <div className="mt-16 mb-4">
      <h3 className="prompt text-3xl">Questions of Understanding</h3>
      {questions.map((question) => (
        <QComp question={question.question} answer={question.answer} />
      ))}
    </div>
  );
};

const QComp: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <>
      <div
        className="flex gap-2 items-start box bg-purple-600 text-white my-2 cursor-pointer"
        onClick={() => setShowAnswer((val) => !val)}
      >
        <Caret open={showAnswer} />
        {question}
      </div>

      {showAnswer ? (
        <div
          className={`border-purple-600 border-4 box -mt-3 rounded-t-none pl-[27px] bg-purple-100 transition-all duration-400`}
        >
          {answer}
        </div>
      ) : null}
    </>
  );
};

const Caret: React.FC<{ open?: boolean }> = ({ open }) => (
  <svg width="8px" height="12px" viewBox="0 0 8 12" className={open ? "mt-1 rotate-90 origin-center" : "mt-1"}>
    <g
      id="icon_caret"
      transform="translate(3.500000, 6.000000) rotate(-90.000000) translate(-3.500000, -6.000000) translate(-2.000000, 3.000000)"
      stroke="currentColor"
      fill="none"
      stroke-width="2"
    >
      <polyline id="Path" points="0.5859 0.94975 5.5356 5.8995 10.4854 0.94975"></polyline>
    </g>
  </svg>
);
