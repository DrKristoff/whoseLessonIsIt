window.App = {};

App.entry = {};

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

 // ID of the Google Spreadsheet
 var spreadsheetID = "1-a0tIP5reykEcvHlOAszVQwBI2J9Tl-cG_M7GtWstoA";
 
 // Make sure it is public or set to Anyone with link can view 
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
 
$.getJSON(url, function(data) {
 
  App.entry = data.feed.entry;
  
  App.dates = [];
  App.lessonNumber = [];
  App.teacher = [];
  App.notes = [];
  App.lessonName = [];
  App.lessonLink = [];
 
  $(App.entry).each(function(){
    App.dates.push(this.gsx$date.$t);
    App.lessonNumber.push(this.gsx$lessonnumber.$t);
    App.teacher.push(this.gsx$teacher.$t);
    App.notes.push(this.gsx$notes.$t);
    App.lessonName.push(this.gsx$lessonname.$t);
    App.lessonLink.push(this.gsx$lessonlink.$t);
      });
      
  App.update = function() {
    var indexValue = App.dates.indexOf(formatDateForComparison(targetDate));
    console.log("Index Found: " + indexValue);
    
    //$('#targetDate').html(formatDateString(targetDate));
    $('#nextLessonDate').html(formatDateString(getNextLessonDate())); 
    
    //remove teacher classes from card Title
    $('#cardTitle').removeClass('teacher-Bryce');
    $('#cardTitle').removeClass('teacher-Ryan');
    $('#cardTitle').removeClass('teacher-Rene');
    $('#cardTitle').addClass('teacher-' + App.teacher[indexValue]);
    
    //update Lesson Tagline
    $('#lessonTagline').html(App.lessonName[indexValue]);
    
    //update Lesson Number
    $('#lessonNumberHeader').html("Lesson " + App.lessonNumber[indexValue]);
    
    //update Lesson Link
    $('#lessonLink').attr("href",App.lessonLink[indexValue]) ;
  };
  
  App.update();  
 
 });

var targetDate = new Date();  //sets targetDate to today when first loaded

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

function formatDateForComparison(date){
  return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear(); 
}













 