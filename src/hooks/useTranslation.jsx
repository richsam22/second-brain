// src/hooks/useTranslation.js
import { useSettings } from '../context/SettingsProvider';
import translations from '../translations';

export const useTranslation = () => {
  const { language } = useSettings();

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return { t };
};
