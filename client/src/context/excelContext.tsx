import React, { useState, createContext, PropsWithChildren } from 'react'

const excelContext = createContext({})

export default function ExcelContextProvider({ children }: PropsWithChildren) {

    const [excel, setExcel] = useState<File | null>(null)

    return (
        <excelContext.Provider value={{ excel, setExcel }}>
            {children}
        </excelContext.Provider>
    )
}