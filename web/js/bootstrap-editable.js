/*! Bootstrap Editable - v1.1.4 
* In-place editing with Bootstrap Form and Popover
* https://github.com/vitalets/bootstrap-editable
* Copyright (c) 2012 Vitaliy Potapov; Licensed MIT, GPL */
(function(a){function c(a){return this.each(function(b,c){if(c.setSelectionRange)c.setSelectionRange(a,a);else if(c.createTextRange){var d=c.createTextRange();d.collapse(!0),d.moveEnd("character",a),d.moveStart("character",a),d.select()}}),this}function d(a,b){if(typeof a=="string"&&a.length&&a.match(/^\{.*\}$/))if(b)try{a=(new Function("return "+a))()}catch(c){}finally{return a}else a=(new Function("return "+a))();return a}function e(b,c,d){var e,f;if(!a.isArray(d))return b;for(var g=0;g<d.length;g++){e=d[g];if(e in c){b[e]=c[e];continue}f=e.toLowerCase(),f in c&&(b[e]=c[f])}return b}var b=function(b,c){function i(){this.handleEmpty(),this.$element.trigger("init",this);var a=jQuery.Event("render");a.isInit=!0,this.$element.trigger(a,this)}var e,f,g=!1,h=!1;this.$element=a(b),c&&c.placement&&!this.$element.data("placement")&&this.$element.attr("data-placement",c.placement),c&&c.title&&!this.$element.data("original-title")&&this.$element.attr("data-original-title",c.title),e=this.$element.data().type||c&&c.type||a.fn.editable.defaults.type,f=a.fn.editable.types[e]?a.fn.editable.types[e]:{},this.settings=a.extend({},a.fn.editable.defaults,a.fn.editable.types.defaults,f,c,this.$element.data()),this.settings.init.call(this,c),this.name=this.settings.name||this.$element.attr("id"),this.name||a.error("You should define name (or id) for Editable element"),typeof this.settings.validate=="object"&&this.name in this.settings.validate&&(this.settings.validate=this.settings.validate[this.name]),this.settings.value===undefined||this.settings.value===null?(this.settings.setValueByText.call(this),h=!0):(this.value=this.settings.value,h=!1),this.lastSavedValue=this.value,this.settings.toggle?(this.$toggle=a(this.settings.toggle),this.$toggle.parent().length||this.$element.after(this.$toggle),this.$element.attr("tabindex",-1)):(this.$toggle=this.$element,this.$element.addClass("editable")),this.$toggle.on("click",a.proxy(this.click,this)),a("body").on("click.editable",".editable-popover",function(a){a.stopPropagation()});if(!h&&this.value!==null&&this.value!==undefined)switch(this.settings.autotext){case"always":g=!0;break;case"never":g=!1;break;case"auto":this.$element.html().length?g=!1:e==="select"?(this.settings.source=d(this.settings.source,!0),this.settings.source&&typeof this.settings.source=="object"&&(g=!0)):g=!0}g?a.when(this.settings.setTextByValue.call(this)).then(a.proxy(i,this)):i.call(this)};b.prototype={constructor:b,click:function(a){a.stopPropagation(),a.preventDefault();var b=this.$element.data("popover");b&&b.tip().is(":visible")?this.hide():this.show()},show:function(){a(".popover").find("form").find("button.editable-cancel").click(),this.$element.data("popover")||(this.$element.popover({trigger:"manual",placement:"top",content:this.settings.loading}),this.$element.data("popover").tip().addClass("editable-popover")),this.$element.popover("show"),this.setPosition(),this.$element.addClass("editable-open"),this.errorOnRender=!1,a.when(this.settings.renderInput.call(this)).then(a.proxy(function(){var b=this.$element.data("popover").tip();this.$content=a(this.settings.formTemplate),this.$content.find("div.control-group").prepend(this.$input),b.find(".popover-content p").append(this.$content),this.setPosition(),this.errorOnRender?(this.$input.attr("disabled",!0),b.find("button.btn-primary").attr("disabled",!0),b.find("form").submit(function(){return!1}),this.enableContent(this.errorOnRender)):(this.$input.removeAttr("disabled"),b.find("button.btn-primary").removeAttr("disabled"),b.find("form").submit(a.proxy(this.submit,this)),this.enableContent(),this.settings.setInputValue.call(this)),b.find("button.editable-cancel").click(a.proxy(this.hide,this)),a(document).on("keyup.editable",a.proxy(function(a){a.which===27&&(a.stopPropagation(),this.hide())},this)),a(document).on("click.editable",a.proxy(this.hide,this)),this.$element.trigger("shown",this)},this))},submit:function(a){a.stopPropagation(),a.preventDefault();var b,c=this.settings.getInputValue.call(this);if(b=this.validate(c)){this.enableContent(b);return}c==this.value?this.hide():this.save(c)},save:function(b){a.when(this.send(b)).done(a.proxy(function(a){var c,d=typeof a!="undefined";if(d&&typeof this.settings.success=="function"&&(c=this.settings.success.apply(this,arguments))){this.enableContent(c);return}this.value=b,this.settings.setTextByValue.call(this),d?this.markAsSaved():this.markAsUnsaved(),this.handleEmpty(),this.hide(),this.$element.trigger("update",this);var e=jQuery.Event("render");e.isInit=!1,this.$element.trigger(e,this)},this)).fail(a.proxy(function(a){var b=typeof this.settings.error=="function"?this.settings.error.apply(this,arguments):null;this.enableContent(b||a.responseText||a.statusText)},this))},send:function(b){var c,e,f;typeof this.settings.pk=="function"?e=this.settings.pk.call(this.$element):typeof this.settings.pk=="string"&&a(this.settings.pk).length===1&&a(this.settings.pk).parent().length?e=a(this.settings.pk).text():e=this.settings.pk,c=this.settings.url!==undefined&&(this.settings.send==="always"||this.settings.send==="auto"&&e||this.settings.send==="ifpk"&&e);if(c)return this.enableLoading(),this.settings.params=d(this.settings.params,!0),f=typeof this.settings.params=="string"?{params:this.settings.params}:a.extend({},this.settings.params),f.name=this.name,f.value=b,e&&(f.pk=e),a.ajax({url:typeof this.settings.url=="function"?this.settings.url.call(this):this.settings.url,data:f,type:"post",dataType:"json"})},hide:function(){this.$element.popover("hide"),this.$element.removeClass("editable-open"),a(document).off("keyup.editable"),a(document).off("click.editable"),(this.settings.enablefocus||this.$element.get(0)!==this.$toggle.get(0))&&this.$toggle.focus(),this.$element.trigger("hidden",this)},enableContent:function(a){a!==undefined&&a.length>0?this.$content.find("div.control-group").addClass("error").find("span.help-block").text(a):this.$content.find("div.control-group").removeClass("error").find("span.help-block").text(""),this.$content.show(),this.$element.data("popover").tip().find(".editable-loading").hide(),this.setPosition(),(this.settings.type==="text"||this.settings.type==="textarea")&&this.$input.focus()},setPosition:function(){var a=this.$element.data("popover"),b=a.tip(),c=!1,d,e,f,g,h;d=typeof a.options.placement=="function"?a.options.placement.call(a,b[0],a.$element[0]):a.options.placement,e=a.getPosition(c),f=b[0].offsetWidth,g=b[0].offsetHeight;switch(c?d.split(" ")[1]:d){case"bottom":h={top:e.top+e.height,left:e.left+e.width/2-f/2};break;case"top":b.find(".arrow").get(0).offsetHeight===10&&(g+=10),h={top:e.top-g,left:e.left+e.width/2-f/2};break;case"left":b.find(".arrow").get(0).offsetWidth===10&&(f+=10),h={top:e.top+e.height/2-g/2,left:e.left-f};break;case"right":h={top:e.top+e.height/2-g/2,left:e.left+e.width}}b.css(h).addClass(d).addClass("in")},enableLoading:function(){var a=this.$element.data("popover").$tip;a.find(".editable-loading").css({height:this.$content[0].offsetHeight,width:this.$content[0].offsetWidth}),this.$content.hide(),this.$element.data("popover").tip().find(".editable-loading").show()},handleEmpty:function(){if(!this.$element.hasClass("editable"))return;a.trim(this.$element.text())===""?this.$element.addClass("editable-empty").text(this.settings.emptytext):this.$element.removeClass("editable-empty")},validate:function(a){a===undefined&&(a=this.value);if(typeof this.settings.validate=="function")return this.settings.validate.call(this,a)},markAsUnsaved:function(){this.value!==this.lastSavedValue?this.$element.addClass("editable-changed"):this.$element.removeClass("editable-changed")},markAsSaved:function(){this.lastSavedValue=this.value,this.$element.removeClass("editable-changed")}},a.fn.editable=function(c){var d={},e=arguments;switch(c){case"validate":return this.each(function(){var b=a(this),c=b.data("editable"),e;c&&(e=c.validate())&&(d[c.name]=e)}),d;case"getValue":return this.each(function(){var b=a(this),c=b.data("editable");c&&c.value!==undefined&&c.value!==null&&(d[c.name]=c.value)}),d;case"submit":var f=arguments[1]||{},g=this,h=this.editable("validate"),i;return typeof f.error!="function"&&(f.error=function(){}),a.isEmptyObject(h)?(i=this.editable("getValue"),f.data&&a.extend(i,f.data),a.ajax({type:"POST",url:f.url,data:i,dataType:"json"}).success(function(a){typeof a=="object"&&a.id?(g.editable("option","pk",a.id),g.editable("markAsSaved"),typeof f.success=="function"&&f.success.apply(g,arguments)):f.error.apply(g,arguments)}).error(function(){f.error.apply(g,arguments)})):f.error.call(g,{errors:h}),this}return this.each(function(){var d=a(this),f=d.data("editable"),g=typeof c=="object"&&c;f||d.data("editable",f=new b(this,g)),c==="option"?e.length===2&&typeof e[1]=="object"?a.extend(f.settings,e[1]):e.length===3&&typeof e[1]=="string"&&(f.settings[e[1]]=e[2]):typeof c=="string"&&f[c]()})},a.fn.editable.Constructor=b,a.fn.editable.defaults={url:null,type:"text",name:null,pk:null,value:null,emptytext:"Empty",params:null,send:"auto",autotext:"auto",enablefocus:!1,formTemplate:'<form class="form-inline" autocomplete="off"><div class="control-group">&nbsp;<button type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i></button>&nbsp;<button type="button" class="btn editable-cancel"><i class="icon-ban-circle"></i></button><span class="help-block" style="clear: both"></span></div></form>',loading:'<div class="editable-loading"></div>',validate:function(a){},success:function(a){},error:function(a){}},a.fn.editable.types={defaults:{inputclass:"span2",placeholder:null,init:function(a){},renderInput:function(){this.$input=a(this.settings.template),this.$input.addClass(this.settings.inputclass),this.settings.placeholder&&this.$input.attr("placeholder",this.settings.placeholder)},setInputValue:function(){this.$input.val(this.value),this.$input.focus()},getInputValue:function(){return this.$input.val()},setTextByValue:function(){this.$element.text(this.value)},setValueByText:function(){this.value=a.trim(this.$element.text())}},text:{template:'<input type="text">',setInputValue:function(){this.$input.val(this.value),c.call(this.$input,this.$input.val().length),this.$input.focus()}},select:{template:"<select></select>",source:null,prepend:!1,onSourceReady:function(b,c){try{this.settings.source=d(this.settings.source,!1)}catch(e){c.call(this);return}if(typeof this.settings.source=="string"){var f=this.settings.source+"-"+this.name,g;a(document).data(f)||a(document).data(f,{}),g=a(document).data(f);if(g.loading===!1&&g.source&&typeof g.source=="object"){this.settings.source=g.source,b.call(this);return}if(g.loading===!0){g.callbacks.push(a.proxy(function(){this.settings.source=g.source,b.call(this)},this)),g.err_callbacks.push(a.proxy(c,this));return}g.loading=!0,g.callbacks=[],g.err_callbacks=[],a.ajax({url:this.settings.source,type:"get",data:{name:this.name},dataType:"json",success:a.proxy(function(c){this.settings.source=this.settings.doPrepend.call(this,c),g.loading=!1,g.source=this.settings.source,b.call(this),a.each(g.callbacks,function(){this.call()})},this),error:a.proxy(function(){g.loading=!1,c.call(this),a.each(g.err_callbacks,function(){this.call()})},this)})}else{if(a.isArray(this.settings.source)){var h=this.settings.source,i={};for(var j=0;j<h.length;j++)h[j]!==undefined&&(i[j]=h[j]);this.settings.source=i}this.settings.source=this.settings.doPrepend.call(this,this.settings.source),b.call(this)}},doPrepend:function(b){return this.settings.prepend=d(this.settings.prepend,!0),typeof this.settings.prepend=="string"?a.extend({},{"":this.settings.prepend},b):typeof this.settings.prepend=="object"?a.extend({},this.settings.prepend,b):b},renderInput:function(){var b=a.Deferred();return this.$input=a(this.settings.template),this.$input.addClass(this.settings.inputclass),this.settings.onSourceReady.call(this,function(){typeof this.settings.source=="object"&&this.settings.source!=null&&a.each(this.settings.source,a.proxy(function(b,c){this.$input.append(a("<option>",{value:b}).text(c))},this)),b.resolve()},function(){this.errorOnRender="Error when loading options",b.resolve()}),b.promise()},setValueByText:function(){this.value=null},setTextByValue:function(){var b=a.Deferred();return this.settings.onSourceReady.call(this,function(){typeof this.settings.source=="object"&&this.value in this.settings.source?this.$element.text(this.settings.source[this.value]):this.$element.text(""),b.resolve()},function(){this.$element.text("Error!"),b.resolve()}),b.promise()}},textarea:{template:'<textarea rows="8"></textarea>',inputclass:"span3",renderInput:function(){this.$input=a(this.settings.template),this.$input.addClass(this.settings.inputclass),this.settings.placeholder&&this.$input.attr("placeholder",this.settings.placeholder),this.$input.keydown(function(b){b.ctrlKey&&b.which===13&&a(this).closest("form").submit()})},setInputValue:function(){this.$input.val(this.value),c.apply(this.$input,[this.$input.val().length]),this.$input.focus()},setValueByText:function(){var b=this.$element.html().split(/<br\s*\/?>/i);for(var c=0;c<b.length;c++)b[c]=a("<div>").html(b[c]).text();this.value=b.join("\n")},setTextByValue:function(){var b=this.value.split("\n");for(var c=0;c<b.length;c++)b[c]=a("<div>").text(b[c]).html();var d=b.join("<br>");this.$element.html(d)}},date:{template:'<div style="float: left; padding: 0; margin: 0" class="well"></div>',format:"yyyy-mm-dd",viewformat:null,datepicker:{autoclose:!1,keyboardNavigation:!1},init:function(b){var c=e({},this.settings,["format","weekStart","startView"]);this.settings.datepicker=a.extend({},a.fn.editable.types.date.datepicker,c,b.datepicker),this.settings.viewformat||(this.settings.viewformat=this.settings.datepicker.format)},renderInput:function(){this.$input=a(this.settings.template),this.$input.datepicker(this.settings.datepicker)},setInputValue:function(){this.$input.datepicker("update",this.value)},getInputValue:function(){var a=this.$input.data("datepicker");return a.getFormattedDate()},setTextByValue:function(){var a=this.settings.converFormat.call(this,this.value,this.settings.format,this.settings.viewformat);this.$element.text(a)},setValueByText:function(){var b=a.trim(this.$element.text());if(!b.length)return;this.value=this.settings.converFormat.call(this,b,this.settings.viewformat,this.settings.format)},converFormat:function(b,c,d){if(c===d)return b;var e=a.fn.datepicker.DPGlobal,f,g=this.settings.datepicker&&this.settings.datepicker.language||"en";return c=e.parseFormat(c),d=e.parseFormat(d),f=e.parseDate(a.trim(b),c,g),e.formatDate(f,d,g)}}}})(window.jQuery),!function(a){function b(){return new Date(Date.UTC.apply(Date,arguments))}var c=function(b,c){var f=this;this.element=a(b),this.language=c.language||this.element.data("date-language")||"en",this.language=this.language in d?this.language:"en",this.format=e.parseFormat(c.format||this.element.data("date-format")||"mm/dd/yyyy"),this.isInline=!1,this.isInput=this.element.is("input"),this.component=this.element.is(".date")?this.element.find(".add-on"):!1,this.hasInput=this.component&&this.element.find("input").length,this.component&&this.component.length===0&&(this.component=!1),this.isInput?this.element.on({focus:a.proxy(this.show,this),keyup:a.proxy(this.update,this),keydown:a.proxy(this.keydown,this)}):this.component&&this.hasInput?(this.element.find("input").on({focus:a.proxy(this.show,this),keyup:a.proxy(this.update,this),keydown:a.proxy(this.keydown,this)}),this.component.on("click",a.proxy(this.show,this))):this.element.is("div")?this.isInline=!0:this.element.on("click",a.proxy(this.show,this)),this.picker=a(e.template).appendTo(this.isInline?this.element:"body").on({click:a.proxy(this.click,this),mousedown:a.proxy(this.mousedown,this)}),this.isInline?this.picker.addClass("datepicker-inline"):this.picker.addClass("dropdown-menu"),a(document).on("mousedown",function(b){a(b.target).closest(".datepicker").length==0&&f.hide()}),this.autoclose=!1,"autoclose"in c?this.autoclose=c.autoclose:"dateAutoclose"in this.element.data()&&(this.autoclose=this.element.data("date-autoclose")),this.keyboardNavigation=!0,"keyboardNavigation"in c?this.keyboardNavigation=c.keyboardNavigation:"dateKeyboardNavigation"in this.element.data()&&(this.keyboardNavigation=this.element.data("date-keyboard-navigation"));switch(c.startView||this.element.data("date-start-view")){case 2:case"decade":this.viewMode=this.startViewMode=2;break;case 1:case"year":this.viewMode=this.startViewMode=1;break;case 0:case"month":default:this.viewMode=this.startViewMode=0}this.weekStart=(c.weekStart||this.element.data("date-weekstart")||d[this.language].weekStart||0)%7,this.weekEnd=(this.weekStart+6)%7,this.startDate=-Infinity,this.endDate=Infinity,this.setStartDate(c.startDate||this.element.data("date-startdate")),this.setEndDate(c.endDate||this.element.data("date-enddate")),this.fillDow(),this.fillMonths(),this.update(),this.showMode(),this.isInline&&this.show()};c.prototype={constructor:c,show:function(b){this.picker.show(),this.height=this.component?this.component.outerHeight():this.element.outerHeight(),this.update(),this.place(),a(window).on("resize",a.proxy(this.place,this)),b&&(b.stopPropagation(),b.preventDefault()),this.element.trigger({type:"show",date:this.date})},hide:function(b){if(this.isInline)return;this.picker.hide(),a(window).off("resize",this.place),this.viewMode=this.startViewMode,this.showMode(),this.isInput||a(document).off("mousedown",this.hide),b&&b.currentTarget.value&&this.setValue(),this.element.trigger({type:"hide",date:this.date})},setValue:function(){var a=this.getFormattedDate();this.isInput?this.element.prop("value",a):(this.component&&this.element.find("input").prop("value",a),this.element.data("date",a))},getFormattedDate:function(a){return a==undefined&&(a=this.format),e.formatDate(this.date,a,this.language)},setStartDate:function(a){this.startDate=a||-Infinity,this.startDate!==-Infinity&&(this.startDate=e.parseDate(this.startDate,this.format,this.language)),this.update(),this.updateNavArrows()},setEndDate:function(a){this.endDate=a||Infinity,this.endDate!==Infinity&&(this.endDate=e.parseDate(this.endDate,this.format,this.language)),this.update(),this.updateNavArrows()},place:function(){if(this.isInline)return;var b=parseInt(this.element.parents().filter(function(){return a(this).css("z-index")!="auto"}).first().css("z-index"))+10,c=this.component?this.component.offset():this.element.offset();this.picker.css({top:c.top+this.height,left:c.left,zIndex:b})},update:function(){var a,b=!1;arguments&&arguments.length&&(typeof arguments[0]=="string"||arguments[0]instanceof Date)?(a=arguments[0],b=!0):a=this.isInput?this.element.prop("value"):this.element.data("date")||this.element.find("input").prop("value"),this.date=e.parseDate(a,this.format,this.language),b&&this.setValue(),this.date<this.startDate?this.viewDate=new Date(this.startDate):this.date>this.endDate?this.viewDate=new Date(this.endDate):this.viewDate=new Date(this.date),this.fill()},fillDow:function(){var a=this.weekStart,b="<tr>";while(a<this.weekStart+7)b+='<th class="dow">'+d[this.language].daysMin[a++%7]+"</th>";b+="</tr>",this.picker.find(".datepicker-days thead").append(b)},fillMonths:function(){var a="",b=0;while(b<12)a+='<span class="month">'+d[this.language].monthsShort[b++]+"</span>";this.picker.find(".datepicker-months td").html(a)},fill:function(){var a=new Date(this.viewDate),c=a.getUTCFullYear(),f=a.getUTCMonth(),g=this.startDate!==-Infinity?this.startDate.getUTCFullYear():-Infinity,h=this.startDate!==-Infinity?this.startDate.getUTCMonth():-Infinity,i=this.endDate!==Infinity?this.endDate.getUTCFullYear():Infinity,j=this.endDate!==Infinity?this.endDate.getUTCMonth():Infinity,k=this.date.valueOf();this.picker.find(".datepicker-days th:eq(1)").text(d[this.language].months[f]+" "+c),this.updateNavArrows(),this.fillMonths();var l=b(c,f-1,28,0,0,0,0),m=e.getDaysInMonth(l.getUTCFullYear(),l.getUTCMonth());l.setUTCDate(m),l.setUTCDate(m-(l.getUTCDay()-this.weekStart+7)%7);var n=new Date(l);n.setUTCDate(n.getUTCDate()+42),n=n.valueOf();var o=[],p;while(l.valueOf()<n){l.getUTCDay()==this.weekStart&&o.push("<tr>"),p="";if(l.getUTCFullYear()<c||l.getUTCFullYear()==c&&l.getUTCMonth()<f)p+=" old";else if(l.getUTCFullYear()>c||l.getUTCFullYear()==c&&l.getUTCMonth()>f)p+=" new";l.valueOf()==k&&(p+=" active");if(l.valueOf()<this.startDate||l.valueOf()>this.endDate)p+=" disabled";o.push('<td class="day'+p+'">'+l.getUTCDate()+"</td>"),l.getUTCDay()==this.weekEnd&&o.push("</tr>"),l.setUTCDate(l.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(o.join(""));var q=this.date.getUTCFullYear(),r=this.picker.find(".datepicker-months").find("th:eq(1)").text(c).end().find("span").removeClass("active");q==c&&r.eq(this.date.getUTCMonth()).addClass("active"),(c<g||c>i)&&r.addClass("disabled"),c==g&&r.slice(0,h).addClass("disabled"),c==i&&r.slice(j+1).addClass("disabled"),o="",c=parseInt(c/10,10)*10;var s=this.picker.find(".datepicker-years").find("th:eq(1)").text(c+"-"+(c+9)).end().find("td");c-=1;for(var t=-1;t<11;t++)o+='<span class="year'+(t==-1||t==10?" old":"")+(q==c?" active":"")+(c<g||c>i?" disabled":"")+'">'+c+"</span>",c+=1;s.html(o)},updateNavArrows:function(){var a=new Date(this.viewDate),b=a.getUTCFullYear(),c=a.getUTCMonth();switch(this.viewMode){case 0:this.startDate!==-Infinity&&b<=this.startDate.getUTCFullYear()&&c<=this.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.endDate!==Infinity&&b>=this.endDate.getUTCFullYear()&&c>=this.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:this.startDate!==-Infinity&&b<=this.startDate.getUTCFullYear()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.endDate!==Infinity&&b>=this.endDate.getUTCFullYear()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}},click:function(c){c.stopPropagation(),c.preventDefault();var d=a(c.target).closest("span, td, th");if(d.length==1)switch(d[0].nodeName.toLowerCase()){case"th":switch(d[0].className){case"switch":this.showMode(1);break;case"prev":case"next":var f=e.modes[this.viewMode].navStep*(d[0].className=="prev"?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,f);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,f)}this.fill()}break;case"span":if(!d.is(".disabled")){this.viewDate.setUTCDate(1);if(d.is(".month")){var g=d.parent().find("span").index(d);this.viewDate.setUTCMonth(g),this.element.trigger({type:"changeMonth",date:this.viewDate})}else{var h=parseInt(d.text(),10)||0;this.viewDate.setUTCFullYear(h),this.element.trigger({type:"changeYear",date:this.viewDate})}this.showMode(-1),this.fill()}break;case"td":if(d.is(".day")&&!d.is(".disabled")){var i=parseInt(d.text(),10)||1,h=this.viewDate.getUTCFullYear(),g=this.viewDate.getUTCMonth();d.is(".old")?g==0?(g=11,h-=1):g-=1:d.is(".new")&&(g==11?(g=0,h+=1):g+=1),this.date=b(h,g,i,0,0,0,0),this.viewDate=b(h,g,i,0,0,0,0),this.fill(),this.setValue(),this.element.trigger({type:"changeDate",date:this.date});var j;this.isInput?j=this.element:this.component&&(j=this.element.find("input")),j&&(j.change(),this.autoclose&&this.hide())}}},moveMonth:function(a,b){if(!b)return a;var c=new Date(a.valueOf()),d=c.getUTCDate(),e=c.getUTCMonth(),f=Math.abs(b),g,h;b=b>0?1:-1;if(f==1){h=b==-1?function(){return c.getUTCMonth()==e}:function(){return c.getUTCMonth()!=g},g=e+b,c.setUTCMonth(g);if(g<0||g>11)g=(g+12)%12}else{for(var i=0;i<f;i++)c=this.moveMonth(c,b);g=c.getUTCMonth(),c.setUTCDate(d),h=function(){return g!=c.getUTCMonth()}}while(h())c.setUTCDate(--d),c.setUTCMonth(g);return c},moveYear:function(a,b){return this.moveMonth(a,b*12)},dateWithinRange:function(a){return a>=this.startDate&&a<=this.endDate},keydown:function(a){if(this.picker.is(":not(:visible)")){a.keyCode==27&&this.show();return}var b=!1,c,d,e,f,g;switch(a.keyCode){case 27:this.hide(),a.preventDefault();break;case 37:case 39:if(!this.keyboardNavigation)break;c=a.keyCode==37?-1:1,a.ctrlKey?(f=this.moveYear(this.date,c),g=this.moveYear(this.viewDate,c)):a.shiftKey?(f=this.moveMonth(this.date,c),g=this.moveMonth(this.viewDate,c)):(f=new Date(this.date),f.setUTCDate(this.date.getUTCDate()+c),g=new Date(this.viewDate),g.setUTCDate(this.viewDate.getUTCDate()+c)),this.dateWithinRange(f)&&(this.date=f,this.viewDate=g,this.setValue(),this.update(),a.preventDefault(),b=!0);break;case 38:case 40:if(!this.keyboardNavigation)break;c=a.keyCode==38?-1:1,a.ctrlKey?(f=this.moveYear(this.date,c),g=this.moveYear(this.viewDate,c)):a.shiftKey?(f=this.moveMonth(this.date,c),g=this.moveMonth(this.viewDate,c)):(f=new Date(this.date),f.setUTCDate(this.date.getUTCDate()+c*7),g=new Date(this.viewDate),g.setUTCDate(this.viewDate.getUTCDate()+c*7)),this.dateWithinRange(f)&&(this.date=f,this.viewDate=g,this.setValue(),this.update(),a.preventDefault(),b=!0);break;case 13:this.hide(),a.preventDefault();break;case 9:this.hide()}if(b){this.element.trigger({type:"changeDate",date:this.date});var h;this.isInput?h=this.element:this.component&&(h=this.element.find("input")),h&&h.change()}},showMode:function(a){a&&(this.viewMode=Math.max(0,Math.min(2,this.viewMode+a))),this.picker.find(">div").hide().filter(".datepicker-"+e.modes[this.viewMode].clsName).show(),this.updateNavArrows()}},a.fn.datepicker=function(b){var d=Array.apply(null,arguments);return d.shift(),this.each(function(){var e=a(this),f=e.data("datepicker"),g=typeof b=="object"&&b;f||e.data("datepicker",f=new c(this,a.extend({},a.fn.datepicker.defaults,g))),typeof b=="string"&&typeof f[b]=="function"&&f[b].apply(f,d)})},a.fn.datepicker.defaults={},a.fn.datepicker.Constructor=c;var d=a.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},e={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(a){return a%4===0&&a%100!==0||a%400===0},getDaysInMonth:function(a,b){return[31,e.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},validParts:/dd?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[-`{-~\t\n\r]+/g,parseFormat:function(a){var b=a.replace(this.validParts," ").split(" "),c=a.match(this.validParts);if(!b||!b.length||!c||c.length==0)throw new Error("Invalid date format.");return{separators:b,parts:c}},parseDate:function(e,f,g){if(e instanceof Date)return e;if(/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(e)){var h=/([-+]\d+)([dmwy])/,i=e.match(/([-+]\d+)([dmwy])/g),j,k;e=new Date;for(var l=0;l<i.length;l++){j=h.exec(i[l]),k=parseInt(j[1]);switch(j[2]){case"d":e.setUTCDate(e.getUTCDate()+k);break;case"m":e=c.prototype.moveMonth.call(c.prototype,e,k);break;case"w":e.setUTCDate(e.getUTCDate()+k*7);break;case"y":e=c.prototype.moveYear.call(c.prototype,e,k)}}return b(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0)}var i=e&&e.match(this.nonpunctuation)||[],e=new Date,m={},n=["yyyy","yy","M","MM","m","mm","d","dd"],o={yyyy:function(a,b){return a.setUTCFullYear(b)},yy:function(a,b){return a.setUTCFullYear(2e3+b)},m:function(a,b){b-=1;while(b<0)b+=12;b%=12,a.setUTCMonth(b);while(a.getUTCMonth()!=b)a.setUTCDate(a.getUTCDate()-1);return a},d:function(a,b){return a.setUTCDate(b)}},p,q,j;o.M=o.MM=o.mm=o.m,o.dd=o.d,e=b(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0);if(i.length==f.parts.length){for(var l=0,r=f.parts.length;l<r;l++){p=parseInt(i[l],10),j=f.parts[l];if(isNaN(p))switch(j){case"MM":q=a(d[g].months).filter(function(){var a=this.slice(0,i[l].length),b=i[l].slice(0,a.length);return a==b}),p=a.inArray(q[0],d[g].months)+1;break;case"M":q=a(d[g].monthsShort).filter(function(){var a=this.slice(0,i[l].length),b=i[l].slice(0,a.length);return a==b}),p=a.inArray(q[0],d[g].monthsShort)+1}m[j]=p}for(var l=0,s;l<n.length;l++)s=n[l],s in m&&o[s](e,m[s])}return e},formatDate:function(b,c,e){var f={d:b.getUTCDate(),m:b.getUTCMonth()+1,M:d[e].monthsShort[b.getUTCMonth()],MM:d[e].months[b.getUTCMonth()],yy:b.getUTCFullYear().toString().substring(2),yyyy:b.getUTCFullYear()};f.dd=(f.d<10?"0":"")+f.d,f.mm=(f.m<10?"0":"")+f.m;var b=[],g=a.extend([],c.separators);for(var h=0,i=c.parts.length;h<i;h++)g.length&&b.push(g.shift()),b.push(f[c.parts[h]]);return b.join("")},headTemplate:'<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>'};e.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+e.headTemplate+"<tbody></tbody>"+"</table>"+"</div>"+'<div class="datepicker-months">'+'<table class="table-condensed">'+e.headTemplate+e.contTemplate+"</table>"+"</div>"+'<div class="datepicker-years">'+'<table class="table-condensed">'+e.headTemplate+e.contTemplate+"</table>"+"</div>"+"</div>",a.fn.datepicker.DPGlobal=e}(window.jQuery);