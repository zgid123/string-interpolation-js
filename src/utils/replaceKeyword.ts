import { escapeRegExp } from './escapeRegExp';
import type { TData, TOptions, TParams } from '../interface';

function isObject(obj: unknown): obj is Record<string, TParams | TData> {
  return typeof obj === 'object' && !!obj
}

function replaceKeyword(
  source: string,
  keyword: string | number,
  value: any,
  options: Omit<TOptions, 'clearDirtyParam'> = {},
): string {
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

export function replaceKeywordForArrayParams(source: string, params: TData[], options: TOptions): string {
  for (const i in params) {
    source = replaceKeyword(source, i, params[i], options);
  }

  return source;
};

function replaceKeywordForNestedObjectParams(source: string, key: string, params: Record<string, TParams | TData>, options: TOptions): string {
  Object.entries(params).forEach(([objectKey, objectValue]) => {
    const replaceKey = `${key}.${objectKey}`;

    if (isObject(objectValue)) {
      source = replaceKeywordForNestedObjectParams(source, replaceKey, objectValue, options);
    } else {
      source = replaceKeyword(source, replaceKey, objectValue, options);
    }
  });

  return source;
};

export function replaceKeywordForObjectParams(source: string, params: TParams, options: TOptions): string {
  Object.entries(params).forEach(([key, value]) => {
    if (isObject(value)) {
      source = replaceKeywordForNestedObjectParams(source, key, value, options);
    } else {
      source = replaceKeyword(source, key, value, options);
    }
  });

  return source;
};
