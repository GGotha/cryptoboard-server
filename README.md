# Cryptobard

## Comandos iniciais

```
docker-compose up
yarn db:sync
yarn db:seed
yarn dev
```

## Endpoints

### localhost:3333/user/session

- Autenticar

```JSON
{
	"email": "user@cryptoboard.com.br",
	"password": "123mudar"
}
```

### localhost:3333/user/

- Criar usuário

```JSON
{
	"email": "user@cryptoboard.com.br",
	"first_name": "User",
	"last_name": "Crypto",
	"password": "123mudar"
}
```
