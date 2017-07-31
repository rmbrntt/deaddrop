# deaddrop
deaddrop is a service to signal hidden drops at physical locations.

## JSON Objects

### Drop
```
{
    "drop": {
        "lng": "-75.1649150",
        "lat": "39.9427520",
        "agent": {
            "username": "ryanbarnett",
            "headline": ""
        },
        "title": "Cat Fact 46",
        "createdAt": "2017-07-31T18:43:09.895978+00:00",
        "updatedAt": "2017-07-31T18:43:09.896066+00:00",
        "id": "e1394b17-1abc-4c76-bb95-8bea47e6ffc8",
        "message": "Cats can change their meow to manipulate a human. They often imitate a human baby when they need food, for example.",
    }
}
```

## API Endpoints
### `POST` `/api/register`

### `POST` `/api/login`

### `GET` `/api/users`

### `PUT` `/api/user/:username/profile`

### `GET` `/api/user/:username/profile`

### `POST` `/api/user/:username/ping`

### `POST` `/api/drops`

### `PUT` `/api/drops/:id`

### `GET` `/api/drops/:id`

### `DELETE` `/api/drops/:id`

