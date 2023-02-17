const { request } = require('express');
const { check, body, param } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Collaborations = require('../models/collaboration');
const Requests = require('../models/requests');
const Skills = require('../models/skills');
const Op = require('Sequelize').Op

const validateRequestCreate = [
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
    const request = await Requests.findOne({raw:true, where: { user_id : req.user.id } });
    if (request != null) {
      req.status = 409
      throw new Error(`ya tienes un request`);
    }
    const collaboration = await Collaborations.findOne({raw:true, where:{[Op.and]: [{[Op.or]: [{ user_id_req: req.user.id },{ user_id_res: req.user.id }]},{ state: 'iniciado' }]}});
    if (collaboration != null) {
      req.status = 409
      throw new Error(`ya tienes una collaboracion activa`);
    }
    if (req.user.saldo <= 0){
      throw new Error(`saldo insuficiente`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateRequestEdit = [
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
    const requests = await Requests.findOne({raw:true, where: { id : value } });
    if (requests == null) {
      req.status = 404
      throw new Error(`Request actual no existe`);
    }else if (requests.user_id != req.user.id ){
      req.status = 403
      throw new Error(`Request actual no te pertenece`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateRequestDelete = [
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const request = await Requests.findOne({raw:true, where: { id : value } });
    if (request == null) {
      req.status = 404
      throw new Error(`requet actual no existe`);
    }
    else{ 
      if (request.user_id != req.user.id && req.user.rol != 'admin'){
        req.status = 403
        throw new Error(`requet actual no te pertenece`);
      }
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

module.exports = { validateRequestCreate, validateRequestEdit, validateRequestDelete }