import React, { ChangeEvent, useState } from 'react'

export default function Dashboard() {

    const [excel, setExcel] = useState<File | null>(null) 

    const handleNewFile = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()


        setExcel(e.target.files![0])
    }

    return (
        <div className='dashboard'>

            <h4 className='heading'>INSERISCI EXCEL</h4>

            <input
                type="file"
                accept='.xlsx'
                className="dashboard__input"
                onChange={e => handleNewFile(e)}
            />

            <button className="btn btn--primary">AVVIA</button>
        </div>
    )
}