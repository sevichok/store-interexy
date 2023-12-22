import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ======= Material UI ======= //
import { Box, Button, Card, CardContent, Container, IconButton, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { PageStyle } from './mui';

// ======= Store ======= //
import { useAppDispatch, useAppSelector } from 'store';
import { getActiveOrder, updateOrderItemQuantity, completeOrder, deleteOrder } from './store/order.actions';

// ======= Components ======= //
import AlertCompleteCart from '../../components/alert-complete';
import AlertEmptyCart from '../../components/alert-empty';

const OrderPage = () => {
    const [alert, setAlert] = useState<string>('empty')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getActiveOrder())
    }, [dispatch])

    const handleClickUpdate = (id: number, nq: number) => {
        dispatch(updateOrderItemQuantity({ orderItemId: id, newQuantity: nq })).then(onfulfilled => dispatch(getActiveOrder()))
    }

    const orderStore = useAppSelector(state => state.order.order)

    const handleCompleteOrder = (id: number) => {
        dispatch(completeOrder({ orderId: id })).then(onfulfilled => setAlert('complete'))

    }
    const handleDeleteOrder = (id: number) => {
        dispatch(deleteOrder({ orderId: id })).then(onfulfilled => setAlert('empty'))
    }

    const items = orderStore?.orderItems?.map(item => <Card key={item.id}>
        <CardContent>
            <Typography variant="h5" component="div">
                {item.product.title}
            </Typography>
            <Typography color="text.secondary">
                Price: {item.product.price}$ per item
            </Typography>
            <Stack display={'flex'} direction={'row'} alignItems={'center'}>
                <IconButton color="primary" onClick={() => handleClickUpdate(item.id, item.quantity - 1)}>
                    <RemoveIcon />
                </IconButton>
                <Typography color="text.secondary">
                    Quantity: {item.quantity}
                </Typography>
                <IconButton color="primary" onClick={() => { handleClickUpdate(item.id, item.quantity + 1); }}>
                    <AddIcon />
                </IconButton>
            </Stack>
            <Typography color="text.secondary">
                Subtotal Price: {item.subTotalPrice}$
            </Typography>
        </CardContent>
        <CardContent>
            <Button variant="outlined" color="secondary" onClick={() => { handleClickUpdate(item.id, 0); }} >
                Remove from Cart
            </Button>
        </CardContent>
    </Card>
    )

    return (
        <Container sx={PageStyle}>
            <Link to='/store/products'>
                <Box display={"flex"} alignItems={'center'} gap={"5px"}>
                    <ArrowBack color='secondary' fontSize='medium' />
                    <Typography variant='h6' color="secondary">Back to products</Typography>
                </Box>
            </Link>
            <Box sx={{ justifyContent: 'center', display: 'flex', paddingTop: "50px" }}>
                {orderStore?.orderItems?.length ? <Box sx={{ maxWidth: 1200, minWidth: 600 }}>
                    <Typography variant="h4" component="div" sx={{ paddingBottom: 4 }}>TOTAL PRICE: {orderStore?.totalPrice}$</Typography>
                    {items}
                    <Box sx={{ justifyContent: 'flex-start', display: 'flex', paddingTop: 4 }}>
                        <Button size="large" color='success' variant='contained'
                            onClick={() => handleCompleteOrder(orderStore.id)}
                            sx={{ maxWidth: "200px" }}>Complete Order</Button>
                        <Button size="large" color='error' variant='contained'
                            onClick={() => handleDeleteOrder(orderStore.id)}
                            sx={{ maxWidth: "200px" }}>Delete Order</Button>
                    </Box>
                </Box> : (alert === 'empty' ? <AlertEmptyCart /> : <AlertCompleteCart />)}
            </Box>
        </Container>
    )
}

export default OrderPage