export function caplitalizeFirstLetterOfAWord(
  singleWord: string
): string | undefined {
  try {
    if (singleWord.split(' ').length > 1) {
      throw new Error('The argument value is not a single word');
    }

    return singleWord
      .split('')
      .map((charac, index) => {
        if (index === 0) {
          charac = charac.toUpperCase();
        }
        return charac;
      })
      .join('');
  } catch (e: any) {
    console.log('Error in caplitalizeFirstLetterOfAWord function' + e);
    return undefined;
  }
}
