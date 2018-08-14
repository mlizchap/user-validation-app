# mongo-validation
- a project that creates a user database and makes sure the user enters valid information.

- setup
    - in `user.js`: create the schema and export the module.
        ```javascript
        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;

        const UserScema = new Schema({
            name: String,
            phoneNumber: Number,
            email: String
        })

        const User = mongoose.model('user', UserScema);

        module.exports = User;
        ```
    - create the tests
        - for test creation, [see this repo](https://github.com/mlizchap/mongo-crud)


- making a feild required
    ```javascript
    const UserScema = new Schema({
        name: {
            type: String,
            required: [true, "Name is required"]
        },
    ```

- making rules for a specific field
    ```javascript
        phoneNumber: {
            type: String,
            validate: {
                validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: 'Not a valid phone number!'
            }
        },
    ```

## Testing
- test to make sure value exists if required
    ```javascript
        it('requires a user name', () => {
            const user = new User({ name: undefined})
            const validationResult = user.validateSync();
            const { message } = validationResult.errors.name;
            assert(message === 'Name is required');
        })
    ```

- test to make sure validation works properly
    ```javascript
        it('validates a phone number', () => {
            const user = new User({
                name: 'Jane',
                phoneNumber: 123-456
            })
            const validationResult = user.validateSync();        
            const { message } = validationResult.errors.phoneNumber;
            assert(message === 'Not a valid phone number!')
        })
    ```
- test to make sure invalid entries do not get saved
    ```javascript
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
    ```