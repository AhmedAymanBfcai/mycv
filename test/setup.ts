import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

// This func will be executed befroe every single test across all of our diff spec files.
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

global.afterEach(async () => {
  const conn = getConnection();
  await conn.close();
});
