'use strict'

function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max+1 - min))
}

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('config.json')('./config.json');

module.exports = class RollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'info',
            memberName: 'roll',
            description: 'Roll a die.',
            examples: ['roll 12', 'roll 1d12', 'roll 6d20'],
            args: [
                {
                    key: 'roll',
                    prompt: 'What die/dice would you like to roll?',
                    type: 'string',
                    validate: text => text.match(/([1-9]+d[1-9]+)|([1-9]+)/)
                }
            ]
        });
    }

    run(msg, { roll }) {
        if (roll.indexOf('d') >= 0) {
            var splits = roll.split('d');

            var count = splits[0];
            var die   = splits[1];
            var rolls = [];
            var total = 0;

            if (die > 100 || count > 100) {
                return msg.say('Cannot roll!\nNumbers too big!');
            }

            for (var i=0; i<parseInt(count); i++) {
                var t = generateRandomInteger(1, parseInt(die));
                rolls.push(t);
                total+=t;
            }

            msg.say(`🎲 Rolled ${count}d${die} 🎲\nYou got ${total} (${rolls.join('+')})`);
        } else {
            if (parseInt(roll) > 500) {
                return msg.say('Cannot roll!\nNumbers too big!');
            }

            var t = generateRandomInteger(1, parseInt(roll));
            msg.say(`🎲 Rolled 1d${roll} 🎲\n🎲 You got ${t} 🎲`);
        }
    }
};
