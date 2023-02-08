const { check } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Skills = require('../models/skills');

const validateSkillCreate = [
  check("asignature").exists().notEmpty(),
  check("description").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateSkillEdit = [
  check("asignature").exists().notEmpty(),
  check("description").exists().notEmpty(),
  // check("id").custom(async (value, {req}) => {
  //   const skill = await Skills.findOne({raw:true, where: { id: value } });
  //   req.skill = skill;
  //   if (!skill){ 
  //      throw new Error(`Skill dont exists`);
  //   }
  //   return true;
  // }),
  // check("rol").custom((value, {req}) => {
  //   if (value != "admin"){ 
  //      throw new Error(`No eres admin`);
  //   }
  //   return true;
  // }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {validateSkillCreate, validateSkillEdit}