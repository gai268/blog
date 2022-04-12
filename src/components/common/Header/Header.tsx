import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
export const Header = () => {
    return (
        <Container maxWidth="xl">
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
                }}>
            <Typography
                variant="h6"
                noWrap
                component="div"
            >Blog</Typography>
            </Box>
        </Toolbar>
        </Container>
    )
}