import { join } from 'path';

export const config = {
  server: {
    host: 'localhost',
    port: 3003,
    jwtKey: 'https://seorangeksa.com',
  },
  api: {
    prefix: '/api/v1',
    limitTime: 5,
    limitMaxHit: 100,
  },
  database: {
    dir: join(__dirname, '../database'),
    name: 'chart.db',
  },
};
