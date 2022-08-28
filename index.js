const { Plugin } = require('powercord/entities');
const { getModule } = require("powercord/webpack");

module.exports = class Annoy extends Plugin {
  startPlugin () {
    powercord.api.commands.registerCommand({
      command: 'annoy',
      description: 'Annoy the hell out of someone',
      usage: '{c} [text to make worse]',
      executor: (args) => {
        const result = args.length > 0 ? "||" + args.join(' ').split('').join('||||') + "||" : ""

        let max = 2000  
        if (getModule(["getCurrentUser"], false).getCurrentUser().premiumType) max = 4000
      
        if (result.length > max) return {send: false, result: `Message is a bit too long :/ (${result.length}/${max})`}
        if (result.length == 0) return {send: false, result: `Can't send an empty message smh`}
        return {
            send: true,
            result,
        }
      }
    });
  }

  pluginWillUnload () {
    powercord.api.commands.unregisterCommand('annoy');
  }
};
