// Import stylesheets
//import './style.css';

import { MaybeScalar } from './src/values';

// Write TypeScript code!
//const appDiv: HTMLElement = document.getElementById('app');
//appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const scalarSome = MaybeScalar.create('Hello');
console.log(scalarSome.isSome());
