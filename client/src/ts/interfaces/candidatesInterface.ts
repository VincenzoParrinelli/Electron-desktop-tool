export enum Status {
    notInserted = "NOTINSERTED",
    processing = "PROCESSING",
    inserted = "INSERTED"
}

export interface Candidate {
    fullName: string,
    id: string,
    examHour: number
    status: Status
}

export interface CandidatesContextInterface {
    candidates: Candidate[] | null,
    setCandidates: React.Dispatch<React.SetStateAction<Candidate[] | null>>,
}