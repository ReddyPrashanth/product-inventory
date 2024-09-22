import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 10,
  // A string specifying the total duration of the test run.
  duration: "10s",
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function () {
  const res = http.get("http://api-gateway:3000/api/ping");
  check(res, { "status wa 200": (r) => r.status == 200 });
  sleep(1);
}
