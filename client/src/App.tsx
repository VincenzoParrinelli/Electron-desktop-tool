import React, { useEffect } from 'react'
import { CandidatesContextProvider } from "./context/candidatesContext"
import ExcelDragger from './Components/ExcelDragger'
import CandidatesList from './Components/CandidatesList'
import axios from "axios"

export default function App() {

    useEffect(() => {
        (async() => {
            await axios.get("http://localhost:5000/open-browser")
        })()
    })

    return (
        <div className='app'>
            <CandidatesContextProvider>
                <ExcelDragger />
                <CandidatesList />
            </CandidatesContextProvider>
        </div>
    )
}
