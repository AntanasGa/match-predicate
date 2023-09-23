import { assert } from "chai";
import matchPredicate from "../..";

export default () => {
  describe('Default value matching', () => {
    it('Returns undefined when no default provided', () => {
      const defaultExpected = !!0;
      const match = matchPredicate([
        [-1, () => defaultExpected],
      ]);

      const result = match(1);
      assert.equal(result, undefined);
    });

    it('Returns default value when expression provided', () => {
      const expectedResult = !!0;
      const match = matchPredicate([
        [-1, () => !expectedResult],
      ]);

      assert.equal(match(1, () => expectedResult), expectedResult);
    });

    it('Returns Default value when value provided', () => {
      const expectedResult = !!0;
      const match = matchPredicate([
        [-1, () => !expectedResult],
      ]);

      assert.equal(match(1, expectedResult), expectedResult);
    });
  });
};
