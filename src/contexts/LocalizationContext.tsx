import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type LangContextType = {
  lang: string;
  setLang: Dispatch<SetStateAction<string>> | null;
};

export const LocalizationContext = createContext<LangContextType>({
  lang: 'ru',
  setLang: null,
});

export const LocalizationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('ru');

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return <LocalizationContext.Provider value={{ lang, setLang }}>{children}</LocalizationContext.Provider>;
};
