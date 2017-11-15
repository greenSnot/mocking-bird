export type MockingBirdEvent = {
  onChange: Function;
}

export type MockingBirdBtn = {
  value: Function;
}

export type MockingBirdFolder = MockingBirdEvent & {
  value: MockingBirdState;
  active: boolean;
}

export type MockingBirdCheck = MockingBirdEvent & {
  value: boolean;
}

export type MockingBirdInput = MockingBirdEvent & {
  value: string;
}

export type MockingBirdRange = MockingBirdEvent & {
  value: number;
  limit: {
    min: number;
    max: number;
    step: number;
  }
}

export type MockingBirdSelect = {
  value: string;
  limit: string[];
}

export type MockingBirdState = {
  [key: string]: MockingBirdCheck | MockingBirdRange | MockingBirdInput | MockingBirdBtn | MockingBirdFolder | MockingBirdSelect;
};

export function detect(i) {
  if (typeof i.value === 'string') {
    if (typeof i.limit === 'object') {
      return 'select';
    }
    return 'input';
  }
  if (typeof i.value === 'number') {
    if (typeof i.limit === 'object') {
      return 'range';
    }
    return 'input';
  }
  if (typeof i.active === 'boolean') {
    return 'folder';
  }
  if (typeof i.value === 'function') {
    return 'btn';
  }
  if (typeof i.value === 'boolean') {
    return 'check';
  }
}

export function isRange(i) {
  return typeof i.value === 'string' && typeof i.limit === 'object';
}