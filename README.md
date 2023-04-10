# Auth0 post login action sample project

## How to use

### 1. Create .env file to root directory

```sh
touch .env
```

Add your auth0 tenant's environment variable

```sh
AUTH0_DOMAIN=''
AUTH0_CLIENT_ID=''
AUTH0_CLIENT_SECRET=''
AUTH0_REDIRECT_URI=''
AUTH0_AUDIENCE=''
APP_URL=''
AUTH0_ACTIONS_SECRET=''
```

### 2. Run

```bash
npm install
npm run dev
```