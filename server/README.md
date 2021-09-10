
# Running the server
Type "npm start" in the terminal

# DB schemas:

## User

```
{
	"id": string;
	"userName": string;
	"password": string;
	"chatIds": number[];
}
```

## Chat
```
{
	"id": string;
	"name": string;
	"userIds": string[]
	"createdAt": number;
	"messageIds": string[];
}
```

## Message
```
{
	"id": string;
	"chatId": string;
	"fromUserId": string;
	"createdAt": number;
	"status": string; // sent, delivered, read
	"text": string
}
```