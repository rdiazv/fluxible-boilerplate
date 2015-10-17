import BaseStore from 'fluxible/addons/BaseStore';
import counterpart from 'counterpart';

class TranslationsStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.translations = {};
    this.locale = 'en';
  }

  handleSetLocale(locale) {
    this.translations = require(`../../i18n/${locale}`);
    this.locale = locale;
    this.loadTranslations();
    this.emitChange();
  }

  loadTranslations() {
    counterpart.registerTranslations(this.locale, this.translations);
    counterpart.setLocale(this.locale);
  }

  dehydrate() {
    return {
      translations: this.translations,
      locale: this.locale
    };
  }

  rehydrate(state) {
    this.translations = state.translations;
    this.locale = state.locale;
    this.loadTranslations();
  }
}

TranslationsStore.storeName = 'TranslationsStore';
TranslationsStore.handlers = {
  SET_LOCALE: 'handleSetLocale'
};

export default TranslationsStore;
