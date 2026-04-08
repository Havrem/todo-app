import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';

import svCommon from './locales/sv/common.json';

export const defaultNS = 'common';

export const resources = {
    en: {
        common: enCommon,
    },
    sv: {
        common: svCommon,
    },
} as const;

i18n.use(initReactI18next).init({
    resources,
    lng: Localization.getLocales()[0]?.languageCode ?? 'en',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS,
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
});

export default i18n;