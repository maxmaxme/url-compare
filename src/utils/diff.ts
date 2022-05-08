const areSame = (description: string, v1: string | null, v2: string | null) => {
  const getSame = (v1: string | null, v2: string | null): Same => {
    if (v1 === null) {
      return 'empty';
    }
    if (v2 === null) {
      return 'empty';
    }
    if (v1 !== v2) {
      return 'different';
    }
    return 'equal';
  };
  return ({ description, values: [v1, v2], same: getSame(v1, v2) });
};
function paramsToObject(entries: any) {
  const result: {[key: string]: string} = {};
  for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}

type Same = 'equal' | 'different' | 'empty'
type Response = {[key: string]: { description: string; values: (string|null)[]; same: Same; }}

export const getDiff = (url1: string, url2: string): Response => {
  if (!url1.length || !url2.length) {
    return {};
  }
  const url1Parsed = new URL(url1);
  const url2Parsed = new URL(url2);

  const params1 = paramsToObject(url1Parsed.searchParams.entries());
  const params2 = paramsToObject(url2Parsed.searchParams.entries());
  const paramKeys = Object.keys({ ...params1, ...params2 });

  return {
    protocol: areSame('protocol', url1Parsed.protocol, url2Parsed.protocol),
    host: areSame('host', url1Parsed.host, url2Parsed.host),
    pathname: areSame('url', url1Parsed.pathname, url2Parsed.pathname),
    ...paramKeys.reduce<Response>((prev, paramName) => {
      prev['param_' + paramName] = areSame(`?${paramName}=`, url1Parsed.searchParams.get(paramName), url2Parsed.searchParams.get(paramName));
      return prev;
    }, {}),
  };
};
