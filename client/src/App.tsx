import React, { useEffect } from 'react'
import ExcelContextProvider from "./context/excelContext"
import Dashboard from './Components/Dashboard'
import axios from "axios"

export default function App() {

    useEffect(() => {

        (async () => {

            await axios.get("http://localhost:5000/test")

        })()
    })

    return (
        <div className='app'>
            <ExcelContextProvider>
                <Dashboard />
            </ExcelContextProvider>
        </div>
    )
}
