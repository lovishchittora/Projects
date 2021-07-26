function getcovidinfo() {
    fetch('https://api.covid19india.org/data.json')
        .then((apidata) => {
            return apidata.json();
        })
        .then((jsdata) => {
            console.log(jsdata);
            var i = 1;
            var states = [];
            var active = [];
            var recovered = [];
            var deaths = [];
            var confirmed = [];
            var length = jsdata.statewise.length;
            document.getElementById('Confirmed').innerHTML = jsdata.statewise[0].confirmed;
            document.getElementById('Active').innerHTML = jsdata.statewise[0].active;
            document.getElementById('Recovered').innerHTML = jsdata.statewise[0].recovered;
            document.getElementById('Deaths').innerHTML = jsdata.statewise[0].deaths;
            setTimeout(() => {
                for (i = 1; i < 38; i++) {
                    states.push(jsdata.statewise[i].state);
                    active.push(jsdata.statewise[i].active);
                    recovered.push(jsdata.statewise[i].recovered);
                    confirmed.push(jsdata.statewise[i].confirmed);
                    deaths.push(jsdata.statewise[i].deaths);
                }
                getchart(states, active, recovered, confirmed, deaths);
            }, 2000)


        }).catch((error) => {
            console.log(`Error is:${error}`);
        })


    // states.push(jsdata.statewise[1].state)
    // console.log(states);
}
const getchart = (states, active, recovered, confirmed, deaths) => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: states,
            datasets: [
                {
                    label: 'Confirmed Cases',
                    data: confirmed,
                    borderColor: 'rgb(75, 192, 192)',
                    minBarLength: 100,
                    fill:'true',
                }, {
                    label: 'Recovered Cases',
                    data: recovered,
                    borderColor: 'rgb(0,25,21)',
                    minBarLength: 100,
                    fill:'true',
                },{
                    label: 'Death Cases',
                    data: deaths,
                    borderColor: 'rgb(255,0,0)',
                    minBarLength: 100,
                }]
        },
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Statewise chart of Recovered,deaths and confirmed cases',
                fontSize:50,
              }
            }
          },
        
    });
}

getcovidinfo();