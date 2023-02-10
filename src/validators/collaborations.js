const { check } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");

const validateCollaborationCreate = [
  check("description").exists().notEmpty(),
  check("skill_id").exists().notEmpty(),
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