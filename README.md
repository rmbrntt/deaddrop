# deaddrop
deaddrop is a service to signal hidden drops at physical locations.

## JSON Objects

### Drop
{ "drop": {
  "lng": "",
  "lat": "",
  "username": "",
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

