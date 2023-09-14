const game1Service = require('../services/game1Service')

exports.isGoodAnswer = async (req, res) => {
    const ans = await game1Service.getData(req.params.id);
    const soluce = req.app.get('game1Soluce');
    if (ans.id == soluce.id){
        res.status(200).json({isTrue: true, soluce});
    } else {
        res.status(200).json({isTrue: false, ans: {
            gameType: ans.game_type == soluce.game_type,
            studentType: ans.student_type == soluce.student_type,
            entryLevel: ans.entry_level == soluce.entry_level,
        }});
    }
};