const normalizeParams = (param: string) => {
  let result = param;
  const splitParams = result.split('?');

  if (splitParams.length > 1) {
    result = splitParams
      .map((el, i) => {
        return i === 0 ? el : i > 1 ? `&${el}` : `?${el}`;
      })
      .join('');
  }

  return result;
};

const util = { normalizeParams };

export default util;
