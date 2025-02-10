import http from 'k6/http';
import {check} from 'k6';

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
}