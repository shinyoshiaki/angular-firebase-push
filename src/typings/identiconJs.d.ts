declare class IdenticonJs {
  constructor(str: string, opt: { margin: number; size: number });
  toString(): string;
}

declare module "identicon.js" {
  export default IdenticonJs;
}
