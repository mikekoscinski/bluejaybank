// TODO: require('dotenv').config()

import { Request, Response } from "express";
const express = require('express')
const db = require('./db')
const app = express();
const cors = require('cors')
const port = 3000;

app.use(cors())
app.use(express.json())

// TODO: Refactor callbacks to be imported methods

const buildInsertQuery = (action: string, table: string, body: Response) => {
  const keys = Object.keys(body)
  const commaSeparatedColumnIndexString = keys.map((_, index) => `$${index + 1}`).join(', ')
  const query = `
    ${action} "${table}" (${keys.toString()})
    VALUES (${commaSeparatedColumnIndexString})
    RETURNING *;
  `
  return query
}

const buildGetQuery = (action: string, table: string, lookup: object) => {
  const lookupConditionString = Object.entries(lookup).map(([key, value]) => `${key}='${value}'`)
  const query = `${action} "${table}" WHERE ${lookupConditionString};`
  return query
}

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(200)
});

app.post('/v1/customers', async (req: Request, res: Response) => {
  // TODO: Do this, then do the account. But do it in one form fill... Have
  // a customer form. Submit. Loading spinner. Then log them in and show the account form.
  // res.send('Created new customer')

  const {email} = req.body
  const checkUniqueEmailQuery = buildGetQuery("SELECT * FROM", "customer", {email})

  const isUniqueEmailResult = await db.query(checkUniqueEmailQuery);
  const isUniqueEmail = isUniqueEmailResult.rows.length === 0

  try {
    if (isUniqueEmail) {
      const entries = Object.values(req.body)
      const query = buildInsertQuery("INSERT INTO", "customer", req.body)
      const values = [...entries]
      const result = await db.query(query, values);
      res.json(result.rows)
    } else {
      throw new Error('A log-in already exists for this email')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occured when creating the customer')
  }
})

app.get('/v1/accounts', async (req: Request, res: Response) => {
  try {
    const result = await db.query('SELECT * FROM account')
    res.json(result.rows)
  } catch (error) {
    res.send({error})
  }
})

app.post('/v1/accounts', async (req: Request, res: Response) => {
  try {
    const entries = Object.values(req.body)
    const query = buildInsertQuery("INSERT INTO", "account", req.body)
    const values = [...entries]
    const result = await db.query(query, values);
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occured when creating the account')
  }
})

app.get('/v1/accounts/:accountID', (req: Request, res: Response) => {
  // TODO: Get specific account
  const {accountID} = req.params
  res.send(`GET account for accountID ${accountID}`);
})

app.get('/v1/accounts/:accountID/balances', (req: Request, res: Response) => {
  // TODO: Get specific account balance
  const {accountID} = req.params
  res.send(`GET account balances for accountID ${accountID}`);
})

app.get('/v1/accounts/:accountID/transfers', (req: Request, res: Response) => {
  // TODO: Get specific account transfers
  const {accountID} = req.params
  res.send(`GET account transfers for accountID ${accountID}`);
})

app.post('/v1/transactions', async (req: Request, res: Response) => {
  try {
    const entries = Object.values(req.body)
    const query = buildInsertQuery("INSERT INTO", "transaction", req.body)
    const values = [...entries]
    const result = await db.query(query, values);

    // TODO: Check that transaction can occur -- const senderHasSufficientFunds = ...
    // TODO: UPDATE balances for each participant

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occured when creating the transaction')
  }
})

app.get('/v1/transactions', (req: Request, res: Response) => {
  res.send('GET all transactions')
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
