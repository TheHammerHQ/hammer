import { I18n } from "@hammerhq/localization";

let i18n: I18n;

export const setI18n = (instance: I18n) => (i18n = instance);
export const getI18n = () => i18n;
