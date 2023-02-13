const { body } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");

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
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {validateSkillCreate, validateSkillEdit}