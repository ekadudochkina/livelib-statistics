const liveLibService = require('../services/liveLibService');

exports.getLiveLibData = async (req, res) => {

    const pageName = String(req.query.pageName);
    const userName = String(req.query.userName);
    const promise =   liveLibService.getData(userName, pageName);
    const data = await promise;

    if (!data) {
        return res.status(404).send('Not found')
    }

    res.status(200).json(data);
};
