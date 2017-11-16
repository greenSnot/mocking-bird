export type MockingBirdEvent = {
  onChange: Function;
}

export type MockingBirdBtn = {
  value: Function;
  order?: number;
}

export type MockingBirdFolder = MockingBirdEvent & {
  value: MockingBirdState;
  active: boolean;
  order?: number;
}

export type MockingBirdCheck = MockingBirdEvent & {
  value: boolean;
  order?: number;
}

export type MockingBirdInput = MockingBirdEvent & {
  value: string;
  order?: number;
}

export type MockingBirdRange = MockingBirdEvent & {
  value: number;
  limit: {
    min: number;
    max: number;
    step: number;
  }
  order?: number;
}

export type MockingBirdSelect = {
  value: string;
  limit: string[];
  order?: number;
}

export type MockingBirdItem = MockingBirdCheck | MockingBirdRange | MockingBirdInput | MockingBirdBtn | MockingBirdFolder | MockingBirdSelect;
export type MockingBirdState = {
  [key: string]: MockingBirdItem;
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