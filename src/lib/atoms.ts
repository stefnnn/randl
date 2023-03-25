import { atom } from "jotai";
import { Article } from "src/components/PickArticle";
import { Language } from "src/components/PickLanguage";

export const languageAtom = atom<Language | false>(false);
export const topicAtom = atom("");
export const articleAtom = atom<Article | false>(false);
