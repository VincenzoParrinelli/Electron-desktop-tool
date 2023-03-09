import React, { useContext } from 'react'
import candidateContext from "../context/candidatesContext"
import { Status } from '../ts/interfaces/candidatesInterface'

export default function CandidatesList() {

    const { candidates } = useContext(candidateContext)

    const renderStatus = (status: Status): string => {

        if (status === "NOTINSERTED") return "Non inserito"
        else if (status === "PROCESSING") return "In corso"
        else if (status === "INSERTED") return "Inserito"
    }

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
                        Supporto audio
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
                            <td>n/d</td>
                            <td>{renderStatus(candidate.status)}</td>
                        </tr>

                    )
                })}
            </tbody>
        </table>
    )
}
