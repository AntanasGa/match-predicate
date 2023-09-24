import { assert } from "chai";
import matchPredicate from "..";

enum TestValues {
  Success,
  Failure
}

describe('EdgeCases', () => {
  it('Works with enums', () => {
    const expectedResult = !!0;
    const match = matchPredicate<TestValues, boolean, true>([
      [TestValues.Success, () => expectedResult],
      [(i) => TestValues.Failure === i, () => !expectedResult],
    ]);

    assert.equal(match(TestValues.Success), expectedResult);
  });
});
