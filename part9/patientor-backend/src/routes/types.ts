export interface IDiagnose {
  code: string
  name: string
  latin?: string
}

export interface IPatient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: string
    occupation: string
}

export type NonSensitivePatinent = Omit<IPatient, 'ssn'>;

export type NewPatinent = Omit<IPatient, 'id'>;