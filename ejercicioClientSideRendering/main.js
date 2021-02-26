function convert_to_list(lista) {
  let tabla = document.getElementById("events");
  let count = 1;
  for (let evento of lista) {
    let tr = document.createElement('tr');
    let td_squirrel = document.createElement('td');
    let td_sublist = document.createElement('td');
    let th_number = document.createElement('th');
    td_squirrel.textContent = evento['squirrel'].toString();
    td_sublist.textContent = evento['events'].toString();
    th_number.textContent = (count++).toString();
    tr.appendChild(th_number);
    tr.appendChild(td_sublist);
    tr.appendChild(td_squirrel);
    tr.style.backgroundColor = evento['squirrel'] ? "#ffcccb" : "#ffffff";
    tabla.appendChild(tr);
  }
  
}

function convert_to_table(lista,table_id,one,two,needs_hlight) {
  let tabla = document.getElementById(table_id);
  let count = 1;
  for (let item of lista) {
    let tr = document.createElement('tr');
    let td_one = document.createElement('td');
    let td_two = document.createElement('td');
    let th_number = document.createElement('th');
    td_one.textContent = item[one].toString();
    td_two.textContent = item[two].toString();
    th_number.textContent = (count++).toString();
    tr.appendChild(th_number);
    tr.appendChild(td_one);
    tr.appendChild(td_two);
    tr.style.backgroundColor = intem[two] && needs_hlight ? "#ffcccb" : "#ffffff";
    tabla.appendChild(tr);
  }
  calcular_todos_los_mcc(lista);
}

function calcular_mcc(tp,tn,fp,fn) {
  return (tp*tn-fp*fn)/((tp+fp)*(tp+fn)*(tn+fp)*(tn+fn))**(0.5);
}

function calcular_tp_fn(lista) {
  let map_events = new Map();
  let count = 0;
  for (let item of lista) {
    let squirrel = item["squirrel"];
    for(let event of item["events"]) {
      let av = map_events.get(event);
      if(av) {
        if(squirrel) {
          map_events.set(event,[av[0]+1,av[1]+1]);
        }
        else {
          map_events.set(event,[av[0]+1,av[1]]);
        }
      }
      else{
        count=count+1;
        //el primer elemento de la lista es el número total de ocurrencias del evento, el segundo es el número de total de ocurrencias donde squirrel = true
        if(squirrel) {
          map_events.set(event,[1,1]);
        }
        else {
          map_events.set(event,[1,0]);
        }
      }
    }
  }
  return map_events;
}

function calcular_todos_los_mcc(lista) {
  let size = lista.length;
  let squirrel_size = 5;//acabar
  let map_events = calcular_tp_fn(lista);
  map_events.forEach( (value,key,map) => {
    let tp = value[1];
    let fn = value[0] - tp;
    let tn = size+tp-squirrel_size-value[0];
    let fp = squirrel_size - tp;
    map.set(key,calcular_mcc(tp,tn,fp,fn));
  });
  map_events.forEach( (value,key) => {console.log(value,key)});
}

//la conciencia depende del lenguaje


let url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";
fetch(url).then(res => res.json()).then(res => convert_to_table(res,"events","events","squirrel",true));
calcular_todos_los_mcc(lista);
convert_to_table(res,"cor_events","events","squirrel",true)