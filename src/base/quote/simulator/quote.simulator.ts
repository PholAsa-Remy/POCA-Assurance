import { Injectable } from '@nestjs/common';
import {
  SimulatedQuoteCommand,
  SimulateQuoteCommand,
} from '../command/quote.command';
import { SpaceshipModel } from '../../../shared/valueobjects/SpaceshipModel';
import { SpaceshipClass } from '../../../shared/valueobjects/SpaceshipClass';

@Injectable()
export class QuoteSimulator {
  public async simulateQuote(
    body: SimulateQuoteCommand,
  ): Promise<SimulatedQuoteCommand> {
    const { spaceshipClass, spaceshipModel } =
      this.convertModelInfoToValueObjects(body);

    const simulatedQuote = new SimulatedQuoteCommand();

    simulatedQuote.baseMonthlyPrice =
      300 + Math.ceil((300 * spaceshipModel.riskFactor) / 100);
    simulatedQuote.damageToSelf = { included: false, deductible: 0 };
    simulatedQuote.damageToThirdParty = { included: false, deductible: 0 };
    simulatedQuote.strandedOuterRimGuarantee = {
      included: false,
      supplementMonthlyPrice: 0,
    };

    if (body.strandedOuterRim) {
      simulatedQuote.strandedOuterRimGuarantee.included = true;
      if (body.outerRimTravel) {
        simulatedQuote.strandedOuterRimGuarantee.supplementMonthlyPrice = 100;
      } else {
        simulatedQuote.strandedOuterRimGuarantee.supplementMonthlyPrice = 40;
      }
    }

    simulatedQuote.damageToSelf.included = true;
    if (body.ageSpaceship > 50) {
      simulatedQuote.damageToSelf.deductible = 1000;
    } else {
      simulatedQuote.damageToSelf.deductible = 450;
    }
    simulatedQuote.damageToSelf.deductible += Math.ceil(
      (simulatedQuote.damageToSelf.deductible * spaceshipClass.riskFactor) /
        100,
    );

    simulatedQuote.damageToThirdParty.included = true;
    if (body.lightspeed == 'nohyperdrive') {
      simulatedQuote.damageToThirdParty.deductible = 300;
    } else if (body.lightspeed == 'regular') {
      simulatedQuote.damageToThirdParty.deductible = 600;
    } else if (body.lightspeed == 'exceptional') {
      simulatedQuote.damageToThirdParty.deductible = 400;
    }
    simulatedQuote.damageToThirdParty.deductible += Math.ceil(
      (simulatedQuote.damageToThirdParty.deductible *
        spaceshipClass.riskFactor) /
        80,
    );

    return simulatedQuote;
  }

  private convertModelInfoToValueObjects(body: SimulateQuoteCommand) {
    let spaceshipClass = null;
    let spaceshipModel = null;

    for (const item of QuoteSimulator.SPACESHIP_CLASSES) {
      if (item.name === body.spaceshipClass) {
        spaceshipClass = item;
        break;
      }
      spaceshipClass = SpaceshipClass.createFromProps({
        name: 'Not defined',
        riskFactor: 0,
      });
    }

    switch (spaceshipClass.name) {
      case 'Fighter': {
        for (const item of QuoteSimulator.SPACESHIP_MODELS_FIGHTER) {
          if (item.name === body.spaceshipModel) {
            spaceshipModel = item;
            break;
          }
        }
        break;
      }
      case 'Shuttle/Cargo': {
        for (const item of QuoteSimulator.SPACESHIP_MODELS_SHUTTLE_CARGO) {
          if (item.name === body.spaceshipModel) {
            spaceshipModel = item;
            break;
          }
        }
        break;
      }
      case 'Cruiser/Battleship': {
        for (const item of QuoteSimulator.SPACESHIP_MODELS_CRUISER_BATTLESHIP) {
          if (item.name === body.spaceshipModel) {
            spaceshipModel = item;
            break;
          }
        }
        break;
      }
      default: {
        spaceshipModel = SpaceshipModel.createFromProps({
          name: 'Not defined',
          riskFactor: 0,
          spaceshipClass: spaceshipClass,
        });
        break;
      }
    }
    return { spaceshipClass, spaceshipModel };
  }

  static readonly SPACESHIP_CLASSES: SpaceshipClass[] = [
    SpaceshipClass.createFromProps({
      name: 'Fighter',
      riskFactor: 13,
    }),
    SpaceshipClass.createFromProps({
      name: 'Shuttle/Cargo',
      riskFactor: 7,
    }),
    SpaceshipClass.createFromProps({
      name: 'Cruiser/Battleship',
      riskFactor: 10,
    }),
  ];

  static readonly SPACESHIP_MODELS_CRUISER_BATTLESHIP: SpaceshipModel[] = [
    SpaceshipModel.createFromProps({
      name: 'Imperial Star Destroyer',
      riskFactor: 2,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Super Star Destroyer',
      riskFactor: 7,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Venator Class Star Destroyer',
      riskFactor: 11,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Interdictor Class Star Destroyer',
      riskFactor: 2,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Separatist Dreadnought',
      riskFactor: 19,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Republic Attack Cruiser',
      riskFactor: 39,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Trade Federation Battleship',
      riskFactor: 75,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Nebulon B Frigate',
      riskFactor: 38,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Trade Federation Landing Ship',
      riskFactor: 60,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Subjugator Class Heavy Cruiser',
      riskFactor: 28,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'MC75 Star Cruiser',
      riskFactor: 16,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'C-ROC Gozanti Class Cruiser',
      riskFactor: 33,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'GR-75 Medium Transport',
      riskFactor: 12,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Hammerhead Corvette',
      riskFactor: 32,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Radiant VII',
      riskFactor: 47,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Luxury 3000',
      riskFactor: 25,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'Tantive IV',
      riskFactor: 65,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
    SpaceshipModel.createFromProps({
      name: 'MC85 Star Cruiser',
      riskFactor: 51,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[2],
    }),
  ];

  static readonly SPACESHIP_MODELS_SHUTTLE_CARGO: SpaceshipModel[] = [
    SpaceshipModel.createFromProps({
      name: 'Solar Sailer',
      riskFactor: 3,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'Lambda Class Imperial Shuttle',
      riskFactor: 19,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'Delta Class T-3C Shuttle',
      riskFactor: 31,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'Upsilon Class Command Shuttle',
      riskFactor: 67,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'Zeta Class Imperial Shuttle',
      riskFactor: 15,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'Republic Cruiser',
      riskFactor: 6,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'CR90 Corvette',
      riskFactor: 4,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'J-Type 327 Nubian Royal Starship',
      riskFactor: 17,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'J-Type Star Skiff',
      riskFactor: 5,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'H-Type Nubian Yacht',
      riskFactor: 8,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'HWK-290',
      riskFactor: 9,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'AA-9 Coruscant Freighter',
      riskFactor: 34,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'VCX-100 Light Freighter',
      riskFactor: 25,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'YT-2400 Light Freighter',
      riskFactor: 12,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'YT-1300 Light Freighter Millennium Falcon',
      riskFactor: 25,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'Dynamic Class Freighter',
      riskFactor: 8,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'Baleen Class Heavy Freighter',
      riskFactor: 53,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
    SpaceshipModel.createFromProps({
      name: 'Rogue Shadow',
      riskFactor: 16,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[1],
    }),
  ];
  static readonly SPACESHIP_MODELS_FIGHTER: SpaceshipModel[] = [
    SpaceshipModel.createFromProps({
      name: 'TIE Fighter',
      riskFactor: 2,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'TIE Advanced',
      riskFactor: 27,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'TIE Bomber',
      riskFactor: 30,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'TIE Striker',
      riskFactor: 53,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'TIE Interceptor',
      riskFactor: 35,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'TIE Silencer',
      riskFactor: 39,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'TIE/RP Reaper',
      riskFactor: 40,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'NSSIS Class Clawcraft',
      riskFactor: 41,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'Sith Infiltrator',
      riskFactor: 39,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'Naboo N-1 Starfighter',
      riskFactor: 23,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'Naboo Royal Cruiser',
      riskFactor: 12,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'Delta-7 Jedi Starfighter',
      riskFactor: 27,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'ETA-2 Jedi Starfighter',
      riskFactor: 31,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'ARC-170 Starfighter',
      riskFactor: 26,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'A-Wing',
      riskFactor: 18,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'B-Wing',
      riskFactor: 25,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'U-Wing',
      riskFactor: 32,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'Y-Wing',
      riskFactor: 38,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'X-Wing',
      riskFactor: 26,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'V-Wing',
      riskFactor: 43,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
    SpaceshipModel.createFromProps({
      name: 'MG-100 StarFortress Bomber',
      riskFactor: 50,
      spaceshipClass: QuoteSimulator.SPACESHIP_CLASSES[0],
    }),
  ];
}
