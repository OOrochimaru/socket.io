var expect = require('expect');

var {generateMessage} = require('./message');
describe('ifgenerateMessage', () => {
    it('should generate correct message object', ()=>{
        var from = 'znyak';
        var text = 'kaynz';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from , text});
    })
})