import React from "react"
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import DrawerBasic from "./Nav";
import BasicBreadcrumbs from "./Breadcrumbs";
import Box from '@mui/joy/Box';

export default function Layout({ children }) {
    return (
        <CssVarsProvider>
            <CssBaseline />
            <div style={{ margin: `0 auto`, maxWidth: "80%", padding: `1rem` }}>
                <DrawerBasic/>
                <Box sx={{m: "auto", mb:2 }}>
                    <BasicBreadcrumbs/>
                </Box>
                <Box sx={{mt: 4}}>
                    {children}
                </Box>
            </div>
        </CssVarsProvider>
    )
}