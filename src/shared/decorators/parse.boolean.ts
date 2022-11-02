import { Transform } from 'class-transformer';

export const ParseBoolean = () =>
  Transform(({ value }) => booleanMapper.get(value));

const booleanMapper = new Map([
  ['true', true],
  ['false', false],
]);
