# Cryptobard

## Comandos iniciais

```
docker-compose up
yarn db:sync
yarn db:seed
yarn dev
```

## Endpoints

### POST - localhost:3333/user/session

- Autenticar

```JSON
{
	"email": "user@cryptoboard.com.br",
	"password": "123mudar"
}
```

### POST - localhost:3333/user/

- Criar usuário

```JSON
{
	"email": "user@cryptoboard.com.br",
	"first_name": "User",
	"last_name": "Crypto",
	"password": "123mudar"
}
```

### GET - localhost:3333/coin/all

- Lista todas as criptomoedas

### GET - localhost:3333/coin/bitcoin

- Lista os dados da moeda Bitcoin
