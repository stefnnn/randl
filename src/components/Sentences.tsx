import React, { useState } from "preact/compat";
import { Article } from "./PickArticle";
import Config from "src/lib/config";

export const Sentences: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="px-4 md:px-0">
      {article.sentences?.map((_, ix) => (
        <SentenceComp article={article} ix={ix} key={ix} />
      ))}
    </div>
  );
};

function addDot(article, ix) {
  return ix == article?.sentences?.length - 1 ? "" : ".";
}

export const SentenceComp: React.FC<{ article: Article; ix: number }> = ({ article, ix }) => {
  const sentence = article?.sentences?.[ix] + addDot(article, ix);
  const translated = article?.sentences_translated?.[ix];
  const audioUrl = article?.audio ? `${Config.BASE}${article?.audio}${ix}` : undefined;
  const empty = sentence.match(/^\s+$/);
  const [showTranslation, setShowTranslation] = useState(0);

  function playAudio() {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.loop = false;
      audio.play();
    }
  }

  function toggleTranslations(evt: any) {
    evt.stopPropagation();
    setShowTranslation((val) => (val + 1 > 2 ? 0 : val + 1));
  }

  return empty ? null : (
    <div className="group cursor-pointer relative -mx-4 px-4 py-2 hover:bg-slate-100" onClick={playAudio}>
      <IconPlay className="text-transparent text-neutral-200 cursor-pointer absolute mb-1 z-10 top-4 -left-4 md:-left-6 mr-1 w-4 h-4 group-hover:text-purple-400" />
      {sentence}
      <IconInfo
        className="absolute top-4 -right-4 md:-right-10 w-4 h-4 mb-1 mx-2 cursor-pointer inline rounded-full text-neutral-700 bg-neutral-100 group-hover:bg-purple-200 hover:bg-orange-400"
        onClick={toggleTranslations}
      />
      <div
        className={`${showTranslation % 2 == 1 ? "rotate-180" : ""} ${
          showTranslation == 0 ? "h-0 overflow-hidden" : ""
        } text-neutral-400 text-sm`}
      >
        {translated}
      </div>
    </div>
  );
};

const IconInfo = ({ className, onClick }) => (
  <svg className={className} onClick={onClick} width="28" height="28" viewBox="0 0 28 28">
    <path
      d="M14.291 20.1211L15.4531 20.3555L15.3457 21H11.5078L12.9727 12.6992L12.084 12.4648L12.1914 11.8203H15.7559L14.291 20.1211ZM13.4707 8.61719C13.4707 8.19401 13.6172 7.83919 13.9102 7.55273C14.2096 7.26628 14.5645 7.12305 14.9746 7.12305C15.3913 7.12305 15.7428 7.26953 16.0293 7.5625C16.3223 7.84896 16.4688 8.20052 16.4688 8.61719C16.4688 9.02734 16.3255 9.38216 16.0391 9.68164C15.7526 9.97461 15.3978 10.1211 14.9746 10.1211C14.5579 10.1211 14.2031 9.97786 13.9102 9.69141C13.6172 9.39844 13.4707 9.04036 13.4707 8.61719Z"
      fill="currentColor"
    />
  </svg>
);

const IconPlay = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 28 28">
    <path d="M23 14.5L7.25 23.5933L7.25 5.40673L23 14.5Z" fill="currentColor" />
  </svg>
);
