export const getNumberPageFromURL = (url: string): string => {
  const pageAfterSplitUrl: string[] = url.split("=");
  const page: string = pageAfterSplitUrl[pageAfterSplitUrl.length - 1];

  return page;
};
