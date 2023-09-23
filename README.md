# Match predicate

Function inspired by rust match case.

The function creates cached instance so it can be reused without reinitialization.

## Usage

For simple operations:

```ts
import matchPredicate from "match-predicate";

const result = matchPredicate([
  [1, () => "Hello"],
  [2, () => "World"],
])(1);
```

Match statement is reusable:

```ts
import matchPredicate from "match-predicate";

const match = matchPredicate([
  [1, () => "Now we're thinking with match"],
  [2, () => "Wow"],
]);

console.log([match(2), match(1)].join(", "))
```

Match using a function:

```ts
const result = matchPredicate([
  [(i: number) => i > 0, () => "It's getting more interesting"],
])(1);
```

Default values:

```ts
const match = matchPredicate([
  [(i: number) => i > 0, () => "It's getting more interesting"],
])
const result = match(-1, "Oh no, nothing matched");

const result = match(-2, () => "It works with functions too");
```
