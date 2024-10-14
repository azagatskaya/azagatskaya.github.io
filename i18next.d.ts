// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import ru from 'src/services/localization/ru.json';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'ru';
    // custom resources type
    resources: {
      ru: typeof ru;
    };
    // other
  }
}
