// Import stylesheets
//import './style.css';

import { ValueList, ValueMap, Maybe } from './src/values';

// Write TypeScript code!
//const appDiv: HTMLElement = document.getElementById('app');
//appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const valueA = Maybe.create<string>('A');

const valueMixed = ValueMap.create<any>({
  A: valueA,
  list: ValueList.create<any>([
    Maybe.create<string>('My test'),
    ValueMap.create<any>({
      a: Maybe.create<number>(1),
      b: Maybe.create<number>(2),
    }),
    Maybe.create(),
  ]),
});

console.log(valueA.set('AA').toJS());
console.log(valueA.setIn(undefined, 'A'));
console.log(valueA.get().toJS());
console.log(valueA.getIn(undefined).toJS());
console.log(valueMixed.toJS());
valueMixed.dispose();

// Rename MaybeInput, AnyValue
// Types
// Metadata
