import { assert } from "chai";
import matchPredicate from "..";

enum TestValues {
  Success,
  Failure
}

describe('EdgeCases', () => {
  it('Works with enums', () => {
    const expectedResult = !!0;
    const match = matchPredicate([
      [TestValues.Success.toString(), () => expectedResult],
    ]);

    assert.equal(match(TestValues.Success.toString()), expectedResult);
  });
});
