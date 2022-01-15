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

function interpole(
  source: string,
  params: TParams,
  options?: IOptionsWithPatternProps,
): string;
function interpole(
  source: string,
  params: TParams,
  options?: IOptionsWithRegExpPatternProps,
): string;
function interpole(
  source: string,
  params: TParams,
  options?: IOptionsBaseProps,
): string;
function interpole(
  source: string,
  params: TParams,
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
