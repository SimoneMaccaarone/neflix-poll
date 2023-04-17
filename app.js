let collectionSeries = new Collection('Netflix Poll of Simone');

displaySeries();    // display => la funzione che mostra tutto


DataService.getSeries().then(data => {
    fillSerieArrayFromServer(data);
    displaySeries();
})

function fillSerieArrayFromServer(data) {
    for (let i = 0; i < data.length; i++) {
        const object = data[i];

        const serie = new Serie(object.title, object.creator, object.seasons, object.isCompleted, object.upVotes, object.downVotes, object.id);
        collectionSeries.addSerie(serie);
    }
}//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬


function displaySeries() {               //è globale quindi la vede
    console.log(collectionSeries);

    const collectioSeriesTitle = document.getElementById('collection-name');
    const collectionSeriesUl = document.getElementById('collection-listUl');

    const titleNode = document.createElement(collectionSeries.title);
    collectioSeriesTitle.innerHTML = '';// pulisci tutto quello che ce dentro a list title
    collectioSeriesTitle.appendChild(titleNode);


    collectionSeriesUl.innerHTML = '';

    for (let i = 0; i < collectionSeries.serieArray.length; i++) {
        const serie = collectionSeries.serieArray[i];


            // creazione dell' elenco
        const newLi = document.createElement('li')
        newLi.classList.add('serie-li')
        









    }









}