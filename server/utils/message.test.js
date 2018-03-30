let expect = require('expect');

let {generateMessage} = require('./message');

describe('func generatedMessage', () => {
    it('should generate correct Message obj', () => {
        let from = 'zura';
        let text = 'hi how are you';
        let message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});