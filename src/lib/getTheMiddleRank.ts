const CONTROL_VALUE = 'a';

const getNextChar = (char: string, step: number): string =>
  String.fromCharCode(char.charCodeAt(0) + step);

const padWithControlValue = (length: number) =>
  Array.from({ length }).fill(CONTROL_VALUE).join('');

const findIndexToChange = (upsideRank: string, downsideRank: string) => {
  let index = 0;
  while (upsideRank[index] === downsideRank[index]) {
    index++;
  }
  return index;
};

export const getTheMiddleRank = (
  upsideRank?: string,
  downsideRank?: string
): string => {
  if (!upsideRank && downsideRank) {
    return getNextChar(downsideRank[0], -1) + downsideRank.slice(1);
  }

  if (upsideRank && !downsideRank) {
    return getNextChar(upsideRank[0], 1) + upsideRank.slice(1);
  }

  if (!upsideRank || !downsideRank) {
    const newOne = padWithControlValue(14).split('');
    newOne[6] = 'b';
    return newOne.join('');
  }

  let indexToChange = findIndexToChange(upsideRank, downsideRank);

  if (getNextChar(upsideRank[indexToChange], 1) === downsideRank[indexToChange]) {
    indexToChange++;
  }

  if (indexToChange >= upsideRank.length) {
    throw new Error("Can't increment rank");
  }

  const nextChar = getNextChar(upsideRank[indexToChange], 1);

  return (upsideRank.slice(0, indexToChange) +
  nextChar + upsideRank.slice(indexToChange + 1).replace(/./g, CONTROL_VALUE));
};
