import { ValueObject } from './ValueObject';
import { SpaceshipClass } from './SpaceshipClass';

type SpaceshipModelProps = {
  name: string;
  spaceshipClass: SpaceshipClass;
  riskFactor: number;
};

export class SpaceshipModel extends ValueObject {
  name = '';
  riskFactor = 0;
  spaceshipClass: SpaceshipClass = null;

  static createFromProps(value: SpaceshipModelProps): SpaceshipModel {
    const { name, spaceshipClass, riskFactor } = value;
    return SpaceshipModel.create<SpaceshipModel>({
      name: name,
      riskFactor: riskFactor,
      spaceshipClass: spaceshipClass,
    });
  }
}
