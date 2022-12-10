// Import stylesheets
//import './style.css';

import { ValueList, ValueMap, Maybe } from './src/values';

// Write TypeScript code!
//const appDiv: HTMLElement = document.getElementById('app');
//appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const valueMap = ValueMap.create<string>({
  A: Maybe.create('A'),
  B: Maybe.create('B'),
  C: Maybe.create(),
});

console.log(valueMap.toJS());
valueMap.dispose();

const valueList = ValueList.create<string>([
  Maybe.create('A'),
  Maybe.create('B'),
  Maybe.create(),
]);

console.log(valueList.toJS());
valueList.dispose();

const valueMixed = ValueMap.create<any>({
  A: Maybe.create('A'),
  list: ValueList.create<any>([
    Maybe.create<string>('My test'),
    ValueMap.create<any>({
      a: Maybe.create<number>(1),
      b: Maybe.create<number>(2),
    }),
    Maybe.create(),
  ]),
});

console.log(valueMixed.toJS());
valueMixed.dispose();

// copyOnWrite (setIn)
// read (getIn)
// Types
// Metadata
