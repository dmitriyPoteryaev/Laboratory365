export const mapListSpecificPeopleToNameArray = (arr: any) => {
  return arr.map((elem: any) => {
    const aa = elem.url.split("/");
    const gg = aa[aa.length - 2];

    const id = gg;
    return { name: elem.name, id: id };
  });
};
