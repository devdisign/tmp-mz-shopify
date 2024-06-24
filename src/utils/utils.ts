export const toPriceString = (pence: number, currency = "GBP"): string => {
  return `${(pence / 100).toFixed(2)} ${currency}`;
};

export class AsyncLock {
  promise = Promise.resolve();
  disable = () => { }
  enable = () => this.promise = new Promise(resolve => this.disable = resolve);
}

export const cssUrl = (url: string) => `url("${url}")`;
