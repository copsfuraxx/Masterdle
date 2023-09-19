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
        Game1Answer: {
            isTrue: false,
            ans: {
                gameType: true,
                studentType: false,
                entryLevel: true
            }
        },
        Game1Data:
        {
            "id": 1,
            "name": "NOM1 Prénom1",
            "gamer_type": 4,
            "student_type": 3,
            "entry_level": "L1"
        }
    }
}

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './app.js',
]

swaggerAutogen(outputFile, endpointsFiles, doc)