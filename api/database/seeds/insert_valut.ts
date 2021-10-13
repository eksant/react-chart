import { Knex } from 'knex';

const tableName = 'vault';

export async function seed(knex: Knex): Promise<void> {
  await knex(tableName).del();

  // Inserts seed entries
  await knex(tableName).insert([
    { name: 'Bitcoin', date_time: '2021-10-05T08:23:19.120Z', price: 100 },
    { name: 'Ethereum', date_time: '2021-10-05T08:23:19.120Z', price: 50 },
    { name: 'Bitcoin', date_time: '2021-10-06T08:23:19.120Z', price: 110 },
    { name: 'Ethereum', date_time: '2021-10-06T08:23:19.120Z', price: 46 },
    { name: 'Bitcoin', date_time: '2021-10-07T08:23:19.120Z', price: 98 },
    { name: 'Ethereum', date_time: '2021-10-07T08:23:19.120Z', price: 55 },
    { name: 'Bitcoin', date_time: '2021-10-08T08:23:19.120Z', price: 105 },
    { name: 'Ethereum', date_time: '2021-10-08T08:23:19.120Z', price: 65 },
    { name: 'Bitcoin', date_time: '2021-10-09T08:23:19.120Z', price: 115 },
    { name: 'Ethereum', date_time: '2021-10-09T08:23:19.120Z', price: 75 },
    { name: 'Bitcoin', date_time: '2021-10-10T08:23:19.120Z', price: 110 },
    { name: 'Ethereum', date_time: '2021-10-10T08:23:19.120Z', price: 85 },
    { name: 'Bitcoin', date_time: '2021-10-11T08:23:19.120Z', price: 150 },
    { name: 'Ethereum', date_time: '2021-10-11T08:23:19.120Z', price: 100 },
    { name: 'Bitcoin', date_time: '2021-10-12T08:23:19.120Z', price: 140 },
    { name: 'Ethereum', date_time: '2021-10-12T08:23:19.120Z', price: 110 },
    { name: 'Bitcoin', date_time: '2021-10-13T08:23:19.120Z', price: 160 },
    { name: 'Ethereum', date_time: '2021-10-13T08:23:19.120Z', price: 90 },
  ]);
}
