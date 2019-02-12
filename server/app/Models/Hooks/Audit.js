'use strict'

const Audit = exports = module.exports = {}
const AuditModel = use('App/Models/MongoDB/Audit');

Audit.createLog = async (model) => {
  const res = await AuditModel.create({
    object: model.toJSON(),
    type: model.constructor.name
  });
}

Audit.updateLog = async (model) => {
  const res = await AuditModel.create({
    object: model.dirty,
    type: model.constructor.name
  });
}
