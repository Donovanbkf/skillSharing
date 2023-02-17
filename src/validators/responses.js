const { check, body, param } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Collaborations = require('../models/collaboration');
const Responses = require('../models/response');
const Skills = require('../models/skills');
const Op = require('Sequelize').Op

const validateResponseCreate = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill_id").exists().withMessage("skill_id no recibido").notEmpty().withMessage("skill_id vacío").isInt().custom(async (value, {req}) => {
    const skill = await Skills.findOne({raw:true, where: { id : value } });
    if (skill == null) {
      req.status = 404
      throw new Error(`no existe este skill`);
    }
    return true;
  }),
  param().custom(async (value, {req}) => {
    const response = await Responses.findOne({raw:true, where: { user_id : req.user.id } });
    if (response != null) {
      req.status = 409
      throw new Error(`ya tienes un response`);
    }
    const collaboration = await Collaborations.findOne({raw:true, where:{[Op.and]: [{[Op.or]: [{ user_id_req: req.user.id },{ user_id_res: req.user.id }]},{ state: 'iniciado' }]}});
    if (collaboration != null) {
      req.status = 409
      throw new Error(`ya tienes una collaboracion activa`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateResponseEdit = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill_id").exists().withMessage("skill_id no recibido").notEmpty().withMessage("skill_id vacío").isInt().custom(async (value, {req}) => {
    const skill = await Skills.findOne({raw:true, where: { id : value } });
    if (skill == null) {
      req.status = 404
      throw new Error(`no existe este skill`);
    }
    return true;
  }),
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const response = await Responses.findOne({raw:true, where: { id : value } });
    if (response == null) { 
      req.status = 404
      throw new Error(`response actual no existe`);
    }else if (response.user_id != req.user.id){
      req.status = 403
      throw new Error(`response actual no te pertenece`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateResponseDelete = [
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const response = await Responses.findOne({raw:true, where: { id : value } });
    if (response == null) {
      req.status = 404
      throw new Error(`response actual no existe`);
    }
    else{ 
      if (response.user_id != req.user.id && req.user.rol != 'admin'){
        req.status = 403
        throw new Error(`response actual no te pertenece`);
      }
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

module.exports = { validateResponseCreate, validateResponseEdit, validateResponseDelete }