import {mount} from '@vue/test-utils';
import {getLocalVue} from './getLocalVue';
import {expect} from 'chai';
import OrOptions from '@/client/components/OrOptions.vue';
import {PreferencesManager} from '@/client/utils/PreferencesManager';
import {InputResponse} from '@/common/inputs/InputResponse';
import PlayerInputFactory from '@/client/components/PlayerInputFactory.vue';

describe('OrOptions', function() {
  it('saves the options ignoring hidden', async function() {
    let savedData: InputResponse | undefined;
    PreferencesManager.INSTANCE.set('learner_mode', false);
    const component = mount(OrOptions, {
      localVue: getLocalVue(),
      propsData: {
        player: {
          id: 'foo',
        },
        playerinput: {
          title: 'foo',
          options: [{
            inputType: 'option',
            title: 'hide this',
            showOnlyInLearnerMode: true,
          }, {
            inputType: 'option',
            title: 'select a',
          }, {
            title: 'select b',
            inputType: 'option',
          }],
        },
        onsave: function(data: InputResponse) {
          savedData = data;
        },
        showsave: true,
        showtitle: true,
      },
      components: {
        'player-input-factory': PlayerInputFactory,
      },
    });
    const buttons = component.findAllComponents({name: 'AppButton'});
    await buttons.at(0).findAllComponents({
      name: 'AppButton',
    }).at(0).trigger('click');
    expect(savedData).to.deep.eq({type: 'or', index: 1, response: {type: 'option'}});
  });
  it('moves and selects 2nd option', async function() {
    let savedData: InputResponse | undefined;
    const component = mount(OrOptions, {
      localVue: getLocalVue(),
      propsData: {
        player: {
          id: 'foo',
        },
        playerinput: {
          title: 'foo',
          options: [{
            inputType: 'option',
            title: 'select a',
          }, {
            title: 'select b',
            inputType: 'option',
          }],
        },
        onsave: function(data: InputResponse) {
          savedData = data;
        },
        showsave: true,
        showtitle: true,
        components: {
          'player-input-factory': PlayerInputFactory,
        },
      },
    });
    const inputs = component.findAll('input');
    await inputs.at(1).setChecked();

    const buttons = component.findAllComponents({name: 'AppButton'});
    await buttons.at(0).findAllComponents({
      name: 'AppButton',
    }).at(0).trigger('click');
    expect(savedData).to.deep.eq({type: 'or', index: 1, response: {type: 'option'}});
  });
});
