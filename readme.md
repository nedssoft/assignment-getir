[![Build Status](https://app.travis-ci.com/nedssoft/assignment-getir.svg?branch=main)](https://app.travis-ci.com/nedssoft/assignment-getir)
# Api Docs

## BASE_URL:
[https://challenge-getir.herokuapp.com/api](https://challenge-getir.herokuapp.com/api/)


> [Link to the API documentation](https://documenter.getpostman.com/view/4448465/UVkjwdpB)

# Endpoints Summary

| Verb | Route      | Description | Auth Required |
| ---- | ---------- | ----------- | ------------- |
| GET  | `/`        | Index Route | false         |
| POST | `/records` | Fetch Records | false         |

## [POST] `/records` Fetch records from the database

#### Sample Request Payload

```json
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```

#### Sample Response Payload

```json
{
  "code": 0,
  "msg": "Success",
  "records": [
    {
      "key": "ibfRLaFT",
      "createdAt": "2016-12-25T16:43:27.909Z",
      "totalCount": 2892
    },
    {
      "key": "pxClAvll",
      "createdAt": "2016-12-19T10:00:40.050Z",
      "totalCount": 2772
    }
  ]
}
```

#### Response Payload interpretation

```
code = 0 msg = "Success" imply successful request
code = 422 implies invalid request payload input format
code = 505 implies server error
code = 404 implies Resource Not Found / invalid endpoint

```

# Usage

## Requirements

> Node installed

> NPM or Yarn install

#### Steps

- `git clone https://github.com/nedssoft/assignment-getir.git && cd assignment-getir.git`
- `touch .env && cp .env.example .env`
- `npm install`
- `npm run dev`

### Fetch Records

```curl
curl -X POST -H "Content-Type: application/json" \
    -d '{"startDate": "2016-01-26", "endDate": "2018-02-02", "minCount": 2700, "maxCount": 3000}' \
    https://challenge-getir.herokuapp.com/api/records
```

## Test
Test cases are located in the tests director
To run the automated test, run the following command

> npm test


# Framework/libraries

- [Express](https://expressjs.com/)

# Test libraries

- [Jest](https://jestjs.io/docs)
- [Supertest](https://www.npmjs.com/package/supertest)



# Licence

- MIT
