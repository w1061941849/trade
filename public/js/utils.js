;(function($) {
	var methods ={
		"turnPage":function(data){ 
			var obj=$(this);
			obj.empty();
			var string='<ul>'; 
			if(data['total']!=0){
				if(data['has_prev']){
					string+='<li><i class="icon-chevron-left" data-pageId="'+data['prev_num']+'" ></i></li>'; 
				}else{
					string+='<li><i class="icon-chevron-left" style="#f4f4f4"></i></li>'; 
				} 	 
		 	 	if(data['pages']<=6) {
		 	 		for(var  i=1;i<=data['pages'];i++){ 
		 	 			if(data['page']==i){
							string+='<li><a class="active"   data-pageId="'+i+'">'+i+'</a></li>';
						}else{
							string+='<li><a class=""  data-pageId="'+i+'">'+i+'</a></li>';
						} 
		 	 		}
		 	 	}else if(data['pages']>6){
		 	 		if(data['page']<=6){ 
		 	 			for(var  i=1;i<=6;i++){ 
		 	 				if(data['page']==i){
								string+='<li><a class="active"  data-pageId="'+i+'">'+i+'</a></li>';
							}else{
								string+='<li><a class=""   data-pageId="'+i+'">'+i+'</a></li>';
							}  
		 	 			}
		 	 			string+='<li>...</li>';  
		 	 		}else if(data['page']>6)  {  
		 	 				if((data['page']+2)<data['pages']){
								string+='<li><a    data-pageId="1">1</a></li>'+
		 	 						'<li>...</li>'+
							        '<li><a    data-pageId="'+(data['page']-2)+'">'+(data['page']-2)+'</a></li>'+
									'<li><a    data-pageId="'+(data['page']-1)+'">'+(data['page']-1)+'</a></li>'+
									'<li><a class="active"  data-pageId="'+data['page']+'">'+data['page']+'</a></li>'+
									'<li><a    data-pageId="'+(data['page']+1)+'">'+(data['page']+1)+'</a></li>'+
									'<li><a    data-pageId="'+(data['page']+2)+'">'+(data['page']+2)+'</a></li>'+ 
									'<li>...</li>';   
							}else{
								string+='<li><a    data-pageId="1">1</a></li>'+
		 	 						'<li>...</li>'+
							        '<li><a    data-pageId="'+(data['page']-2)+'">'+(data['page']-2)+'</a></li>'+
									'<li><a    data-pageId="'+(data['page']-1)+'">'+(data['page']-1)+'</a></li>'+
									'<li><a class="active"  data-pageId="'+data['page']+'">'+data['page']+'</a></li>';
								if((data['pages']-data['page'])>1){
									string+='<li><a    data-pageId="'+(data['page']+1)+'">'+(data['page']+1)+'</a></li>'+
										'<li><a    data-pageId="'+(data['page']+2)+'">'+(data['page']+2)+'</a></li>';
								}else{
									string+='<li><a    data-pageId="'+(data['page']+1)+'">'+(data['page']+1)+'</a></li>';
								} 	
							} 
		 	 		} 
		 	 	} 
				if(data['has_next']){
					string+='<li><i class=" icon-chevron-right" data-pageId="'+data['next_num']+'" ></i></li>';
				}else{
					string+='<li><i class=" icon-chevron-right" style="#f4f4f4"></i></li>'; 
				} 	 
			} 
			string+='</ul>'; 
			obj.append(string); 
		} 
	} 
	$.fn.myUtils = function (method) { 
		if (methods[method]) { 
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	} 
})(jQuery, window, document);