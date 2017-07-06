(function (global) {
    var app = global.app = global.app || {};

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();
		
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
		
		app.getUser = function() {
			//navigator.notification.alert($("#birth").find("input").val());
			//navigator.notification.alert($("#bolum").html().split(":")[1].trim());
			var department = $("#department").val();
			var application = $("#dropdown").val();
			var name = $("#name").val().trim();
			var gender = $("#dropdown2").val();
			var birth = $("#birth").find("input").val();
			var marriage = $("#dropdown3").val();
			var phone = $("#phone").find("input").val().trim();
			var mail = $("#mail").find("input").val();
			var educationStatus = $("#dropdown4").val();
			var healthStatus = $("#dropdown5").val();
			var reason = $("#dropdown6").val();
            
            if(!(department && name && phone && birth)) {
				navigator.notification.alert("Kişisel bilgilerinizde eksiklikler var.", function(){}, "HATA", 'OK');
            }
            else {
                var arr = [department, application, name, gender, birth,marriage, phone,mail,educationStatus, healthStatus,reason];
                var res = JSON.stringify(arr);
                var url = "http://r8app.com/statdb/insertdetails.php";
                $.get(url, {details: res}, function(data,status){
                    var obj = parseInt(data);
                	app.questionService.viewModel.detailId = obj;
                });
                window.location.hash = "#questions";
            }
            
        }
			
    }, false);
	
	
})(window);