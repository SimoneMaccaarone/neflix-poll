class DataService {

    static DATA_URL = 'https://6436c1b18205915d34fc1963.mockapi.io/series'; //variabile statica ( la usiamo per non scrivere tutto il link)

    static getSerie() {
        return fetch(this.DATA_URL)
            .then(resp => resp.json());

    }

    static putSerie(serie) {
        console.log('sono nella put', serie)

        const jsonSerie = JSON.stringify(serie.toDbModel());
            return fetch(this.DATA_URL+ '/' + serie.id, { method: "PUT", headers: { 'content-type': 'application/json' }, body: JSON.stringify(serie)})
        .then(resp => resp.json());
    }

    static postSerie(serie){
        const jsonSerie = JSON.stringify(serie);
        return fetch(this.DATA_URL , {method: 'POST', headers:{ 'content-type':'application/json'},body: jsonSerie})
        .then(resp => resp.json());
    }

}