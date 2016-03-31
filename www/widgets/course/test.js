app.directive('courseTest', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'course/test.html',
      link: function(scope, element, attrs) {
          
      //placeholder for all the users courses, get from db
      //the current courseobject, get from db
          scope.course = {
              name: "Web development",
              description: "Communication for Development is an interdisciplinary field of study and practice, combining studies on culture, communication and development and integrating them with practical fieldwork. It explores the use of communication – both as a tool and as a way of articulating processes of social change – within the contexts of globalisation.",
              start: "16-03-09",
              end: "16-06-04",
              assignments: [{
                  name: "assigment 1",
                  deadline: "datum"
              }, {
                  name: "assigment 2",
                  deadline: "date"
              }],
              messages: [{
                  title: "assigment 1",
                  content: "test content",
                  creator: "teacher", //obj?
                  date: "datum"
              }, {
                  title: "assigment 1",
                  content: "test content",
                  creator: "teacher", //obj?
                  date: "datum"
              }],
              teaching: [{ //contacts and info
                  name: "Teacher One", //obj?
                  role: "teacher",
                  profile: "teacherone"
              }, {
                  name: "Teacher Two", //obj?
                  role: "admin",
                  profile: "teachertwo"
              }],
              resources: [{ //resources linked to course? obj?
                  name: "The resource name",
                  creator: "Teacher One" //obj?
              }, {
                  name: "The resource name",
                  creator: "Teacher Two" //obj?
              }],
              students: [{ //contacts and info
                  name: "Student One", //obj
              }, {
                  name: "Student Two", //obj?
              }]        
              
              //TODO: 
              //display changes in view (notifications)
              //Progress
          };
      }
    };
  }
]);