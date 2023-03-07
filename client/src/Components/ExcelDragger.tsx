import React, { ChangeEvent, useRef, useContext } from 'react'
import { ReactComponent as UploadFileIcon } from "../assets/Images/upload-file.svg"
import candidateContext from "../context/candidatesContext"
import { read, utils } from 'xlsx'
import { Candidate } from '../ts/interfaces/candidatesInterface'
import axios from "axios"

export default function ExcelDragger() {

    const { candidates, setCandidates } = useContext(candidateContext)

    const draggableAreaRef = useRef(null) as React.MutableRefObject<HTMLDivElement | null>

    // When user hoveres on drag and drop area change style
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        draggableAreaRef.current.classList.add("excel-dragger__drag-and-drop--on-drag")
    }

    // When user leaves cursor from drag and drop remove style
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        draggableAreaRef.current.classList.remove("excel-dragger__drag-and-drop--on-drag")
    }

    const handleNewExcel = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const excel = e.target.files[0]

        getCandidatesFromExcel(excel)
    }

    // Handle drag and dropped files 
    const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        const excel = e.dataTransfer.files[0]

        // Check if file is excel 
        if (excel.type === 'application/vnd.ms-excel' || excel.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') getCandidatesFromExcel(excel)

        else alert("Please drop only Excel files!")

        draggableAreaRef.current.classList.remove("excel-dragger__drag-and-drop--on-drag")
    }

    // TODO: OPTIMIZE THIS
    const getCandidatesFromExcel = async (excel: File) => {

        if (!excel) return alert("Insert excel")

        // Read data from excel
        const data = await excel.arrayBuffer()

        const workbook = read(data)

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        // Specify rows and columns from where to get the candidates
        const startRow = 9
        const endRow = 30
        const startCol = 2
        const endCol = 9
        const colsToSkip = [3, 5, 8]

        const candidates = [] as Candidate[]

        // Iterate trough selected rows and columns and push data into candidates array
        for (let rowNum = startRow; rowNum <= endRow; rowNum++) {

            const row = []

            for (let colNum = startCol; colNum <= endCol; colNum++) {

                // Skip cols defined in colsToSkip array
                if (colsToSkip.includes(colNum)) continue

                const cell = worksheet[utils.encode_cell({ r: rowNum, c: colNum })]
                const value = cell ? cell?.v : null
                row.push(value)
            }

            const newCandidate: Candidate = {
                fullName: row[0],
                phoneNumber: row[1],
                id: row[2],
                registrationDate: row[3],
                examHour: row[4]
            }


            candidates.push(newCandidate)
        }

        setCandidates(candidates)

    }

    const handleAutomation = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        await axios.post("http://localhost:5000/automation", candidates)
    }

    return (
        <div className='excel-dragger'>

            <div className='excel-dragger__drag-and-drop'
                ref={draggableAreaRef}
                onDragOver={e => handleDragOver(e)}
                onDragLeave={e => handleDragLeave(e)}
                onDrop={e => handleOnDrop(e)}
            >

                <UploadFileIcon className='excel-dragger__upload-icon' />

                <p className="excel-dragger__paragraph">
                    <span>Drag & drop or </span>
                    <label htmlFor='excel-selector' className="excel-dragger__label-for-input">Browse</label>
                </p>

                <input
                    className='excel-dragger__input'
                    id='excel-selector'
                    type="file"
                    accept='.xlsx'
                    multiple
                    onChange={e => handleNewExcel(e)}
                />

            </div>

            <button
                className="btn"
                onClick={e => handleAutomation(e)}
            >
                AVVIA
            </button>
        </div>
    )
}