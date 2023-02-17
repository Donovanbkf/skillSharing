const { body, param, check } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Skills = require('../models/skills');
const Requests = require('../models/requests');
const Responses = require('../models/response');
const Collaborations = require('../models/collaboration');
const Users = require("../models/users");


const validateSkillCreate = [
  body("asignature").exists().withMessage("asignature no recibido").isIn(["mates", "castellano", "ingles", "valenciano", "programacion"]).withMessage("asignature no existente"),
  body("level").exists().withMessage("level no recibido").isIn(["principiante", "intermedio", "avanzado"]).withMessage("level no existente").custom(async (value, {req}) => {
    const {asignature} = req.body
    const skill = await Skills.findOne({raw:true, where: { asignature: asignature, level: value } });
    if (skill != null) {
      req.status = 409
      throw new Error(`skill existente`);
    }
    return true;
  }),
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateSkillEdit = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const skill = await Skills.findOne({raw:true, where: { id : value } });
    if (skill == null) {
      req.status = 404
      throw new Error(`skill actual no existe`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateSkillDelete = [
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const skill = await Skills.findOne({raw:true, where: { id : value } });
    const request = await Request.findAll({raw:true, where: { skill_id : value }})
    const response = await Responses.findAll({raw:true, where: { skill_id : value }})
    const collaboration = await Collaborations.findAll({raw:true, where: { skill_id : value }})
    if (skill == null) {
      req.status = 404
      throw new Error(`skill actual no existe`);
    }
    if (request != null, response != null, collaboration != null) {
      req.status = 409
      throw new Error(`skill actual no se puede borrar porque está en uso`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

module.exports = {validateSkillCreate, validateSkillEdit, validateSkillDelete}