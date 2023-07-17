# Cow Hut Admin With Auth

## API:

```http
 https://cow-api-admin-auth.vercel.app/
```

### Application Routes:

#### Auth (User)

- api/v1/auth/login (POST)
- api/v1/auth/signup (POST)
- api/v1/auth/refresh-token (POST)

### Auth (Admin)

- api/v1/admins/create-admin (POST)
- api/v1/admins/login (POST)

### User

- api/v1/users (GET)
- api/v1/users/648df5091d22a20d7fcc1582 (Single GET)
- api/v1/users/648df5091d22a20d7fcc1582 (PATCH)
- api/v1/users/648df5091d22a20d7fcc1582 (DELETE)

#### Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/648f15218445d83cb43ec99e (Single GET)
- api/v1/cows/648f15218445d83cb43ec99e (PATCH)
- api/v1/cows/648f15218445d83cb43ec99e (DELETE)

#### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
