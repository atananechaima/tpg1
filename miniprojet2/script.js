
var list = document.getElementById('side')
function divClecked(e){
    let httpReq=new XMLHttpRequest();
    httpReq.open("GET","https://api.covid19api.com/dayone/Country/"+e.target, true);
}
let httpReq=new XMLHttpRequest()
httpReq.open("GET","https://api.covid19api.com/countries" , true);
httpReq.onreadystatechange=function(){
    if(httpReq.readyState==4 && httpReq.status==200){
        let resp=JSON.parse(httpReq.response)
        resp.forEach(e=>{
            let M=document.createElement("div");
            M.setAttribute('id',e.IS02);
            M.innerHTML=e.Country;
            M.addEventListener("click",country_click);
            list.appendChild(M);
        
            M.style.backgroundColor="#2ecc71";
            M.style.marginTop="0.05cm";
            M.onmouseover=function(){
                M.style.backgroundColor="blue";
                M.style.fontWeight="bold";
            }
            M.onmouseover=function(){
                M.style.backgroundColor="#2ecc71";
                M.style.fontWeight="normal";
            
            }

        })
    }
}
httpReq.send();

function country_click(e2){
    var name_country = e2.target.innerHTML;
    var httpReq2 = new XMLHttpRequest();
    httpReq2.open("GET","https://api.covid19api.com/dayone/country/"+name_country,true);
    var tab_conf=[];
    var tab_gueri=[];
    var tab_mort=[];
    var tab_actif=[];
    var tab_date=[];
    httpReq2.onreadystatechange=function(){
        if(httpReq2.readyState==4 && httpReq2.status==200){
            let resp2=JSON.parse(httpReq2.response)
            for (let i=0;i<resp2.length; i++){
                tab_conf.push(resp2[i].Confirmed);
                tab_gueri.push(resp2[i].Recovered);
                tab_mort.push(resp2[i].Deaths);
                tab_actif.push(resp2[i].Active);
                tab_date.push(resp2[i].Date.slice(5,10));
         }
var ctx = document.getElementById('myChart').getContext('2d');
            if(window.bar!=undefined)
            window.bar.destroy();
            window.bar = new Chart (ctx, {

                type: 'line',

                data: {
                    labels:  tab_date,

                    datasets: [
                        {

                        label: 'CONFIRMED',
                        data: tab_conf ,  
                        backgroundColor: ['rgb(107, 99, 255,0.2)'],
                        borderColor: ['blue',],
                    
                    
                    },
                        
                        {label: 'RECOVERED',
                        data: tab_gueri,
                        backgroundColor: ['rgb(0, 252, 46,0.2)'],
                        borderColor: ['green',]},
                        
                        {label: 'DEATHS',
                        data: tab_mort,
                        backgroundColor: ['rgb(252, 0, 50,0.2)'],
                        borderColor: ['red',] },
                    
                    
                        {label: 'ACTIVE',
                        data: tab_actif,
                        backgroundColor: ['rgb(244, 252, 0,0.2)'],
                        borderColor: ['yellow',] }
                    
                    
                    
                    ]
                },
                options: {      title: {
                                display: true,
                                text:  name_country ,
                            },
            
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
                                                    

    }

}
httpReq2.send();
}