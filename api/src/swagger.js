const swaggerAutogen = require('swagger-autogen')()

const doc = {
    definitions: {
        UserSign: {
            username: 'Prenom NOM',
            passwrd: 'mdp'
        },
        User: {
            user_name: 'Prenom NOM',
            user_role: 'user'
        },
    }
}

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './app.js',
]

swaggerAutogen(outputFile, endpointsFiles, doc)