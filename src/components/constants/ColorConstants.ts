export const ColorConstants = {
  link: "#1976d2",
  text: "#2E2E2E",
  background: "#ECECDF",
  neutral1: "#7E6551",
  neutral2: "#668F80",
  neutral3: "#7D8491",
  neutral4: "#71816D",
  neutral5: "#C2C299",
  newsRed: "#FF3366",
  newsBlue: "#20A4F4",
};

interface ColorsByPosition {
  [key: string]: string;
}

export const colorsByPosition: ColorsByPosition = {
  QB: "#E1676F",
  RB: "#11D677",
  WR: "#4DB6F0",
  TE: "#E9AC53",
  K: "#D959FF",
  DEF: "#65645A",
};