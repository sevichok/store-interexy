import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';

// ======= Material UI ======= //
import { PageStyle, HeaderStyle, ImageListItemStyle } from './mui'
import { Box, Button, Container, IconButton } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

// ======= Store ======= //
import { useAppDispatch } from 'store'
import { useAppSelector } from 'store'
import { logoutUser } from '../auth/store/auth.actions';
import { getAllProducts } from './store/products.actions';
import { updateOrder } from '../order/store/order.actions';

// ======= Types ======= //
import { ProductDto } from './types/product-dto.type'
import { OrderItemDto } from '@app/order/types/order-dto.type';

export const ProductsMainPage = () => {
    const dispatch = useAppDispatch()
    const productsFromDatabase: ProductDto[] = useAppSelector((state) => state.products.products)
    const memoizedProducts = useMemo(() => productsFromDatabase, [productsFromDatabase]);

    useEffect(() => {
        if (productsFromDatabase.length) {
            return
        }
        dispatch(getAllProducts())
    }, [dispatch, productsFromDatabase]);

    const handleAddToCart = (elem: Partial<OrderItemDto>) => {
        dispatch(updateOrder(elem))
    }
    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <Container className='sign-page' sx={PageStyle}>
            <Box className='sign-header' sx={HeaderStyle}>
                <Button variant='contained' color='error' sx={{ width: '100px' }} onClick={handleLogout}>
                    LOGOUT
                </Button>
                <Link to='/store/order'>
                    <ShoppingCartIcon sx={{ fontSize: 40 }} />
                </Link>
            </Box>
            <ImageList cols={6} gap={10} rowHeight={460} sx={{ width: "100%", boxSizing: "border-box", padding: " 0px 40px" }}>
                {memoizedProducts.map((item) => (
                    <ImageListItem key={item.images[0]} sx={ImageListItemStyle}>
                        <img
                            style={{ maxHeight: "356px", maxWidth: "260px" }}
                            src={`${item.images[0]}`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={<>
                                <span>{item.category}</span>
                                <h4>Price: {item.price} $</h4>
                            </>}
                            position="bottom"
                            sx={{ cursor: "default" }}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(228, 237, 228, 0.94)' }}
                                    aria-label={`info about ${item.title}`}
                                    onClick={() => handleAddToCart(item)}
                                >
                                    <ShoppingCartIcon />
                                </IconButton>}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    )
}

export default ProductsMainPage