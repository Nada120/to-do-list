
const fs = require('fs')
const toDo = fs.readFileSync("todo.json", "utf8");
const lists = JSON.parse(toDo);
const { program } = require("commander");

function checkStauts(stauts) {
  switch(stauts) {
    case "toDo": {
      return true;
    }
    case "onProgress": {
      return true;
    }
    case "Done": {
      return true;
    }
    default: {
      console.log("THERE IS ERROR \n");
      return false;
    }
  }

} 

function add({title , stauts}){
  if (checkStauts(stauts)) {
    const newList = {
      id:Date.now(),
      title, 
      stauts,
    }
    lists.push(newList)
    fs.writeFileSync("todo.json" , JSON.stringify(lists , null , 2))
  }
}

function edit({id, title, stauts}) {
  let newlist;
  console.log(stauts);
  if (checkStauts(stauts)) {
    newlist = lists.map(  
      item => +id === item.id ? 
      {
        id: item["id"],
        title,
        stauts
      } : item 
    );
    fs.writeFileSync("todo.json" , JSON.stringify(newlist , null , 2))
  }
  
}

function del({id, title, stauts}) {
  newlist = lists.filter(item => +id !== item.id);
  fs.writeFileSync("todo.json" , JSON.stringify(newlist , null , 2))

}

program
  .name('TO-DO')
  .description('App with node js')
  .version('1.1.0');

program.command('add') 
  .option('-t , --title <string>', 'title of to do list')
  .option('-s , --stauts <string>' , 'stauts of to do list')
  .action(add)

program.command('edit') 
  .option('-i , --id <string>', 'id of to do list')
  .option('-t , --title <string>', 'title of to do list')
  .option('-s , --stauts <string>' , 'stauts of to do list')
  .action(edit)  

program.command('delete') 
  .option('-i , --id <string>', 'id of to do list')
  .action(del)  

program.parse(); 
