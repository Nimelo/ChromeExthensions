
/**/
function DateHelper(){
  
}

/**/
DateHelper.numberOfDays = function(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
};
   
   
/**/ 
DateHelper.prepareNamesYear = function(year){
  var names = [];
    
  for(i = 1; i <= 12; i++){
    for(j = 1; j <= DateHelper.numberOfDays(year, i); j++){
      names.push("!" + year.toString() + "-" + i.toString() + "-" + j.toString() + ".dat");
    }
  }
  
  return names;
};

/**/ 
DateHelper.prepareNamesMonth = function(year, month){
  var names = [];
  
  for(j = 1; j <= DateHelper.numberOfDays(year, month); j++){
      names.push("!" + year.toString() + "-" + month.toString() + "-" + j.toString() + ".dat");
  }
  
  return names; 
};