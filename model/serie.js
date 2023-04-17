class Serie {

    constructor(title, creator, seasons, isComplete, upVotes, downVotes, imageURL, id) {
        this.title = title;
        this.creator = creator;
        this.seasons = seasons;
        this.isComplete = isComplete;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.imageURL = imageURL;
        this.id = id;

    }

    // set creationUpvotes(newUpVotes){

    // }

    // set creationDownvotes(newDownVotes){

    // }

    compareByTitle(serie2) {
        return this.title.localeCompare(serie2.title);
    }

    static fromSerieObject(serieObject) {
        return new Serie(serieObject.title, serieObject.creator, serieObject.seasons, serieObject.isComplete, serieObject.upVotes, serieObject.downVotes, serieObject.imageURL, serieObject.id);
    }



    toDbModel() {
        const dbModel = {
            title: this.title,
            creator: this.creator,
            seasons: this.seasons,
            isComplete: this.isComplete,
            upVotes: this.upVotes,
            downVotes: this.downVotes,
            imageURL: this.imageURL,
            id: this.id
        }
        return dbModel;
    }
}