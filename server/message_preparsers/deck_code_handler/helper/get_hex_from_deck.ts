import _ from "lodash";

export function getHexFromDeck(deck: any) {
  const heroes: { red: number, blue: number, green: number, black: number} = {
    black: 0,
    blue: 0,
    green: 0,
    red: 0
  };

  _.forEach(deck.heroes, (hero) => {
    (heroes as any)[hero.colour]++;
  });

  let highestVal = 0;
  let highestCol = "";
  const arr = Object.keys(heroes).map((col) => {
    if ((heroes as any)[col] > highestVal) {
      highestVal = (heroes as any)[col];
      highestCol = col;
    }

  });

  const colourMap: any = { none: 0xffffff, blue: 0x2f7492, red: 0xc2352d , green: 0x479036 , black: 0x736e80 };
  return colourMap[highestCol];
}
