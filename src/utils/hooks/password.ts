// const validatePassword = (password?: string) => password !== undefined;
// export type SiteLock = [locked: boolean,
//   readonly replaceState: (pathname: string) => (e?: MouseEvent) => void;
//   readonly pushState: (pathname: string) => (e?: MouseEvent) => void;
// }
// export type SiteLock = [
//   boolean,
//   {
//     readonly lock: () => void;
//     readonly unlock: (passwordAttempt: string) => boolean;
//   }
// ]

// export const useSiteLock = (password?: string) => {
//   const [locked, handleLock] = useBoolean(
//     // TODO: investigate
//     validatePassword(password) && getCookie(COOKIES.SITE_LOCK) !== password
//   );

//   const lock = useCallback(() => {
//     handleLock.on();
//     window.sessionStorage.removeItem(COOKIES.SITE_LOCK);
//   }, [handleLock]);

//   const unlock = useCallback((passwordAttempt: string) => {
//     // const passwordHash = window.crypto.subtle.encrypt("md5", passwordAttempt);
//     if (passwordAttempt === password) {
//       setCookie(COOKIES.SITE_LOCK, passwordAttempt);
//       handleLock.off();
//       return true;
//     }

//     return false;
//   }, [handleLock, password]);

//   return [locked, { lock, unlock }] as const;
// };
