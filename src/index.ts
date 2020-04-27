type TParams = { [key: string]: any } | any[];

interface IOptions {
  clearDirtyParam?: boolean;
}

const replaceKeyword = (source: string, keyword: string | number, value: any) => {
  return source.replace(new RegExp(`:${keyword}`, 'g'), value);
};

const clearDirtyParam = (source: string) => {
  return source.replace(/:([^ ]+)/, '');
};

const interpole = (source: string, params: TParams, options: IOptions = { clearDirtyParam: false }) => {
  const sourceType = typeof source;

  if (sourceType !== 'string') {
    return source;
  }

  if (Array.isArray(params)) {
    for (const i in params) {
      source = replaceKeyword(source, i, params[i]);
    }
  } else {
    Object.entries(params).forEach(([key, value]) => {
      source = replaceKeyword(source, key, value);
    });
  }

  if (options.clearDirtyParam) {
    return clearDirtyParam(source);
  }

  return source;
};

export default interpole;
