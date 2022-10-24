# Nest + ioredis 연동

### usage

install dependency

```
yarn install
```

add env file and env value

```
//.development.env example
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
```

test

```
yarn test:dev
```

dev run

```
yarn start:dev
```

apis

- post('/')

  - body : {
    key: some key string,
    value: some value string
    }

- get('/\<key : string>')
