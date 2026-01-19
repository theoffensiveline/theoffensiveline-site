interface ThemeColors {
  link: string;
  text: string;
  background: string;
  componentBackground: string;
  tableHeaderBackground: string;
  neutral1: string;
  neutral2: string;
  neutral3: string;
  neutral4: string;
  neutral5: string;
  newsRed: string;
  newsBlue: string;
  newsBlueDark: string;
  success: string;
  successDark: string;
  yahoo: string;
  button: string;
  buttonText: string;
  hotDogYellow: string;
  hotDogOrange: string;
  hotDogPink: string;
  hotDogPurple: string;
  hotDogBlue: string;
  hotDogBrown: string;
  hotDogGold: string;
}

interface ColorConstantsType {
  light: ThemeColors;
  dark: ThemeColors;
}

export const ColorConstants: ColorConstantsType = {
  light: {
    link: "#1976d2",
    text: "#2E2E2E",
    background: "#ECECDF",
    componentBackground: "#ffffff",
    tableHeaderBackground: "#7F8899",
    neutral1: "#7E6551",
    neutral2: "#668F80",
    neutral3: "#7D8491",
    neutral4: "#71816D",
    neutral5: "#C2C299",
    newsRed: "#FF3366",
    newsBlue: "#20A4F4",
    newsBlueDark: "#1557b0",
    success: "#34a853",
    successDark: "#2d8e4a",
    yahoo: "#400090",
    button: "#555555",
    buttonText: "#e7e7e7",
    hotDogYellow: "#FFBE0B",
    hotDogOrange: "#FB5607",
    hotDogPink: "#FF006E",
    hotDogPurple: "#8338EC",
    hotDogBlue: "#3A76FF",
    hotDogBrown: "#483519",
    hotDogGold: "#FFD700",
  },
  dark: {
    link: "#1976d2",
    text: "#ECECDF",
    background: "#2E2E2E",
    componentBackground: "#3A404C",
    tableHeaderBackground: "#2F3649",
    neutral1: "#7E6551",
    neutral2: "#668F80",
    neutral3: "#7D8491",
    neutral4: "#71816D",
    neutral5: "#C2C299",
    newsRed: "#FF3366",
    newsBlue: "#20A4F4",
    newsBlueDark: "#6d9bf7",
    success: "#81c995",
    successDark: "#5d9c6e",
    yahoo: "#400090",
    button: "#e7e7e7",
    buttonText: "#555555",
    hotDogYellow: "#FFBE0B",
    hotDogOrange: "#FB5607",
    hotDogPink: "#FF006E",
    hotDogPurple: "#8338EC",
    hotDogBlue: "#3A76FF",
    hotDogBrown: "#483519",
    hotDogGold: "#FFD700",
  },
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

export const custom_palette12 = [
  "#bc293d",
  "#cc545a",
  "#da7878",
  "#e79a98",
  "#f1bcb9",
  "#f9dddc",
  "#dbe8dd",
  "#b7d1bb",
  "#94ba9b",
  "#70a37c",
  "#4c8d5d",
  "#227740",
];

export const custom_palette36 = [
  "#bc293d",
  "#c23946",
  "#c74850",
  "#cc545a",
  "#d16163",
  "#d66d6e",
  "#da7878",
  "#df8482",
  "#e38f8d",
  "#e79a98",
  "#eaa5a3",
  "#eeb0ae",
  "#f1bcb9",
  "#f4c7c4",
  "#f7d2d0",
  "#f9dddc",
  "#fbe8e7",
  "#fdf4f3",
  "#f3f7f3",
  "#e7efe8",
  "#dbe8dd",
  "#cfe0d2",
  "#c3d8c6",
  "#b7d1bb",
  "#abc9b1",
  "#9fc2a6",
  "#94ba9b",
  "#88b290",
  "#7cab86",
  "#70a37c",
  "#649c71",
  "#589567",
  "#4c8d5d",
  "#3f8653",
  "#327e4a",
  "#227740",
];
