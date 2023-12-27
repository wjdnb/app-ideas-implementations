import { describe, expect, test } from "vitest";
import { binaryValidate, bin2Dec } from "../utils";

describe("binaryValidate test", () => {
  test("if input is empty, return false", () => {
    expect(binaryValidate("")).toBe(false);
  });
  test("if input is letters, return false", () => {
    expect(binaryValidate("kwqekfwq")).toBe(false);
  });
  test("if input is binary, return true", () => {
    expect(binaryValidate("0101001")).toBe(true);
  });
  test("If the single number entered is greater than 1, return false", () => {
    expect(binaryValidate("221345")).toBe(false);
  });
});

describe("", () => {
  test('bin2Dec converts binary "1101" to decimal 13', () => {
    expect(bin2Dec("1101")).equal(13);
  });

  test('bin2Dec converts binary "101010" to decimal 42', () => {
    expect(bin2Dec("101010")).equal(42);
  });

  test('bin2Dec converts binary "1111" to decimal 15', () => {
    expect(bin2Dec("1111")).equal(15);
  });
});
