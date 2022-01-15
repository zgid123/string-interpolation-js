export type TData = string | number | boolean | undefined | null;
export type TParams =
  | { [key: string]: TData | Record<string, TData | TParams> }
  | TData[];

export interface IOptionsBaseProps {
  clearDirtyParam?: boolean;
}

export interface IOptionsWithPatternProps extends IOptionsBaseProps {
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

export interface IOptionsWithRegExpPatternProps extends IOptionsBaseProps {
  pattern: RegExp;
}

export type TOptions = Omit<
  Partial<IOptionsWithPatternProps & IOptionsWithRegExpPatternProps>,
  'pattern'
> & {
  pattern?: string | RegExp;
};
