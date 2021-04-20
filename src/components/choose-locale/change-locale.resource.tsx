export type PostUserProperties = (
  userUuid: string,
  userProperties: any,
  abortController?: AbortController,
) => Promise<any>;
