const assert = require('assert');
const User = require('../src/user');


describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({ 
            name: 'Jane',
            email: 'jane@gmail.com'
        })

        joe.save()
            .then(() => {
                assert(!joe.isNew); 
                done();
            })
    })
});