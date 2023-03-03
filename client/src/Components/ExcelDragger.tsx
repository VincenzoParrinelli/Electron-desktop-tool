import React, { ChangeEvent, useState, useRef, useContext } from 'react'
import { ReactComponent as UploadFileIcon } from "../assets/Images/upload-file.svg"
import excelContext from "../context/excelContext"

export default function ExcelDragger() {

    const { excel, setExcel } = useContext(excelContext)

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


        setExcel(e.target.files[0])
    }

    // Handle drag and dropped files 
    const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        const newFilesArr = e.dataTransfer.files


        draggableAreaRef.current.classList.remove("excel-dragger__drag-and-drop--on-drag")
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

        </div>
    )
}