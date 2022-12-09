// Import stylesheets
//import './style.css';

import { EntityList, EntityMap, Maybe } from './src/entities';

// Write TypeScript code!
//const appDiv: HTMLElement = document.getElementById('app');
//appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const entityMap = EntityMap.create<string>({
  A: Maybe.create('A'),
  B: Maybe.create('B'),
  C: Maybe.create(),
});

console.log(entityMap.toJS());
entityMap.dispose();

const entityList = EntityList.create<string>([
  Maybe.create('A'),
  Maybe.create('B'),
  Maybe.create(),
]);

console.log(entityList.toJS());
entityList.dispose();

const entityMixed = EntityMap.create<any>({
  A: Maybe.create('A'),
  list: EntityList.create<any>([
    Maybe.create<string>('My test'),
    EntityMap.create<any>({
      a: Maybe.create<number>(1),
      b: Maybe.create<number>(2),
    }),
    Maybe.create(),
  ]),
});

console.log(entityMixed.toJS());
entityMixed.dispose();

// copyOnWrite (setIn)
// read (getIn)
// Types
// Metadata
