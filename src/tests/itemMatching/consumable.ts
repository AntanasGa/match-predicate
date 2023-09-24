import { assert } from "chai";
import matchPredicate from "../..";

export default () => {
  describe('Consumable matching (function matching)', () => {
    it('Matches by function provided', () => {
      const expectedResult = !!0;
      const match = matchPredicate<number, boolean>([
        [
          (i) => i > 0,
          () => expectedResult, 
        ],
      ]);
      const result = match(3);
      assert.equal(result, expectedResult);
    });
  });
};
