import en from './en.json';
import tr from './tr.json';

export const defaultLanguage = 'en';
export const applicationLanguages = {
    en: en,
    tr: tr
};
export const availableLanguages = [
    {code: 'tr', language: 'Turkish', native: 'Türkçe'},
    {code: 'en', language: 'English', native: 'English'}
];