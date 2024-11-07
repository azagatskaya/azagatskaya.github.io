import { createContext, Dispatch, SetStateAction } from 'react';

type LangContextType = {
  lang: string;
  setLang: Dispatch<SetStateAction<string>> | null;
};

const LocalizationContext = createContext<LangContextType>({
  lang: 'ru',
  setLang: null,
});
LocalizationContext.displayName = 'LocalizationContext';

export default LocalizationContext;
