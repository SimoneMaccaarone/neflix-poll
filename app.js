let collectionSeries = new Collection('NETFLIX Poll');

displaySeries();    // display => la funzione che mostra tutto


DataService.getSerie().then(data => {
    fillSerieArrayFromServer(data);
    displaySeries();
})

function fillSerieArrayFromServer(data) {
    for (let i = 0; i < data.length; i++) {
        const object = data[i];

        const serie = new Serie(object.title, object.creator, object.seasons, object.isComplete, object.upVotes, object.downVotes, object.id);
        collectionSeries.addSerie(serie);
    }
}//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬


function displaySeries() {               //è globale quindi la vede
    console.log(collectionSeries);

    const collectioSeriesTitle = document.getElementById('collection-name');
    const collectionSeriesUl = document.getElementById('collection-listUl');

    const titleNode = document.createTextNode(collectionSeries.title);
    collectioSeriesTitle.innerHTML = '';// pulisci tutto quello che ce dentro a list title
    collectioSeriesTitle.appendChild(titleNode);


    collectionSeriesUl.innerHTML = '';

    for (let i = 0; i < collectionSeries.serieArray.length; i++) {
        const serie = collectionSeries.serieArray[i];

        // creazione dell' elenco
        const newLi = document.createElement('li');
        newLi.classList.add('serie-li');


        createTitleOfSerie(serie);      //---------- TITLE ---------

        createCreatorOfSerie(serie);    //--------- CREATOR --------

        createSeasonsOfSerie(serie);    //--------- SEASONS --------

        createIsCompleteOfSerie(serie); //------- ISCOMPLETE -------

        createUpVotesOfSerie(serie);    //-------- UP VOTES --------

        // createDownVotesOfSerie(serie);  //------- DOWN VOTES -------



        //--------- APPEND CHILD --------

        newLi.append(createTitleOfSerie(serie));
        newLi.append(createCreatorOfSerie(serie));
        newLi.append(createSeasonsOfSerie(serie));
        newLi.append(createIsCompleteOfSerie(serie));
        newLi.append(createUpVotesOfSerie(serie));
        newLi.append(createDownVotesOfSerie(serie));

        collectionSeriesUl.appendChild(newLi);
    }
}


function createTitleOfSerie(serie) {

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('serie-title');

    const titleNode = document.createTextNode(serie.title);
    titleSpan.appendChild(titleNode);

    return titleSpan;
}

function createCreatorOfSerie(serie) {
    const creatorSpan = document.createElement('span');
    creatorSpan.classList.add('serie-creator');

    const creatorNode = document.createTextNode(serie.creator);
    creatorSpan.appendChild(creatorNode);

    return creatorSpan;
}

function createSeasonsOfSerie(serie) {
    const seasonsSpan = document.createElement('span');
    seasonsSpan.classList.add('serie-seasons');

    const seasonsNode = document.createTextNode(serie.seasons);
    seasonsSpan.appendChild(seasonsNode);

    return seasonsSpan;
}

function createIsCompleteOfSerie(serie) {
    const isCompleteSpan = document.createElement('span');
    isCompleteSpan.classList.add('serie-isComplete');

    const isCompleteNode = document.createTextNode(serie.isComplete);
    isCompleteSpan.appendChild(isCompleteNode);

    return isCompleteSpan;
}

function createUpVotesOfSerie(serie){
    const upVotesButton = document.createElement('button');
    upVotesButton.classList.add('serie-upVotes-btn')
    
    const upVotesNode= document.createTextNode('👍')
    upVotesButton.appendChild(upVotesNode);

    return upVotesButton;
}

function createDownVotesOfSerie(serie){
    const downVotesButton = document.createElement('button');
    downVotesButton.classList.add('serie-downVotes-btn')
    
    const downVotesNode= document.createTextNode('👎')
    downVotesButton.appendChild(downVotesNode);

    return downVotesButton;
}