Full Online Frontend/Backend URL: https://phonebook-jonatandb.herokuapp.com/

---

## Thanks to https://fullstackopen.com/en

---

Run development:

    npm run dev

Full deploy:

    npm run deploy:full

---

We defined the environment variables for development in file .env, but the environment variable that defines the database URL in production should be set to Heroku with:

    heroku config:set MONGODB_URI="mongodb+srv://user:pass..."

---

Logs:

    npm run logs:prod

---

Available endpoints:

GET

    /
    /info
    /api/persons
    /api/persons/:id

POST

    /api/persons

PUT

    /api/persons/:id

DELETE

    /api/persons/:id
