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

const update = async function (req, res) {
  let err, event, data;
  event = req.event;
  data = req.body;
  event.set(data);
  [err, event] = await to(event.save());
  if (err) {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
      err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;
    res.statusCode = 422;
    return res.json({ success: false, error: err });
  }

  return res.json(event);
}
module.exports.update = update;
