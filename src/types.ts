export type MockingBirdBtn = {
  value: Function;
}

export type MockingBirdFolder = {
  value: MockingBirdState;
  active: boolean;
}

export type MockingBirdInput = {
  value: string;
}

export type MockingBirdRange = {
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
  [key: string]: MockingBirdRange | MockingBirdInput | MockingBirdBtn | MockingBirdFolder | MockingBirdSelect;
};