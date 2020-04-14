import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 1000 }, 
  ],
};

export default function() {
  const game_id = Math.floor(Math.random() * 10000000);
  const BASE_URL = `http://localhost:3005/reviews/${game_id}/`; // make sure this is not production

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}`,
      null,
      {},
    ],
  ]);

  sleep(1);
}