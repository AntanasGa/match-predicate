import matchPredicate from "..";

describe('Incorrect usage of match', () => {
  describe('Validators', () => {
    describe('Single layer', () => {
      it('Does not accept object', (done) => {
        try {
          matchPredicate([
            //@ts-expect-error for tests this can be ignored, as its needed to test exceptions
            [{item: 0}, () => !!0],
          ]);
        } catch {
          return done();
        }
        done(new Error('predicate accepts object'));
      });
  
      it('Does not accept null', (done) => {
        try {
          matchPredicate([
            //@ts-expect-error for tests this can be ignored, as its needed to test exceptions
            [null, () => !!0],
          ]);
  
        } catch {
          return done();
        }
        done(new Error('predicate accepts null'));
      });

      it('Does not accept regex', (done) => {
        try {
          matchPredicate([
            //@ts-expect-error for tests this can be ignored, as its needed to test exceptions
            [/d/, () => !!0],
          ]);
        } catch {
          return done();
        }
        done(new Error('predicate accepts regex'));
      });
    });

    describe('Multi layer', () => {
      it('Does not accept array', (done) => {
        try {
          matchPredicate([
            //@ts-expect-error for tests this can be ignored, as its needed to test exceptions
            [[[1, 2]], () => !!0],
          ]);
        } catch {
          return done();
        }
        done(new Error('predicate accepts multilayer arrays'));
      });

      it('Does not accept functions', (done) => {
        try {
          matchPredicate([
            //@ts-expect-error for tests this can be ignored, as its needed to test exceptions
            [[[() => true]], () => !!0],
          ]);
        } catch {
          return done();
        }
        done(new Error('predicate accepts multilayer functions'));
      });
    });
  });
});
