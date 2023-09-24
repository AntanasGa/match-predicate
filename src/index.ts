
type ReducedType<T> = T extends number ? number : T extends string ? string : never;
type ValidationType<T, E extends boolean> = E extends true ? T : ReducedType<T>;
type AcceptedValidators<T extends string | number, Explicit extends boolean> = T | T[] | ((arg: ValidationType<T, Explicit>) => boolean)

export default function matchPredicate<Input extends string | number, Result, Explicit extends boolean = false>(selectorList: [AcceptedValidators<Input, Explicit>, () => Result][]) {
  if (!Array.isArray(selectorList)) {
    throw new Error('Expected selector to be an array, got: ' + typeof selectorList);
  }

  type Validator = ValidationType<Input, Explicit>;
  type Resolver = (typeof selectorList)[number][1];
  
  const computed: Record<string | number, Resolver> = {};
  const consumable: [((arg: Validator) => boolean), Resolver][] = [];

  for (const index in selectorList) {
    const [validator, resolver] = selectorList[index];
    if (typeof resolver !== 'function') {
      throw new Error('Missing resolver for Selector with id: ' + index);
    }

    if (typeof validator === 'number' || typeof validator === 'bigint' || typeof validator === 'string') {
      computed[validator] = resolver;
      continue;
    }

    if (Array.isArray(validator)) {
      for (const innerIndex in validator) {
        const innerValidator = validator[innerIndex];
        if (typeof innerValidator !== 'number' && typeof innerValidator !== 'bigint' && typeof innerValidator !== 'string') {
          throw new Error('Expected Array validator to be number or string, got: ' + typeof innerValidator);
        }
        computed[innerValidator] = resolver;
      }
      
      continue;
    }

    if (typeof validator !== 'function') {
      throw new Error('Unexpected type for validator, got:' + typeof validator);
    }

    consumable.push([validator, resolver]);
  }
  return function (input: Validator, defaultResolver?: ReturnType<Resolver> | Resolver) {
    let actionResolver: Resolver | undefined;
    if (typeof input !== 'function') {
      actionResolver = computed[input];
      if (actionResolver) {
        return actionResolver();
      }
    }
    for (const [validator, resolver] of consumable) {
      if (validator(input)) {
        return resolver();
      }
    }
    
    return defaultResolver instanceof Function ? defaultResolver() : defaultResolver;
  };
}
