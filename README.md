# Woovi apiWithLog

Powerful `fetch` wrapper with the given functionallies:

- log request and response when using env `DEBUG=true`
- save request when using env `WRITE_MOCK=true`
- reply request when using env `USE_MOCK=true`
- send error to slack and sentry based on your setup

## Usage

This will make the request but it won't show any logs

```bash
yarn es scripts/test.ts 
```

Show request and response logs

```bash
DEBUG=true yarn es scripts/test.ts 
```

Output example

````shell
GET https://cat-fact.herokuapp.com/facts
{
  time: 'NaNms',
  init: 'https://cat-fact.herokuapp.com/facts',
  options: { headers: { 'user-agent': 'node-fetch' } },
  json: [
    {
      status: { verified: true, feedback: '', sentCount: 1 },
      _id: '5887e1d85c873e0011036889',
      user: '5a9ac18c7478810ea6c06381',
      text: 'Cats make about 100 different sounds. Dogs make only about 10.',
      __v: 0,
      source: 'user',
      updatedAt: '2020-09-03T16:39:39.578Z',
      type: 'cat',
      createdAt: '2018-01-15T21:20:00.003Z',
      deleted: false,
      used: true
    },    
  ],
  ok: true,
  status: 200,
  curl: `curl 'https://cat-fact.herokuapp.com/facts' -H "user-agent: node-fetch"`
}
````

Save request to mock

```bash
WRITE_MOCK=true DEBUG=true yarn es scripts/test.ts 
```

Go check `mock-requests.json`

Reply requests from mock

```bash
USE_MOCK=true DEBUG=true yarn es scripts/test.ts
```