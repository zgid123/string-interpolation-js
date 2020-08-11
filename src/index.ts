type TParams = { [key: string]: any } | string[];

interface IOptionsBaseProps {
  clearDirtyParam?: boolean;
}

interface IOptionsWithPatternProps extends IOptionsBaseProps {
  pattern: string;
  specElement: string; // specified element to replace in pattern
  // if true, the search param must be matched exactly with pattern
  // no additional space between specified element and pattern indicator
  // for example, if the pattern is {{ _ }}
  // this example is false: {{  name     }}
  // only this example is true {{ name }}
  // if false, those two examples above are true
  exactMatch?: boolean;
}

interface IOptionsWithRegExpPatternProps extends IOptionsBaseProps {
  pattern: RegExp;
}

type TOptions = Omit<Partial<IOptionsWithPatternProps & IOptionsWithRegExpPatternProps>, 'pattern'> & {
  pattern?: string | RegExp;
};

const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const replaceKeyword = (
  source: string,
  keyword: string | number,
  value: any,
  options: Omit<TOptions, 'clearDirtyParam'> = {},
) => {
  const { pattern, specElement, exactMatch } = options;

  if (pattern instanceof RegExp) {
    return source.replace(pattern, value);
  }

  if (!pattern || !specElement) {
    return source.replace(new RegExp(`:${keyword}`, 'g'), value);
  }

  if (!exactMatch) {
    keyword = ` *${keyword} *`;
  }

  const replacementPattern = escapeRegExp(pattern).replace(specElement, keyword.toString());

  return source.replace(new RegExp(replacementPattern, 'g'), value);
};

const clearDirtyParam = (source: string) => {
  return source.replace(/:([^ ]+)/, '');
};

function interpole(source: string, params: TParams, options?: IOptionsWithPatternProps): string;
function interpole(source: string, params: TParams, options?: IOptionsWithRegExpPatternProps): string;
function interpole(source: string, params: TParams, options?: IOptionsBaseProps): string;
function interpole(source: string, params: TParams, options: TOptions = { clearDirtyParam: false }): string {
  if (typeof source !== 'string') {
    return source;
  }

  const { clearDirtyParam: needClearDirtyParam, ...otherOptions } = options;

  if (Array.isArray(params)) {
    for (const i in params) {
      source = replaceKeyword(source, i, params[i], otherOptions);
    }
  } else {
    Object.entries(params).forEach(([key, value]) => {
      source = replaceKeyword(source, key, value, otherOptions);
    });
  }

  if (needClearDirtyParam) {
    return clearDirtyParam(source);
  }

  return source;
}

export default interpole;
