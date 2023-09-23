import { assert } from "chai";
import matchPredicate from "../..";

export default () => {
  describe('Computed matching', () => {
    describe('Single layer', () => {
      it('Matches number', () => {
        const expectedResult = !!0;
        const result = matchPredicate([
          [1, () => expectedResult],
          [2, () => !expectedResult],
        ])(1);
        assert.equal(result, expectedResult);
      });
  
      it('Matches strings', () => {
        const expectedResult = !!0;
        const result = matchPredicate([
          ["test", () => expectedResult],
        ])("test");
        assert.equal(result, expectedResult);
      });
    });
  
    describe('Multi layer', () => {
      it('Matches number', () => {
        const expectedResult = !!0;
        const match = matchPredicate([
          [[1, 2], () => expectedResult],
        ]);
        const result1 = match(1);
        const result2 = match(2);
        assert.equal(result1, expectedResult);
        assert.equal(result2, expectedResult);
      });
  
      it('Matches number', () => {
        const expectedResult = !!0;
        const match = matchPredicate([
          [[1, 2], () => expectedResult],
        ]);
        const result1 = match(1);
        const result2 = match(2);
        assert.equal(result1, expectedResult);
        assert.equal(result2, expectedResult);
      });
    });
  });
};
