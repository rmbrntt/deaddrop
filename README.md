# deaddrop
deaddrop is a service to signal hidden drops at physical locations.

## JSON Objects

### Drop
{
    "drop": {
        "lng": "67.2352000",
        "lat": "98.6200000",
        "agent": {
            "username": "cadence1",
            "headline": "",
            "image": "http://localhost/images/avatar.jpg"
        },
        "title": "Bear snatches honey",
        "description": "yeah yeah yeah, it's that time",
        "createdAt": "2017-07-28T03:31:09.537994+00:00",
        "updatedAt": "2017-07-28T04:15:45.840828+00:00",
        "id": "fde40f17-dcc6-43fa-9fb8-4db393f5c9d7",
        "signal": "towel in window",
        "covert_message": "meet me at the cafe"
    }
}

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

