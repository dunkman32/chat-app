let expect = require('expect');

let {generateMessage,generateLocationMessage} = require('./message');

describe('func generatedMessage', () => {
    it('should generate correct Message obj', () => {
        let from = 'zura';
        let text = 'hi how are you';
        let message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
   it('should generate correct location', function () {
       let from = 'zura';
       let lan = '41';
       let lng = '44';
       let url = 'https://www.google.com/maps?q=41,44'
       let message = generateLocationMessage(from, lan, lng);

       expect(message.createdAt).toBeA('number');
       expect(message).toInclude({from, url});

   })
});