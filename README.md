# Backend Tutorial — Node, Express and MongoDB

A REST API built step by step, following the classroom tutorial:

a) Create a Node project, add it to GitHub
b) Set up an online MongoDB account and cluster
c) Create database models for MongoDB
d) Create Express APIs (using controllers and routes) for CRUD operations — Create, Read, Update and Delete
e) Use Postman Desktop to make API calls to test the APIs

## Project structure

```
server.js                         # Express app + MongoDB connection + /subscribers mount
models/subscriber.js              # (c) Mongoose model: name, subscribedToChannel, subscribeDate
controllers/subscriberController.js # (d) CRUD logic: get all, get one, create, update, delete
routes/subscribers.js             # (d) Express routes wired to the controllers
test-crud.js                      # Automated test of all CRUD calls (same calls as Postman)
postman-collection.json           # (e) Import this into Postman Desktop
.env.example                      # Copy to .env and fill in your Atlas URI (never commit .env)
```

## (b) MongoDB Atlas setup — you do this part yourself

1. Create a free account at MongoDB Atlas, create a free (M0) cluster.
2. Database Access → add a database user (username + password, keep it safe).
3. Network Access → Add IP Address → Allow Access from Anywhere (`0.0.0.0/0`) for learning, or your own IP.
4. Clusters → Connect → Drivers → copy the connection string.
5. Copy `.env.example` to `.env` and paste that string as `DATABASE_URL`, replacing `<username>`, `<password>` and `<cluster>`.
6. Never commit `.env` — it is in `.gitignore`.

## Run it

```bash
npm install
cp .env.example .env   # then fill in DATABASE_URL (see above)
npm run dev            # or: npm start
# Server: http://localhost:3000
```

## API endpoints

| Method | URL | What it does |
| ------ | --- | ------------ |
| GET | `/` | Health check |
| GET | `/subscribers` | Read all subscribers |
| GET | `/subscribers/:id` | Read one subscriber |
| POST | `/subscribers` | Create a subscriber |
| PATCH | `/subscribers/:id` | Update a subscriber (only fields sent) |
| DELETE | `/subscribers/:id` | Delete a subscriber |

Create example (JSON body):

```json
{
  "name": "Your Name",
  "subscribedToChannel": "Backend Tutorial"
}
```

## (e) Test with Postman Desktop

1. Start the server (`npm run dev`).
2. In Postman, Import → `postman-collection.json`.
3. Run in order: GET all → POST create (copy the returned `_id`) → GET one → PATCH update → DELETE.
4. Expected: POST returns `201` with the new subscriber, GET one returns it, PATCH returns the updated name, DELETE returns `{"message": "Deleted Subscriber"}`, GET one after delete returns `404`.
