import { DirectiveBoard, DisciplinaryCourt } from "./plate.model";

export class Vote {
    constructor(
        public directiveBoard: DirectiveBoard,
        public districtDirectiveBoard: DirectiveBoard,
        public disciplinaryCourt: DisciplinaryCourt,
        public registerDate: Date,
        public user?: Object
    ) {

        this.directiveBoard = directiveBoard;
        this.districtDirectiveBoard = districtDirectiveBoard;
        this.disciplinaryCourt = disciplinaryCourt;
        this.registerDate = registerDate;
        this.user = user; 
        
    }
}