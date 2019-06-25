import { ToolModel, Tool } from '../../models/tools';
import * as mongoose from 'mongoose';

beforeAll(function(done): void {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      process.env.TEST_DB_URI,
      { useNewUrlParser: true },
      function(err): void {
        if (err) {
          throw err;
        }
        done();
      }
    );
  }
});

afterAll(function(done): void {
  for (let i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function(): void {});
  }
  mongoose.disconnect();
  return done();
});

describe('Tools model tests', (): void => {
  const toolObj = {
    title: 'Test tool model',
    description: 'Some description',
    link: 'https://google.com',
  };
  const toolObjTags = {
    title: 'Test tool model',
    description: 'Some description',
    link: 'https://google.com',
    tags: ['tag1', 'tag2'],
  };
  test('Should save a valid tool', async (): Promise<void> => {
    const res = await new ToolModel(toolObj).save();
    expect(res).not.toBeNull();
    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('title');
    expect(res).toHaveProperty('description');
    expect(res).toHaveProperty('link');
    expect(res).toHaveProperty('tags');
    expect(res.title).toEqual(toolObj.title);
    expect(res.description).toEqual(toolObj.description);
    expect(res.link).toEqual(toolObj.link);
    expect(res.tags).toHaveLength(0);
  });

  test('Should save a valid tool with tags', async (): Promise<void> => {
    const res = await new ToolModel(toolObjTags).save();
    expect(res).not.toBeNull();
    expect(res).toHaveProperty('tags');
    expect(res.tags).toHaveLength(2);
    expect(res.tags[0]).toEqual(toolObjTags.tags[0]);
    expect(res.tags[1]).toEqual(toolObjTags.tags[1]);
  });

  test('Should get a tool correctly', async (): Promise<void> => {
    let res = await new ToolModel(toolObj).save();
    res = await ToolModel.findById(res._id);
    expect(res).not.toBeNull();
  });

  test('Should return at least one tool from a valid inserted tool tag', async (): Promise<
    void
  > => {
    let res: Tool | Tool[] = await new ToolModel(toolObjTags).save();
    res = await ToolModel.find({ tags: { $in: [toolObjTags.tags[0]] } });
    expect(res).not.toBeNull();
    expect(res.length).toBeGreaterThan(0);
  });
});
