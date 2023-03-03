export interface ExcelContextInterface {
    excel: File | null,
    setExcel: React.Dispatch<React.SetStateAction<File | null>>,
}