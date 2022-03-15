const CONFIG = {
    spreadsheetId: '10wjzgRPk6R0pBvOLQyRUDQR_-IUrO0BHG_0v-xoDw_M',
    spreadsheetName: 'Blad1'
}

async function getData() {
    let res = await fetch(`https://opensheet.elk.sh/${CONFIG.spreadsheetId}/${CONFIG.spreadsheetName}`)
    return await res.json();
}

function gegevensOphalen(data) {
    let main = document.querySelector('main');

    console.log(data);

    data.forEach(item => {
        let container = document.createElement('article');

        let naam = document.createElement('h2');
        naam.textContent = item['Naam'];

        let smaak = document.createElement('h3');
        smaak.textContent = item['Smaak'];

        container.appendChild(naam);
        container.appendChild(smaak);

        main.appendChild(container);
    })

}

if (document.querySelector('main')) {
    getData()
        .then(data => {
            gegevensOphalen(data);
        })
}