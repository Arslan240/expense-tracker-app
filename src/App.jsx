import { useEffect, useState } from 'react'
import styled from 'styled-components'
import AddTransaction from './Components/AddTransaction'
import TransactionView from './Components/TransactionView'
import { EXPENSE,INCOME } from "./Components/Types";

const Container = styled.div`
  background-color: #b39d9d;
  width: 400px;
  margin: 0 auto;
  padding: 20px 10px;
`
const BalanceBox = styled.div`
  & h2 {
    font-size: 2rem;
  }
  & span {
    font-size: 1.5rem;
    font-weight: 700;
    margin-right: 10px;
  }
`

function App() {
  const [transactions, updateTransactions] = useState([])
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  const addTransactions = (transaction) => {
    updateTransactions(prevTransactions => {
      const updatedTransactions = [...prevTransactions, transaction]
      console.log(updatedTransactions)
      return updatedTransactions
    })
  }
  const calculateBalance = () => { 
    const [inc , exp] = transactions.reduce((accumulator, transaction) => {
      if(transaction.type === INCOME){
        accumulator[0] = accumulator[0] + Number(transaction.amount)
      }
      else if(transaction.type === EXPENSE){
        accumulator[1] = accumulator[1] + Number(transaction.amount)
      }
      return accumulator
    },[0,0])
    setIncome(inc)
    setExpense(exp)
  }
  useEffect(() => {
    calculateBalance()
  }, [transactions])
  
  // console.log(income, expense)


  return (
    <div className="App">
      <Container>
        <BalanceBox>
          <h2>Expense Tracker App</h2>
          <span>Balance:</span><span>$ {income - expense}</span>
        </BalanceBox>
        <AddTransaction addTransactions={addTransactions}></AddTransaction>
        <TransactionView transactions={transactions}></TransactionView>
      </Container>
    </div>
  )
}

export default App
