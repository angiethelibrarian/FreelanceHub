import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', password: 'password', firstName: 'Jolly', lastName: 'Guru', email: 'jollyguru@email.com' },
    { username: 'SunnyScribe', password: 'password', firstName: 'Sunny', lastName: 'Scribe', email: 'sunnyscribe@email.com' },
    { username: 'RadiantComet', password: 'password', firstName: 'Radiant', lastName: 'Comet', email: 'radiantcomet@email.com' },
  ], { individualHooks: true });
};
