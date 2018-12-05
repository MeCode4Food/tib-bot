
export function getHexFromColour(colourString: string): number {
    const colourMap: any = { none: 0xffffff, blue: 0x2f7492, red: 0xc2352d , green: 0x479036 , black: 0x736e80, yellow: 0xF5A623 };
    return colourMap[colourString];
}
