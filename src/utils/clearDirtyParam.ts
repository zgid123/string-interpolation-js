export function clearDirtyParam(source: string): string {
  return source.replace(/:([^ ]+)/, '');
}
