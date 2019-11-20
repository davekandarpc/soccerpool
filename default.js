coreUrl = 'http://www.voorspeloranje.nl/webservice/json.php?';
var poolId = 3;

 $(document).on( "pagebeforeshow", "#your-pool-1", function( e ) {
		// Make search
		$.get(coreUrl + 'subject=Pools&actionType=getMyPools', function(data) {
			if (data.isError == 0) {
				for (var key in data.returnData) {
					if (data.returnData.hasOwnProperty(key)) {
						pool = data.returnData[key];
						
						// Do something with result
						$('#your-pool-1 .results').append('<div class="single-pool clearfix"><div class="single-pool-pic"><img src="images/single-pool-pic.jpg"></div><div class="single-pool_right"><div class="single-pool_name">' + pool.name + '</div><h2>Prijs:</h2><div class="single-pool_desc">' + pool.to_win + '</div></div></div><div class="ui-field-contain_result"><input type="text" name="textinput-1" id="textinput-1" placeholder="' + pool.contestersCount + ' deelnemers" value="" class="single-pool-txt"><a href="#poolPage" onclick="poolId=' + pool.id + '" class="btn btn_orange_light view_but doemee_but_font ">bekijk </a></div><div class="grayline"></div>');
					}
				}
			} else {
				alert('Show error');
				
			}
		}, 'json');
    });
    
$(document).on('pagebeforeshow', '#groepen', function() {
		$.get(coreUrl + 'subject=Groups&actionType=getAll', function(data) {
			for (var key in data.returnData) {
				if (data.returnData.hasOwnProperty(key)) {
					$('#rankings').append('<div class="ranking">' + data.returnData[key] + '</div>');
				}
			}
		}, 'json');
	});
	
	// Register form
	
    $(document).on("pageshow", "#create-account-1", function() {
		$("#registerForm").validate({
				errorPlacement: function(error, element) {					
					error.insertAfter(element);			
				},
				submitHandler: function(form) {
					$.get(coreUrl + 'subject=Users&actionType=add', $(form).serialize(), function(data) {
						if (data.isError == 0) {
							$.mobile.changePage('#dashboard');	
						} else {
							alert(data.Message);
						}
					}, 'json');
					
					return false;
				}
				
		});

	});


    $(document).on( "pageshow", "#poolPage", function( e ) {
    	urlObject = purl();
    	
    	
    	
					
		$('.join_pool').bind( "click", function(event, ui) {
			poolId = $('#poolId').attr('rel');
			$.get(coreUrl + 'subject=Pools&actionType=joinPool&poolId=' + $('#poolId').attr('rel'), function(data) {
				if (data.isError == 0) {
					$.mobile.changePage('#prediction_step_new');
				}
			}, 'json');
		});
		
		
    	$.get(coreUrl + 'subject=Pools&actionType=getPoolInfo&poolId=' + poolId, function(data) {
				if (data.isError == 0) {
					pool = data.returnData;
							
					// Do something with result
					$('#poolName').html(pool.name);
					$('#poolPrice').html(pool.to_win);
					$('#poolId').attr('rel', pool.id);
					$('#contestersCount').val(pool.contestersCount + ' deelnemers');
					
					if (pool.inPool == 1) {
						$('#makePrediction').attr('href', '#prediction_step_new').attr('onclick', 'poolId = ' + pool.id);
						$('.alreadyinpool').show();

						$('#predictionButton').show();
						
					} else {
						$('.join_pool').show();					
					}
					
					for (var key in data.returnData.contesters) {
						if (data.returnData.contesters.hasOwnProperty(key)) {
							contester = data.returnData.contesters[key];
							
							cssClass = '';
							if(contester.ranking == 1) {
								cssClass = 'current';
							} 
							if(contester.ranking == 2) {
								cssClass = 'next';
							} 
							$('#contesters').append('<li class="' + cssClass + '">' + contester.user_name + '</li>');
						}
					}
				} else {
					alert('Show error');
					
				}
			}, 'json');
    	
    });
    
	var searchData = { name: null,  firstLetter: null}
	
	$(document).on('pagebeforeshow', '#join_soccerpool_1', function() {
		$('#search').click(function(e){		    
			e.preventDefault();
			searchData.name = $('#nameField').val();
			searchData.firstLetter = $('#firstLetterField').val();
			
			$.mobile.changePage('#searchResults');
			
		    return false;
		});
		
		
		
    	$.get(coreUrl + 'subject=Pools&actionType=getPoolInfo&poolId=3', function(data) {
				if (data.isError == 0) {
					pool = data.returnData;
							
					// Do something with result
					$('.participants').html('Aantal deelnemers: ' + pool.contestersCount);
				}
		}, 'json');
	});
	
    $(document).on( "pagebeforeshow", "#searchResults", function( e ) {
    	if (typeof searchData != 'undefined') {
    		// Make search
			$.get(coreUrl + 'subject=Pools&actionType=search&name=' + searchData.name + '&firstLetter=' + searchData.firstLetter, function(data) {
				if (data.isError == 0) {
					for (var key in data.returnData) {
						if (data.returnData.hasOwnProperty(key)) {
							pool = data.returnData[key];
							
							// Do something with result
							$('#searchResults .results').append('<div class="ui-field-contain_result"><input type="text" name="textinput-1" id="textinput-1" placeholder="' + pool.name + '" value=""><a href="#poolPage" onclick="poolId=' + pool.id + '" class="btn btn_orange_light view_but">bekijk</a></div>');
						}
					}
				} else {
					alert('Show error');
					
				}
			}, 'json');
			
		}
    });


 $(document).on( "pageshow", "#create-soccerpool-1", function( e ) {
    $('form[name=poolCreate]').submit(function(e) {
		e.preventDefault();
		
		$.get(coreUrl + 'subject=Pools&actionType=createPool', $(this).serialize(), function(data) {
			poolId = data.poolId;
			
			$.mobile.changePage('#poolPage');	
		}, 'json');
		
		return false;
	});
});

 $(document).on( "pageshow", "#manual-login", function( e ) {
		$('#login').click(function(){
			$.get(coreUrl + 'subject=Users&actionType=login&username=' + $('#username').val() + '&password=' + $('#password').val(), function(data) {
				if (data.isError == 0) {
					// Login succes, go to page
					$.mobile.changePage( "#dashboard");
					
				} else {
					alert(data.Message);
					
				}
			}, 'json');
		});
	});
	
	
 $(document).on( "pageshow", "#prediction_step_new", function( e ) {
 		$('input[name=poolId]').val(poolId);
 		
 		// Make search
		$.get(coreUrl + 'subject=Matches&actionType=getMyMatches', function(data) {			
			if (data.isError == 0) {
				for (var key in data.returnData) {
					if (data.returnData.hasOwnProperty(key)) {
						match = data.returnData[key];
						
						$('#resultsList').append('<div class="predictions_blk"><div class="predictions_title">' + match.match_datetime + '</div><div class="country_box"><div class="country_flag_block"><div class="country_flag"><img src="images/' + match.home_team_flag + '"></div><div class="country_name">' + match.home_team + '</div></div><div class="result_block"><input name="results[' + match.id + '][home_score]"  type="number" step="1" min="0" id="posts_per_page" value="' + match.real_home_score + '" class="medium_input omega-input prediction-inputbox"></div><div class="result_block"><input name="results[' + match.id + '][away_score]" type="number" step="1" min="0" id="posts_per_page" value="' + match.real_away_score + '" class="medium_input omega-input prediction-inputbox" ></div><div class="country_flag_block"><div class="country_flag"><img src="images/' + match.away_team_flag + '"></div><div class="country_name">' + match.away_team + '</div></div></div></div>');
					}
				}	
			}
		}, 'json');
		
		
		// Submit handler
		$('form#predicitions').submit(function(e) {
			e.preventDefault();
			
			$.post(coreUrl + 'subject=Matches&actionType=makePrediction', $(this).serialize(), function(data) {
				if (data.isError == 0) {
					// Login succes, go to page
					$.mobile.changePage(data.redirectUrl);					
				} else {
					alert(data.Message);
					
				}
			}, 'json');			
		});

	
	
});



/** Purl **/
(function(e){if(typeof define==="function"&&define.amd){define(e)}else{window.purl=e()}})(function(){function s(e,n){var i=decodeURI(e),s=r[n||false?"strict":"loose"].exec(i),o={attr:{},param:{},seg:{}},u=14;while(u--){o.attr[t[u]]=s[u]||""}o.param["query"]=l(o.attr["query"]);o.param["fragment"]=l(o.attr["fragment"]);o.seg["path"]=o.attr.path.replace(/^\/+|\/+$/g,"").split("/");o.seg["fragment"]=o.attr.fragment.replace(/^\/+|\/+$/g,"").split("/");o.attr["base"]=o.attr.host?(o.attr.protocol?o.attr.protocol+"://"+o.attr.host:o.attr.host)+(o.attr.port?":"+o.attr.port:""):"";return o}function o(t){var n=t.tagName;if(typeof n!=="undefined")return e[n.toLowerCase()];return n}function u(e,t){if(e[t].length===0)return e[t]={};var n={};for(var r in e[t])n[r]=e[t][r];e[t]=n;return n}function a(e,t,n,r){var s=e.shift();if(!s){if(d(t[n])){t[n].push(r)}else if("object"==typeof t[n]){t[n]=r}else if("undefined"==typeof t[n]){t[n]=r}else{t[n]=[t[n],r]}}else{var o=t[n]=t[n]||[];if("]"==s){if(d(o)){if(""!==r)o.push(r)}else if("object"==typeof o){o[v(o).length]=r}else{o=t[n]=[t[n],r]}}else if(~s.indexOf("]")){s=s.substr(0,s.length-1);if(!i.test(s)&&d(o))o=u(t,n);a(e,o,s,r)}else{if(!i.test(s)&&d(o))o=u(t,n);a(e,o,s,r)}}}function f(e,t,n){if(~t.indexOf("]")){var r=t.split("[");a(r,e,"base",n)}else{if(!i.test(t)&&d(e.base)){var s={};for(var o in e.base)s[o]=e.base[o];e.base=s}if(t!==""){c(e.base,t,n)}}return e}function l(e){return p(String(e).split(/&|;/),function(e,t){try{t=decodeURIComponent(t.replace(/\+/g," "))}catch(n){}var r=t.indexOf("="),i=h(t),s=t.substr(0,i||r),o=t.substr(i||r,t.length);o=o.substr(o.indexOf("=")+1,o.length);if(s===""){s=t;o=""}return f(e,s,o)},{base:{}}).base}function c(e,t,n){var r=e[t];if(typeof r==="undefined"){e[t]=n}else if(d(r)){r.push(n)}else{e[t]=[r,n]}}function h(e){var t=e.length,n,r;for(var i=0;i<t;++i){r=e[i];if("]"==r)n=false;if("["==r)n=true;if("="==r&&!n)return i}}function p(e,t){var n=0,r=e.length>>0,i=arguments[2];while(n<r){if(n in e)i=t.call(undefined,i,e[n],n,e);++n}return i}function d(e){return Object.prototype.toString.call(e)==="[object Array]"}function v(e){var t=[];for(var n in e){if(e.hasOwnProperty(n))t.push(n)}return t}function m(e,t){if(arguments.length===1&&e===true){t=true;e=undefined}t=t||false;e=e||window.location.toString();return{data:s(e,t),attr:function(e){e=n[e]||e;return typeof e!=="undefined"?this.data.attr[e]:this.data.attr},param:function(e){return typeof e!=="undefined"?this.data.param.query[e]:this.data.param.query},fparam:function(e){return typeof e!=="undefined"?this.data.param.fragment[e]:this.data.param.fragment},segment:function(e){if(typeof e==="undefined"){return this.data.seg.path}else{e=e<0?this.data.seg.path.length+e:e-1;return this.data.seg.path[e]}},fsegment:function(e){if(typeof e==="undefined"){return this.data.seg.fragment}else{e=e<0?this.data.seg.fragment.length+e:e-1;return this.data.seg.fragment[e]}}}}var e={a:"href",img:"src",form:"action",base:"href",script:"src",iframe:"src",link:"href",embed:"src",object:"data"},t=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"],n={anchor:"fragment"},r={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},i=/^[0-9]+$/;m.jQuery=function(e){if(e!=null){e.fn.url=function(t){var n="";if(this.length){n=e(this).attr(o(this[0]))||""}return m(n,t)};e.url=m}};m.jQuery(window.jQuery);return m})