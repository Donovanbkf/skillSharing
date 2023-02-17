const { check, body, param } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Collaborations = require('../models/collaboration'); 
const Requests = require('../models/requests');
const Responses = require('../models/response');
const Skills = require('../models/skills');
const Op = require('Sequelize').Op

const validateCollaborationCreate = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    let obj = {}
    let tipo = ''
    if (req.path.split('/')[1].split('_')[1] == 'req'){
      tipo = 'Request'
      obj = await Requests.findOne({raw:true, where: { id : value } });
    }else{
      tipo = 'Response'
      obj = await Responses.findOne({raw:true, where: { id : value } });
      if (req.user.saldo <= 0){
        throw new Error(`saldo insuficiente`);
      }
    }
    if (obj == null) {
      req.status = 404
      throw new Error(`${tipo} actual no existe`);
    }
    if (obj.user_id == req.user.id){ 
      req.status = 400
      throw new Error(`No puede hacer una colaboración contigo mismo`);
    }
    return true;
  }),
  param().custom(async (value, {req}) => {
    const collaboration = await Collaborations.findAll({raw:true,  where:{[Op.and]: [{[Op.or]: [{ user_id_req: req.user.id },{ user_id_res: req.user.id }]},{ state: 'iniciado' }]}});
    if (collaboration.length > 0) {
      req.status = 409
      throw new Error(`ya tienes un collaboration`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateCollaborationEdit = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const collaboration = await Collaborations.findOne({raw:true, where: { id : value } });
    if (collaboration == null) {
      req.status = 404
      throw new Error(`collaboration actual no existe`);
    }
    else{ 
      if (collaboration.user_id_req != req.user.id && collaboration.user_id_res != req.user.id){
        req.status = 403
        throw new Error(`collaboration actual no te pertenece`);
      }
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateCollaborationFinish = [
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const collaboration = await Collaborations.findOne({raw:true, where: { id : value } });
    if (collaboration == null) {
      req.status = 404
      throw new Error(`collaboration actual no existe`);
    }
    if (collaboration.state == "terminado") {
      req.status = 409
      throw new Error(`collaboration actual ya está finalizada`);
    }
    else{ 
      if (collaboration.user_id_req != req.user.id && collaboration.user_id_res != req.user.id && req.user.rol != 'admin'){
        req.status = 403
        throw new Error(`collaboration actual no te pertenece`);
      }
    }
    return true;
  }),
  body("duracion").exists().withMessage("duracion no recibida").notEmpty().withMessage("duracion vacía").isInt().withMessage("ha de ser un número"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

const validateCollaborationDelete = [
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const collaboration = await Collaborations.findOne({raw:true, where: { id : value } });
    if (collaboration == null) {
      req.status = 404
      throw new Error(`collaboration actual no existe`);
    }
    else{ 
      if (collaboration.user_id_req != req.user.id && collaboration.user_id_res != req.user.id && req.user.rol != 'admin'){
        req.status = 403
        throw new Error(`collaboration actual no te pertenece`);
      }
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

module.exports = { validateCollaborationCreate, validateCollaborationEdit, validateCollaborationDelete, validateCollaborationFinish }