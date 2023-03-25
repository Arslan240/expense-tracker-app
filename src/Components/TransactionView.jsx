import { useEffect, useState } from "react";
import styled from "styled-components";
import { INCOME, EXPENSE } from "./Types";

const Container = styled.div`
  margin-top: 10px;
  /* width: 100%; */
    & input {
    border: none;
    width: 100%;
    border-radius: 3px;
    margin-bottom: 10px;
    height: 50px;
    padding: 10px;
    font-size: 1rem;
  }
`

const TransactionBox = styled.div`
`

const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 10px;
  border: 1px solid rgb(223, 224, 224);
  border-right: 4px solid ${({ type }) => type === INCOME ? "rgb(29, 177, 0)" : "red"};
  
  & span {
    font-size: 1.2rem;
    font-weight: bolder;
  }
`

const TransactionDesc = styled.div`
  
  & h2,h3,h4,p {
    margin: 0;
  }
  & h4{
    font-size: 1rem;
  }
  & span{
    font-size: 1rem;
    font-weight: normal;
    margin: 5px 15px 0 0;
  }
`

const MetaData = styled.div`
  padding: 5px 0;
  background-color: #d8d8d8;
  width: 100%;
`

const TransactionCell = ({ transaction }) => {

  const { desc, type, amount, category, date } = transaction

  return (
    <Transaction type={type}>
      <TransactionDesc>
        <h2>{desc}</h2>
        <h4>Category: {category.toLowerCase()}</h4>
        <MetaData>
          <span>{type.toUpperCase()} </span> 
          <span>{date.toString()}</span>
        </MetaData>
      </TransactionDesc>
      <span>$ {amount}</span>
    </Transaction>
  )

}

function TransactionView({ transactions }) {
  const [search, setSearch] = useState("")
  const [filteredTransactions, updateFilteredTransactions] = useState(transactions)

  const filterTxn = () => {
    console.log("filter called")
    if (search.trim().length <= 0) {
      updateFilteredTransactions(transactions)
      return;
    }

    const searchText = search.trim().toLowerCase()
    const updatedTxn = transactions.filter(({ type, desc, amount, category }) => {
      if (type.toLowerCase().includes(searchText) || desc.toLowerCase().includes(searchText) || category.toLowerCase().includes(searchText) || amount.includes(searchText)) {
        return true;
      }
    })

    updateFilteredTransactions(updatedTxn)
  }

  useEffect(() => {
    filterTxn()
  }, [transactions, search])

  return (
    <Container>
      <input type="text" name="search" id="search" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
      <TransactionBox>
        {
          filteredTransactions.map(transaction => {
            return <TransactionCell transaction={transaction} key={transaction.id}></TransactionCell>
          })
        }
        {/* <TransactionCell transactions={transactions}></TransactionCell> */}
      </TransactionBox>
    </Container>
  )
}

export default TransactionView