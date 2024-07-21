/// <reference types = "../@types/jquery"/>

async function displayAll(){
    let respons = await fetch("http://localhost:3000/transactions")
    let data = await respons.json()
    let contain = ``;
    for(let i = 0 ; i < data.length ; i++)
    {
        let arr = Object.values(data[i])
        let responsC = await fetch(`http://localhost:3000/customers?id=${arr[1]}`)
        let dataC = await responsC.json()
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
    document.getElementById("table").innerHTML += contain;
}
displayAll()

$("#Sid").on("click" , function(){
    getByAmount($("#ID").val())
})
$("#Sname").on("click" , function(){
    getByName($("#name").val())
})


async function getByAmount(amount){
    let contain = ``;
    let responsC = await fetch(`http://localhost:3000/transactions?amount=${amount}`)
    let dataC = await responsC.json()
        
    for(let i = 0 ; i < dataC.length ; i++)
    {
        
        if(amount != dataC[i]['amount'])
        {
            displayAll()
            break;
        }
        else
        {    
            let respons = await fetch(`http://localhost:3000/customers?id=${dataC[i]['customer_id']}`)
            let data = await respons.json()
            let arr = Object.values(dataC[i])
            console.log(arr)
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
    }
    
    document.getElementById("table").innerHTML = 
    `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
        </tr>
    `
    document.getElementById("table").innerHTML += contain;
    
}

async function getByName(name){
    changeData(chart , [] , name , [])
    let contain = ``;
    try {
        let responsC = await fetch(`http://localhost:3000/customers?name=${name}`)
        let dataC = await responsC.json()
        garph(dataC[0]["id"], dataC[0]["name"])
        let respons = await fetch(`http://localhost:3000/transactions?customer_id=${dataC[0]['id']}`)
        let data = await respons.json();
        
        if(name != '')
        {
            for(let i = 0 ; i < data.length ; i++)
            {
                
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
        }
        else
            displayAll()
            
    } catch (error) {
        displayAll()
    }
    document.getElementById("table").innerHTML = 
    `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
        </tr>
    `
    document.getElementById("table").innerHTML += contain;

}


let data , chart
async function garph(id , name){
    let respons = await fetch(`http://localhost:3000/transactions?customer_id=${id}`)
    data = await respons.json()
    changeData(chart , data.map(row => row.date) , name , data.map(row => row.amount))
}

function changeData(chart, labels, label ,newData) {
    chart.data.labels = labels;
    chart.data.datasets[0].label = label;
    chart.data.datasets[0].data = newData;
    chart.update();
}

(()=>{
const ctx = document.getElementById('myChart');

chart = new Chart(ctx, {
    type: 'bar',
    data: {
    labels: [],
    datasets: [{
        label: '# of Votes',
        data: [],
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
})()
