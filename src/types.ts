export type MockingFrogEvent = {
  onChange?: Function;
}

export type MockingFrogBtn = {
  value: Function;
  order?: number;
}

export type MockingFrogFolder = MockingFrogEvent & {
  value: MockingFrogState;
  active: boolean;
  order?: number;
}

export type MockingFrogCheck = MockingFrogEvent & {
  value: boolean;
  order?: number;
}

export type MockingFrogInput = MockingFrogEvent & {
  value: string;
  immediatelyChange?: boolean;
  order?: number;
}

export type MockingFrogRange = MockingFrogEvent & {
  value: number;
  limit: {
    min: number;
    max: number;
    step: number;
  }
  immediatelyChange?: boolean;
  order?: number;
}

export type MockingFrogSelect = {
  value: string;
  limit: string[];
  order?: number;
}

export type MockingFrogItem = MockingFrogCheck | MockingFrogRange | MockingFrogInput | MockingFrogBtn | MockingFrogFolder | MockingFrogSelect;
export type MockingFrogState = {
  [key: string]: MockingFrogItem;
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