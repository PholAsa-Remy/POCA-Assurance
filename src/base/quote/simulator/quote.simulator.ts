import { Injectable } from '@nestjs/common';
import {
  SimulatedQuoteCommand,
  SimulateQuoteCommand,
} from '../command/quote.command';
import { SpaceshipModel } from '../../../shared/valueobjects/SpaceshipModel';
import { SpaceshipClass } from '../../../shared/valueobjects/SpaceshipClass';
import { Planet } from '../../../shared/valueobjects/Planet';

@Injectable()
export class QuoteSimulator {
  public async simulateQuote(
    body: SimulateQuoteCommand,
  ): Promise<SimulatedQuoteCommand> {
    const { spaceshipClass, spaceshipModel, planet } =
      this.convertModelInfoToValueObjects(body);

    const simulatedQuote = new SimulatedQuoteCommand();

    this.computeBasePrice(simulatedQuote, spaceshipModel, planet);
    this.initSimulatedQuoteGuarantees(simulatedQuote);
    this.computeStrandedOuterRimGuarantee(body, simulatedQuote);
    this.computeDamageToSelfGuarantee(body, simulatedQuote, spaceshipClass);
    this.computeDamageToThirdPartyGuarantee(
      body,
      simulatedQuote,
      spaceshipClass,
    );

    return simulatedQuote;
  }

  private computeBasePrice(
    simulatedQuote: SimulatedQuoteCommand,
    spaceshipModel,
    planet,
  ) {
    this.applySpaceshipModelRiskToBasePrice(simulatedQuote, spaceshipModel);
    this.applyPlanetRiskToBasePrice(simulatedQuote, planet);
  }

  private applyPlanetRiskToBasePrice(
    simulatedQuote: SimulatedQuoteCommand,
    planet,
  ) {
    simulatedQuote.baseMonthlyPrice += planet.riskFactor * 10;
  }

  private computeDamageToSelfGuarantee(
    body: SimulateQuoteCommand,
    simulatedQuote: SimulatedQuoteCommand,
    spaceshipClass,
  ) {
    this.applyAgeSpaceshipRiskToDamageToSelfGuarantee(body, simulatedQuote);
    this.applySpaceshipClassRiskToDamageToSelfGuarantee(
      simulatedQuote,
      spaceshipClass,
    );
  }

  private computeDamageToThirdPartyGuarantee(
    body: SimulateQuoteCommand,
    simulatedQuote: SimulatedQuoteCommand,
    spaceshipClass,
  ) {
    this.applyLightspeedUsageToDamageToThirdPartyGuarantee(
      body,
      simulatedQuote,
    );
    this.applySpaceshipClassRiskToDamageToThirdPartyGuarantee(
      simulatedQuote,
      spaceshipClass,
    );
  }

  private applySpaceshipClassRiskToDamageToThirdPartyGuarantee(
    simulatedQuote: SimulatedQuoteCommand,
    spaceshipClass,
  ) {
    simulatedQuote.damageToThirdParty.deductible += Math.ceil(
      (simulatedQuote.damageToThirdParty.deductible *
        spaceshipClass.riskFactor) /
        80,
    );
  }

  private applyLightspeedUsageToDamageToThirdPartyGuarantee(
    body: SimulateQuoteCommand,
    simulatedQuote: SimulatedQuoteCommand,
  ) {
    if (body.lightspeed == 'nohyperdrive') {
      simulatedQuote.damageToThirdParty.deductible = 300;
    } else if (body.lightspeed == 'regular') {
      simulatedQuote.damageToThirdParty.deductible = 600;
    } else if (body.lightspeed == 'exceptional') {
      simulatedQuote.damageToThirdParty.deductible = 400;
    }
  }

  private applySpaceshipClassRiskToDamageToSelfGuarantee(
    simulatedQuote: SimulatedQuoteCommand,
    spaceshipClass,
  ) {
    simulatedQuote.damageToSelf.deductible += Math.ceil(
      (simulatedQuote.damageToSelf.deductible * spaceshipClass.riskFactor) /
        100,
    );
  }

  private applyAgeSpaceshipRiskToDamageToSelfGuarantee(
    body: SimulateQuoteCommand,
    simulatedQuote: SimulatedQuoteCommand,
  ) {
    if (body.ageSpaceship > 50) {
      simulatedQuote.damageToSelf.deductible = 1000;
    } else {
      simulatedQuote.damageToSelf.deductible = 450;
    }
  }

  private initSimulatedQuoteGuarantees(simulatedQuote: SimulatedQuoteCommand) {
    simulatedQuote.damageToSelf = { included: false, deductible: 0 };
    simulatedQuote.damageToThirdParty = { included: false, deductible: 0 };
    simulatedQuote.strandedOuterRimGuarantee = {
      included: false,
      supplementMonthlyPrice: 0,
    };
    simulatedQuote.damageToSelf.included = true;
    simulatedQuote.damageToThirdParty.included = true;
  }

  private computeStrandedOuterRimGuarantee(
    body: SimulateQuoteCommand,
    simulatedQuote: SimulatedQuoteCommand,
  ) {
    if (body.strandedOuterRim) {
      simulatedQuote.strandedOuterRimGuarantee.included = true;
      if (body.outerRimTravel) {
        simulatedQuote.strandedOuterRimGuarantee.supplementMonthlyPrice = 100;
      } else {
        simulatedQuote.strandedOuterRimGuarantee.supplementMonthlyPrice = 40;
      }
    }
  }

  private applySpaceshipModelRiskToBasePrice(
    simulatedQuote: SimulatedQuoteCommand,
    spaceshipModel,
  ) {
    simulatedQuote.baseMonthlyPrice =
      300 + Math.ceil((300 * spaceshipModel.riskFactor) / 100);
  }

  private convertModelInfoToValueObjects(body: SimulateQuoteCommand): {
    spaceshipClass;
    spaceshipModel;
    planet;
  } {
    let spaceshipClass = null;
    let spaceshipModel = null;
    const planet = this.convertStringToPlanetValueObjet(body.planet);

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
    return { spaceshipClass, spaceshipModel, planet };
  }

  private convertStringToPlanetValueObjet(planet: string): Planet {
    for (const item of QuoteSimulator.PLANETS) {
      if (item.name === planet) {
        return item;
      }
    }

    return Planet.createFromProps({
      name: 'Not defined',
      riskFactor: 0,
    });
  }

  static readonly PLANETS: Planet[] = [
    Planet.createFromProps({
      name: 'Abafar',
      riskFactor: 13,
    }),
    Planet.createFromProps({
      name: 'Agamar ',
      riskFactor: 7,
    }),
    Planet.createFromProps({
      name: 'Ahch-To',
      riskFactor: 45,
    }),
    Planet.createFromProps({
      name: 'Alderaan',
      riskFactor: 2,
    }),
    Planet.createFromProps({
      name: 'Aaleen',
      riskFactor: 1,
    }),
    Planet.createFromProps({
      name: 'Batuu',
      riskFactor: 5,
    }),
    Planet.createFromProps({
      name: 'Bespin',
      riskFactor: 39,
    }),
    Planet.createFromProps({
      name: 'Cantonica',
      riskFactor: 37,
    }),
    Planet.createFromProps({
      name: 'Castilon',
      riskFactor: 7,
    }),
    Planet.createFromProps({
      name: 'Cato Neimoidia',
      riskFactor: 41,
    }),
    Planet.createFromProps({
      name: 'Corellia',
      riskFactor: 23,
    }),
    Planet.createFromProps({
      name: 'Coruscant',
      riskFactor: 19,
    }),
    Planet.createFromProps({
      name: "D'Qar",
      riskFactor: 2,
    }),
    Planet.createFromProps({
      name: 'Dagobah',
      riskFactor: 44,
    }),
    Planet.createFromProps({
      name: 'Dantooine',
      riskFactor: 22,
    }),
    Planet.createFromProps({
      name: 'Dathomir',
      riskFactor: 31,
    }),
    Planet.createFromProps({
      name: 'Endor',
      riskFactor: 12,
    }),
    Planet.createFromProps({
      name: 'Exegol',
      riskFactor: 66,
    }),
    Planet.createFromProps({
      name: 'Felucia',
      riskFactor: 13,
    }),
    Planet.createFromProps({
      name: 'Geonosis',
      riskFactor: 29,
    }),
    Planet.createFromProps({
      name: 'Hosnian Prime',
      riskFactor: 10,
    }),
    Planet.createFromProps({
      name: 'Hoth',
      riskFactor: 45,
    }),
    Planet.createFromProps({
      name: 'Jakku',
      riskFactor: 41,
    }),
    Planet.createFromProps({
      name: 'Jedha',
      riskFactor: 15,
    }),
    Planet.createFromProps({
      name: 'Kamino',
      riskFactor: 4,
    }),
    Planet.createFromProps({
      name: 'Kashyyyk',
      riskFactor: 14,
    }),
    Planet.createFromProps({
      name: 'Kessel',
      riskFactor: 7,
    }),
    Planet.createFromProps({
      name: 'Malastare',
      riskFactor: 8,
    }),
    Planet.createFromProps({
      name: 'Mandalore',
      riskFactor: 36,
    }),
    Planet.createFromProps({
      name: 'Mon Cala',
      riskFactor: 12,
    }),
    Planet.createFromProps({
      name: 'Mortis',
      riskFactor: 17,
    }),
    Planet.createFromProps({
      name: 'Mustafar',
      riskFactor: 35,
    }),
    Planet.createFromProps({
      name: 'Naboo',
      riskFactor: 2,
    }),
    Planet.createFromProps({
      name: 'Nal Hutta',
      riskFactor: 24,
    }),
    Planet.createFromProps({
      name: 'Polis Massa',
      riskFactor: 6,
    }),
    Planet.createFromProps({
      name: 'Scarif',
      riskFactor: 5,
    }),
    Planet.createFromProps({
      name: 'Tatooine',
      riskFactor: 28,
    }),
    Planet.createFromProps({
      name: 'Utapau',
      riskFactor: 7,
    }),
    Planet.createFromProps({
      name: 'Yavin',
      riskFactor: 20,
    }),
  ];

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
