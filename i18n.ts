import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enChangePassword from './locales/en/changePassword.json';
import enCommon from './locales/en/common.json';
import enCreateCategory from './locales/en/createCategory.json';
import enDeleteAccount from './locales/en/deleteAccount.json';
import enEditCategory from './locales/en/editCategory.json';
import enErrors from './locales/en/errors.json';
import enHome from './locales/en/home.json';
import enLists from './locales/en/lists.json';
import enSettings from './locales/en/settings.json';
import enStart from './locales/en/start.json';
import enSwitchTheme from './locales/en/switchTheme.json';
import enSwitchLanguage from './locales/en/switchLanguage.json';

import svChangePassword from './locales/sv/changePassword.json';
import svCommon from './locales/sv/common.json';
import svCreateCategory from './locales/sv/createCategory.json';
import svDeleteAccount from './locales/sv/deleteAccount.json';
import svEditCategory from './locales/sv/editCategory.json';
import svErrors from './locales/sv/errors.json';
import svHome from './locales/sv/home.json';
import svLists from './locales/sv/lists.json';
import svSettings from './locales/sv/settings.json';
import svStart from './locales/sv/start.json';
import svSwitchTheme from './locales/sv/switchTheme.json';
import svSwitchLanguage from './locales/sv/switchLanguage.json';

export const defaultNS = 'common';

export const resources = {
    en: {
        common: enCommon,
        start: enStart,
        home: enHome,
        lists: enLists,
        settings: enSettings,
        changePassword: enChangePassword,
        deleteAccount: enDeleteAccount,
        switchTheme: enSwitchTheme,
        createCategory: enCreateCategory,
        editCategory: enEditCategory,
        switchLanguage: enSwitchLanguage,
        errors: enErrors
    },
    sv: {
        common: svCommon,
        start: svStart,
        home: svHome,
        lists: svLists,
        settings: svSettings,
        changePassword: svChangePassword,
        deleteAccount: svDeleteAccount,
        switchTheme: svSwitchTheme,
        createCategory: svCreateCategory,
        editCategory: svEditCategory,
        switchLanguage: svSwitchLanguage,
        errors: svErrors
    },
} as const;

i18n.use(initReactI18next).init({
    resources,
    lng: Localization.getLocales()[0]?.languageCode ?? 'en',
    fallbackLng: 'en',
    ns: ['common', 'start', 'home', 'lists', 'settings', 'changePassword', 'deleteAccount', 'switchTheme', 'createCategory', 'editCategory', 'errors'],
    defaultNS,
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
});

export default i18n;
