# carpincho

> The express framework.

Build backend applications with zero configuration, typescript support, and schema validations in seconds.

## Getting started
- Create a folder for your project and install *carpincho*
```bash
npm i carpincho
```
- Add scripts to your package.json
```json
"scripts": {
  "start": "node dist/index.js",
  "build": "carpincho"
}
```

- Create a folder named `routes` and inside, add a file `index.api.ts`:

```typescript
// routes/index.api.ts
export const GET = (req, res) => {
  res.send('Hello world');
};
```
- Thats it, run `npm run build` to build your express api and `npm run start` to start the server.
- Open `localhost:3000` to see your api in action 🚀

## Route parameters
Use $id in folders or files to define paraeters for the urls.

```typescript
// File /routes/users/$userId.api.ts
// URL  http://localhost:3000/users/42
export const GET = (req, res) => {
  req.params; // { userId: '42' }
  res.json(req.params);
};
```

```typescript
// File /routes/users/$userId/books/$bookId.api.ts
// URL  http://localhost:3000/users/42/posts/101
export const GET = (req, res) => {
  req.params; // { userId: '42', bookId: '101' }
  res.json(req.params);
};
```

## Data validation
```typescript
import { Joi } from 'carpincho';

export const POST = (req, res) => {
  res.send('Hello world');
};

POST.schema = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};
```

## Using Typescript
```typescript
// File /routes/users/$userId/books/$bookId.api.ts
// URL  http://localhost:3000/users/42/posts/101
import { Request, Response } from 'carpincho';

interface Params {
  userId: string;
  bookId: string;
}

export const GET = (req: Request<Params>, res: Response) => {
  req.params; // { userId: '42', bookId: '101' }
  res.json(req.params);
};
```

## 🧉
![image](https://user-images.githubusercontent.com/29680544/164913155-3f32ac1b-28d8-4bb9-998e-083e5272a2be.png)
