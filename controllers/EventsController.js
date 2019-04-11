const Events = require('../models').Events;

const create = async function (req, res) {
  res.setHeader('ContentType', 'application/json');
  const body = req.body;

  if (!body.name) {
    return ReE(res, 'Please enter a name for the event', 422);
  } else {
    let err, event;

    [err, event] = await to(createEvent(body));
    if (err) return ReE(res, err, 422);

    return ReS(res, event, 201);
  }
}
module.exports.create = create;

const createEvent = async function (eventInfo) {
  let err;
  [err, event] = await to(Events.create(eventInfo));
  if (err) TE('Event could not be created');
  return event;
}
module.exports.createEvent = createEvent;

const readEvent = async function (req, res) {
  let err, event;
  if (req.query && req.query.length > 0) {
    [err, event] = await to(Events.findOne({ where: { id: req.query.id } }));
  } else {
    [err, event] = await to(Events.findAll());
  }
  if (err) return ReE(res, 'Failed to read', 422);
  if (!event) {
    return ReE(res, 'No event found', 404);
  }
  return res.json(event);
}
module.exports.readEvent = readEvent;

const readEventsForUser = async function (req, res) {
  let err, events;
  [err, events] = await to(Events.findAll({ where: { userId: req.user.id } }));
  if (err) return ReE(res, 'Failed to read', 422);
  if (!events) {
    return ReE(res, 'No events found', 404);
  }
  return res.json(events);
}
module.exports.readEventsForUser = readEventsForUser;

const update = async function (req, res) {
  let err, event, data;
  if (!req.query) return ReE(res, 'No query parameters found', 404);
  [err, event] = await to(Events.findOne({ where: { id: req.query.id } }));
  if (err) return ReE(res, 'No id parameter?', 422);
  if (!event) {
    return ReE(res, 'No event found', 404);
  }
  data = req.body;
  event.set(data);
  [err, event] = await to(event.save());
  if (err) {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
      err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;
    res.statusCode = 422
    return res.json({ success: false, error: err });
  }

  return res.json(event);
}
module.exports.update = update;

const deleteEvent = async function (req, res) {
  let err, numDeleted;
  if (!req.query) return ReE(res, 'No query parameters found', 404);
  [err, numDeleted] = await to(Events.destroy({ where: { id: req.query.id } }));
  if (err) return ReE(res, 'No id parameter?', 422);
  if (!numDeleted) {
    return ReE(res, 'No events deleted?', 404);
  }
  return res.json({ success: true, numberDeleted: numDeleted });
}
module.exports.deleteEvent = deleteEvent;