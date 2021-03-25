import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(99)<2000']
  },
  stages: [
    { duration: '10s', target: 1000 },
    { duration: '15s', target: 5000 },
    { duration: '15s', target: 8000 },
    { duration: '15s', target: 8000 },
    { duration: '30s', target: 0 }
  ]
};

export default function () {
  for (var id = 999900; id < 1000010; id ++) {
    let res = http.get(`http://localhost:3001/qa/questions?product_id=${id}`, {
      tags: { name: 'GetQAForProduct' }
    });
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
  }
};
