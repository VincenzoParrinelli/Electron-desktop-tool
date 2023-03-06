import React, { useState, createContext, PropsWithChildren } from 'react'
import { Candidate, CandidatesContextInterface } from '../ts/interfaces/candidatesInterface'

const candidateContext = createContext<CandidatesContextInterface>({ candidates: null, setCandidates: null })

export default candidateContext

export function CandidatesContextProvider({ children }: PropsWithChildren) {

    const [candidates, setCandidates] = useState<Candidate[]>(null)

    return (
        <candidateContext.Provider value={{ candidates, setCandidates }}>
            {children}
        </candidateContext.Provider>
    )
}