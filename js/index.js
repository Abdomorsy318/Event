/// <reference types = "../@types/jquery"/>

async function displayAll(){
    let respons = await fetch("http://localhost:3000/transactions")
    let data = await respons.json()
    let contain = ``;
    for(let i = 0 ; i < data.length ; i++)
    {
        
        let arr = Object.values(data[i])
        box = ``
        for(let x = 0 ; x  < 4 ; x++)
        {
            let responsC = await fetch(`http://localhost:3000/customers?id=${Object.values(arr)[1]}`)
            let dataC = await responsC.json()
            if(x !== 1)           
            {   
                    box += 
                    `
                        <td>${arr[x]}</td>   
                    `
            }
            else
            {
                box += 
                    `
                        <td>${dataC['0']['name']}</td>   
                    `
            }
        }
        contain +=
        `<tr>${box}</tr>
        `
    }
    document.getElementById("table").innerHTML = contain;
}
displayAll()


$("#ID").on("keyup" , async function(){
   
    let contain = ``;
    let responsC = await fetch(`http://localhost:3000/transactions?customer_id=${this.value}`)
    let dataC = await responsC.json()
    for(let i = 0 ; i < dataC.length ; i++)
    {
        if(this.value != dataC[i]['customer_id'])
        {
            displayAll()
            break;
        }
        else
        {
            
        let respons = await fetch(`http://localhost:3000/customers?id=${dataC[i]["customer_id"]}`)
        let data = await respons.json()
        let arr = Object.values(dataC[i])
        box = ``
        for(let x = 0 ; x  < 4 ; x++)
        {
            
            if(x !== 1)           
            {   
                    box += 
                    `
                        <td>${arr[x]}</td>   
                    `
            }
            else
            {
                box += 
                    `
                        <td>${data['0']['name']}</td>   
                    `
            }
        }
        contain +=
        `<tr>${box}</tr>
        `
    }
    document.getElementById("table").innerHTML = contain;
        }
})


$("#name").on("keyup" , async function(){
   
    let contain = ``;
    let responsC = await fetch(`http://localhost:3000/customers?name=${this.value}`)
    let dataC = await responsC.json()
    for(let i = 0 ; i < dataC.length ; i++)
    {
        let respons = await fetch(`http://localhost:3000/transactions?customer_id=${dataC[i]['id']}`)
        let data = await respons.json();
        let arr = Object.values(data[i])
        box = ``
        for(let x = 0 ; x  < 4 ; x++)
        {
            
            if(x !== 1)           
            {   
                    box += 
                    `
                        <td>${arr[x]}</td>   
                    `
            }
            else
            {
                box += 
                    `
                        <td>${dataC['0']['name']}</td>   
                    `
            }
        }
        contain +=
        `<tr>${box}</tr>
        `
    }
    document.getElementById("table").innerHTML = contain;
    }
)


let dat
async function garph(){
    let respons = await fetch("http://localhost:3000/transactions")
    dat = await respons.json()
    creatChart(dat)
}
garph()




const ctx = document.getElementById('myChart');
function creatChart(date){
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: date.map(row => row.date),
      datasets: [{
        label: '# of Votes',
        data: date.map(row => row.amount),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


