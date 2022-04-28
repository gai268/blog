import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAppSelector } from "../../../stores/hooks";
import { siteDescriptionSelector, siteNameSelector } from "../../../stores/site/selectors";
export const Header = () => {
    const siteName = useAppSelector(siteNameSelector);
    const siteDescription = useAppSelector(siteDescriptionSelector);

    return (
        <Container maxWidth="xl">
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ 
                textAlign: 'center',
                width: '100%'
                }}>
                <Typography variant="h6" component="div">
                    <Link href={`/`} underline="hover" color="inherit">{siteName}</Link>
                </Typography>
                <Typography variant="subtitle2" component="div" color="text.secondary">
                {siteDescription}
                </Typography>
            </Box>
        </Toolbar>
        </Container>
    )
}