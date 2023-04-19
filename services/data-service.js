class DataService {

    // static DATA_URL = 'https://6436c1b18205915d34fc1963.mockapi.io/series'; //variabile statica ( la usiamo per non scrivere tutto il link)

    static getSerie() {
        return fetch('https://6436c1b18205915d34fc1963.mockapi.io/series')
            .then(resp => resp.json());

    }

    static putSerie(serie) {
        console.log('sono nella put', serie)
        const jsonSerie = JSON.stringify(serie.toDbModel());
        return fetch('https://6436c1b18205915d34fc1963.mockapi.io/series' + serie.id, { method: "PUT", headers: { 'content-type': 'application/json' }, body: JSON.stringify(serie)})
        .then(resp => resp.json());
    }

}