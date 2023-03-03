import React from 'react'
import { ExcelContextProvider } from "./context/excelContext"
import ExcelDragger from './Components/ExcelDragger'

export default function App() {

    return (
        <div className='app'>
            <ExcelContextProvider>
                <ExcelDragger />
            </ExcelContextProvider>
        </div>
    )
}
