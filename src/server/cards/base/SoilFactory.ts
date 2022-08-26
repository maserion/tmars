import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Resources} from '../../../common/Resources';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class SoilFactory extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.SOIL_FACTORY,
      tags: [Tag.BUILDING],
      cost: 9,
      productionBox: {energy: -1, plants: 1},
      victoryPoints: 1,

      metadata: {
        cardNumber: '179',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(1).br;
            pb.plus().plants(1);
          });
        }),
        description: 'Decrease your Energy production 1 step and increase your Plant production 1 step.',
      },
    });
  }
  public override canPlay(player: Player): boolean {
    return player.production.energy >= 1;
  }
  public play(player: Player) {
    player.production.add(Resources.ENERGY, -1);
    player.production.add(Resources.PLANTS, 1);
    return undefined;
  }
}
