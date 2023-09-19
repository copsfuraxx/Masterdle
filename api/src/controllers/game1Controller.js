const game1Service = require('../services/game1Service')

exports.isGoodAnswer = async (req, res) => {
    /*
    #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string',
        description: 'token'
    }
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        schema: 2
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Game1Answer' }
    }
    */
    const ans = await game1Service.getData(req.params.id);
    const soluce = req.app.get('game1Soluce');
    if (ans.id == soluce.id){
        res.status(200).json({isTrue: true, ans: null});
        return;
    }
    res.status(200).json({isTrue: false, ans: {
        gameType: ans.game_type == soluce.game_type,
        studentType: ans.student_type == soluce.student_type,
        entryLevel: ans.entry_level == soluce.entry_level
    }});
};

exports.allData = async (req, res) => {
    /*
    #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string',
        description: 'token'
    }
    #swagger.responses[200] = {
        schema: [{ $ref: '#/definitions/Game1Data' }]
    }
    */
    const ans = await game1Service.getAllData();
    res.status(200).json(ans);
};