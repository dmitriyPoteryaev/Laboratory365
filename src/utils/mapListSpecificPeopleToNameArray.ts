export const mapListSpecificPeopleToNameArray = (arr: any) => {
  return arr.map((elem: any) => {
    const id = elem.url.charAt(elem.url.length - 2);
    return { name: elem.name, id: id };
  });
};
