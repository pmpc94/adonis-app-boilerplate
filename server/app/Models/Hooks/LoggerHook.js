'use strict'

const LoggerHook = exports = module.exports = {}
const Logger = use('App/Models/MongoDB/Logger');

LoggerHook.createLog = async (model) => {
  console.log("create model", model)
  const res = await Logger.create({
    object: model.toJSON(),
    type: model.constructor.name
  });
  console.log("post create model...", res)
}

LoggerHook.updateLog = async (model) => {
  console.log("update model", model)
  const res = await Logger.create({
    object: model.dirty,
    type: model.constructor.name
  });
  console.log("post update model...", res)
}
