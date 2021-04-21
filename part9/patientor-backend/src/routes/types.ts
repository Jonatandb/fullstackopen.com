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
    entries: IEntry[]
}

export type NonSensitivePatinent = Omit<IPatient, 'ssn'>;

export type NewPatinent = Omit<IPatient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEntry {
}

export type PublicPatient = Omit<IPatient, 'ssn' | 'entries'>;
