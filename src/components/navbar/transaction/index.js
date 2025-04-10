import React, {useState, useEffect} from 'react'
import DataTable from '../../DataTable'
import useFetch from '../../../hooks/useFetch'
import { Card, Stack, Dialog, Typography } from '@mui/material'
import { useAuth } from '../../../context/AuthContext'
import moment from 'moment'

const columns= [
    {
        name: 'type',
        label: 'Type'
    },
    {
        name: 'ammount',
        label: 'Amount'
    },
    {
        name: 'createdAt',
        label: 'Date',
        render: (row, id) => (
            <div>
                {moment(row.createdAt).format('YYYY-MM-DD, HH:mm a')}
            </div>
        )
    }
]


const Transaction = ({ open, setOpen}) => {
    const {user} = useAuth()
    const [transactions, transactionsLoading] = useFetch(`/transaction/user/${user._id}`)

    const hanldeClose = () => {
        setOpen(false)
    }
    const [currentBalance, setCurrentBalance] = useState(0)
    useEffect(()=>{
        let sum = transactions.reduce(function (accumulator, curValue) {
            return accumulator + curValue.ammount
        
        }, 0)
        setCurrentBalance(sum)
    },[transactions])
    if(transactionsLoading) return 'Loading...'
    return(
        <Dialog 
            open={open} 
            onClose={hanldeClose}
            scroll="body"
            maxWidth="lg"
            sx={{m: 1}}
        >
            <DataTable 
                rows={transactions || []}
                columns={columns}
                tableHeading='Transactions'
                searchLabel='Search type...'
                searchKeyWord='type'
                sx={{m: 1}}
            />
            <Card sx={{p: 2}}>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Typography>
                        Current balance
                    </Typography>
                    <Typography>
                        {
                            currentBalance
                        }
                    </Typography>
                </Stack>
            </Card>
        </Dialog>
    )
}
export default Transaction