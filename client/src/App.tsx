import React from 'react'
import { CandidatesContextProvider } from "./context/candidatesContext"
import ExcelDragger from './Components/ExcelDragger'

export default function App() {

    return (
        <div className='app'>
            <CandidatesContextProvider>
                <ExcelDragger />
            </CandidatesContextProvider>
        </div>
    )
}
