export interface UseBoolean {
  readonly state: boolean,
  readonly toggle: () => void;
  readonly off: () => void;
  readonly on: () => void;
}

export interface _History {
  readonly back: () => Promise<void>;
  readonly replace: (pathname: string, state?: Record<string, string>) => void;
  readonly push: (pathname: string, state?: Record<string, string>) => void;
  readonly length: number;
  readonly state: Record<string, string>;
}

export interface UseHistoryUrl {
  readonly url: URL;
  readonly history: _History;
}
