import { ValueObject } from './ValueObject';

type PlanetProps = {
  name: string;
  riskFactor: number;
};

export class Planet extends ValueObject {
  name = '';
  riskFactor = 0;

  static createFromProps(value: PlanetProps): Planet {
    const { name, riskFactor } = value;
    return Planet.create<Planet>({
      name: name,
      riskFactor: riskFactor,
    });
  }
}
