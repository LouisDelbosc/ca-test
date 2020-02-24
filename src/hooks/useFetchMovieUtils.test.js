import { getDate, objectToString } from "./useFetchMovie";

describe("getDate", () => {
  it("should get year-month-day format", () => {
    const date = new Date(2019, 10, 10);
    expect(getDate(date)).toBe("2019-11-10");
  });
  it("should get january with 01", () => {
    const date = new Date(2019, 0, 20);
    expect(getDate(date)).toBe("2019-01-20");
  });
  it("should get day with 0 before when day < 10", () => {
    const date = new Date(2019, 1, 9);
    expect(getDate(date)).toBe("2019-02-09");
  });
});

describe("objectToString", () => {
  it("should return string with all keys and values", () => {
    const obj = { key1: "val1", key2: "val2", key_3: "val_3" };
    expect(objectToString(obj)).toBe("&key1=val1&key2=val2&key_3=val_3");
  });
});
