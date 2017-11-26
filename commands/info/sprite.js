'use strict'

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class SpriteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sprite',
            aliases: ['img'],
            group: 'sprite',
            memberName: 'sprite',
            description: 'Get sprite for this pokemon.',
            examples: ['data <pokemon/item/move/ability>'],
            args: [
                {
                    key: 'arg1',
                    prompt: 'What would you like the sprite for?',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { arg1 }) {
        let parser = msg.client.parser;
        let pkmn = parser.parserPokemon(arg1);

        if (!pkmn) return msg.say(`${arg1} is not a pokemon!`);
        else return msg.embed(new MessageEmbed()
        .setImage(`http://play.pokemonshowdown.com/sprites/xyani/${pokemon.species.toLowerCase().replace(" ", "").replace('-', '')}.gif`))
    }
};
