import {
  clearDirtyParam,
  replaceKeywordForArrayParams,
  replaceKeywordForObjectParams,
} from './utils';
import type {
  TParams,
  TOptions,
  IOptionsBaseProps,
  IOptionsWithPatternProps,
  IOptionsWithRegExpPatternProps,
} from './interface';

function interpole<T extends TParams = TParams>(
  source: string,
  params: T,
  options?: IOptionsWithPatternProps,
): string;
function interpole<T extends TParams = TParams>(
  source: string,
  params: T,
  options?: IOptionsWithRegExpPatternProps,
): string;
function interpole<T extends TParams = TParams>(
  source: string,
  params: T,
  options?: IOptionsBaseProps,
): string;
function interpole<T extends TParams = TParams>(
  source: string,
  params: T,
  options: TOptions = { clearDirtyParam: false },
): string {
  if (typeof source !== 'string') {
    return source;
  }

  const { clearDirtyParam: needClearDirtyParam, ...otherOptions } = options;

  if (Array.isArray(params)) {
    source = replaceKeywordForArrayParams(source, params, otherOptions);
  } else {
    source = replaceKeywordForObjectParams(source, params, otherOptions);
  }

  if (needClearDirtyParam) {
    return clearDirtyParam(source);
  }

  return source;
}

export default interpole;
