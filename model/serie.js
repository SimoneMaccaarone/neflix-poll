class Serie {

    constructor(title, creator, seasons, isComplete = true, upVotes = 0, downVotes = 0, imgURL, id) {
        this.title = title;
        this.creator = creator;
        this.seasons = seasons;
        this.isComplete = isComplete;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.imgURL = imgURL;
        this.id = id;

        if (id !== undefined) {
            this.id = id;
        }
    }


    // set creationUpvotes(newUpVotes){

    // }

    // set creationDownvotes(newDownVotes){

    // }

    // compareByTitle(serie2) {
    //     return this.title.localeCompare(serie2.title);
    // }
    static fromSerieObject(serieObject) {
        return new Serie(serieObject.title, serieObject.creator, serieObject.seasons, serieObject.isComplete, serieObject.upVotes, serieObject.downVotes, serieObject.imgURL, serieObject.id);
    }
    compareByRating(serie) {
        const myUpPoints = this.upVotes * 2;
        const myDownPoints = this.downVotes;
        const myRating = myUpPoints - myDownPoints;

        const otherUpPoints = serie.upVotes * 2;
        const otherDownPoints = serie.downVotes;
        const otherRating = otherUpPoints - otherDownPoints;

        return otherRating - myRating;

    }

    toDbModel() {
        const dbModel = {
            title: this.title,
            creator: this.creator,
            seasons: this.seasons,
            isComplete: this.isComplete,
            upVotes: this.upVotes,
            downVotes: this.downVotes,
            imgURL: this.imgURL,
            id: this.id
        }
        return dbModel;
    }
}