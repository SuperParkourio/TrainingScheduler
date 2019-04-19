const Sessions = require('../models').Sessions;
const Users = require('../models').Users;

const create = async function (req, res) {
  res.setHeader('ContentType', 'application/json');
  const body = req.body;
  const user = req.user;

  if (!body.name) {
    return ReE(res, 'Please enter a name for the session', 422);
  } else {
    let err, session;

    [err, session] = await to(createSession(body, user));
    if (err) return ReE(res, err, 422);

    return ReS(res, session, 201);
  }
}
module.exports.create = create;

const createSession = async function (sessionInfo, user) {
  let err;
  if (user && user.id) {
    sessionInfo.trainerId = user.id;
  }
  [err, session] = await to(Sessions.create(sessionInfo));
  if (err) TE('Session could not be created');
  return session;
}
module.exports.createSession = createSession;

const readSession = async function (req, res) {
  let err, session;
  if (req.query && req.query.length > 0) {
    [err, session] = await to(Sessions.findOne({ where: { id: req.query.id } }));
  } else {
    if (req.query.name)
      [err, session] = await to(Sessions.findAll({ where: {name: {$like: '%' + req.query.name + '%'}}}));
    else
      [err, session] = await to(Sessions.findAll());
  }
  if (err) return ReE(res, 'Failed to read', 422);
  if (!session) {
    return ReE(res, 'No session found', 404);
  }
  return res.json(session);
}
module.exports.readSession = readSession;

const readSessionsForUser = async function (req, res) {
  let err, sessions;
  const whereStatement = {};
  if (req.user.userRoleId !== 1) {
    whereStatement.trainerId = req.user.id;
  }
  if (req.query.name) {
    whereStatement.name = {
      $like: '%' + req.query.name + '%'
    };
  }
  if (req.query.eventId) {
    whereStatement.eventId = req.query.eventId;
  }
  [err, sessions] = await to(Sessions.findAll({
    where: whereStatement,
    order: [['startTime', 'ASC']],
  }));
  if (err) return ReE(res, 'Failed to read', 422);
  if (!sessions) {
    return ReE(res, 'No sessions found', 404);
  }
  return res.json(sessions);
}
module.exports.readSessionsForUser = readSessionsForUser;

const readSessionsWithTrainerInfo = async function (req, res) {
  let err, session;
  const whereStatement = {};
  if (req.query.eventId)
    whereStatement.eventId = req.query.eventId;
  [err, session] = await to(Sessions.findAll({ where: whereStatement, order: [['startTime', 'ASC']],
    include: [{model: Users}] }));
  if (err) return ReE(res, 'Failed to read', 422);
  if (!session) {
    return ReE(res, 'No session found', 404);
  }
  return res.json(session);
}
module.exports.readSessionsWithTrainerInfo = readSessionsWithTrainerInfo;

const update = async function (req, res) {
  let err, session, data;
  if (!req.query) return ReE(res, 'No query parameters found', 404);
  [err, session] = await to(Sessions.findOne({ where: { id: req.query.id } }));
  if (err) return ReE(res, 'No id parameter?', 422);
  if (!session) {
    return ReE(res, 'No session found', 404);
  }
  data = req.body;
  session.set(data);
  [err, session] = await to(session.save());
  if (err) {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
      err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;
    res.statusCode = 422
    return res.json({ success: false, error: err });
  }

  return res.json(session);
}
module.exports.update = update;

const deleteSession = async function (req, res) {
  let err, numDeleted;
  if (!req.query) return ReE(res, 'No query parameters found', 404);
  [err, numDeleted] = await to(Sessions.destroy({ where: { id: req.query.id } }));
  if (err) return ReE(res, 'No id parameter?', 422);
  if (!numDeleted) {
    return ReE(res, 'No sessions deleted?', 404);
  }
  return res.json({ success: true, numberDeleted: numDeleted });
}
module.exports.deleteSession = deleteSession;