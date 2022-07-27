'use babel';

import Slot5000View from './slot-5000-view';
import { CompositeDisposable } from 'atom';

export default {

  slot5000View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slot5000View = new Slot5000View(state.slot5000ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slot5000View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-5000:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slot5000View.destroy();
  },

  serialize() {
    return {
      slot5000ViewState: this.slot5000View.serialize()
    };
  },

  toggle() {
    console.log('Slot5000 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
