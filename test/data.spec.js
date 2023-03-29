import { filterData, sortData } from "../src/data.js";

describe("filterData", () => {
  it("is a function", () => {
    expect(typeof filterData).toBe("function");
  });

  it("returns `pikachu`", () => {
    expect(
      filterData([{ name: "pikachu" }, { name: "dragonite" }], (pokemon) =>
        pokemon.name.startsWith("pikachu")
      )
    ).toStrictEqual([{ name: "pikachu" }]);
  });
});

describe("sortData", () => {
  it("is a function", () => {
    expect(typeof sortData).toBe("function");
  });

  it("returns `pikachu after dragonite`", () => {
    expect(
      sortData([{ name: "pikachu" }, { name: "dragonite" }], "name", "asc")
    ).toStrictEqual([{ name: "dragonite" }, { name: "pikachu" }]);
  });
});
