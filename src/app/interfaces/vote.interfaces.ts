import { DisciplinaryCourt, DirectiveBoard } from '../models/plate.model';

export interface Body{
    name: string,
    plates: DisciplinaryCourt[] | DirectiveBoard []
}