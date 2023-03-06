import React from 'react'
import { CandidatesContextProvider } from "./context/candidatesContext"
import ExcelDragger from './Components/ExcelDragger'
import CandidatesList from './Components/CandidatesList'

export default function App() {

    return (
        <div className='app'>
            <CandidatesContextProvider>
                <ExcelDragger />
                <CandidatesList />
            </CandidatesContextProvider>
        </div>
    )
}
