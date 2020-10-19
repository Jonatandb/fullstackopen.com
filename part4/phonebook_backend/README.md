Full Online Frontend/Backend URL: https://phonebook-jonatandb.herokuapp.com/

---

## Thanks to https://fullstackopen.com/en

---

Run development:

    npm run dev

Full deploy:

    npm run deploy:full

---

Important to run after first deploy:

    heroku config:set MONGODB_URI="mongodb+srv://user:pass......"

---

Logs:

    npm run logs:prod

---

Available routes:

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
