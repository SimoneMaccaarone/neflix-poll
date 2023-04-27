let collectionSeries = new Collection('NETFLIX');

displaySeries();    // display => la funzione che mostra tutto


DataService.getSerie().then(data => {
    fillSerieArrayFromServer(data);
    displaySeries();
    stopLoading();
}).catch(err => {
    // const errorMessage = document.getElementById('error-message');

    // const errorNode = document.createTextNode('accidenti, si è verificato un errore');

    // errorMessage.appendChild(errorNode);
    displayErrorMessage('accidenti, si è verificato un errore' + err.message);
    stopLoading();
})

function fillSerieArrayFromServer(data) {
    for (let i = 0; i < data.length; i++) {
        const object = data[i];

        const serie = new Serie(object.title, object.creator, object.seasons, object.isComplete, object.upVotes, object.downVotes, object.imgURL, object.id);
        collectionSeries.addSerie(serie);
    }
}//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬


function displaySeries() {               //è globale, quindi la vede
    console.log(collectionSeries);

    const collectioSeriesTitle = document.getElementById('collection-name');
    const collectionSeriesUl = document.getElementById('collection-listUl');
    collectionSeriesUl.classList.add('class-collectioUl');

    const titleNode = document.createTextNode(collectionSeries.title);
    collectioSeriesTitle.innerHTML = '';        // pulisci tutto quello che ce dentro a list title
    collectioSeriesTitle.appendChild(titleNode);

    collectionSeriesUl.innerHTML = '';

    for (let i = 0; i < collectionSeries.serieArray.length; i++) {
        const serie = collectionSeries.serieArray[i];


        // ------ Creazione dell' elenco ------
        const newLi = document.createElement('li');
        newLi.classList.add('serie-li');

        //--------------------------------------------------------------------

        createIMGOfSerie(serie);        //----------- IMG ----------

        createTitleOfSerie(serie);      //---------- TITLE ---------

        createCreatorOfSerie(serie);    //--------- CREATOR --------

        createSeasonsOfSerie(serie);    //--------- SEASONS --------

        createIsCompleteOfSerie(serie); //------- ISCOMPLETE -------

        createDivForVotes(serie);       //----- Div for Votes ------

        createUpVotesOfSerie(serie);    //-------- UP VOTES --------

        createDownVotesOfSerie(serie);  //------- DOWN VOTES -------

        //--------- APPEND CHILD --------

        newLi.append(createIMGOfSerie(serie));
        newLi.append(createTitleOfSerie(serie));
        newLi.append(createCreatorOfSerie(serie));
        newLi.append(createSeasonsOfSerie(serie));
        newLi.append(createIsCompleteOfSerie(serie));
        newLi.append(createDivForVotes(serie)); // newLi.append(createUpVotesOfSerie(serie)); // newLi.append(createDownVotesOfSerie(serie));

        collectionSeriesUl.appendChild(newLi);

    }
}

//---------- FUNCTION x SERIE ----------
function createIMGOfSerie(serie) {
    const imgTagIMG = document.createElement('img');
    imgTagIMG.classList.add('serie-img');
    imgTagIMG.src = serie.imgURL;

    return imgTagIMG;
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

    const creatorNode = document.createTextNode('Creator: ' + serie.creator);
    creatorSpan.appendChild(creatorNode);

    return creatorSpan;
}

function createSeasonsOfSerie(serie) {
    const seasonsSpan = document.createElement('span');
    seasonsSpan.classList.add('serie-seasons');

    const seasonsNode = document.createTextNode('Seasons: ' + serie.seasons);
    seasonsSpan.appendChild(seasonsNode);

    return seasonsSpan;
}

function createIsCompleteOfSerie(serie) {

    const isCompleteSpan = document.createElement('span');
    isCompleteSpan.classList.add('serie-isComplete');

    // condizione isComplete -> true= Completed \ false= Not Completed
    let completeString ;
    if (serie.isComplete === true) {
        completeString = 'Comleted';
    } else {
        completeString = 'In progress';
    }
    const isCompleteNode = document.createTextNode('Status: ' + completeString);

    isCompleteSpan.appendChild(isCompleteNode);

    return isCompleteSpan;
}
//--------------------------------------
// Up & Down Votes
function createUpVotesOfSerie(serie) {

    const upVotesButton = document.createElement('button');
    upVotesButton.classList.add('serie-upVotes-btn');

    const upVotesNode = document.createTextNode('👍');
    upVotesButton.addEventListener('click', (event) => counterUpVotesClicks(serie))


    upVotesButton.appendChild(upVotesNode);


    return upVotesButton;
}

function createDownVotesOfSerie(serie) {
    const downVotesButton = document.createElement('button');
    downVotesButton.classList.add('serie-downVotes-btn');

    const downVotesNode = document.createTextNode('👎');

    // const counterCliks = document.createElement('p')
    // const counterCliksText = document.createTextNode()
    downVotesButton.addEventListener('click', (event) => counterDownVotesClicks(serie))

    // counterCliks.appendChild(counterCliksText);
    downVotesButton.appendChild(downVotesNode);

    return downVotesButton;
}
//--------------------------------------

//---------- DIV For VOTES ----------
function createDivForVotes(serie) {
    const divForVotes = document.createElement('div');
    divForVotes.classList.add('div-ForVotes')

    divForVotes.appendChild(createUpVotesOfSerie(serie));
    divForVotes.appendChild(createDownVotesOfSerie(serie));

    return divForVotes
}

//------ COUNTER x UpVotes & DownVotes -----
function counterUpVotesClicks(serie) {

    serie.upVotes += 1;
    startLoading();
    DataService.putSerie(serie)
        .then(modififiedSerie => {
            startLoading();
            displaySeries();
        })

        .catch(error => {
            displayErrorMessage('Accidenti!, in questo momento non puoi votare');
        });
}

function counterDownVotesClicks(serie) {

    serie.downVotes += 1;
    
    startLoading();
    DataService.putSerie(serie)
        .then(modififiedSerie => {
            startLoading();
            displaySeries();
        })
        .catch(error => {
            displayErrorMessage('Accidenti!, in questo momento non puoi votare');
        });
}
//---------- Order by ... ----------
//            Title
function sortCollectionByTitle() {
    collectionSeries.sortByTitle();
    displaySeries();
}

function sortCollectionByUpVotes() {
    collectionSeries.sortByUpVotes();
    displaySeries();
}

function sortCollectionByDownVotes() {
    collectionSeries.sortByDownVotes();
    displaySeries();
}

function sortCollectionByRating() {
    collectionSeries.sortByRating();
    displaySeries();
}

//---------- Function for newSerie ----------
function saveNewSerie() {
    const imgURLInput = document.getElementById('img-input');
    const titleInput = document.getElementById('title-input');
    const creatorInput = document.getElementById('creator-input');
    const seasonsInput = document.getElementById('seasons-input');
    const isCompleteInput = document.getElementById('isComplete-input');

    const newSerieTitle = titleInput.value;
    const newSerieCreator = creatorInput.value;
    const newSerieSeasons = seasonsInput.value;
    const newSerieIsComplete = isCompleteInput.value;
    const newUpVotes = 0;
    const newDownVotes = 0;
    const newSerieImgUrl = imgURLInput.value;

    const newSerie = new Serie(newSerieTitle, newSerieCreator, newSerieSeasons, newSerieIsComplete, newUpVotes, newDownVotes, newSerieImgUrl);

    console.log(newSerie);

    DataService.postSerie(newSerie)
        .then(savedSerie => {
            stopLoading();
            newSerie.id = savedSerie.id;
            collectionSeries.addSerie(newSerie);
            displaySeries();
        })
    startLoading()
        .catch(err => displayErrorMessage('Accidenti!, non puoi salvare'));
    // collectionSeries.addSerie(newSerie);

    // displaySeries();
}

function displayErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    const errorNode = document.createTextNode(message);
    errorMessage.appendChild(errorNode);
}

function startLoading() {
    const loadingIcon = document.getElementById('loading-icon');
    loadingIcon.style.display = 'inline-block';
}

function stopLoading() {
    const loadingIcon = document.getElementById('loading-icon');
    loadingIcon.style.display = 'none';
}