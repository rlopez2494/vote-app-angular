export class DirectiveBoard {
    constructor(
        public president: string,
        public vicepresident: string,
        public treasurer: string,
        public generalSecretary: string
    ) {
        this.president = president;
        this.vicepresident = vicepresident;
        this.treasurer = treasurer;
        this.generalSecretary = generalSecretary;
    }
}

export class DisciplinaryCourt {
    constructor(
        public president: string,
        public vicepresident: string,
        public generalSecretary: string
    ) {
        this.president = president;
        this.vicepresident = vicepresident;
        this.generalSecretary = generalSecretary;
    }
}

export class Plate {
    constructor(
        public directiveBoard: DirectiveBoard,
        public districtDirectiveBoard: DirectiveBoard,
        public disciplinaryCourt: DisciplinaryCourt,
        public _id?: string,
    ) {
        this.directiveBoard = directiveBoard;
        this.disciplinaryCourt = disciplinaryCourt;
        this.districtDirectiveBoard = districtDirectiveBoard;
        this._id = _id;
    }
}