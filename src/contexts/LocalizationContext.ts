import { createContext, Dispatch, SetStateAction } from 'react';

type LangContextType = {
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
};

const LocalizationContext = createContext<LangContextType>({
  lang: 'ru',
  setLang: () => {},
});
LocalizationContext.displayName = 'LocalizationContext';

export default LocalizationContext;
