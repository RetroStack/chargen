import React from "react"
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

export default function Layout({ children }) {
    return (
        <CssVarsProvider>
            <CssBaseline />
            <div style={{ margin: `0 auto`, maxWidth: 728, padding: `2rem 1rem` }}>
                {children}
            </div>
        </CssVarsProvider>
    )
}