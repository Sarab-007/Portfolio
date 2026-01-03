export type HttpMethod='GET'|'POST'|'PUT'|'PATCH'|'DELETE';export type HttpRequestOptions<TBody>={method?:HttpMethod;body?:TBody;headers?:Record<string,string>;signal?:AbortSignal;};
