import React, { useContext } from 'react'
import candidateContext from "../context/candidatesContext"

export default function CandidatesList() {

    const { candidates } = useContext(candidateContext)

    return (
        <table className='candidates-list'>

            <thead>
                <tr>
                    <th>
                        Nome
                    </th>
                    <th>
                        Marca Operativa
                    </th>
                    <th>
                        Ora Esame
                    </th>
                    <th>
                        Stato
                    </th>
                </tr>
            </thead>

            <tbody>
                {candidates?.map(candidate => {

                    return (
                        <tr key={candidate.id}>
                            <td>{candidate.fullName}</td>
                            <td>{candidate.id}</td>
                            <td>{candidate.examHour}</td>
                        </tr>

                    )
                })}
            </tbody>
        </table>
    )
}
