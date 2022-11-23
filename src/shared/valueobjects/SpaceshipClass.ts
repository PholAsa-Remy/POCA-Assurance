import { ValueObject } from './ValueObject';

type SpaceshipClassProps = {
  name: string;
  riskFactor: number;
};

export class SpaceshipClass extends ValueObject {
  name = '';
  riskFactor = 0;

  static createFromProps(value: SpaceshipClassProps): SpaceshipClass {
    const { name, riskFactor } = value;
    return SpaceshipClass.create<SpaceshipClass>({
      name: name,
      riskFactor: riskFactor,
    });
  }
}
