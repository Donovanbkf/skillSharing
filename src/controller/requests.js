const Requests = require('../models/requests');

const listar =  async (req, res)=> {
    console.log(info) 
    const requests = await Requests.findAll({raw:true})
    // console.log(requests)
    res.render('requests/all-requests', {requests});
}

const new_request = async (req, res)=> {
    console.log(req.body);
    req.body.user_id = req.user.id
    await Requests.create(req.body)
    if (req.user.rol === 'user'){
        info = req.user
        res.redirect('/requests/list');
    }
    else{res.send('lola');}
}


module.exports = { listar, new_request}