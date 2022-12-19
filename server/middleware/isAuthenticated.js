require('dotenv').config()
/* allows the items in the .env file to be used in this file */
const jwt = require('jsonwebtoken')
const {SECRET} = process.env
/* Pulls the SECRET variable from the .env*/



/* module.exports Allows functions to be used in different files*/
module.exports = { 
    /* the arguments for this function take in a request a result and the next action to take place  */
    isAuthenticated: (req, res, next) => {

        const headerToken = req.get('Authorization')
        /* Looks for the string Authorization and gets it */

        if (!headerToken) {
            /* if HeaderToken is not Authoization or not truthy it will send an error to the users console */
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }
        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        }catch (err){
            err.statusCode = 500
            throw err
        }
        /* looks for the current j */

        if (!token) {
            const error = new Error('Not Authenticated.')
            error.statusCode = 401
            throw error
        }
        /* If the token is falsey then an error state will be created and will throw the error */

        next()
        // tries again with the next possible option
    }
}