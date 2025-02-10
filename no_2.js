import http from 'k6/http';
import {check} from 'k6';
import {sleep} from 'k6';
import {htmlReport} from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
    vus : 1000,
    iterations : 3500,
    thresholds : {
        'http_req_duration' : ['p(95) < 2000'],
    }
};

export default function () {
    const BASE_URL = 'https://reqres.in/api';
    const postUrl = `${BASE_URL}/users`;
    const putUrl = `${BASE_URL}/users/2`;

    const params = {
        headers : {
            'Content-Type' : 'application/json',
        },
    }

    // POST Request
    const postPayload = JSON.stringify({
        "name": "morpheus",
        "job": "leader"
    });

    const postRes = http.post(postUrl, postPayload, params);

    check(
        postRes,
        {
            'Create succes, response code was 201' : (res) => res.status == 201,
        }
    );

    // PUT Request
    const putPayload = JSON.stringify({
        "name": "morpheus",
        "job": "zion resident"
    });

    const putRes = http.put(putUrl, putPayload, params);

    check(
        putRes,
        {
            'Update succes, response code was 200' : (res) => res.status == 200,
        }
    );

    sleep(1);
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}