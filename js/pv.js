  (function(w, d, s, q, i) {
    w[q] = w[q] || [];
    var f = d.getElementsByTagName(s)[0],j = d.createElement(s);
    j.async = true;
    j.id = 'beacon-aplus';
    j.src = 'https://alidt.alicdn.com/alilog/mlog/aplus_cloud.js';
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'aplus_queue');

  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['aplus-rhost-v', 'alog.zjzwfw.gov.cn']
  });
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['aplus-rhost-g', 'alog.zjzwfw.gov.cn']
  });
  
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['appId', isAndroid ? '28302650' : isIOS ? '28328447' : '47130293']
  });
  
  aplus_queue.push({
	action: 'aplus.setMetaInfo',
	arguments: ['aplus-waiting', 'MAN']
  });
  
  aplus_queue.push({
	  'action':'aplus.sendPV',
	  'arguments':[{
	    is_auto: false
	  }, {
	    sapp_id: '19564',
	    sapp_name: 'hzmytp',
	    page_url: location.href,
	    page_id: 222,
	    page_name:$(document).attr('title')
	  }]
	});
  
  aplus_queue.push({
	  action: 'aplus.setMetaInfo',
	  arguments: ['_hold', 'BLOCK']
  });
  
  function getPageId(){
	  var page = location.href;
	  if(page.indexOf("?") > 0){
		  page = page.subString(0, page.indexOf("?"));
	  }
	  return page;
  }
  $.ajax({
	  url: "/mytp/ding/mytp/dinguser.do",
	    async:false, 
	    dataType:'json',
	    success: function(data){
	    	if(data != null){
	    		aplus_queue.push({
		    		action: "aplus.setMetaInfo",
		    		arguments: ["_user_nick", data.realName]
		    	});
		    	aplus_queue.push({
		    		action: "aplus.setMetaInfo",
		    		arguments: ["_user_id", data.dingOpenId]
		    	});
		    	aplus_queue.push({
		    		action: 'aplus.setMetaInfo',
		    		arguments: ['_hold', 'START']
		    	});
	    	}
		}
	});
  
  function asyncLoadSession(){
	  $.ajax({
		  url: "/mytp/ding/mytp/dinguser.do",
		    async:false, 
		    dataType:'json',
		    success: function(data){
		    	if(data.success){
		    		
		    	}
			}
	  });
  }
  
  setInterval(function(){
	  asyncLoadSession();
  }, 1200000);
  
  