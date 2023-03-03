import React, { useState, createContext, PropsWithChildren } from 'react'
import { ExcelContextInterface } from '../ts/interfaces/excelInterface'

const excelContext = createContext<ExcelContextInterface>({ excel: null, setExcel: null })

export default excelContext

export function ExcelContextProvider({ children }: PropsWithChildren) {

    const [excel, setExcel] = useState<File | null>(null)

    return (
        <excelContext.Provider value={{ excel, setExcel }}>
            {children}
        </excelContext.Provider>
    )
}