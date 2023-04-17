class DataService {

    static getSerie() {
        return fetch('https://6436c1b18205915d34fc1963.mockapi.io/series')
            .then(resp => resp.json());

    }

    static putSerie(serie) {
        console.log('sono nella put', serie)
        const jsonSerie = JSON.stringify(serie.toDbModel());
        return fetch('https://6436c1b18205915d34fc1963.mockapi.io/series' + serie.id, { method: "PUT", body: jsonSerie, headers: { 'content-type': 'application/json' } })
            .then(resp => resp.json());
    }

}