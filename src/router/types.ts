interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path: string;
  auth?: boolean;
  mete?: object;
  mata?: string
}

export type { RouteObject };
