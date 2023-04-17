class Collection {

    constructor(title, serieArray = []) {
        this.title = title;
        this.serieArray = serieArray;
    }

    addSerie(serie) {
        this.serieArray.push(serie);
    }

    sortByTitle() {
        return this.serieArray.sort((serie1, serie2) => serie1.compareByTitle(serie2))
    }

    static fromObjectArray(title, objectArray) {
        const newCollection = new Collection(title);
        for (let i = 0; i < objectArray.length; i++) {
            const serieObject = objectArray[i];
            const newSerie = Serie.fromTodoObject(serieObject);
            newCollection.addSerie(newSerie);
        }
        return newCollection;
    }

}