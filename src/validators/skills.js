const { body } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Skills = require('../models/skills');

const validateSkillCreate = [
  body("asignature").exists().withMessage("asignature no recibido").isIn(["mates", "castellano", "ingles", "valenciano", "programacion"]).withMessage("asignature no real"),
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateSkillEdit = [
  body("asignature").exists().withMessage("asignature no recibido").isIn(["mates", "castellano", "ingles", "valenciano", "programacion"]).withMessage("asignature no real"),
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

module.exports = {validateSkillCreate, validateSkillEdit}