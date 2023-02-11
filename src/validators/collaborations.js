const { check } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const Responses = require('../models/response');

const validateCollaborationCreate = [
  check("description").exists().notEmpty(),
  check("skill_id").exists().notEmpty(),
  // check("id"),
  // check("user_id_res").constum(async (value, {req}) => {
  //   const response = await Responses.findOne({raw:true, where: {id: response_id}})
  //   req.user_id_res = response.user_id
  // }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateCollaborationEdit = [
    check("description").exists().notEmpty(),
    (req, res, next) => {
      validateResult(req, res, next);
    },
  ];

module.exports = { validateCollaborationCreate, validateCollaborationEdit }