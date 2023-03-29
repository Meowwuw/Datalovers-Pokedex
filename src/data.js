// estas funciones son de ejemplo

export const filterData = (data, condition) => {
  return data.filter((obj) => condition(obj));
};

export const sortData = (data, sortBy, sortOrder) => {
  if (sortOrder !== "dsc" && sortOrder !== "asc") {
    throw new Error("Invalid sortOrder argument");
  }
  return data.sort((a, b) => {
    return sortOrder === "dsc"
      ? b[sortBy].localeCompare(a[sortBy])
      : a[sortBy].localeCompare(b[sortBy]);
  });
};
