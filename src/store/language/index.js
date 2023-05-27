import StoreModule from '../module';
import * as translations from './translations';

class Language extends StoreModule {
  initState() {
    return {
      currentLanguage: 'ru',
      translation: translations['ru'],
      allLanguages: Object.keys(translations),
    };
  }

  setTranslation(lang) {
    this.setState({
      ...this.getState(),
      currentLanguage: lang,
      translation: translations[lang],
    });
  }
}

export default Language;
