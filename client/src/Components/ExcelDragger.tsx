import React, { ChangeEvent, useState, useRef } from 'react'
import { ReactComponent as UploadFileIcon } from "../assets/Images/upload-file.svg"

export default function ExcelDragger() {

    const [excel, setExcel] = useState<File | null>(null)

    const draggableAreaRef = useRef(null) as React.MutableRefObject<HTMLDivElement | null>

    // When user hoveres on drag and drop area change style
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        draggableAreaRef.current.classList.add("files-dragger__drag-and-drop--on-drag")
    }

    // When user leaves cursor from drag and drop remove style
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        draggableAreaRef.current.classList.remove("files-dragger__drag-and-drop--on-drag")
    }

    const handleNewExcel = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()


        setExcel(e.target.files[0])
    }

    // Handle drag and dropped files 
    const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        const newFilesArr = e.dataTransfer.files
        

        draggableAreaRef.current.classList.remove("files-dragger__drag-and-drop--on-drag")
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

                <p className="excel-dragger__paragraph">Drag & drop</p>

            </div>

            <p className="excel-dragger__paragraph-2">or</p>

            <input
                className='excel-dragger__input'
                id='excel-selector'
                type="file"
                multiple
                onChange={e => handleNewExcel(e)}
            />

            <label htmlFor='excel-selector' className="excel-dragger__label-for-input">Browse</label>

        </div>
    )
}