## Endpoints

#### **POST /login**
User sign in. Expects JSON with username and password:
Example request:
```json
{
	"username": "player2",
	"password": "pass2"
}
```
Example response:
```json
{
	"access_token": "eyJhbGciO...aCswBA6FCDGwMATDrhP8htN__6QI",
	"token_type": "Bearer",
	"expires_in": 300,
	"player_id": 5298
}
```

#### **GET /player/:id**
Returns player's data

Example response:
```json
{
	"id": 5298,
	"username": "player2",
	"name": "Player 2"
}
```
#### **GET /player/:id/games**
Returns player games

Example response:
```json
[
	51,
	260
]
```

#### **GET /game/:id**
Returns game info

Example response:
```json
{
	"player": 311,
	"id": 51,
	"date": "2021-04-23T18:25:43.511Z",
	"result": [
		[1,0,2],
		[1,2,1],
		[2,2,1]
	],
	"first_movement": "65c...4149360545068"
}
```
#### **GET /game/:id/movements/:movid**
Returns movement data. `next` will be null if there are no more movements

Example response:
```json
{
	"movement": [
		0,
		0
	],
	"next": "70b33d6be...6a"
}
```
