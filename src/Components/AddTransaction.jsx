import { memo, useState } from "react";
import styled from "styled-components";
import { EXPENSE,INCOME } from "./Types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  padding: 10px 0;
  & input {
    border: none;
    border-radius: 3px;
    margin-bottom: 10px;
    height: 50px;
    padding: 10px;
    font-size: 1rem;
  }
  & input:active{
    border: none;
  }
`

const RadioBox = styled.div`
  display: flex;
  padding: 10px 0;
  & input {
    height: 15px;
    margin-right: 5px;
  }
  & label {
    margin-right: 15px;
  }
`

const AddTransactionButton = styled.div`
  background: #fbc31d;
  text-align: center;
  padding: 15px 10px;
  font-weight: bolder;
  cursor: pointer;

  &:hover {
    background: #ffb701;
  }
`


function AddTransaction({addTransactions}) {
  const [amount, setAmount] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10))
  const [type, setType] = useState(INCOME)

  const handleAddTransactions = () => { 
    addTransactions({id:Date.now() ,amount, desc, category, type, date})
   }  

  return (
    <Container>
      <input type="number" placeholder="Amount" id="amount" name="amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input type="text" placeholder="Description" id="desc" name="desc" value={desc} onChange={e => setDesc(e.target.value)} />
      <input type="text" placeholder="Category" id="category" name="category" value={category} onChange={e => setCategory(e.target.value)} />
      <input type="date" name="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
      <RadioBox>
        <input type="radio" name="type" id="income" checked={type === INCOME} onChange={e => setType(INCOME)} />
        <label htmlFor="income">Income</label>
        <input type="radio" name="type" id="expense" checked={type === EXPENSE} onChange={e => setType(EXPENSE)} />
        <label htmlFor="expense">Expense</label>
      </RadioBox>
      <AddTransactionButton onClick={handleAddTransactions}>Add Transaction</AddTransactionButton>
    </Container>
  )
}

export default AddTransaction
// export default memo(AddTransaction)