export function caplitalizeFirstLetterOfWords(
  words: string
): string | undefined {
  try {
    const arrayOfSingleWords = words.split(' ');

    return arrayOfSingleWords
      .map((singleWord) => {
        return singleWord
          .split('')
          .map((charac, index) => {
            if (index === 0) {
              charac = charac.toUpperCase();
            }
            return charac;
          })
          .join('');
      })
      .join(' ');
  } catch (e: any) {
    console.log('Error in caplitalizeFirstLetterOfAWord function' + e);
    return undefined;
  }
}
