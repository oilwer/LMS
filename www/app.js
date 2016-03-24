//app declaration and dependency injection
var app = angular.module("mongr", [
  "ngRoute",
  "ngResource",
  "ui.bootstrap"
]);

app.service('LoginService', function($http) {
      
    return {
        // call to login
        login : function(email, password) {
        
	        var data = {"email": email, "password": password};

	       // Makes API call w/ email and password
           //  return $http.get('/api/login/{"email": email, "password": password};
	        return $http.post("/api/login/", data).success(function(response, status) {
	            // console.log(response);            
	        });
	        
        },
        
        checkIfUserExists : function(email) {
        
	        var data = '{email: ' + '"' + email + '"' + '}';
	       // Makes API call w/ email 
           //  return $http.get('/api/user/{"email": email};
	        return $http.get("/api/user/" + data).success(function(status) {
	            // console.log(response);            
	        });       
        }, 
        
        resetPassword : function(email) {
        
	        var data = '{"email": ' + '"' + email + '"' + '}';
	       // Makes API call w/ email 
           //  return $http.get('/api/user/{"email": email};
           
           console.log("data", data);
           
	        return $http.put("/api/resetpassword/", data).success(function(status) {
	            // console.log(response);            
	        });       
        }
    }
    
});

app.service('SessionService', function($http) {

	return {
		//get session if user is logged in
		getSession : function() {
			return $http.get("/api/session").success(function(response) {
				//console.log(response);
			});
		}
	}
});
