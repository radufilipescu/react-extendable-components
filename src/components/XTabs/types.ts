export type TPropKey<T> = T extends object ? keyof T : T;

export type TPropValue<T> = T extends object ? T[keyof T] : T;

export type TPropEntry<T> = [
  TPropKey<T>,
  TPropValue<T>
];