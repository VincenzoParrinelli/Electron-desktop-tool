export interface Candidate {
    fullName: string,
    phoneNumber: string,
    id: string,
    registrationDate: string,
    examHour: number
}

export interface CandidatesContextInterface {
    candidates: Candidate[] | null,
    setCandidates: React.Dispatch<React.SetStateAction<Candidate[] | null>>,
}