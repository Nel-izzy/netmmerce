import { Button, Container, Divider, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'




const NotFound = () => {
    return (
        <Container component={Paper} sx={{ height: 400 }}>
            <Typography gutterBottom variant='h3'>
                Sorry, We could not find what youre looking for
            </Typography>
            <Divider />
            <Button fullWidth component={Link} to='/catalog'>Go back to Shop</Button>
        </Container>
    )
}

export default NotFound