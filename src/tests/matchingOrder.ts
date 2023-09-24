import { assert } from "chai";
import matchPredicate from "..";

describe('Item matching', () => {
  it('Proritize computed over consumable', () => {
    const expectedResult = !!0;
    const match = matchPredicate<number, boolean>([
      [
        (i) => i > 0,
        () => !expectedResult,
      ],
      [1, () => expectedResult],
    ]);
    assert.equal(match(1), expectedResult);
    assert.equal(match(2), !expectedResult);
  });

  it('Never reaches overlaping code blocks', () => {
    const expectedResult = !!0;
    const match = matchPredicate<number, boolean>([
      [
        (i) => i > 0,
        () => expectedResult,
      ],
      [
        (i) => i > 1,
        () => !expectedResult,
      ],
    ]);
    assert.equal(match(1), expectedResult);
    assert.equal(match(2), expectedResult);
  });
});
