window.App = {};

App.entry = {};

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

 // ID of the Google Spreadsheet
 var spreadsheetID = "1-a0tIP5reykEcvHlOAszVQwBI2J9Tl-cG_M7GtWstoA";
 
 // Make sure it is public or set to Anyone with link can view 
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
 
//var lessonData = https://spreadsheets.google.com/feeds/list/0Aqglj65pqAwmdEh4a1otT3lmYnN0TGV1Q2JkdndVUnc/od6/public/basic?hl=en_US&alt=json;

$.getJSON(url, function(data) {
 
  App.entry = data.feed.entry;
  
  App.dates = [];
  App.lessonNumber = [];
  App.teacher = [];
  App.notes = [];
 
  $(App.entry).each(function(){
    // Column names are name, age, etc.
    App.dates.push(this.gsx$date.$t);
    App.lessonNumber.push(this.gsx$lessonnumber.$t);
    App.teacher.push(this.gsx$teacher.$t);
    App.notes.push(this.gsx$notes.$t);
      });
 
 });

var targetDate = new Date();  //sets targetDate to today when first loaded

App.update = function() {
  $('#targetDate').html(formatDateString(targetDate));
  $('#nextLessonDate').html(formatDateString(getNextLessonDate())); 
};

App.nextWeek = function(){
  targetDate.setDate(targetDate.getDate()+7);
  this.update();
}

App.previousWeek = function(){
  targetDate.setDate(targetDate.getDate()-7);
  this.update();
}

function getNextLessonDate(){
  var nextLessonDate = new Date();
   if (targetDate.getDay() != 0){
     nextLessonDate.setDate(targetDate.getDate()+(7 - targetDate.getDay()));
     return nextLessonDate;
   }
   else
   {
     return targetDate;
   }
}

function formatDateString(date){
  return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

App.update();











 