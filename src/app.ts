// TODO: require('dotenv').config()

import { Request, Response } from "express";
const express = require('express')
const app = express();
const cors = require('cors')
const port = 3000;

app.use(cors())
app.use(express.json())

/** TODO:
 * const hostname = process.env.HOSTNAME;
 * const port = process.env.EXPRESS_PORT;
 */

/**
 * Should refactor all of these callbacks 
 * to be imported methods. E.g. Instead of () => {}...
 * Do `app.get('/v1/accounts', handleGetAllAccounts)`.
 * Will make this **much** more readable
 */

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(200)
});

app.get('/v1/accounts', (req: Request, res: Response) => {
  // TODO: Get all accounts
  res.send('GET all accounts');
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

app.post('/v1/accounts', (req: Request, res: Response) => {
  console.log(req.body)
  const {initialBalanceInCents} = req.body
  console.log({initialBalanceInCents})
  res.send(`CREATE account with initialBalanceInCents of ${initialBalanceInCents}`);
})

app.post('/v1/transactions', (req: Request, res: Response) => {
  const {sender_account_id, recipient_account_id, amount_in_cents, currency, description} = req.body
  res.send(`Created a transaction, 
    sender ID: ${sender_account_id}, 
    recipient ID: ${recipient_account_id}, 
    centsAmount: ${amount_in_cents}, 
    currency: ${currency}, 
    description: ${description}`
  )
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
