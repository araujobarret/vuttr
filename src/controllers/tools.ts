import * as express from 'express';
import { pick } from 'lodash';
import { Types } from 'mongoose';

import { ToolModel } from '../models/tools';

const router = express.Router();

router.get('/tools', (req, res):
  | express.Response
  | Promise<express.Response> => {
  const { tag } = pick(req.query, ['tag']);
  let query = {};
  if (tag) {
    query = { tags: { $in: [tag.toLowerCase()] } };
  }
  return ToolModel.find(query)
    .then((tools): express.Response => res.send(tools))
    .catch((): express.Response => res.sendStatus(400));
});

router.get('/tools/:id', (req, res):
  | express.Response
  | Promise<express.Response> => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.sendStatus(400);
  } else {
    return ToolModel.findById(id)
      .then(
        (tool): express.Response =>
          tool ? res.send(tool) : res.sendStatus(404)
      )
      .catch((): express.Response => res.sendStatus(400));
  }
});

router.post('/tools', (req, res): void => {
  let body = pick(req.body, ['title', 'link', 'description', 'tags']);
  let tool = new ToolModel(body);

  tool
    .save()
    .then((tool): express.Response => res.send(tool))
    .catch((): express.Response => res.sendStatus(400));
});

router.delete('/tools/:id', (req, res):
  | express.Response
  | Promise<express.Response> => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.sendStatus(400);
  } else {
    return ToolModel.findByIdAndDelete(id)
      .then(
        (tool): express.Response =>
          tool ? res.sendStatus(200) : res.sendStatus(404)
      )
      .catch((): express.Response => res.sendStatus(400));
  }
});

export default router;
