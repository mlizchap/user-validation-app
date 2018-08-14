const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('requires a user name', () => {
        const user = new User({ name: undefined})
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required');
    })

    it('requires an email address', () => {
        const user = new User({ 
            name: 'Jane',
            email: undefined
        })
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.email;
        assert(message === 'Email is required');
    })

    it('validates a phone number', () => {
        const user = new User({
            name: 'Jane',
            phoneNumber: 123-456
        })
        const validationResult = user.validateSync();        
        const { message } = validationResult.errors.phoneNumber;
        assert(message === 'Not a valid phone number!')
    })

    it('validates an email', () => {
        const user = new User({
            name: 'Jane',
            email: 'jane.com'
        })
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.email;
        assert(message === 'Not a valid email')
    })

    it('disallows invalid phone numbers from being saved', (done) => {
        const user = new User({
            name: 'Jane',
            phoneNumber: 123-456
        })
        user.save()
            .catch((validationResult) => {
                const {message} = validationResult.errors.phoneNumber
                assert(message === 'Not a valid phone number!');
                done();
            })
    })

    it('disallows invalid emails from being saved', () => {
        const user = new User({
            name: 'Jane',
            email: 'jane.com'
        })
        user.save()
            .catch((validationResult) => {
                const {message} = validationResult.errors.email;
                assert(message === 'Not a valid email');
            })
    })

})