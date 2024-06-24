// if not home and not unlocked
// redirect to home ;

const SITE_LOCK = "SITE_LOCK";
const PASSWORD = "****";

export const isActive = () => true;

export const unlock = () => {
  window.sessionStorage.setItem(SITE_LOCK, PASSWORD);
};

export const lock = () => {
  window.sessionStorage.removeItem(SITE_LOCK);
};

export const isUnlocked = () => window.sessionStorage.getItem(SITE_LOCK) === PASSWORD;
