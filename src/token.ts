const LOCAL_STORAGE_KEY = 'ig-stats-token';
export const getCurrentToken = (): string | null => window.localStorage.getItem(LOCAL_STORAGE_KEY)
export const hasToken = (): boolean => !!getCurrentToken();
export const setCurrentToken = (token: string) => window.localStorage.setItem(LOCAL_STORAGE_KEY, token)
