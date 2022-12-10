import { ValueList, ValueMap } from '.';
import { Path, PathSegments } from '../types/common';
import {
  INone,
  ISome,
  MaybeInput,
  ValueListValues,
  ValueMapValues,
} from '../types/value';
import { None, Some } from './maybe';

export function isMap(values?: any): boolean {
  return values instanceof ValueMap || typeof values === 'object';
}

export function isList(values?: any): boolean {
  return values instanceof ValueList || Array.isArray(values);
}

export function convertAny(value: any): any {
  if (isList(value)) {
    return convertList(value);
  } else if (isMap(value)) {
    return convertMap(value);
  }

  return convertScalarValue(value);
}

export function convertScalarValue<T>(value?: MaybeInput<T>): ISome<T> | INone {
  if (value === null || value === undefined) {
    return None.create();
  } else if (value instanceof Some) {
    return value;
  } else if (value instanceof None) {
    return value;
  }

  return Some.create(value);
}

export function convertMap<T>(values?: any): ValueMapValues<T> {
  if (values === null || values === undefined) {
    return {};
  } else if (values instanceof ValueMap) {
    return convertMap(values.toJS());
  }

  const keys = Object.keys(values);
  return keys.reduce((acc, key) => {
    acc[key] = convertAny(values[key]);

    return acc;
  }, {});
}

export function convertList<T>(values?: any): ValueListValues<T> {
  if (values === null || values === undefined) {
    return [];
  } else if (values instanceof ValueList) {
    return convertList(values.toJS());
  }

  return values.map(convertAny);
}

export function toPath(path: Path | null | undefined): PathSegments {
  if (path === undefined || path === null) {
    return [];
  }

  if (Array.isArray(path)) {
    return path;
  }

  const segments = path.split(/\./);

  return segments.map((segment: any) =>
    isNaN(segment) ? segment : parseInt(segment, 2)
  );
}
