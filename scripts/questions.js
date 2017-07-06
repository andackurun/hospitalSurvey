(function (global) {
    var questionaireView, login,
        app = global.app = global.app || {};

    questionaireView = kendo.data.ObservableObject.extend({
		//login: app.loginService.viewModel,
		catid:"",
		valueResult:"",
		valueChecked:"",
		questionNo:"",
		questionId:"",
        detailId:"",
		getQuestion: function() {
			var that=this,
				url = "http://www.r8app.com/statdb/questions.php",
				hash = "4b5ff2ec1b6ae8332e090e49f7400b6a",
				catId = that.catid;
			$("#deneQuestion").empty();
			
			$.get(url, {ch:hash, cat:catId, eval:""}, function(data,status){
				if(status) {
					var obj = JSON.parse(data);
					that.questionNo = obj.length;
					that.valueResult = new Array();
					that.valueChecked = new Array();
					that.questionId = new Array();
					for(var i=0; i<obj.length-1; i++) {
						var list1 = $("<li>").text(obj[i].text);
					
						var list2 = $("<li>");
						for(var j=1; j<6; j++) {
							var lab1 = $("<label>");
							var img = $("<img>").attr('src', './styles/images/' + j +'.png');
							lab1.attr('for', obj[i].id+j);
							var input = $('<input type="radio">').attr({id:obj[i].id+j, name:i+1, value:j});
							
							input.click(function() {
								var e = $(this);
								var str = e.attr("name");
					            var num = parseInt(str);
								that.valueResult[num-1] = e.val();
								that.valueChecked[num-1] = true;
							
                            });
							var div = $('<div>').attr('class', "checkboxgroup");
							
							img.appendTo(lab1);
							lab1.appendTo(div);
							input.appendTo(div);
							list2.append(div);	
	                    }
						that.questionId[i] = obj[i].id;
						var unList = $("<ul>");
						unList.attr("class", "km-list");
						unList.append(list1);
						unList.append(list2);
						$("#deneQuestion").append(unList);
					}
					that.questionId[i] = obj[i].id;
					that.valueChecked = new Array();
					for(i=0; i<obj.length-1; i++) {
						that.valueChecked[i] = false;
                    }
					var newList = $("<li>").text(obj[i].text);
					var newList2 = $("<li>");
					var txt = $("<textarea>").attr({id:"comment", rows:4, style:"float:left; border:1px solid; width:100%; margin-left:10px;"});
					//label.append(txt);
					newList2.append(txt);
					var newunList = $("<ul>");
					newunList.attr("class", "km-list");
					newunList.append(newList);
					newunList.append(newList2);
					$("#deneQuestion").append(newunList);
					
					//$("#deneQuestion").append('<ul class="km-list"><li>' + obj[0].text+ '</li></ul>');
                }
            });
        },
		
		sendQuestion: function() {
			var that = this;
			var checked = true;
			for(var i=0; i<that.questionNo-1; i++) {
				checked = checked && that.valueChecked[i];
            }
			
			if(!checked) {
				navigator.notification.alert("Cevaplar Tamamlanmadı!", function(){}, "HATA", 'OK');
            }
			else {
				var rs = new Array();
				
				for(i=0; i<that.questionNo; i++) {
					arr = new Object();
					if(i===0) {
						arr.detail_id = that.detailId;
	                }
					else {
					
	                }
					 
					arr.question_id = that.questionId[i];
					if(i == that.questionNo-1) {
						arr.eval = document.getElementById("comment").value;
		                arr.type = "1";
                    }
					else {
						arr.eval = that.valueResult[i].toString();
		            	arr.type = "0";
					}
					rs[i] = arr;
                }
				var page = "http://www.r8app.com/statdb/insert.php";
		        var ress = JSON.stringify(rs);
				$.get(page, {ch:"", cat:"", eval:ress}, function(data,status) {
					if(status == "success") {
						navigator.notification.alert("Cevaplar başarıyla kaydedildi.", function(){window.location.hash="#tabstrip-home";
                        }, "BAŞARILI", 'OK');
                    }
                });  
            }
			
			
        }
		
        	
    });
	
	app.getResult = function(e) {
		var str = e.name;
            var num = parseInt(str);
            valueResult[num-1] = e.value;
		alert(e.value);
            //document.getElementById("deneme").innerHTML = num + " " + e.value;
            
            
            //document.getElementById("deneme").innerHTML = str.charAt(15) + " " + e.value;
        	
        }
	

    app.questionService = {
		onInit: function() {
			app.questionService.viewModel.getQuestion.apply(app.questionService.viewModel, []);
			// navigator.notification.alert("21");			
        },
        viewModel: new questionaireView()
    };
})(window);