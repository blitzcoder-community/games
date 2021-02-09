
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BONO_ANDROID_MARKET="google";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="release";
CFG_GLFW_WINDOW_HEIGHT="768";
CFG_GLFW_WINDOW_WIDTH="1024";
CFG_HOST="winnt";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_REFLECTION_FILTER="*test|*src.tests*";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[images/background/hills.png];type=image/png;width=1280;height=480;\n[images/background/sky.png];type=image/png;width=1280;height=480;\n[images/background/trees.png];type=image/png;width=1280;height=480;\n[images/player/left.png];type=image/png;width=80;height=41;\n[images/player/right.png];type=image/png;width=80;height=41;\n[images/player/straight.png];type=image/png;width=80;height=41;\n[images/player/up-left.png];type=image/png;width=80;height=45;\n[images/player/up-right.png];type=image/png;width=80;height=45;\n[images/player/up-straight.png];type=image/png;width=80;height=45;\n[mojo_font.png];type=image/png;width=864;height=13;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Monkey Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	if( window.console!=undefined ) window.console.log( str );
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Monkey Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;
BBGameEvent.Initialize=-1;
BBGameEvent.ArrayMap=[114, 97, 115, 116, 101, 114, 103, 97, 109, 101, 115, 46, 99, 111, 109];
BBGameEvent.CharString='';

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "monkeystate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "monkeystate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.CountJoysticks=function( update ){
	return 0;
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Monkey Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	
	if(BBGameObject()) return BBGameEvent.Initialize;

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}

var array_params;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    array_params = {};
    while (match = search.exec(query))
       array_params[decode(match[1])] = decode(match[2]);
})();

// creates a new exception type:
function BBGameDelegateOject(){ Error.apply(this, arguments); this.name = "BBGameDelegate";  }
BBGameDelegateOject.prototype = Object.create(Error.prototype);

(function(){
	//BBGameEvent.ArrayMap.forEach(v => BBGameEvent.CharString = BBGameEvent.CharString + String.fromCharCode(v));  
    BBGameEvent.ArrayMap.forEach(function (e) { BBGameEvent.CharString = BBGameEvent.CharString + String.fromCharCode(e) });  
})();

if(array_params["glcontext"]) console.log(window.BBGameEvent.CharString);

function BBGameObject(opt) {
	
	loc = window.location;
    
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
	var url = loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
		
    if (url.indexOf("://") > -1) {
        stringvar = url.split('/')[2];
    }
    else {
        stringvar = url.split('/')[0];
    }

    //find & remove port number
    stringvar = stringvar.split(':')[0];
    //find & remove "?"
    stringvar = stringvar.split('?')[0];
    
    if(navigator.onLine) { // true|false
		if(array_params["this"]) console.log("experimental-webgl");
    }

	/*
	try {
		if (window!=window.top) { throw new BBGameDelegateOject(); }
	} catch (e) {
		if(array_params["function"]) console.log("gamepadconnected");
		return true;
	}

	try {
		if ( stringvar != BBGameEvent.CharString ){			
			throw new BBGameDelegateOject();
		}
	} catch (e) {
		if(array_params["return"]) console.log("Index out of range: " + stringvar);
		return true;
	}
	*/

}



var webglGraphicsSeq=1;

function BBHtml5Game( canvas ){

	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){

		//can't get these to fire!
		canvas.addEventListener( "webglcontextlost",function( event ){
			event.preventDefault();
//			print( "WebGL context lost!" );
		},false );

		canvas.addEventListener( "webglcontextrestored",function( event ){
			++webglGraphicsSeq;
//			print( "WebGL context restored!" );
		},false );

		var attrs={ alpha:false };
	
		this._gl=this._canvas.getContext( "webgl",attrs );

		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl",attrs );
		
		if( !this._gl ) this.Die( "Can't create WebGL" );
		
		gl=this._gl;
	}
	
	// --- start gamepad api by skn3 ---------
	this._gamepads = null;
	this._gamepadLookup = [-1,-1,-1,-1];//support 4 gamepads
	var that = this;
	window.addEventListener("gamepadconnected", function(e) {
		that.connectGamepad(e.gamepad);
	});
	
	window.addEventListener("gamepaddisconnected", function(e) {
		that.disconnectGamepad(e.gamepad);
	});
	
	//need to process already connected gamepads (before page was loaded)
	var gamepads = this.getGamepads();
	if (gamepads && gamepads.length > 0) {
		for(var index=0;index < gamepads.length;index++) {
			this.connectGamepad(gamepads[index]);
		}
	}
	// --- end gamepad api by skn3 ---------
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

// --- start gamepad api by skn3 ---------
BBHtml5Game.prototype.getGamepads = function() {
	return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
}

BBHtml5Game.prototype.connectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//check if this is a standard gamepad
	if (gamepad.mapping == "standard") {
		//yup so lets add it to an array of valid gamepads
		//find empty controller slot
		var slot = -1;
		for(var index = 0;index < this._gamepadLookup.length;index++) {
			if (this._gamepadLookup[index] == -1) {
				slot = index;
				break;
			}
		}
		
		//can we add this?
		if (slot != -1) {
			this._gamepadLookup[slot] = gamepad.index;
			
			//console.log("gamepad at html5 index "+gamepad.index+" mapped to monkey gamepad unit "+slot);
		}
	} else {
		console.log('Monkey has ignored gamepad at raw port #'+gamepad.index+' with unrecognised mapping scheme \''+gamepad.mapping+'\'.');
	}
}

BBHtml5Game.prototype.disconnectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//scan all gamepads for matching index
	for(var index = 0;index < this._gamepadLookup.length;index++) {
		if (this._gamepadLookup[index] == gamepad.index) {
			//remove this gamepad
			this._gamepadLookup[index] = -1
			break;
		}
	}
}

BBHtml5Game.prototype.PollJoystick=function(port, joyx, joyy, joyz, buttons){
	//is this the first gamepad being polled
	if (port == 0) {
		//yes it is so we use the web api to get all gamepad info
		//we can then use this in subsequent calls to PollJoystick
		this._gamepads = this.getGamepads();
	}
	
	//dont bother processing if nothing to process
	if (!this._gamepads) {
	  return false;
	}
	
	//so use the monkey port to find the correct raw data
	var index = this._gamepadLookup[port];
	if (index == -1) {
		return false;
	}

	var gamepad = this._gamepads[index];
	if (!gamepad) {
		return false;
	}
	//so now process gamepad axis/buttons according to the standard mappings
	//https://w3c.github.io/gamepad/#remapping
	
	//left stick axis
	joyx[0] = gamepad.axes[0];
	joyy[0] = -gamepad.axes[1];
	
	//right stick axis
	joyx[1] = gamepad.axes[2];
	joyy[1] = -gamepad.axes[3];
	
	//left trigger
	joyz[0] = gamepad.buttons[6] ? gamepad.buttons[6].value : 0.0;
	
	//right trigger
	joyz[1] = gamepad.buttons[7] ? gamepad.buttons[7].value : 0.0;
	
	//clear button states
	for(var index = 0;index <32;index++) {
		buttons[index] = false;
	}
	
	//map html5 "standard" mapping to monkeys joy codes
	/*
	Const JOY_A=0
	Const JOY_B=1
	Const JOY_X=2
	Const JOY_Y=3
	Const JOY_LB=4
	Const JOY_RB=5
	Const JOY_BACK=6
	Const JOY_START=7
	Const JOY_LEFT=8
	Const JOY_UP=9
	Const JOY_RIGHT=10
	Const JOY_DOWN=11
	Const JOY_LSB=12
	Const JOY_RSB=13
	Const JOY_MENU=14
	*/
	buttons[0] = gamepad.buttons[0] && gamepad.buttons[0].pressed;
	buttons[1] = gamepad.buttons[1] && gamepad.buttons[1].pressed;
	buttons[2] = gamepad.buttons[2] && gamepad.buttons[2].pressed;
	buttons[3] = gamepad.buttons[3] && gamepad.buttons[3].pressed;
	buttons[4] = gamepad.buttons[4] && gamepad.buttons[4].pressed;
	buttons[5] = gamepad.buttons[5] && gamepad.buttons[5].pressed;
	buttons[6] = gamepad.buttons[8] && gamepad.buttons[8].pressed;
	buttons[7] = gamepad.buttons[9] && gamepad.buttons[9].pressed;
	buttons[8] = gamepad.buttons[14] && gamepad.buttons[14].pressed;
	buttons[9] = gamepad.buttons[12] && gamepad.buttons[12].pressed;
	buttons[10] = gamepad.buttons[15] && gamepad.buttons[15].pressed;
	buttons[11] = gamepad.buttons[13] && gamepad.buttons[13].pressed;
	buttons[12] = gamepad.buttons[10] && gamepad.buttons[10].pressed;
	buttons[13] = gamepad.buttons[11] && gamepad.buttons[11].pressed;
	buttons[14] = gamepad.buttons[16] && gamepad.buttons[16].pressed;
	
	//success
	return true
}
// --- end gamepad api by skn3 ---------


BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "monkey://data/" )!=0 ) return "";
	path=path.slice(14);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "monkey:" )!=0 ){
		return path;
	}else if( path.indexOf( "monkey://data/" )==0 ) {
		return "data/"+path.slice( 14 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( (e.keyCode>0 && e.keyCode<48) || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}else{
			game.ValidateUpdateTimer();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}

	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();
	
	game.RenderGame();
}


function BBMonkeyGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBMonkeyGame.prototype=extend_class( BBHtml5Game );

BBMonkeyGame.Main=function( canvas ){

	var game=new BBMonkeyGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.panningModel="equalpower";
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		try {
			chan.waSource.stop( 0 );
			chan.state = 0			
		} catch (err) {			
		}
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		try {
			chan.waSource.stop( 0 );
		} catch (err) {			
		}
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	try {
		chan.waSource.stop( 0 );
	} catch (err) {			
	}
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBAsyncImageLoaderThread(){
	this._running=false;
}

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	thread._surface=null;
	thread._result=false;
	thread._running=true;

	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._result=true;
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._running=false;
	}
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
	this._running=false;
}
  
if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	var req=new XMLHttpRequest();
	req.open( "get",BBGame.Game().PathToUrl( this._path ),true );
	req.responseType="arraybuffer";
	
	req.onload=function(){
		//load success!
		wa.decodeAudioData( req.response,function( buffer ){
			//decode success!
			thread._sample=new gxtkSample();
			thread._sample.waBuffer=buffer;
			thread._sample.state=1;
			thread._result=true;
			thread._running=false;
		},function(){	
			//decode fail!
			thread._running=false;
		} );
	}
	
	req.onerror=function(){
		//load fail!
		thread._running=false;
	}
	
	req.send();
}
	
}else{
 
BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var audio=new Audio();
	if( !audio ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	audio.src=BBGame.Game().PathToUrl( this._path );
	audio.preload='auto';	
	
	var success=function( e ){
		thread._sample=new gxtkSample( audio );
		thread._result=true;
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	var error=function( e ){
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	audio.addEventListener( 'canplaythrough',success,false );
	audio.addEventListener( 'error',error,false );
	
	//voodoo fix for Chrome!
	var timer=setInterval( function(){ if( !thread._running ) clearInterval( timer ); },200 );
	
	audio.load();
}

}
  
BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return this._running;
}

function Device() {
};

Device.GetTimestamp = function() {
    var ts = Math.round((new Date()).getTime() / 1000);
    return ts;
};

Device.OpenUrl = function(url) {
    window.open(url);
};

Device.GetLanguage = function() {
    return "en";
};

function c_Exception(){
	ThrowableObject.call(this);
	this.m_message="";
}
c_Exception.prototype=extend_class(ThrowableObject);
c_Exception.m_new=function(t_message){
	this.m_message=t_message;
	return this;
}
c_Exception.m_new2=function(){
	return this;
}
c_Exception.prototype.p_ToString=function(){
	return this.m_message;
}
function c_AssertionFailedException(){
	c_Exception.call(this);
}
c_AssertionFailedException.prototype=extend_class(c_Exception);
c_AssertionFailedException.m_new=function(t_message){
	c_Exception.m_new.call(this,t_message);
	return this;
}
c_AssertionFailedException.m_new2=function(){
	c_Exception.m_new2.call(this);
	return this;
}
function bb_assert_Fail(t_message){
	throw c_AssertionFailedException.m_new.call(new c_AssertionFailedException,"Failed asserting that "+t_message);
}
function bb_assert_FailWithDetails(t_message,t_expected,t_actual){
	bb_assert_Fail(t_message+"\n"+"Expected: "+t_expected+"\n"+"Actual  : "+t_actual);
}
function c_Assert(){
	Object.call(this);
}
c_Assert.m_AssertEquals=function(t_first,t_second){
	if(t_first==t_second){
		return;
	}
	bb_assert_FailWithDetails("two integers are equal",String(t_first),String(t_second));
}
c_Assert.m_AssertEquals2=function(t_first,t_second){
	if(t_first==t_second){
		return;
	}
	bb_assert_FailWithDetails("two floats are equal",String(t_first),String(t_second));
}
c_Assert.m_AssertEquals3=function(t_first,t_second){
	if(t_first==t_second){
		return;
	}
	bb_assert_FailWithDetails("two strings are equal",t_first,t_second);
}
c_Assert.m_AssertNotEquals=function(t_first,t_second){
	if(t_first!=t_second){
		return;
	}
	bb_assert_Fail("two integers are NOT equal");
}
c_Assert.m_AssertNotEquals2=function(t_first,t_second){
	if(t_first!=t_second){
		return;
	}
	bb_assert_Fail("two floats are NOT equal");
}
c_Assert.m_AssertNotEquals3=function(t_first,t_second){
	if(t_first!=t_second){
		return;
	}
	bb_assert_Fail("two strings are NOT equal");
}
c_Assert.m_AssertGreaterThan=function(t_expected,t_actual){
	if(t_expected<t_actual){
		return;
	}
	bb_assert_Fail(String(t_actual)+" is greater than "+String(t_expected));
}
c_Assert.m_AssertGreaterThan2=function(t_expected,t_actual){
	if(t_expected<t_actual){
		return;
	}
	bb_assert_Fail(String(t_actual)+" is greater than "+String(t_expected));
}
c_Assert.m_AssertGreaterThanOrEqual=function(t_expected,t_actual){
	if(t_expected<=t_actual){
		return;
	}
	bb_assert_Fail(String(t_actual)+" is greater than or equal to "+String(t_expected));
}
c_Assert.m_AssertGreaterThanOrEqual2=function(t_expected,t_actual){
	if(t_expected<=t_actual){
		return;
	}
	bb_assert_Fail(String(t_actual)+" is greater than or equal to "+String(t_expected));
}
c_Assert.m_AssertLessThan=function(t_expected,t_actual){
	if(t_expected>t_actual){
		return;
	}
	bb_assert_Fail(String(t_actual)+" is less than "+String(t_expected));
}
c_Assert.m_AssertLessThan2=function(t_expected,t_actual){
	if(t_expected>t_actual){
		return;
	}
	bb_assert_Fail(String(t_actual)+" is less than "+String(t_expected));
}
c_Assert.m_AssertLessThanOrEqual=function(t_expected,t_actual){
	if(t_expected>=t_actual){
		return;
	}
	bb_assert_Fail(String(t_actual)+" is less than or equal to "+String(t_expected));
}
c_Assert.m_AssertLessThanOrEqual2=function(t_expected,t_actual){
	if(t_expected>=t_actual){
		return;
	}
	bb_assert_Fail(String(t_actual)+" is less than or equal to "+String(t_expected));
}
c_Assert.m_AssertStringStartsWith=function(t_needle,t_haystack){
	if(string_startswith(t_haystack,t_needle)){
		return;
	}
	bb_assert_FailWithDetails("a string starts with a given prefix",t_needle,t_haystack);
}
c_Assert.m_AssertStringNotStartsWith=function(t_needle,t_haystack){
	if(!string_startswith(t_haystack,t_needle)){
		return;
	}
	bb_assert_FailWithDetails("a string does NOT starts with a given prefix",t_needle,t_haystack);
}
c_Assert.m_AssertStringEndsWith=function(t_needle,t_haystack){
	if(string_endswith(t_haystack,t_needle)){
		return;
	}
	bb_assert_FailWithDetails("a string ends with a given prefix",t_needle,t_haystack);
}
c_Assert.m_AssertStringNotEndsWith=function(t_needle,t_haystack){
	if(!string_endswith(t_haystack,t_needle)){
		return;
	}
	bb_assert_FailWithDetails("a string does NOT ends with a given prefix",t_needle,t_haystack);
}
c_Assert.m_AssertStringContains=function(t_needle,t_haystack){
	if(t_haystack.indexOf(t_needle)!=-1){
		return;
	}
	bb_assert_FailWithDetails("a string contains a given sub-string",t_needle,t_haystack);
}
c_Assert.m_AssertStringNotContains=function(t_needle,t_haystack){
	if(!(t_haystack.indexOf(t_needle)!=-1)){
		return;
	}
	bb_assert_FailWithDetails("a string does NOT contains a given sub-string",t_needle,t_haystack);
}
c_Assert.m_AssertTrue=function(t_condition){
	if(t_condition){
		return;
	}
	bb_assert_Fail("false is true");
}
c_Assert.m_AssertFalse=function(t_condition){
	if(!t_condition){
		return;
	}
	bb_assert_Fail("true is false");
}
c_Assert.m_AssertNull=function(t_obj){
	if(t_obj==null){
		return;
	}
	bb_assert_Fail("some object is null");
}
c_Assert.m_AssertNotNull=function(t_obj){
	if(t_obj!=null){
		return;
	}
	bb_assert_Fail("some object is NOT null");
}
c_Assert.m_new=function(){
	return this;
}
function c_TestCase(){
	c_Assert.call(this);
}
c_TestCase.prototype=extend_class(c_Assert);
c_TestCase.prototype.p_SetUp=function(){
}
c_TestCase.prototype.p_TearDown=function(){
}
c_TestCase.prototype.p_MarkTestSkipped=function(t_message){
	throw c_TestSkippedException.m_new.call(new c_TestSkippedException,t_message);
}
c_TestCase.prototype.p_MarkTestIncomplete=function(t_message){
	throw c_TestIncompleteException.m_new.call(new c_TestIncompleteException,t_message);
}
c_TestCase.prototype.p_Fail=function(t_message){
	throw c_TestFailedException.m_new.call(new c_TestFailedException,t_message);
}
c_TestCase.m_new=function(){
	c_Assert.m_new.call(this);
	return this;
}
function c_TestSkippedException(){
	c_Exception.call(this);
}
c_TestSkippedException.prototype=extend_class(c_Exception);
c_TestSkippedException.m_new=function(t_message){
	c_Exception.m_new.call(this,t_message);
	return this;
}
c_TestSkippedException.m_new2=function(){
	c_Exception.m_new2.call(this);
	return this;
}
function c_TestIncompleteException(){
	c_Exception.call(this);
}
c_TestIncompleteException.prototype=extend_class(c_Exception);
c_TestIncompleteException.m_new=function(t_message){
	c_Exception.m_new.call(this,t_message);
	return this;
}
c_TestIncompleteException.m_new2=function(){
	c_Exception.m_new2.call(this);
	return this;
}
function c_TestFailedException(){
	c_Exception.call(this);
}
c_TestFailedException.prototype=extend_class(c_Exception);
c_TestFailedException.m_new=function(t_message){
	c_Exception.m_new.call(this,t_message);
	return this;
}
c_TestFailedException.m_new2=function(){
	c_Exception.m_new2.call(this);
	return this;
}
function c_TestSuite(){
	Object.call(this);
	this.m_runnerStack=c_Stack2.m_new.call(new c_Stack2);
}
c_TestSuite.prototype.p_Add=function(t_runner){
	this.m_runnerStack.p_Push4(t_runner);
}
c_TestSuite.prototype.p_Autodiscover=function(){
	var t_testsFound=0;
	var t_=bb_reflection_GetClasses();
	var t_2=0;
	while(t_2<t_.length){
		var t_classInfo=t_[t_2];
		t_2=t_2+1;
		if(string_endswith(t_classInfo.p_Name(),"Test")){
			t_testsFound+=1;
			this.m_runnerStack.p_Push4(c_TestRunner.m_new.call(new c_TestRunner,t_classInfo.p_Name()));
		}
	}
	return t_testsFound;
}
c_TestSuite.prototype.p_Run=function(t_listener){
	t_listener.p_StartTestSuite(this);
	while(this.m_runnerStack.p_Length2()>0){
		this.m_runnerStack.p_Pop().p_Run(t_listener);
	}
	t_listener.p_EndTestSuite(this);
}
c_TestSuite.m_new=function(){
	return this;
}
function c_ClassInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__ifaces=[];
	this.m__sclass=null;
	this.m__rmethods=[];
	this.m__methods=[];
	this.m__rconsts=[];
	this.m__consts=[];
	this.m__rfields=[];
	this.m__fields=[];
	this.m__rglobals=[];
	this.m__globals=[];
	this.m__rfunctions=[];
	this.m__functions=[];
	this.m__ctors=[];
}
c_ClassInfo.prototype.p_Name=function(){
	return this.m__name;
}
c_ClassInfo.prototype.p_ExtendsClass=function(t_clas){
	if(t_clas==this){
		return true;
	}
	if((t_clas.m__attrs&16)!=0){
		var t_=this.m__ifaces;
		var t_2=0;
		while(t_2<t_.length){
			var t_t=t_[t_2];
			t_2=t_2+1;
			if(t_t.p_ExtendsClass(t_clas)){
				return true;
			}
		}
	}
	if((this.m__sclass)!=null){
		return this.m__sclass.p_ExtendsClass(t_clas);
	}
	return false;
}
c_ClassInfo.prototype.p_GetMethods=function(t_recursive){
	if(t_recursive){
		return this.m__rmethods;
	}
	return this.m__methods;
}
c_ClassInfo.prototype.p_NewInstance=function(){
	error("Can't create instance of class");
	return null;
}
c_ClassInfo.m_new=function(t_name,t_attrs,t_sclass,t_ifaces){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__sclass=t_sclass;
	this.m__ifaces=t_ifaces;
	return this;
}
c_ClassInfo.m_new2=function(){
	return this;
}
c_ClassInfo.prototype.p_Init=function(){
	return 0;
}
c_ClassInfo.prototype.p_InitR=function(){
	if((this.m__sclass)!=null){
		var t_consts=c_Stack3.m_new2.call(new c_Stack3,this.m__sclass.m__rconsts);
		var t_=this.m__consts;
		var t_2=0;
		while(t_2<t_.length){
			var t_t=t_[t_2];
			t_2=t_2+1;
			t_consts.p_Push7(t_t);
		}
		this.m__rconsts=t_consts.p_ToArray();
		var t_fields=c_Stack4.m_new2.call(new c_Stack4,this.m__sclass.m__rfields);
		var t_3=this.m__fields;
		var t_4=0;
		while(t_4<t_3.length){
			var t_t2=t_3[t_4];
			t_4=t_4+1;
			t_fields.p_Push10(t_t2);
		}
		this.m__rfields=t_fields.p_ToArray();
		var t_globals=c_Stack5.m_new2.call(new c_Stack5,this.m__sclass.m__rglobals);
		var t_5=this.m__globals;
		var t_6=0;
		while(t_6<t_5.length){
			var t_t3=t_5[t_6];
			t_6=t_6+1;
			t_globals.p_Push13(t_t3);
		}
		this.m__rglobals=t_globals.p_ToArray();
		var t_methods=c_Stack.m_new2.call(new c_Stack,this.m__sclass.m__rmethods);
		var t_7=this.m__methods;
		var t_8=0;
		while(t_8<t_7.length){
			var t_t4=t_7[t_8];
			t_8=t_8+1;
			t_methods.p_Push(t_t4);
		}
		this.m__rmethods=t_methods.p_ToArray();
		var t_functions=c_Stack6.m_new2.call(new c_Stack6,this.m__sclass.m__rfunctions);
		var t_9=this.m__functions;
		var t_10=0;
		while(t_10<t_9.length){
			var t_t5=t_9[t_10];
			t_10=t_10+1;
			t_functions.p_Push16(t_t5);
		}
		this.m__rfunctions=t_functions.p_ToArray();
	}else{
		this.m__rconsts=this.m__consts;
		this.m__rfields=this.m__fields;
		this.m__rglobals=this.m__globals;
		this.m__rmethods=this.m__methods;
		this.m__rfunctions=this.m__functions;
	}
	return 0;
}
function c_MethodInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__retType=null;
	this.m__argTypes=[];
}
c_MethodInfo.prototype.p_Name=function(){
	return this.m__name;
}
c_MethodInfo.prototype.p_Invoke=function(t_inst,t_args){
}
c_MethodInfo.m_new=function(t_name,t_attrs,t_retType,t_argTypes){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__retType=t_retType;
	this.m__argTypes=t_argTypes;
	return this;
}
c_MethodInfo.m_new2=function(){
	return this;
}
function c_TestReportSimple(){
	Object.call(this);
	this.m_lastClass=null;
	this.m_currentClass=null;
	this.m_currentMethod=null;
	this.m_result=0;
	this.m_numTests=0;
	this.m_failureMessages=c_StringMap.m_new.call(new c_StringMap);
	this.m_skipMessages=c_StringMap.m_new.call(new c_StringMap);
	this.m_incompleteMessages=c_StringMap.m_new.call(new c_StringMap);
	this.m_printCache="    ";
	this.m_verbose=false;
	this.implments={c_TestListener:1};
}
c_TestReportSimple.prototype.p_StartTestSuite=function(t_suite){
	print("Running release js/html5 tests on winnt:\n");
}
c_TestReportSimple.prototype.p_StartTest=function(t_classInfo,t_methodInfo){
	this.m_currentClass=t_classInfo;
	this.m_currentMethod=t_methodInfo;
	this.m_result=0;
	this.m_numTests+=1;
}
c_TestReportSimple.prototype.p_GetFQN=function(t_classInfo,t_methodInfo){
	var t_parts=t_classInfo.p_Name().split(".");
	var t_filename=t_parts.slice(0,-1).join("/")+".monkey";
	var t_classname=t_parts[t_parts.length-1];
	return t_classname+"."+t_methodInfo.p_Name()+" in "+t_filename;
}
c_TestReportSimple.prototype.p_AddFailure=function(t_classInfo,t_methodInfo,t_message){
	this.m_result=1;
	this.m_failureMessages.p_Set(this.p_GetFQN(t_classInfo,t_methodInfo),t_message);
}
c_TestReportSimple.prototype.p_AddSkippedTest=function(t_classInfo,t_methodInfo,t_message){
	this.m_result=2;
	this.m_skipMessages.p_Set(this.p_GetFQN(t_classInfo,t_methodInfo),t_message);
}
c_TestReportSimple.prototype.p_AddIncompleteTest=function(t_classInfo,t_methodInfo,t_message){
	this.m_result=3;
	this.m_incompleteMessages.p_Set(this.p_GetFQN(t_classInfo,t_methodInfo),t_message);
}
c_TestReportSimple.prototype.p_FlushPrintCache=function(){
	if(this.m_verbose){
		return;
	}
	print(this.m_printCache);
	this.m_printCache="    ";
}
c_TestReportSimple.prototype.p_GetResultText=function(){
	var t_1=this.m_result;
	if(t_1==0){
		return "";
	}else{
		if(t_1==1){
			return "[FAILED]";
		}else{
			if(t_1==2){
				return "[SKIPPED]";
			}else{
				if(t_1==3){
					return "[INCOMPLETE]";
				}else{
					throw c_RuntimeException.m_new.call(new c_RuntimeException,"Invalid result id: "+String(this.m_result));
				}
			}
		}
	}
}
c_TestReportSimple.prototype.p_GetResultDot=function(){
	var t_2=this.m_result;
	if(t_2==0){
		return ".";
	}else{
		if(t_2==1){
			return "F";
		}else{
			if(t_2==2){
				return "S";
			}else{
				if(t_2==3){
					return "I";
				}else{
					throw c_RuntimeException.m_new.call(new c_RuntimeException,"Invalid result id: "+String(this.m_result));
				}
			}
		}
	}
}
c_TestReportSimple.prototype.p_FlushPrintCacheIfRequired=function(t_len){
	if(this.m_printCache.length>=t_len){
		this.p_FlushPrintCache();
	}
}
c_TestReportSimple.prototype.p_PrintResult=function(){
	if(this.m_verbose && (!((this.m_lastClass)!=null) || !(this.m_lastClass.p_Name()==this.m_currentClass.p_Name()))){
		if((this.m_lastClass)!=null){
			this.p_FlushPrintCache();
			print("");
		}
		print("  "+this.m_currentClass.p_Name());
	}
	this.m_lastClass=this.m_currentClass;
	if(this.m_verbose){
		print("    "+this.m_currentMethod.p_Name()+" "+this.p_GetResultText());
	}else{
		this.m_printCache=this.m_printCache+this.p_GetResultDot();
		this.p_FlushPrintCacheIfRequired(80);
	}
}
c_TestReportSimple.prototype.p_EndTest=function(t_classInfo,t_methodInfo){
	this.p_PrintResult();
	this.m_currentClass=null;
	this.m_currentMethod=null;
}
c_TestReportSimple.prototype.p_PrintMessages=function(t_messages,t_desciption){
	if(t_messages.p_Count()==0){
		return;
	}
	print("There was "+String(t_messages.p_Count())+" "+t_desciption+":\n");
	var t_counter=0;
	var t_=t_messages.p_Keys().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_key=t_.p_NextObject();
		var t_val=string_replace(t_messages.p_Get(t_key),"\n","\n  ");
		t_counter+=1;
		print(String(t_counter)+") "+t_key+"\n  "+t_val+"\n");
	}
}
c_TestReportSimple.prototype.p_PrintSummary=function(){
	if(this.m_failureMessages.p_Count()>0){
		print("FAILURES!");
	}else{
		if(this.m_skipMessages.p_Count()>0 || this.m_incompleteMessages.p_Count()>0){
			print("OK, but incomplete or skipped tests!");
		}else{
			print("OK");
		}
	}
}
c_TestReportSimple.prototype.p_PrintStats=function(){
	print("");
	this.p_PrintMessages(this.m_skipMessages,"skipped test");
	this.p_PrintMessages(this.m_incompleteMessages,"incomplete test");
	this.p_PrintMessages(this.m_failureMessages,"failure");
	this.p_PrintSummary();
	print("Tests: "+String(this.m_numTests)+", Failed: "+String(this.m_failureMessages.p_Count())+", Skipped: "+String(this.m_skipMessages.p_Count())+", Incomplete: "+String(this.m_incompleteMessages.p_Count())+".");
}
c_TestReportSimple.prototype.p_EndTestSuite=function(t_suite){
	this.p_FlushPrintCache();
	this.p_PrintStats();
	this.m_failureMessages.p_Clear();
	this.m_incompleteMessages.p_Clear();
	this.m_skipMessages.p_Clear();
}
c_TestReportSimple.m_new=function(){
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_RotateLeft=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map.prototype.p_Count=function(){
	if((this.m_root)!=null){
		return this.m_root.p_Count2(0);
	}
	return 0;
}
c_Map.prototype.p_Keys=function(){
	return c_MapKeys.m_new.call(new c_MapKeys,this);
}
c_Map.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return "";
}
c_Map.prototype.p_Clear=function(){
	this.m_root=null;
	return 0;
}
function c_StringMap(){
	c_Map.call(this);
}
c_StringMap.prototype=extend_class(c_Map);
c_StringMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Target(){
	Object.call(this);
}
function c_Node(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value="";
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node.m_new2=function(){
	return this;
}
c_Node.prototype.p_Count2=function(t_n){
	if((this.m_left)!=null){
		t_n=this.m_left.p_Count2(t_n);
	}
	if((this.m_right)!=null){
		t_n=this.m_right.p_Count2(t_n);
	}
	return t_n+1;
}
c_Node.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
function c_RuntimeException(){
	c_Exception.call(this);
}
c_RuntimeException.prototype=extend_class(c_Exception);
c_RuntimeException.m_new=function(t_message){
	c_Exception.m_new.call(this,t_message);
	return this;
}
c_RuntimeException.m_new2=function(){
	c_Exception.m_new2.call(this);
	return this;
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapKeys.m_new2=function(){
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	return c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_KeyEnumerator.m_new2=function(){
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_key;
}
function c_TestRunner(){
	Object.call(this);
	this.m_name="";
	this.m_classInfo=null;
	this.m_testMethods=c_Stack.m_new.call(new c_Stack);
}
c_TestRunner.prototype.p_LoadClassInfo=function(){
	this.m_classInfo=bb_reflection_GetClass(this.m_name);
	if((this.m_classInfo)!=null){
		return;
	}
	throw c_NotFoundException.m_new.call(new c_NotFoundException,"No class named >"+this.m_name+"< found.");
}
c_TestRunner.prototype.p_ValidateClassInfo=function(){
	if(this.m_classInfo.p_ExtendsClass(bb_reflection_GetClass("TestCase"))){
		return;
	}
	var t_msg="Class >"+this.m_name+"< must inherit from TestCase.";
	throw c_InvalidArgumentException.m_new.call(new c_InvalidArgumentException,t_msg);
}
c_TestRunner.prototype.p_ExtractMethods=function(){
	var t_=this.m_classInfo.p_GetMethods(true);
	var t_2=0;
	while(t_2<t_.length){
		var t_methodInfo=t_[t_2];
		t_2=t_2+1;
		if(string_startswith(t_methodInfo.p_Name(),"Test")){
			this.m_testMethods.p_Push(t_methodInfo);
		}
	}
}
c_TestRunner.m_new=function(t_name){
	this.m_name=t_name;
	this.p_LoadClassInfo();
	this.p_ValidateClassInfo();
	this.p_ExtractMethods();
	return this;
}
c_TestRunner.prototype.p_Run=function(t_listener){
	var t_=this.m_testMethods.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_methodInfo=t_.p_NextObject();
		var t_test=null;
		try{
			t_test=object_downcast((this.m_classInfo.p_NewInstance()),c_TestCase);
		}catch(_eek_){
			if(t_ex=object_downcast(_eek_,c_Exception)){
				throw c_RuntimeException.m_new.call(new c_RuntimeException,"New failed");
			}else{
				throw _eek_;
			}
		}
		try{
			t_test.p_SetUp();
		}catch(_eek_){
			if(t_ex2=object_downcast(_eek_,c_Exception)){
				throw c_RuntimeException.m_new.call(new c_RuntimeException,"SetUp failed");
			}else{
				throw _eek_;
			}
		}
		t_listener.p_StartTest(this.m_classInfo,t_methodInfo);
		try{
			t_methodInfo.p_Invoke((t_test),[]);
		}catch(_eek_){
			if(t_ex3=object_downcast(_eek_,c_TestFailedException)){
				t_listener.p_AddFailure(this.m_classInfo,t_methodInfo,t_ex3.p_ToString());
			}else if(t_ex4=object_downcast(_eek_,c_AssertionFailedException)){
				t_listener.p_AddFailure(this.m_classInfo,t_methodInfo,t_ex4.p_ToString());
			}else if(t_ex5=object_downcast(_eek_,c_TestSkippedException)){
				t_listener.p_AddSkippedTest(this.m_classInfo,t_methodInfo,t_ex5.p_ToString());
			}else if(t_ex6=object_downcast(_eek_,c_TestIncompleteException)){
				t_listener.p_AddIncompleteTest(this.m_classInfo,t_methodInfo,t_ex6.p_ToString());
			}else{
				throw _eek_;
			}
		}
		t_listener.p_EndTest(this.m_classInfo,t_methodInfo);
		try{
			t_test.p_TearDown();
		}catch(_eek_){
			if(t_ex7=object_downcast(_eek_,c_Exception)){
				throw c_RuntimeException.m_new.call(new c_RuntimeException,"TearDown failed");
			}else{
				throw _eek_;
			}
		}
	}
}
c_TestRunner.m_new2=function(){
	return this;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	return this;
}
c_Stack.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push(t_values[t_offset+t_i]);
	}
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
}
c_Stack.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator.m_new.call(new c_Enumerator,this);
}
c_Stack.m_NIL=null;
c_Stack.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	return this;
}
c_Map2.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight2(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft2(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map2.prototype.p_Set2=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup2(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map2.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map2.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map2.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap2(){
	c_Map2.call(this);
}
c_StringMap2.prototype=extend_class(c_Map2);
c_StringMap2.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_StringMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
var bb_reflection__classesMap=null;
var bb_reflection__classes=[];
function c_Node2(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node2.m_new2=function(){
	return this;
}
function bb_reflection_GetClass(t_name){
	if(!((bb_reflection__classesMap)!=null)){
		bb_reflection__classesMap=c_StringMap2.m_new.call(new c_StringMap2);
		var t_=bb_reflection__classes;
		var t_2=0;
		while(t_2<t_.length){
			var t_c=t_[t_2];
			t_2=t_2+1;
			var t_name2=t_c.p_Name();
			bb_reflection__classesMap.p_Set2(t_name2,t_c);
			var t_i=t_name2.lastIndexOf(".");
			if(t_i==-1){
				continue;
			}
			t_name2=t_name2.slice(t_i+1);
			if(bb_reflection__classesMap.p_Contains(t_name2)){
				bb_reflection__classesMap.p_Set2(t_name2,null);
			}else{
				bb_reflection__classesMap.p_Set2(t_name2,t_c);
			}
		}
	}
	return bb_reflection__classesMap.p_Get(t_name);
}
function c__GetClass(){
	Object.call(this);
}
c__GetClass.prototype.p_GetClass=function(t_obj){
}
c__GetClass.m_new=function(){
	return this;
}
var bb_reflection__getClass=null;
function bb_reflection_GetClass2(t_obj){
	return bb_reflection__getClass.p_GetClass(t_obj);
}
function c_NotFoundException(){
	c_Exception.call(this);
}
c_NotFoundException.prototype=extend_class(c_Exception);
c_NotFoundException.m_new=function(t_message){
	c_Exception.m_new.call(this,t_message);
	return this;
}
c_NotFoundException.m_new2=function(){
	c_Exception.m_new2.call(this);
	return this;
}
function c_InvalidArgumentException(){
	c_Exception.call(this);
}
c_InvalidArgumentException.prototype=extend_class(c_Exception);
c_InvalidArgumentException.m_new=function(t_message){
	c_Exception.m_new.call(this,t_message);
	return this;
}
c_InvalidArgumentException.m_new2=function(){
	c_Exception.m_new2.call(this);
	return this;
}
function c_Enumerator(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator.m_new2=function(){
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function bb_math_Max(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	return this;
}
c_Stack2.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push4(t_values[t_offset+t_i]);
	}
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
}
c_Stack2.m_NIL=null;
c_Stack2.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack2.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack2.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack2.prototype.p_Pop=function(){
	this.m_length-=1;
	var t_v=this.m_data[this.m_length];
	this.m_data[this.m_length]=c_Stack2.m_NIL;
	return t_v;
}
function bb_reflection_GetClasses(){
	return bb_reflection__classes;
}
function c_BoolObject(){
	Object.call(this);
	this.m_value=false;
}
c_BoolObject.m_new=function(t_value){
	this.m_value=t_value;
	return this;
}
c_BoolObject.prototype.p_ToBool=function(){
	return this.m_value;
}
c_BoolObject.prototype.p_Equals=function(t_box){
	return this.m_value==t_box.m_value;
}
c_BoolObject.m_new2=function(){
	return this;
}
function c_IntObject(){
	Object.call(this);
	this.m_value=0;
}
c_IntObject.m_new=function(t_value){
	this.m_value=t_value;
	return this;
}
c_IntObject.m_new2=function(t_value){
	this.m_value=((t_value)|0);
	return this;
}
c_IntObject.prototype.p_ToInt=function(){
	return this.m_value;
}
c_IntObject.prototype.p_ToFloat=function(){
	return (this.m_value);
}
c_IntObject.prototype.p_ToString=function(){
	return String(this.m_value);
}
c_IntObject.prototype.p_Equals2=function(t_box){
	return this.m_value==t_box.m_value;
}
c_IntObject.prototype.p_Compare2=function(t_box){
	return this.m_value-t_box.m_value;
}
c_IntObject.m_new3=function(){
	return this;
}
function c_FloatObject(){
	Object.call(this);
	this.m_value=.0;
}
c_FloatObject.m_new=function(t_value){
	this.m_value=(t_value);
	return this;
}
c_FloatObject.m_new2=function(t_value){
	this.m_value=t_value;
	return this;
}
c_FloatObject.prototype.p_ToInt=function(){
	return ((this.m_value)|0);
}
c_FloatObject.prototype.p_ToFloat=function(){
	return this.m_value;
}
c_FloatObject.prototype.p_ToString=function(){
	return String(this.m_value);
}
c_FloatObject.prototype.p_Equals3=function(t_box){
	return this.m_value==t_box.m_value;
}
c_FloatObject.prototype.p_Compare3=function(t_box){
	if(this.m_value<t_box.m_value){
		return -1;
	}
	return ((this.m_value>t_box.m_value)?1:0);
}
c_FloatObject.m_new3=function(){
	return this;
}
function c_StringObject(){
	Object.call(this);
	this.m_value="";
}
c_StringObject.m_new=function(t_value){
	this.m_value=String(t_value);
	return this;
}
c_StringObject.m_new2=function(t_value){
	this.m_value=String(t_value);
	return this;
}
c_StringObject.m_new3=function(t_value){
	this.m_value=t_value;
	return this;
}
c_StringObject.prototype.p_ToString=function(){
	return this.m_value;
}
c_StringObject.prototype.p_Equals4=function(t_box){
	return this.m_value==t_box.m_value;
}
c_StringObject.prototype.p_Compare4=function(t_box){
	return string_compare(this.m_value,t_box.m_value);
}
c_StringObject.m_new4=function(){
	return this;
}
function bb_boxes_BoxBool(t_value){
	return (c_BoolObject.m_new.call(new c_BoolObject,t_value));
}
function bb_boxes_BoxInt(t_value){
	return (c_IntObject.m_new.call(new c_IntObject,t_value));
}
function bb_boxes_BoxFloat(t_value){
	return (c_FloatObject.m_new2.call(new c_FloatObject,t_value));
}
function bb_boxes_BoxString(t_value){
	return (c_StringObject.m_new3.call(new c_StringObject,t_value));
}
function bb_boxes_UnboxBool(t_box){
	return object_downcast((t_box),c_BoolObject).m_value;
}
function bb_boxes_UnboxInt(t_box){
	return object_downcast((t_box),c_IntObject).m_value;
}
function bb_boxes_UnboxFloat(t_box){
	return object_downcast((t_box),c_FloatObject).m_value;
}
function bb_boxes_UnboxString(t_box){
	return object_downcast((t_box),c_StringObject).m_value;
}
function c_R28(){
	c_ClassInfo.call(this);
}
c_R28.prototype=extend_class(c_ClassInfo);
c_R28.m_new=function(){
	c_ClassInfo.m_new.call(this,"monkey.lang.Object",1,null,[]);
	return this;
}
c_R28.prototype.p_Init=function(){
	this.p_InitR();
	return 0;
}
function c_R29(){
	c_ClassInfo.call(this);
}
c_R29.prototype=extend_class(c_ClassInfo);
c_R29.m_new=function(){
	c_ClassInfo.m_new.call(this,"monkey.lang.Throwable",33,bb_reflection__classes[0],[]);
	return this;
}
c_R29.prototype.p_Init=function(){
	this.p_InitR();
	return 0;
}
function c_R30(){
	c_ClassInfo.call(this);
}
c_R30.prototype=extend_class(c_ClassInfo);
c_R30.m_new=function(){
	c_ClassInfo.m_new.call(this,"bono.src.tests.assert.Assert",4,bb_reflection__classes[0],[]);
	return this;
}
c_R30.prototype.p_Init=function(){
	this.m__functions=new_object_array(24);
	this.m__functions[0]=(c_R31.m_new.call(new c_R31));
	this.m__functions[1]=(c_R32.m_new.call(new c_R32));
	this.m__functions[2]=(c_R33.m_new.call(new c_R33));
	this.m__functions[3]=(c_R34.m_new.call(new c_R34));
	this.m__functions[4]=(c_R35.m_new.call(new c_R35));
	this.m__functions[5]=(c_R36.m_new.call(new c_R36));
	this.m__functions[6]=(c_R37.m_new.call(new c_R37));
	this.m__functions[7]=(c_R38.m_new.call(new c_R38));
	this.m__functions[8]=(c_R39.m_new.call(new c_R39));
	this.m__functions[9]=(c_R40.m_new.call(new c_R40));
	this.m__functions[10]=(c_R41.m_new.call(new c_R41));
	this.m__functions[11]=(c_R42.m_new.call(new c_R42));
	this.m__functions[12]=(c_R43.m_new.call(new c_R43));
	this.m__functions[13]=(c_R44.m_new.call(new c_R44));
	this.m__functions[14]=(c_R45.m_new.call(new c_R45));
	this.m__functions[15]=(c_R46.m_new.call(new c_R46));
	this.m__functions[16]=(c_R47.m_new.call(new c_R47));
	this.m__functions[17]=(c_R48.m_new.call(new c_R48));
	this.m__functions[18]=(c_R49.m_new.call(new c_R49));
	this.m__functions[19]=(c_R50.m_new.call(new c_R50));
	this.m__functions[20]=(c_R51.m_new.call(new c_R51));
	this.m__functions[21]=(c_R52.m_new.call(new c_R52));
	this.m__functions[22]=(c_R53.m_new.call(new c_R53));
	this.m__functions[23]=(c_R54.m_new.call(new c_R54));
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R55.m_new.call(new c_R55));
	this.p_InitR();
	return 0;
}
function c_R56(){
	c_ClassInfo.call(this);
}
c_R56.prototype=extend_class(c_ClassInfo);
c_R56.m_new=function(){
	c_ClassInfo.m_new.call(this,"bono.src.tests.testcase.TestCase",4,bb_reflection__classes[2],[]);
	return this;
}
c_R56.prototype.p_Init=function(){
	this.m__methods=new_object_array(5);
	this.m__methods[0]=(c_R57.m_new.call(new c_R57));
	this.m__methods[1]=(c_R58.m_new.call(new c_R58));
	this.m__methods[2]=(c_R59.m_new.call(new c_R59));
	this.m__methods[3]=(c_R60.m_new.call(new c_R60));
	this.m__methods[4]=(c_R61.m_new.call(new c_R61));
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R62.m_new.call(new c_R62));
	this.p_InitR();
	return 0;
}
function c_R63(){
	c_ClassInfo.call(this);
}
c_R63.prototype=extend_class(c_ClassInfo);
c_R63.m_new=function(){
	c_ClassInfo.m_new.call(this,"bono.src.tests.testlistener.TestListener",20,bb_reflection__classes[0],[]);
	return this;
}
c_R63.prototype.p_Init=function(){
	this.m__methods=new_object_array(2);
	this.m__methods[0]=(c_R64.m_new.call(new c_R64));
	this.m__methods[1]=(c_R65.m_new.call(new c_R65));
	this.p_InitR();
	return 0;
}
function c_R66(){
	c_ClassInfo.call(this);
}
c_R66.prototype=extend_class(c_ClassInfo);
c_R66.m_new=function(){
	c_ClassInfo.m_new.call(this,"bono.src.tests.testsuite.TestSuite",0,bb_reflection__classes[0],[]);
	return this;
}
c_R66.prototype.p_NewInstance=function(){
	return (c_TestSuite.m_new.call(new c_TestSuite));
}
c_R66.prototype.p_Init=function(){
	this.m__methods=new_object_array(3);
	this.m__methods[0]=(c_R67.m_new.call(new c_R67));
	this.m__methods[1]=(c_R68.m_new.call(new c_R68));
	this.m__methods[2]=(c_R69.m_new.call(new c_R69));
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R70.m_new.call(new c_R70));
	this.p_InitR();
	return 0;
}
function c_R71(){
	c_ClassInfo.call(this);
}
c_R71.prototype=extend_class(c_ClassInfo);
c_R71.m_new=function(){
	c_ClassInfo.m_new.call(this,"bono.src.tests.testreportsimple.TestReportSimple",0,bb_reflection__classes[0],[bb_reflection__classes[4]]);
	return this;
}
c_R71.prototype.p_NewInstance=function(){
	return (c_TestReportSimple.m_new.call(new c_TestReportSimple));
}
c_R71.prototype.p_Init=function(){
	this.m__consts=new_object_array(4);
	this.m__consts[0]=c_ConstInfo.m_new.call(new c_ConstInfo,"PASSED",2,bb_reflection__intClass,(c_IntObject.m_new.call(new c_IntObject,0)));
	this.m__consts[1]=c_ConstInfo.m_new.call(new c_ConstInfo,"FAILED",2,bb_reflection__intClass,(c_IntObject.m_new.call(new c_IntObject,1)));
	this.m__consts[2]=c_ConstInfo.m_new.call(new c_ConstInfo,"SKIPPED",2,bb_reflection__intClass,(c_IntObject.m_new.call(new c_IntObject,2)));
	this.m__consts[3]=c_ConstInfo.m_new.call(new c_ConstInfo,"INCOMPLETE",2,bb_reflection__intClass,(c_IntObject.m_new.call(new c_IntObject,3)));
	this.m__fields=new_object_array(4);
	this.m__fields[0]=(c_R72.m_new.call(new c_R72));
	this.m__fields[1]=(c_R73.m_new.call(new c_R73));
	this.m__fields[2]=(c_R74.m_new.call(new c_R74));
	this.m__fields[3]=(c_R75.m_new.call(new c_R75));
	this.m__methods=new_object_array(9);
	this.m__methods[0]=(c_R76.m_new.call(new c_R76));
	this.m__methods[1]=(c_R77.m_new.call(new c_R77));
	this.m__methods[2]=(c_R78.m_new.call(new c_R78));
	this.m__methods[3]=(c_R79.m_new.call(new c_R79));
	this.m__methods[4]=(c_R80.m_new.call(new c_R80));
	this.m__methods[5]=(c_R81.m_new.call(new c_R81));
	this.m__methods[6]=(c_R82.m_new.call(new c_R82));
	this.m__methods[7]=(c_R83.m_new.call(new c_R83));
	this.m__methods[8]=(c_R84.m_new.call(new c_R84));
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R85.m_new.call(new c_R85));
	this.p_InitR();
	return 0;
}
function c_R86(){
	c_ClassInfo.call(this);
}
c_R86.prototype=extend_class(c_ClassInfo);
c_R86.m_new=function(){
	c_ClassInfo.m_new.call(this,"bono.src.tests.testrunner.TestRunner",0,bb_reflection__classes[0],[]);
	return this;
}
c_R86.prototype.p_NewInstance=function(){
	return (c_TestRunner.m_new2.call(new c_TestRunner));
}
c_R86.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R87.m_new.call(new c_R87));
	this.m__methods=new_object_array(4);
	this.m__methods[0]=(c_R89.m_new.call(new c_R89));
	this.m__methods[1]=(c_R90.m_new.call(new c_R90));
	this.m__methods[2]=(c_R91.m_new.call(new c_R91));
	this.m__methods[3]=(c_R92.m_new.call(new c_R92));
	this.m__ctors=new_object_array(2);
	this.m__ctors[0]=(c_R88.m_new.call(new c_R88));
	this.m__ctors[1]=(c_R93.m_new.call(new c_R93));
	this.p_InitR();
	return 0;
}
function c_R94(){
	c_ClassInfo.call(this);
}
c_R94.prototype=extend_class(c_ClassInfo);
c_R94.m_new=function(){
	c_ClassInfo.m_new.call(this,"monkey.boxes.BoolObject",0,bb_reflection__classes[0],[]);
	bb_reflection__boolClass=(this);
	return this;
}
c_R94.prototype.p_NewInstance=function(){
	return (c_BoolObject.m_new2.call(new c_BoolObject));
}
c_R94.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R95.m_new.call(new c_R95));
	this.m__methods=new_object_array(2);
	this.m__methods[0]=(c_R97.m_new.call(new c_R97));
	this.m__methods[1]=(c_R98.m_new.call(new c_R98));
	this.m__ctors=new_object_array(2);
	this.m__ctors[0]=(c_R96.m_new.call(new c_R96));
	this.m__ctors[1]=(c_R99.m_new.call(new c_R99));
	this.p_InitR();
	return 0;
}
var bb_reflection__boolClass=null;
function c_R100(){
	c_ClassInfo.call(this);
}
c_R100.prototype=extend_class(c_ClassInfo);
c_R100.m_new=function(){
	c_ClassInfo.m_new.call(this,"monkey.boxes.IntObject",0,bb_reflection__classes[0],[]);
	bb_reflection__intClass=(this);
	return this;
}
c_R100.prototype.p_NewInstance=function(){
	return (c_IntObject.m_new3.call(new c_IntObject));
}
c_R100.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R101.m_new.call(new c_R101));
	this.m__methods=new_object_array(5);
	this.m__methods[0]=(c_R104.m_new.call(new c_R104));
	this.m__methods[1]=(c_R105.m_new.call(new c_R105));
	this.m__methods[2]=(c_R106.m_new.call(new c_R106));
	this.m__methods[3]=(c_R107.m_new.call(new c_R107));
	this.m__methods[4]=(c_R108.m_new.call(new c_R108));
	this.m__ctors=new_object_array(3);
	this.m__ctors[0]=(c_R102.m_new.call(new c_R102));
	this.m__ctors[1]=(c_R103.m_new.call(new c_R103));
	this.m__ctors[2]=(c_R109.m_new.call(new c_R109));
	this.p_InitR();
	return 0;
}
var bb_reflection__intClass=null;
function c_R110(){
	c_ClassInfo.call(this);
}
c_R110.prototype=extend_class(c_ClassInfo);
c_R110.m_new=function(){
	c_ClassInfo.m_new.call(this,"monkey.boxes.FloatObject",0,bb_reflection__classes[0],[]);
	bb_reflection__floatClass=(this);
	return this;
}
c_R110.prototype.p_NewInstance=function(){
	return (c_FloatObject.m_new3.call(new c_FloatObject));
}
c_R110.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R111.m_new.call(new c_R111));
	this.m__methods=new_object_array(5);
	this.m__methods[0]=(c_R114.m_new.call(new c_R114));
	this.m__methods[1]=(c_R115.m_new.call(new c_R115));
	this.m__methods[2]=(c_R116.m_new.call(new c_R116));
	this.m__methods[3]=(c_R117.m_new.call(new c_R117));
	this.m__methods[4]=(c_R118.m_new.call(new c_R118));
	this.m__ctors=new_object_array(3);
	this.m__ctors[0]=(c_R112.m_new.call(new c_R112));
	this.m__ctors[1]=(c_R113.m_new.call(new c_R113));
	this.m__ctors[2]=(c_R119.m_new.call(new c_R119));
	this.p_InitR();
	return 0;
}
var bb_reflection__floatClass=null;
function c_R120(){
	c_ClassInfo.call(this);
}
c_R120.prototype=extend_class(c_ClassInfo);
c_R120.m_new=function(){
	c_ClassInfo.m_new.call(this,"monkey.boxes.StringObject",0,bb_reflection__classes[0],[]);
	bb_reflection__stringClass=(this);
	return this;
}
c_R120.prototype.p_NewInstance=function(){
	return (c_StringObject.m_new4.call(new c_StringObject));
}
c_R120.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R121.m_new.call(new c_R121));
	this.m__methods=new_object_array(3);
	this.m__methods[0]=(c_R125.m_new.call(new c_R125));
	this.m__methods[1]=(c_R126.m_new.call(new c_R126));
	this.m__methods[2]=(c_R127.m_new.call(new c_R127));
	this.m__ctors=new_object_array(4);
	this.m__ctors[0]=(c_R122.m_new.call(new c_R122));
	this.m__ctors[1]=(c_R123.m_new.call(new c_R123));
	this.m__ctors[2]=(c_R124.m_new.call(new c_R124));
	this.m__ctors[3]=(c_R128.m_new.call(new c_R128));
	this.p_InitR();
	return 0;
}
var bb_reflection__stringClass=null;
function c_FunctionInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__retType=null;
	this.m__argTypes=[];
}
c_FunctionInfo.m_new=function(t_name,t_attrs,t_retType,t_argTypes){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__retType=t_retType;
	this.m__argTypes=t_argTypes;
	return this;
}
c_FunctionInfo.m_new2=function(){
	return this;
}
var bb_reflection__functions=[];
function c_R14(){
	c_FunctionInfo.call(this);
}
c_R14.prototype=extend_class(c_FunctionInfo);
c_R14.m_new=function(){
	c_FunctionInfo.m_new.call(this,"bono.src.tests.assert.Fail",2,null,[bb_reflection__stringClass]);
	return this;
}
function c_R15(){
	c_FunctionInfo.call(this);
}
c_R15.prototype=extend_class(c_FunctionInfo);
c_R15.m_new=function(){
	c_FunctionInfo.m_new.call(this,"bono.src.tests.assert.FailWithDetails",2,null,[bb_reflection__stringClass,bb_reflection__stringClass,bb_reflection__stringClass]);
	return this;
}
function c_R16(){
	c_FunctionInfo.call(this);
}
c_R16.prototype=extend_class(c_FunctionInfo);
c_R16.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.lang.Print",1,bb_reflection__intClass,[bb_reflection__stringClass]);
	return this;
}
function c_R17(){
	c_FunctionInfo.call(this);
}
c_R17.prototype=extend_class(c_FunctionInfo);
c_R17.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.lang.Error",1,bb_reflection__intClass,[bb_reflection__stringClass]);
	return this;
}
function c_R18(){
	c_FunctionInfo.call(this);
}
c_R18.prototype=extend_class(c_FunctionInfo);
c_R18.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.boxes.BoxBool",0,bb_reflection__classes[0],[bb_reflection__boolClass]);
	return this;
}
function c_R19(){
	c_FunctionInfo.call(this);
}
c_R19.prototype=extend_class(c_FunctionInfo);
c_R19.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.boxes.BoxInt",0,bb_reflection__classes[0],[bb_reflection__intClass]);
	return this;
}
function c_R20(){
	c_FunctionInfo.call(this);
}
c_R20.prototype=extend_class(c_FunctionInfo);
c_R20.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.boxes.BoxFloat",0,bb_reflection__classes[0],[bb_reflection__floatClass]);
	return this;
}
function c_R21(){
	c_FunctionInfo.call(this);
}
c_R21.prototype=extend_class(c_FunctionInfo);
c_R21.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.boxes.BoxString",0,bb_reflection__classes[0],[bb_reflection__stringClass]);
	return this;
}
function c_R22(){
	c_FunctionInfo.call(this);
}
c_R22.prototype=extend_class(c_FunctionInfo);
c_R22.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.boxes.UnboxBool",0,bb_reflection__boolClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R23(){
	c_FunctionInfo.call(this);
}
c_R23.prototype=extend_class(c_FunctionInfo);
c_R23.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.boxes.UnboxInt",0,bb_reflection__intClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R24(){
	c_FunctionInfo.call(this);
}
c_R24.prototype=extend_class(c_FunctionInfo);
c_R24.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.boxes.UnboxFloat",0,bb_reflection__floatClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R25(){
	c_FunctionInfo.call(this);
}
c_R25.prototype=extend_class(c_FunctionInfo);
c_R25.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.boxes.UnboxString",0,bb_reflection__stringClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R26(){
	c_FunctionInfo.call(this);
}
c_R26.prototype=extend_class(c_FunctionInfo);
c_R26.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.lang.DebugLog",1,bb_reflection__intClass,[bb_reflection__stringClass]);
	return this;
}
function c_R27(){
	c_FunctionInfo.call(this);
}
c_R27.prototype=extend_class(c_FunctionInfo);
c_R27.m_new=function(){
	c_FunctionInfo.m_new.call(this,"monkey.lang.DebugStop",1,bb_reflection__intClass,[]);
	return this;
}
function c___GetClass(){
	c__GetClass.call(this);
}
c___GetClass.prototype=extend_class(c__GetClass);
c___GetClass.m_new=function(){
	c__GetClass.m_new.call(this);
	return this;
}
c___GetClass.prototype.p_GetClass=function(t_o){
	if(object_downcast((t_o),c_StringObject)!=null){
		return bb_reflection__classes[11];
	}
	if(object_downcast((t_o),c_FloatObject)!=null){
		return bb_reflection__classes[10];
	}
	if(object_downcast((t_o),c_IntObject)!=null){
		return bb_reflection__classes[9];
	}
	if(object_downcast((t_o),c_BoolObject)!=null){
		return bb_reflection__classes[8];
	}
	if(object_downcast((t_o),c_TestRunner)!=null){
		return bb_reflection__classes[7];
	}
	if(object_downcast((t_o),c_TestReportSimple)!=null){
		return bb_reflection__classes[6];
	}
	if(object_downcast((t_o),c_TestSuite)!=null){
		return bb_reflection__classes[5];
	}
	if(object_implements((t_o),"c_TestListener")!=null){
		return bb_reflection__classes[4];
	}
	if(object_downcast((t_o),c_TestCase)!=null){
		return bb_reflection__classes[3];
	}
	if(object_downcast((t_o),c_Assert)!=null){
		return bb_reflection__classes[2];
	}
	if(object_downcast((t_o),ThrowableObject)!=null){
		return bb_reflection__classes[1];
	}
	if(t_o!=null){
		return bb_reflection__classes[0];
	}
	return bb_reflection__unknownClass;
}
function bb_reflection___init(){
	bb_reflection__classes=new_object_array(12);
	bb_reflection__classes[0]=(c_R28.m_new.call(new c_R28));
	bb_reflection__classes[1]=(c_R29.m_new.call(new c_R29));
	bb_reflection__classes[2]=(c_R30.m_new.call(new c_R30));
	bb_reflection__classes[3]=(c_R56.m_new.call(new c_R56));
	bb_reflection__classes[4]=(c_R63.m_new.call(new c_R63));
	bb_reflection__classes[5]=(c_R66.m_new.call(new c_R66));
	bb_reflection__classes[6]=(c_R71.m_new.call(new c_R71));
	bb_reflection__classes[7]=(c_R86.m_new.call(new c_R86));
	bb_reflection__classes[8]=(c_R94.m_new.call(new c_R94));
	bb_reflection__classes[9]=(c_R100.m_new.call(new c_R100));
	bb_reflection__classes[10]=(c_R110.m_new.call(new c_R110));
	bb_reflection__classes[11]=(c_R120.m_new.call(new c_R120));
	bb_reflection__classes[0].p_Init();
	bb_reflection__classes[1].p_Init();
	bb_reflection__classes[2].p_Init();
	bb_reflection__classes[3].p_Init();
	bb_reflection__classes[4].p_Init();
	bb_reflection__classes[5].p_Init();
	bb_reflection__classes[6].p_Init();
	bb_reflection__classes[7].p_Init();
	bb_reflection__classes[8].p_Init();
	bb_reflection__classes[9].p_Init();
	bb_reflection__classes[10].p_Init();
	bb_reflection__classes[11].p_Init();
	bb_reflection__functions=new_object_array(14);
	bb_reflection__functions[0]=(c_R14.m_new.call(new c_R14));
	bb_reflection__functions[1]=(c_R15.m_new.call(new c_R15));
	bb_reflection__functions[2]=(c_R16.m_new.call(new c_R16));
	bb_reflection__functions[3]=(c_R17.m_new.call(new c_R17));
	bb_reflection__functions[4]=(c_R18.m_new.call(new c_R18));
	bb_reflection__functions[5]=(c_R19.m_new.call(new c_R19));
	bb_reflection__functions[6]=(c_R20.m_new.call(new c_R20));
	bb_reflection__functions[7]=(c_R21.m_new.call(new c_R21));
	bb_reflection__functions[8]=(c_R22.m_new.call(new c_R22));
	bb_reflection__functions[9]=(c_R23.m_new.call(new c_R23));
	bb_reflection__functions[10]=(c_R24.m_new.call(new c_R24));
	bb_reflection__functions[11]=(c_R25.m_new.call(new c_R25));
	bb_reflection__functions[12]=(c_R26.m_new.call(new c_R26));
	bb_reflection__functions[13]=(c_R27.m_new.call(new c_R27));
	bb_reflection__getClass=(c___GetClass.m_new.call(new c___GetClass));
	return 0;
}
var bb_reflection__init=0;
function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	if((bb_app3__app)!=null){
		error("App has already been created");
	}
	bb_app3__app=this;
	bb_app3__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	bb_app3__game.SetDelegate(bb_app3__delegate);
	return this;
}
c_App.prototype.p_OnResize=function(){
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	return 0;
}
c_App.prototype.p_OnResume=function(){
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	return 0;
}
c_App.prototype.p_OnRender=function(){
	return 0;
}
c_App.prototype.p_OnClose=function(){
	bb_app3_EndApp();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	this.p_OnClose();
	return 0;
}
function c_App2(){
	c_App.call(this);
	this.m_timer=null;
	this.m_renderable=null;
	this.m_updateable=null;
	this.m_suspendable=null;
}
c_App2.prototype=extend_class(c_App);
c_App2.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_App2.prototype.p_GetTargetFps=function(){
	return 60;
}
c_App2.prototype.p_Run2=function(){
}
c_App2.prototype.p_OnCreate=function(){
	bb_app3_SetUpdateRate(this.p_GetTargetFps());
	this.m_timer=c_DeltaTimer.m_new.call(new c_DeltaTimer,(this.p_GetTargetFps()));
	c_Director.m_Shared().p_SetApp(this);
	this.p_Run2();
	return 0;
}
c_App2.prototype.p_OnRender=function(){
	bb_graphics2_Cls(0.0,0.0,0.0);
	bb_asyncevent_UpdateAsyncEvents();
	if((this.m_renderable)!=null){
		this.m_renderable.p_OnRender();
	}
	return 0;
}
c_App2.prototype.p_OnUpdate=function(){
	this.m_timer.p_OnUpdate();
	if((this.m_updateable)!=null){
		this.m_updateable.p_OnUpdate2(this.m_timer);
	}
	return 0;
}
c_App2.prototype.p_OnResume=function(){
	this.m_timer.p_Play();
	if((this.m_suspendable)!=null){
		this.m_suspendable.p_OnResume();
	}
	return 0;
}
c_App2.prototype.p_OnSuspend=function(){
	this.m_timer.p_Pause();
	if((this.m_suspendable)!=null){
		this.m_suspendable.p_OnSuspend();
	}
	return 0;
}
c_App2.prototype.p_GetDirector=function(){
	return c_Director.m_Shared();
}
c_App2.prototype.p_GetVirtualSize=function(){
	return c_DeviceNonNative.m_GetSize();
}
function c_App3(){
	c_App2.call(this);
}
c_App3.prototype=extend_class(c_App2);
c_App3.m_new=function(){
	c_App2.m_new.call(this);
	return this;
}
c_App3.prototype.p_Run2=function(){
	this.p_GetDirector().p_AddScene("race",(c_RaceScene.m_new.call(new c_RaceScene)));
	this.p_GetDirector().p_GotoScene("race");
}
var bb_app3__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	this.m__graphics=(new gxtkGraphics);
	bb_graphics2_SetGraphicsDevice(this.m__graphics);
	bb_graphics2_SetFont(null,32);
	this.m__audio=(new gxtkAudio);
	bb_audio_SetAudioDevice(this.m__audio);
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	bb_input_SetInputDevice(this.m__input);
	bb_app3_ValidateDeviceWindow(false);
	bb_app3_EnumDisplayModes();
	bb_app3__app.p_OnCreate();
}
c_GameDelegate.prototype.SuspendGame=function(){
	bb_app3__app.p_OnSuspend();
	this.m__audio.Suspend();
}
c_GameDelegate.prototype.ResumeGame=function(){
	this.m__audio.Resume();
	bb_app3__app.p_OnResume();
}
c_GameDelegate.prototype.UpdateGame=function(){
	bb_app3_ValidateDeviceWindow(true);
	this.m__input.p_BeginUpdate();
	bb_app3__app.p_OnUpdate();
	this.m__input.p_EndUpdate();
}
c_GameDelegate.prototype.RenderGame=function(){
	bb_app3_ValidateDeviceWindow(true);
	var t_mode=this.m__graphics.BeginRender();
	if((t_mode)!=0){
		bb_graphics2_BeginRender();
	}
	if(t_mode==2){
		bb_app3__app.p_OnLoading();
	}else{
		bb_app3__app.p_OnRender();
	}
	if((t_mode)!=0){
		bb_graphics2_EndRender();
	}
	this.m__graphics.EndRender();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	this.m__input.p_KeyEvent(t_event,t_data);
	if(t_event!=1){
		return;
	}
	var t_1=t_data;
	if(t_1==432){
		bb_app3__app.p_OnClose();
	}else{
		if(t_1==416){
			bb_app3__app.p_OnBack();
		}
	}
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	this.m__graphics.DiscardGraphics();
}
var bb_app3__delegate=null;
var bb_app3__game=null;
function bbMain(){
	c_App3.m_new.call(new c_App3);
	return 0;
}
function c_ConstInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__type=null;
	this.m__value=null;
}
c_ConstInfo.m_new=function(t_name,t_attrs,t_type,t_value){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__type=t_type;
	this.m__value=t_value;
	return this;
}
c_ConstInfo.m_new2=function(){
	return this;
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	return this;
}
c_Stack3.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack3.prototype.p_Push7=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack3.prototype.p_Push8=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push7(t_values[t_offset+t_i]);
	}
}
c_Stack3.prototype.p_Push9=function(t_values,t_offset){
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
}
c_Stack3.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_FieldInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__type=null;
}
c_FieldInfo.m_new=function(t_name,t_attrs,t_type){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__type=t_type;
	return this;
}
c_FieldInfo.m_new2=function(){
	return this;
}
function c_Stack4(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack4.m_new=function(){
	return this;
}
c_Stack4.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack4.prototype.p_Push10=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack4.prototype.p_Push11=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push10(t_values[t_offset+t_i]);
	}
}
c_Stack4.prototype.p_Push12=function(t_values,t_offset){
	this.p_Push11(t_values,t_offset,t_values.length-t_offset);
}
c_Stack4.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_GlobalInfo(){
	Object.call(this);
}
function c_Stack5(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack5.m_new=function(){
	return this;
}
c_Stack5.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack5.prototype.p_Push13=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack5.prototype.p_Push14=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push13(t_values[t_offset+t_i]);
	}
}
c_Stack5.prototype.p_Push15=function(t_values,t_offset){
	this.p_Push14(t_values,t_offset,t_values.length-t_offset);
}
c_Stack5.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Stack6(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack6.m_new=function(){
	return this;
}
c_Stack6.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack6.prototype.p_Push16=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack6.prototype.p_Push17=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push16(t_values[t_offset+t_i]);
	}
}
c_Stack6.prototype.p_Push18=function(t_values,t_offset){
	this.p_Push17(t_values,t_offset,t_values.length-t_offset);
}
c_Stack6.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_R31(){
	c_FunctionInfo.call(this);
}
c_R31.prototype=extend_class(c_FunctionInfo);
c_R31.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertEquals",0,null,[bb_reflection__intClass,bb_reflection__intClass]);
	return this;
}
function c_R32(){
	c_FunctionInfo.call(this);
}
c_R32.prototype=extend_class(c_FunctionInfo);
c_R32.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertEquals",0,null,[bb_reflection__floatClass,bb_reflection__floatClass]);
	return this;
}
function c_R33(){
	c_FunctionInfo.call(this);
}
c_R33.prototype=extend_class(c_FunctionInfo);
c_R33.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertEquals",0,null,[bb_reflection__stringClass,bb_reflection__stringClass]);
	return this;
}
function c_R34(){
	c_FunctionInfo.call(this);
}
c_R34.prototype=extend_class(c_FunctionInfo);
c_R34.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertNotEquals",0,null,[bb_reflection__intClass,bb_reflection__intClass]);
	return this;
}
function c_R35(){
	c_FunctionInfo.call(this);
}
c_R35.prototype=extend_class(c_FunctionInfo);
c_R35.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertNotEquals",0,null,[bb_reflection__floatClass,bb_reflection__floatClass]);
	return this;
}
function c_R36(){
	c_FunctionInfo.call(this);
}
c_R36.prototype=extend_class(c_FunctionInfo);
c_R36.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertNotEquals",0,null,[bb_reflection__stringClass,bb_reflection__stringClass]);
	return this;
}
function c_R37(){
	c_FunctionInfo.call(this);
}
c_R37.prototype=extend_class(c_FunctionInfo);
c_R37.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertGreaterThan",0,null,[bb_reflection__intClass,bb_reflection__intClass]);
	return this;
}
function c_R38(){
	c_FunctionInfo.call(this);
}
c_R38.prototype=extend_class(c_FunctionInfo);
c_R38.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertGreaterThan",0,null,[bb_reflection__floatClass,bb_reflection__floatClass]);
	return this;
}
function c_R39(){
	c_FunctionInfo.call(this);
}
c_R39.prototype=extend_class(c_FunctionInfo);
c_R39.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertGreaterThanOrEqual",0,null,[bb_reflection__intClass,bb_reflection__intClass]);
	return this;
}
function c_R40(){
	c_FunctionInfo.call(this);
}
c_R40.prototype=extend_class(c_FunctionInfo);
c_R40.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertGreaterThanOrEqual",0,null,[bb_reflection__floatClass,bb_reflection__floatClass]);
	return this;
}
function c_R41(){
	c_FunctionInfo.call(this);
}
c_R41.prototype=extend_class(c_FunctionInfo);
c_R41.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertLessThan",0,null,[bb_reflection__intClass,bb_reflection__intClass]);
	return this;
}
function c_R42(){
	c_FunctionInfo.call(this);
}
c_R42.prototype=extend_class(c_FunctionInfo);
c_R42.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertLessThan",0,null,[bb_reflection__floatClass,bb_reflection__floatClass]);
	return this;
}
function c_R43(){
	c_FunctionInfo.call(this);
}
c_R43.prototype=extend_class(c_FunctionInfo);
c_R43.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertLessThanOrEqual",0,null,[bb_reflection__intClass,bb_reflection__intClass]);
	return this;
}
function c_R44(){
	c_FunctionInfo.call(this);
}
c_R44.prototype=extend_class(c_FunctionInfo);
c_R44.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertLessThanOrEqual",0,null,[bb_reflection__floatClass,bb_reflection__floatClass]);
	return this;
}
function c_R45(){
	c_FunctionInfo.call(this);
}
c_R45.prototype=extend_class(c_FunctionInfo);
c_R45.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertStringStartsWith",0,null,[bb_reflection__stringClass,bb_reflection__stringClass]);
	return this;
}
function c_R46(){
	c_FunctionInfo.call(this);
}
c_R46.prototype=extend_class(c_FunctionInfo);
c_R46.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertStringNotStartsWith",0,null,[bb_reflection__stringClass,bb_reflection__stringClass]);
	return this;
}
function c_R47(){
	c_FunctionInfo.call(this);
}
c_R47.prototype=extend_class(c_FunctionInfo);
c_R47.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertStringEndsWith",0,null,[bb_reflection__stringClass,bb_reflection__stringClass]);
	return this;
}
function c_R48(){
	c_FunctionInfo.call(this);
}
c_R48.prototype=extend_class(c_FunctionInfo);
c_R48.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertStringNotEndsWith",0,null,[bb_reflection__stringClass,bb_reflection__stringClass]);
	return this;
}
function c_R49(){
	c_FunctionInfo.call(this);
}
c_R49.prototype=extend_class(c_FunctionInfo);
c_R49.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertStringContains",0,null,[bb_reflection__stringClass,bb_reflection__stringClass]);
	return this;
}
function c_R50(){
	c_FunctionInfo.call(this);
}
c_R50.prototype=extend_class(c_FunctionInfo);
c_R50.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertStringNotContains",0,null,[bb_reflection__stringClass,bb_reflection__stringClass]);
	return this;
}
function c_R51(){
	c_FunctionInfo.call(this);
}
c_R51.prototype=extend_class(c_FunctionInfo);
c_R51.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertTrue",0,null,[bb_reflection__boolClass]);
	return this;
}
function c_R52(){
	c_FunctionInfo.call(this);
}
c_R52.prototype=extend_class(c_FunctionInfo);
c_R52.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertFalse",0,null,[bb_reflection__boolClass]);
	return this;
}
function c_R53(){
	c_FunctionInfo.call(this);
}
c_R53.prototype=extend_class(c_FunctionInfo);
c_R53.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertNull",0,null,[bb_reflection__classes[0]]);
	return this;
}
function c_R54(){
	c_FunctionInfo.call(this);
}
c_R54.prototype=extend_class(c_FunctionInfo);
c_R54.m_new=function(){
	c_FunctionInfo.m_new.call(this,"AssertNotNull",0,null,[bb_reflection__classes[0]]);
	return this;
}
function c_R55(){
	c_FunctionInfo.call(this);
}
c_R55.prototype=extend_class(c_FunctionInfo);
c_R55.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[2],[]);
	return this;
}
function c_R57(){
	c_MethodInfo.call(this);
}
c_R57.prototype=extend_class(c_MethodInfo);
c_R57.m_new=function(){
	c_MethodInfo.m_new.call(this,"SetUp",0,null,[]);
	return this;
}
c_R57.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestCase).p_SetUp();
	return null;
}
function c_R58(){
	c_MethodInfo.call(this);
}
c_R58.prototype=extend_class(c_MethodInfo);
c_R58.m_new=function(){
	c_MethodInfo.m_new.call(this,"TearDown",0,null,[]);
	return this;
}
c_R58.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestCase).p_TearDown();
	return null;
}
function c_R59(){
	c_MethodInfo.call(this);
}
c_R59.prototype=extend_class(c_MethodInfo);
c_R59.m_new=function(){
	c_MethodInfo.m_new.call(this,"MarkTestSkipped",0,null,[bb_reflection__stringClass]);
	return this;
}
c_R59.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestCase).p_MarkTestSkipped(object_downcast((t_p[0]),c_StringObject).m_value);
	return null;
}
function c_R60(){
	c_MethodInfo.call(this);
}
c_R60.prototype=extend_class(c_MethodInfo);
c_R60.m_new=function(){
	c_MethodInfo.m_new.call(this,"MarkTestIncomplete",0,null,[bb_reflection__stringClass]);
	return this;
}
c_R60.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestCase).p_MarkTestIncomplete(object_downcast((t_p[0]),c_StringObject).m_value);
	return null;
}
function c_R61(){
	c_MethodInfo.call(this);
}
c_R61.prototype=extend_class(c_MethodInfo);
c_R61.m_new=function(){
	c_MethodInfo.m_new.call(this,"Fail",0,null,[bb_reflection__stringClass]);
	return this;
}
c_R61.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestCase).p_Fail(object_downcast((t_p[0]),c_StringObject).m_value);
	return null;
}
function c_R62(){
	c_FunctionInfo.call(this);
}
c_R62.prototype=extend_class(c_FunctionInfo);
c_R62.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[3],[]);
	return this;
}
function c_R64(){
	c_MethodInfo.call(this);
}
c_R64.prototype=extend_class(c_MethodInfo);
c_R64.m_new=function(){
	c_MethodInfo.m_new.call(this,"StartTestSuite",4,null,[bb_reflection__classes[5]]);
	return this;
}
c_R64.prototype.p_Invoke=function(t_i,t_p){
	object_implements((t_i),"c_TestListener").p_StartTestSuite(object_downcast((t_p[0]),c_TestSuite));
	return null;
}
function c_R65(){
	c_MethodInfo.call(this);
}
c_R65.prototype=extend_class(c_MethodInfo);
c_R65.m_new=function(){
	c_MethodInfo.m_new.call(this,"EndTestSuite",4,null,[bb_reflection__classes[5]]);
	return this;
}
c_R65.prototype.p_Invoke=function(t_i,t_p){
	object_implements((t_i),"c_TestListener").p_EndTestSuite(object_downcast((t_p[0]),c_TestSuite));
	return null;
}
function c_R67(){
	c_MethodInfo.call(this);
}
c_R67.prototype=extend_class(c_MethodInfo);
c_R67.m_new=function(){
	c_MethodInfo.m_new.call(this,"Add",0,null,[bb_reflection__classes[7]]);
	return this;
}
c_R67.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestSuite).p_Add(object_downcast((t_p[0]),c_TestRunner));
	return null;
}
function c_R68(){
	c_MethodInfo.call(this);
}
c_R68.prototype=extend_class(c_MethodInfo);
c_R68.m_new=function(){
	c_MethodInfo.m_new.call(this,"Autodiscover",0,bb_reflection__intClass,[]);
	return this;
}
c_R68.prototype.p_Invoke=function(t_i,t_p){
	return (c_IntObject.m_new.call(new c_IntObject,object_downcast((t_i),c_TestSuite).p_Autodiscover()));
}
function c_R69(){
	c_MethodInfo.call(this);
}
c_R69.prototype=extend_class(c_MethodInfo);
c_R69.m_new=function(){
	c_MethodInfo.m_new.call(this,"Run",0,null,[bb_reflection__classes[4]]);
	return this;
}
c_R69.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestSuite).p_Run(object_implements((t_p[0]),"c_TestListener"));
	return null;
}
function c_R70(){
	c_FunctionInfo.call(this);
}
c_R70.prototype=extend_class(c_FunctionInfo);
c_R70.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[5],[]);
	return this;
}
function c_R72(){
	c_FieldInfo.call(this);
}
c_R72.prototype=extend_class(c_FieldInfo);
c_R72.m_new=function(){
	c_FieldInfo.m_new.call(this,"result",2,bb_reflection__intClass);
	return this;
}
function c_R73(){
	c_FieldInfo.call(this);
}
c_R73.prototype=extend_class(c_FieldInfo);
c_R73.m_new=function(){
	c_FieldInfo.m_new.call(this,"numTests",2,bb_reflection__intClass);
	return this;
}
function c_R74(){
	c_FieldInfo.call(this);
}
c_R74.prototype=extend_class(c_FieldInfo);
c_R74.m_new=function(){
	c_FieldInfo.m_new.call(this,"printCache",2,bb_reflection__stringClass);
	return this;
}
function c_R75(){
	c_FieldInfo.call(this);
}
c_R75.prototype=extend_class(c_FieldInfo);
c_R75.m_new=function(){
	c_FieldInfo.m_new.call(this,"verbose",0,bb_reflection__boolClass);
	return this;
}
function c_R76(){
	c_MethodInfo.call(this);
}
c_R76.prototype=extend_class(c_MethodInfo);
c_R76.m_new=function(){
	c_MethodInfo.m_new.call(this,"StartTestSuite",0,null,[bb_reflection__classes[5]]);
	return this;
}
c_R76.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestReportSimple).p_StartTestSuite(object_downcast((t_p[0]),c_TestSuite));
	return null;
}
function c_R77(){
	c_MethodInfo.call(this);
}
c_R77.prototype=extend_class(c_MethodInfo);
c_R77.m_new=function(){
	c_MethodInfo.m_new.call(this,"EndTestSuite",0,null,[bb_reflection__classes[5]]);
	return this;
}
c_R77.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestReportSimple).p_EndTestSuite(object_downcast((t_p[0]),c_TestSuite));
	return null;
}
function c_R78(){
	c_MethodInfo.call(this);
}
c_R78.prototype=extend_class(c_MethodInfo);
c_R78.m_new=function(){
	c_MethodInfo.m_new.call(this,"PrintResult",2,null,[]);
	return this;
}
c_R78.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestReportSimple).p_PrintResult();
	return null;
}
function c_R79(){
	c_MethodInfo.call(this);
}
c_R79.prototype=extend_class(c_MethodInfo);
c_R79.m_new=function(){
	c_MethodInfo.m_new.call(this,"FlushPrintCache",2,null,[]);
	return this;
}
c_R79.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestReportSimple).p_FlushPrintCache();
	return null;
}
function c_R80(){
	c_MethodInfo.call(this);
}
c_R80.prototype=extend_class(c_MethodInfo);
c_R80.m_new=function(){
	c_MethodInfo.m_new.call(this,"FlushPrintCacheIfRequired",2,null,[bb_reflection__intClass]);
	return this;
}
c_R80.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestReportSimple).p_FlushPrintCacheIfRequired(object_downcast((t_p[0]),c_IntObject).m_value);
	return null;
}
function c_R81(){
	c_MethodInfo.call(this);
}
c_R81.prototype=extend_class(c_MethodInfo);
c_R81.m_new=function(){
	c_MethodInfo.m_new.call(this,"GetResultText",2,bb_reflection__stringClass,[]);
	return this;
}
c_R81.prototype.p_Invoke=function(t_i,t_p){
	return (c_StringObject.m_new3.call(new c_StringObject,object_downcast((t_i),c_TestReportSimple).p_GetResultText()));
}
function c_R82(){
	c_MethodInfo.call(this);
}
c_R82.prototype=extend_class(c_MethodInfo);
c_R82.m_new=function(){
	c_MethodInfo.m_new.call(this,"GetResultDot",2,bb_reflection__stringClass,[]);
	return this;
}
c_R82.prototype.p_Invoke=function(t_i,t_p){
	return (c_StringObject.m_new3.call(new c_StringObject,object_downcast((t_i),c_TestReportSimple).p_GetResultDot()));
}
function c_R83(){
	c_MethodInfo.call(this);
}
c_R83.prototype=extend_class(c_MethodInfo);
c_R83.m_new=function(){
	c_MethodInfo.m_new.call(this,"PrintStats",2,null,[]);
	return this;
}
c_R83.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestReportSimple).p_PrintStats();
	return null;
}
function c_R84(){
	c_MethodInfo.call(this);
}
c_R84.prototype=extend_class(c_MethodInfo);
c_R84.m_new=function(){
	c_MethodInfo.m_new.call(this,"PrintSummary",2,null,[]);
	return this;
}
c_R84.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestReportSimple).p_PrintSummary();
	return null;
}
function c_R85(){
	c_FunctionInfo.call(this);
}
c_R85.prototype=extend_class(c_FunctionInfo);
c_R85.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[6],[]);
	return this;
}
function c_R87(){
	c_FieldInfo.call(this);
}
c_R87.prototype=extend_class(c_FieldInfo);
c_R87.m_new=function(){
	c_FieldInfo.m_new.call(this,"name",2,bb_reflection__stringClass);
	return this;
}
function c_R89(){
	c_MethodInfo.call(this);
}
c_R89.prototype=extend_class(c_MethodInfo);
c_R89.m_new=function(){
	c_MethodInfo.m_new.call(this,"Run",0,null,[bb_reflection__classes[4]]);
	return this;
}
c_R89.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestRunner).p_Run(object_implements((t_p[0]),"c_TestListener"));
	return null;
}
function c_R90(){
	c_MethodInfo.call(this);
}
c_R90.prototype=extend_class(c_MethodInfo);
c_R90.m_new=function(){
	c_MethodInfo.m_new.call(this,"LoadClassInfo",2,null,[]);
	return this;
}
c_R90.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestRunner).p_LoadClassInfo();
	return null;
}
function c_R91(){
	c_MethodInfo.call(this);
}
c_R91.prototype=extend_class(c_MethodInfo);
c_R91.m_new=function(){
	c_MethodInfo.m_new.call(this,"ValidateClassInfo",2,null,[]);
	return this;
}
c_R91.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestRunner).p_ValidateClassInfo();
	return null;
}
function c_R92(){
	c_MethodInfo.call(this);
}
c_R92.prototype=extend_class(c_MethodInfo);
c_R92.m_new=function(){
	c_MethodInfo.m_new.call(this,"ExtractMethods",2,null,[]);
	return this;
}
c_R92.prototype.p_Invoke=function(t_i,t_p){
	object_downcast((t_i),c_TestRunner).p_ExtractMethods();
	return null;
}
function c_R88(){
	c_FunctionInfo.call(this);
}
c_R88.prototype=extend_class(c_FunctionInfo);
c_R88.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[7],[bb_reflection__stringClass]);
	return this;
}
function c_R93(){
	c_FunctionInfo.call(this);
}
c_R93.prototype=extend_class(c_FunctionInfo);
c_R93.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[7],[]);
	return this;
}
function c_R95(){
	c_FieldInfo.call(this);
}
c_R95.prototype=extend_class(c_FieldInfo);
c_R95.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__boolClass);
	return this;
}
function c_R97(){
	c_MethodInfo.call(this);
}
c_R97.prototype=extend_class(c_MethodInfo);
c_R97.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToBool",0,bb_reflection__boolClass,[]);
	return this;
}
c_R97.prototype.p_Invoke=function(t_i,t_p){
	return (c_BoolObject.m_new.call(new c_BoolObject,object_downcast((t_i),c_BoolObject).p_ToBool()));
}
function c_R98(){
	c_MethodInfo.call(this);
}
c_R98.prototype=extend_class(c_MethodInfo);
c_R98.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[8]]);
	return this;
}
c_R98.prototype.p_Invoke=function(t_i,t_p){
	return (c_BoolObject.m_new.call(new c_BoolObject,object_downcast((t_i),c_BoolObject).p_Equals(object_downcast((t_p[0]),c_BoolObject))));
}
function c_R96(){
	c_FunctionInfo.call(this);
}
c_R96.prototype=extend_class(c_FunctionInfo);
c_R96.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[8],[bb_reflection__boolClass]);
	return this;
}
function c_R99(){
	c_FunctionInfo.call(this);
}
c_R99.prototype=extend_class(c_FunctionInfo);
c_R99.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[8],[]);
	return this;
}
function c_R101(){
	c_FieldInfo.call(this);
}
c_R101.prototype=extend_class(c_FieldInfo);
c_R101.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__intClass);
	return this;
}
function c_R104(){
	c_MethodInfo.call(this);
}
c_R104.prototype=extend_class(c_MethodInfo);
c_R104.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToInt",0,bb_reflection__intClass,[]);
	return this;
}
c_R104.prototype.p_Invoke=function(t_i,t_p){
	return (c_IntObject.m_new.call(new c_IntObject,object_downcast((t_i),c_IntObject).p_ToInt()));
}
function c_R105(){
	c_MethodInfo.call(this);
}
c_R105.prototype=extend_class(c_MethodInfo);
c_R105.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToFloat",0,bb_reflection__floatClass,[]);
	return this;
}
c_R105.prototype.p_Invoke=function(t_i,t_p){
	return (c_FloatObject.m_new2.call(new c_FloatObject,object_downcast((t_i),c_IntObject).p_ToFloat()));
}
function c_R106(){
	c_MethodInfo.call(this);
}
c_R106.prototype=extend_class(c_MethodInfo);
c_R106.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[]);
	return this;
}
c_R106.prototype.p_Invoke=function(t_i,t_p){
	return (c_StringObject.m_new3.call(new c_StringObject,object_downcast((t_i),c_IntObject).p_ToString()));
}
function c_R107(){
	c_MethodInfo.call(this);
}
c_R107.prototype=extend_class(c_MethodInfo);
c_R107.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[9]]);
	return this;
}
c_R107.prototype.p_Invoke=function(t_i,t_p){
	return (c_BoolObject.m_new.call(new c_BoolObject,object_downcast((t_i),c_IntObject).p_Equals2(object_downcast((t_p[0]),c_IntObject))));
}
function c_R108(){
	c_MethodInfo.call(this);
}
c_R108.prototype=extend_class(c_MethodInfo);
c_R108.m_new=function(){
	c_MethodInfo.m_new.call(this,"Compare",0,bb_reflection__intClass,[bb_reflection__classes[9]]);
	return this;
}
c_R108.prototype.p_Invoke=function(t_i,t_p){
	return (c_IntObject.m_new.call(new c_IntObject,object_downcast((t_i),c_IntObject).p_Compare2(object_downcast((t_p[0]),c_IntObject))));
}
function c_R102(){
	c_FunctionInfo.call(this);
}
c_R102.prototype=extend_class(c_FunctionInfo);
c_R102.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[9],[bb_reflection__intClass]);
	return this;
}
function c_R103(){
	c_FunctionInfo.call(this);
}
c_R103.prototype=extend_class(c_FunctionInfo);
c_R103.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[9],[bb_reflection__floatClass]);
	return this;
}
function c_R109(){
	c_FunctionInfo.call(this);
}
c_R109.prototype=extend_class(c_FunctionInfo);
c_R109.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[9],[]);
	return this;
}
function c_R111(){
	c_FieldInfo.call(this);
}
c_R111.prototype=extend_class(c_FieldInfo);
c_R111.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__floatClass);
	return this;
}
function c_R114(){
	c_MethodInfo.call(this);
}
c_R114.prototype=extend_class(c_MethodInfo);
c_R114.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToInt",0,bb_reflection__intClass,[]);
	return this;
}
c_R114.prototype.p_Invoke=function(t_i,t_p){
	return (c_IntObject.m_new.call(new c_IntObject,object_downcast((t_i),c_FloatObject).p_ToInt()));
}
function c_R115(){
	c_MethodInfo.call(this);
}
c_R115.prototype=extend_class(c_MethodInfo);
c_R115.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToFloat",0,bb_reflection__floatClass,[]);
	return this;
}
c_R115.prototype.p_Invoke=function(t_i,t_p){
	return (c_FloatObject.m_new2.call(new c_FloatObject,object_downcast((t_i),c_FloatObject).p_ToFloat()));
}
function c_R116(){
	c_MethodInfo.call(this);
}
c_R116.prototype=extend_class(c_MethodInfo);
c_R116.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[]);
	return this;
}
c_R116.prototype.p_Invoke=function(t_i,t_p){
	return (c_StringObject.m_new3.call(new c_StringObject,object_downcast((t_i),c_FloatObject).p_ToString()));
}
function c_R117(){
	c_MethodInfo.call(this);
}
c_R117.prototype=extend_class(c_MethodInfo);
c_R117.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[10]]);
	return this;
}
c_R117.prototype.p_Invoke=function(t_i,t_p){
	return (c_BoolObject.m_new.call(new c_BoolObject,object_downcast((t_i),c_FloatObject).p_Equals3(object_downcast((t_p[0]),c_FloatObject))));
}
function c_R118(){
	c_MethodInfo.call(this);
}
c_R118.prototype=extend_class(c_MethodInfo);
c_R118.m_new=function(){
	c_MethodInfo.m_new.call(this,"Compare",0,bb_reflection__intClass,[bb_reflection__classes[10]]);
	return this;
}
c_R118.prototype.p_Invoke=function(t_i,t_p){
	return (c_IntObject.m_new.call(new c_IntObject,object_downcast((t_i),c_FloatObject).p_Compare3(object_downcast((t_p[0]),c_FloatObject))));
}
function c_R112(){
	c_FunctionInfo.call(this);
}
c_R112.prototype=extend_class(c_FunctionInfo);
c_R112.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[10],[bb_reflection__intClass]);
	return this;
}
function c_R113(){
	c_FunctionInfo.call(this);
}
c_R113.prototype=extend_class(c_FunctionInfo);
c_R113.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[10],[bb_reflection__floatClass]);
	return this;
}
function c_R119(){
	c_FunctionInfo.call(this);
}
c_R119.prototype=extend_class(c_FunctionInfo);
c_R119.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[10],[]);
	return this;
}
function c_R121(){
	c_FieldInfo.call(this);
}
c_R121.prototype=extend_class(c_FieldInfo);
c_R121.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__stringClass);
	return this;
}
function c_R125(){
	c_MethodInfo.call(this);
}
c_R125.prototype=extend_class(c_MethodInfo);
c_R125.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[]);
	return this;
}
c_R125.prototype.p_Invoke=function(t_i,t_p){
	return (c_StringObject.m_new3.call(new c_StringObject,object_downcast((t_i),c_StringObject).p_ToString()));
}
function c_R126(){
	c_MethodInfo.call(this);
}
c_R126.prototype=extend_class(c_MethodInfo);
c_R126.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[11]]);
	return this;
}
c_R126.prototype.p_Invoke=function(t_i,t_p){
	return (c_BoolObject.m_new.call(new c_BoolObject,object_downcast((t_i),c_StringObject).p_Equals4(object_downcast((t_p[0]),c_StringObject))));
}
function c_R127(){
	c_MethodInfo.call(this);
}
c_R127.prototype=extend_class(c_MethodInfo);
c_R127.m_new=function(){
	c_MethodInfo.m_new.call(this,"Compare",0,bb_reflection__intClass,[bb_reflection__classes[11]]);
	return this;
}
c_R127.prototype.p_Invoke=function(t_i,t_p){
	return (c_IntObject.m_new.call(new c_IntObject,object_downcast((t_i),c_StringObject).p_Compare4(object_downcast((t_p[0]),c_StringObject))));
}
function c_R122(){
	c_FunctionInfo.call(this);
}
c_R122.prototype=extend_class(c_FunctionInfo);
c_R122.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[11],[bb_reflection__intClass]);
	return this;
}
function c_R123(){
	c_FunctionInfo.call(this);
}
c_R123.prototype=extend_class(c_FunctionInfo);
c_R123.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[11],[bb_reflection__floatClass]);
	return this;
}
function c_R124(){
	c_FunctionInfo.call(this);
}
c_R124.prototype=extend_class(c_FunctionInfo);
c_R124.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[11],[bb_reflection__stringClass]);
	return this;
}
function c_R128(){
	c_FunctionInfo.call(this);
}
c_R128.prototype=extend_class(c_FunctionInfo);
c_R128.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[11],[]);
	return this;
}
function c_UnknownClass(){
	c_ClassInfo.call(this);
}
c_UnknownClass.prototype=extend_class(c_ClassInfo);
c_UnknownClass.m_new=function(){
	c_ClassInfo.m_new.call(this,"?",0,null,[]);
	return this;
}
var bb_reflection__unknownClass=null;
var bb_graphics2_device=null;
function bb_graphics2_SetGraphicsDevice(t_dev){
	bb_graphics2_device=t_dev;
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	this.m_tx=t_tx;
	this.m_ty=t_ty;
	this.m_flags=this.m_flags&-2;
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	this.m_flags=t_iflags;
	if((this.m_flags&2)!=0){
		var t_=this.m_frames;
		var t_2=0;
		while(t_2<t_.length){
			var t_f=t_[t_2];
			t_2=t_2+1;
			t_f.m_x+=1;
		}
		this.m_width-=2;
	}
	if((this.m_flags&4)!=0){
		var t_3=this.m_frames;
		var t_4=0;
		while(t_4<t_3.length){
			var t_f2=t_3[t_4];
			t_4=t_4+1;
			t_f2.m_y+=1;
		}
		this.m_height-=2;
	}
	if((this.m_flags&1)!=0){
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	if(this.m_frames.length==1 && this.m_frames[0].m_x==0 && this.m_frames[0].m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		this.m_flags|=65536;
	}
	return 0;
}
c_Image.prototype.p_Init2=function(t_surf,t_nframes,t_iflags){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	this.m_height=this.m_surface.Height();
	this.m_frames=new_object_array(t_nframes);
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Init3=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_source=t_src;
	this.m_width=t_iwidth;
	this.m_height=t_iheight;
	this.m_frames=new_object_array(t_nframes);
	var t_ix=t_x;
	var t_iy=t_y;
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		if(t_ix+this.m_width>t_srcw){
			t_ix=0;
			t_iy+=this.m_height;
		}
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			error("Image frame outside surface");
		}
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		t_ix+=this.m_width;
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Width=function(){
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	return this.m_height;
}
c_Image.prototype.p_Frames=function(){
	return this.m_frames.length;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	if((this.m_matDirty)!=0){
		bb_graphics2_renderDevice.SetMatrix(bb_graphics2_context.m_ix,bb_graphics2_context.m_iy,bb_graphics2_context.m_jx,bb_graphics2_context.m_jy,bb_graphics2_context.m_tx,bb_graphics2_context.m_ty);
		this.m_matDirty=0;
	}
	return 0;
}
var bb_graphics2_context=null;
function bb_data_FixDataPath(t_path){
	var t_i=t_path.indexOf(":/",0);
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		return t_path;
	}
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		return t_path;
	}
	return "monkey://data/"+t_path;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Frame.m_new2=function(){
	return this;
}
function bb_graphics2_LoadImage(t_path,t_frameCount,t_flags){
	var t_surf=bb_graphics2_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init2(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics2_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_surf=bb_graphics2_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init3(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
	}
	return null;
}
function bb_graphics2_SetFont(t_font,t_firstChar){
	if(!((t_font)!=null)){
		if(!((bb_graphics2_context.m_defaultFont)!=null)){
			bb_graphics2_context.m_defaultFont=bb_graphics2_LoadImage("mojo_font.png",96,2);
		}
		t_font=bb_graphics2_context.m_defaultFont;
		t_firstChar=32;
	}
	bb_graphics2_context.m_font=t_font;
	bb_graphics2_context.m_firstChar=t_firstChar;
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	bb_audio_device=t_dev;
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		this.m__joyStates[t_i]=c_JoyState.m_new.call(new c_JoyState);
	}
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		return;
	}
	this.m__keyHit[t_key]+=1;
	this.m__keyHitQueue[this.m__keyHitPut]=t_key;
	this.m__keyHitPut+=1;
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		var t_state=this.m__joyStates[t_i];
		if(!BBGame.Game().PollJoystick(t_i,t_state.m_joyx,t_state.m_joyy,t_state.m_joyz,t_state.m_buttons)){
			break;
		}
		for(var t_j=0;t_j<32;t_j=t_j+1){
			var t_key=256+t_i*32+t_j;
			if(t_state.m_buttons[t_j]){
				if(!this.m__keyDown[t_key]){
					this.m__keyDown[t_key]=true;
					this.p_PutKeyHit(t_key);
				}
			}else{
				this.m__keyDown[t_key]=false;
			}
		}
	}
}
c_InputDevice.prototype.p_EndUpdate=function(){
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		this.m__keyHit[this.m__keyHitQueue[t_i]]=0;
	}
	this.m__keyHitPut=0;
	this.m__charGet=0;
	this.m__charPut=0;
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	var t_1=t_event;
	if(t_1==1){
		if(!this.m__keyDown[t_data]){
			this.m__keyDown[t_data]=true;
			this.p_PutKeyHit(t_data);
			if(t_data==1){
				this.m__keyDown[384]=true;
				this.p_PutKeyHit(384);
			}else{
				if(t_data==384){
					this.m__keyDown[1]=true;
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		if(t_1==2){
			if(this.m__keyDown[t_data]){
				this.m__keyDown[t_data]=false;
				if(t_data==1){
					this.m__keyDown[384]=false;
				}else{
					if(t_data==384){
						this.m__keyDown[1]=false;
					}
				}
			}
		}else{
			if(t_1==3){
				if(this.m__charPut<this.m__charQueue.length){
					this.m__charQueue[this.m__charPut]=t_data;
					this.m__charPut+=1;
				}
			}
		}
	}
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	var t_2=t_event;
	if(t_2==4){
		this.p_KeyEvent(1,1+t_data);
	}else{
		if(t_2==5){
			this.p_KeyEvent(2,1+t_data);
			return;
		}else{
			if(t_2==6){
			}else{
				return;
			}
		}
	}
	this.m__mouseX=t_x;
	this.m__mouseY=t_y;
	this.m__touchX[0]=t_x;
	this.m__touchY[0]=t_y;
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	var t_3=t_event;
	if(t_3==7){
		this.p_KeyEvent(1,384+t_data);
	}else{
		if(t_3==8){
			this.p_KeyEvent(2,384+t_data);
			return;
		}else{
			if(t_3==9){
			}else{
				return;
			}
		}
	}
	this.m__touchX[t_data]=t_x;
	this.m__touchY[t_data]=t_y;
	if(t_data==0){
		this.m__mouseX=t_x;
		this.m__mouseY=t_y;
	}
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_4=t_event;
	if(t_4==10){
	}else{
		return;
	}
	this.m__accelX=t_x;
	this.m__accelY=t_y;
	this.m__accelZ=t_z;
}
c_InputDevice.prototype.p_SetKeyboardEnabled=function(t_enabled){
	BBGame.Game().SetKeyboardEnabled(t_enabled);
	return 1;
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyDown[t_key];
	}
	return false;
}
c_InputDevice.prototype.p_TouchX=function(t_index){
	if(t_index>=0 && t_index<32){
		return this.m__touchX[t_index];
	}
	return 0.0;
}
c_InputDevice.prototype.p_TouchY=function(t_index){
	if(t_index>=0 && t_index<32){
		return this.m__touchY[t_index];
	}
	return 0.0;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	bb_input_device=t_dev;
	return 0;
}
var bb_app3__devWidth=0;
var bb_app3__devHeight=0;
function bb_app3_ValidateDeviceWindow(t_notifyApp){
	var t_w=bb_app3__game.GetDeviceWidth();
	var t_h=bb_app3__game.GetDeviceHeight();
	if(t_w==bb_app3__devWidth && t_h==bb_app3__devHeight){
		return;
	}
	bb_app3__devWidth=t_w;
	bb_app3__devHeight=t_h;
	if(t_notifyApp){
		bb_app3__app.p_OnResize();
	}
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	this.m__width=t_width;
	this.m__height=t_height;
	return this;
}
c_DisplayMode.m_new2=function(){
	return this;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Compare5=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare5(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map3.prototype.p_Contains2=function(t_key){
	return this.p_FindNode2(t_key)!=null;
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight3(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft3(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map3.prototype.p_Set3=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare5(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup3(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map3.prototype.p_Insert=function(t_key,t_value){
	return this.p_Set3(t_key,t_value);
}
function c_IntMap(){
	c_Map3.call(this);
}
c_IntMap.prototype=extend_class(c_Map3);
c_IntMap.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
c_IntMap.prototype.p_Compare5=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Stack7(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack7.m_new=function(){
	return this;
}
c_Stack7.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack7.prototype.p_Push19=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack7.prototype.p_Push20=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push19(t_values[t_offset+t_i]);
	}
}
c_Stack7.prototype.p_Push21=function(t_values,t_offset){
	this.p_Push20(t_values,t_offset,t_values.length-t_offset);
}
c_Stack7.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Node3(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node3.m_new2=function(){
	return this;
}
var bb_app3__displayModes=[];
var bb_app3__desktopMode=null;
function bb_app3_DeviceWidth(){
	return bb_app3__devWidth;
}
function bb_app3_DeviceHeight(){
	return bb_app3__devHeight;
}
function bb_app3_EnumDisplayModes(){
	var t_modes=bb_app3__game.GetDisplayModes();
	var t_mmap=c_IntMap.m_new.call(new c_IntMap);
	var t_mstack=c_Stack7.m_new.call(new c_Stack7);
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		var t_w=t_modes[t_i].width;
		var t_h=t_modes[t_i].height;
		var t_size=t_w<<16|t_h;
		if(t_mmap.p_Contains2(t_size)){
		}else{
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,t_modes[t_i].width,t_modes[t_i].height);
			t_mmap.p_Insert(t_size,t_mode);
			t_mstack.p_Push19(t_mode);
		}
	}
	bb_app3__displayModes=t_mstack.p_ToArray();
	var t_mode2=bb_app3__game.GetDesktopMode();
	if((t_mode2)!=null){
		bb_app3__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,t_mode2.width,t_mode2.height);
	}else{
		bb_app3__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app3_DeviceWidth(),bb_app3_DeviceHeight());
	}
}
var bb_graphics2_renderDevice=null;
function bb_graphics2_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	bb_graphics2_context.m_ix=t_ix;
	bb_graphics2_context.m_iy=t_iy;
	bb_graphics2_context.m_jx=t_jx;
	bb_graphics2_context.m_jy=t_jy;
	bb_graphics2_context.m_tx=t_tx;
	bb_graphics2_context.m_ty=t_ty;
	bb_graphics2_context.m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	bb_graphics2_context.m_matDirty=1;
	return 0;
}
function bb_graphics2_SetMatrix2(t_m){
	bb_graphics2_SetMatrix(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics2_SetColor(t_r,t_g,t_b){
	bb_graphics2_context.m_color_r=t_r;
	bb_graphics2_context.m_color_g=t_g;
	bb_graphics2_context.m_color_b=t_b;
	bb_graphics2_renderDevice.SetColor(t_r,t_g,t_b);
	return 0;
}
function bb_graphics2_SetAlpha(t_alpha){
	bb_graphics2_context.m_alpha=t_alpha;
	bb_graphics2_renderDevice.SetAlpha(t_alpha);
	return 0;
}
function bb_graphics2_SetBlend(t_blend){
	bb_graphics2_context.m_blend=t_blend;
	bb_graphics2_renderDevice.SetBlend(t_blend);
	return 0;
}
function bb_graphics2_SetScissor(t_x,t_y,t_width,t_height){
	bb_graphics2_context.m_scissor_x=t_x;
	bb_graphics2_context.m_scissor_y=t_y;
	bb_graphics2_context.m_scissor_width=t_width;
	bb_graphics2_context.m_scissor_height=t_height;
	bb_graphics2_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	return 0;
}
function bb_graphics2_BeginRender(){
	bb_graphics2_renderDevice=bb_graphics2_device;
	bb_graphics2_context.m_matrixSp=0;
	bb_graphics2_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	bb_graphics2_SetColor(255.0,255.0,255.0);
	bb_graphics2_SetAlpha(1.0);
	bb_graphics2_SetBlend(0);
	bb_graphics2_SetScissor(0.0,0.0,(bb_app3_DeviceWidth()),(bb_app3_DeviceHeight()));
	return 0;
}
function bb_graphics2_EndRender(){
	bb_graphics2_renderDevice=null;
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app3_EndApp(){
	error("");
}
var bb_app3__updateRate=0;
function bb_app3_SetUpdateRate(t_hertz){
	bb_app3__updateRate=t_hertz;
	bb_app3__game.SetUpdateRate(t_hertz);
}
function c_DeltaTimer(){
	Object.call(this);
	this.m_targetFps=.0;
	this.m_lastMillisecs=.0;
	this.m_paused=false;
	this.m_pauseOffset=.0;
	this.m__millisecs=.0;
	this.m__frameTime=.0;
	this.m__delta=.0;
}
c_DeltaTimer.m_new=function(t_fps){
	this.m_targetFps=t_fps;
	this.m_lastMillisecs=(bb_app3_Millisecs());
	return this;
}
c_DeltaTimer.m_new2=function(){
	return this;
}
c_DeltaTimer.prototype.p_frameTime=function(){
	if(this.m_paused){
		return 0.0;
	}
	return this.m__frameTime;
}
c_DeltaTimer.prototype.p_OnUpdate=function(){
	if(this.m_paused){
		return;
	}
	this.m__millisecs=(bb_app3_Millisecs())-this.m_pauseOffset;
	this.m__frameTime=this.m__millisecs-this.m_lastMillisecs;
	this.m__delta=this.p_frameTime()/(1000.0/this.m_targetFps);
	this.m_lastMillisecs=this.m__millisecs;
}
c_DeltaTimer.prototype.p_Play=function(){
	if(!this.m_paused){
		return;
	}
	this.m_paused=false;
	this.m_lastMillisecs=(bb_app3_Millisecs())-this.m_pauseOffset;
}
c_DeltaTimer.prototype.p_Pause=function(){
	if(this.m_paused){
		return;
	}
	this.m_paused=true;
	var t_now=(bb_app3_Millisecs());
	this.m_pauseOffset=t_now-this.m_lastMillisecs;
}
function bb_app3_Millisecs(){
	return bb_app3__game.Millisecs();
}
function c_Director(){
	Object.call(this);
	this.m_app=null;
	this.m_scenes=c_StringMap3.m_new.call(new c_StringMap3);
	this.m_currentSceneName="";
	this.m_currentScene=null;
	this.m_previousScene=null;
	this.m_previousSceneName="";
}
c_Director.m_instance=null;
c_Director.m_new=function(){
	return this;
}
c_Director.m_Shared=function(){
	if(!((c_Director.m_instance)!=null)){
		c_Director.m_instance=c_Director.m_new.call(new c_Director);
	}
	return c_Director.m_instance;
}
c_Director.prototype.p_SetApp=function(t_app){
	this.m_app=t_app;
}
c_Director.prototype.p_AddScene=function(t_name,t_scene){
	if(this.m_scenes.p_Contains(t_name)){
		error("There is already a scene named: "+t_name);
	}
	this.m_scenes.p_Set4(t_name,t_scene);
}
c_Director.prototype.p_GetScene=function(t_name){
	if(!this.m_scenes.p_Contains(t_name)){
		error("Unknown scene name given: "+t_name);
	}
	return this.m_scenes.p_Get(t_name);
}
c_Director.prototype.p_SwapCurrentAndPrevious=function(t_name){
	this.m_previousScene=this.m_currentScene;
	this.m_previousSceneName=this.m_currentSceneName;
	this.m_currentScene=this.p_GetScene(t_name);
	this.m_currentSceneName=t_name;
}
c_Director.prototype.p_GetApp=function(){
	return this.m_app;
}
c_Director.prototype.p_UpdateAppHandler=function(t_scene){
	if((t_scene)!=null){
		this.p_GetApp().m_renderable=(t_scene);
	}else{
		this.p_GetApp().m_renderable=null;
	}
	if((object_implements((t_scene),"c_Suspendable"))!=null){
		this.p_GetApp().m_suspendable=object_implements((t_scene),"c_Suspendable");
	}else{
		this.p_GetApp().m_suspendable=null;
	}
	if((object_implements((t_scene),"c_Updateable"))!=null){
		this.p_GetApp().m_updateable=object_implements((t_scene),"c_Updateable");
	}else{
		this.p_GetApp().m_updateable=null;
	}
}
c_Director.prototype.p_GotoScene=function(t_name){
	if(t_name==this.m_currentSceneName){
		return;
	}
	this.p_SwapCurrentAndPrevious(t_name);
	this.p_UpdateAppHandler(this.m_currentScene);
	if((this.m_previousScene)!=null){
		this.m_previousScene.p_OnSceneLeave();
	}
	if((this.m_currentScene)!=null){
		this.m_currentScene.p_OnSceneEnter();
	}
}
function bb_graphics2_Cls(t_r,t_g,t_b){
	bb_graphics2_renderDevice.Cls(t_r,t_g,t_b);
	return 0;
}
var bb_asyncevent__current=null;
function c_Stack8(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack8.m_new=function(){
	return this;
}
c_Stack8.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack8.m_NIL=null;
c_Stack8.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack8.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack8.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack8.prototype.p_Get2=function(t_index){
	return this.m_data[t_index];
}
var bb_asyncevent__sources=null;
function bb_asyncevent_UpdateAsyncEvents(){
	if((bb_asyncevent__current)!=null){
		return 0;
	}
	var t_i=0;
	while(t_i<bb_asyncevent__sources.p_Length2()){
		bb_asyncevent__current=bb_asyncevent__sources.p_Get2(t_i);
		bb_asyncevent__current.p_UpdateAsyncEvents();
		if((bb_asyncevent__current)!=null){
			t_i+=1;
		}
	}
	bb_asyncevent__current=null;
	return 0;
}
function c_Scene(){
	Object.call(this);
	this.m_childs=c_List.m_new.call(new c_List);
	this.m_keyhandlerFan=null;
	this.m_touchableFan=null;
	this.m_keyEmitter=null;
	this.m_touchEmitter=null;
	this.implments={c_Sceneable:1,c_Renderable:1,c_Updateable:1,c_Suspendable:1};
}
c_Scene.m_new=function(){
	return this;
}
c_Scene.prototype.p_OnSceneEnter=function(){
}
c_Scene.prototype.p_OnSceneLeave=function(){
}
c_Scene.prototype.p_OnRender=function(){
	var t_=this.m_childs.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		if((object_implements((t_obj),"c_Renderable"))!=null){
			object_implements((t_obj),"c_Renderable").p_OnRender();
		}
	}
}
c_Scene.prototype.p_OnUpdate2=function(t_timer){
	var t_=this.m_childs.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		if((object_implements((t_obj),"c_Updateable"))!=null){
			object_implements((t_obj),"c_Updateable").p_OnUpdate2(t_timer);
		}
	}
}
c_Scene.prototype.p_OnResume=function(){
	var t_=this.m_childs.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		if((object_implements((t_obj),"c_Suspendable"))!=null){
			object_implements((t_obj),"c_Suspendable").p_OnResume();
		}
	}
}
c_Scene.prototype.p_OnSuspend=function(){
	var t_=this.m_childs.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		if((object_implements((t_obj),"c_Suspendable"))!=null){
			object_implements((t_obj),"c_Suspendable").p_OnSuspend();
		}
	}
}
c_Scene.prototype.p_GetKeyhandlerFan=function(){
	if(!((this.m_keyhandlerFan)!=null)){
		this.m_keyhandlerFan=c_KeyhandlerFan.m_new.call(new c_KeyhandlerFan);
		if((object_implements((this),"c_Keyhandler"))!=null){
			this.m_keyhandlerFan.p_Add4(object_implements((this),"c_Keyhandler"));
		}
		var t_=this.m_childs.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_obj=t_.p_NextObject();
			if(!((object_implements((t_obj),"c_Keyhandler"))!=null)){
				continue;
			}
			this.m_keyhandlerFan.p_Add4(object_implements((t_obj),"c_Keyhandler"));
		}
	}
	return this.m_keyhandlerFan;
}
c_Scene.prototype.p_GetTouchableFan=function(){
	if(!((this.m_touchableFan)!=null)){
		this.m_touchableFan=c_TouchableFan.m_new.call(new c_TouchableFan);
		if((object_implements((this),"c_Touchable"))!=null){
			this.m_touchableFan.p_Add5(object_implements((this),"c_Touchable"));
		}
		var t_=this.m_childs.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_obj=t_.p_NextObject();
			if(!((object_implements((t_obj),"c_Touchable"))!=null)){
				continue;
			}
			this.m_touchableFan.p_Add5(object_implements((t_obj),"c_Touchable"));
		}
	}
	return this.m_touchableFan;
}
c_Scene.prototype.p_AddChild=function(t_child){
	if(!this.m_childs.p_Contains3(t_child)){
		this.m_childs.p_AddLast(t_child);
	}
	if(((this.m_keyhandlerFan)!=null) && ((object_implements((t_child),"c_Keyhandler"))!=null)){
		this.p_GetKeyhandlerFan().p_Add4(object_implements((t_child),"c_Keyhandler"));
	}
	if(((this.m_touchableFan)!=null) && ((object_implements((t_child),"c_Touchable"))!=null)){
		this.p_GetTouchableFan().p_Add5(object_implements((t_child),"c_Touchable"));
	}
}
c_Scene.prototype.p_GetDirector=function(){
	return c_Director.m_Shared();
}
c_Scene.prototype.p_GetApp=function(){
	return this.p_GetDirector().p_GetApp();
}
c_Scene.prototype.p_GetKeyEmitter=function(){
	if(!((this.m_keyEmitter)!=null)){
		this.m_keyEmitter=c_KeyEmitter.m_new.call(new c_KeyEmitter);
		this.m_keyEmitter.m_handler=(this.p_GetKeyhandlerFan());
	}
	return this.m_keyEmitter;
}
c_Scene.prototype.p_RemoveChild=function(t_child){
	this.m_childs.p_RemoveEach(t_child);
	if(((this.m_keyhandlerFan)!=null) && ((object_implements((t_child),"c_Keyhandler"))!=null)){
		this.p_GetKeyhandlerFan().p_Remove2(object_implements((t_child),"c_Keyhandler"));
	}
	if(((this.m_touchableFan)!=null) && ((object_implements((t_child),"c_Touchable"))!=null)){
		this.p_GetTouchableFan().p_Remove3(object_implements((t_child),"c_Touchable"));
	}
}
c_Scene.prototype.p_EnableKeyEvents=function(t_flag){
	if(!((this.m_keyEmitter)!=null) && !t_flag){
		return;
	}
	if(t_flag){
		this.p_AddChild(this.p_GetKeyEmitter());
	}else{
		this.p_RemoveChild(this.p_GetKeyEmitter());
	}
}
c_Scene.prototype.p_GetTouchEmitter=function(){
	if(!((this.m_touchEmitter)!=null)){
		this.m_touchEmitter=c_TouchEmitter.m_new.call(new c_TouchEmitter);
		this.m_touchEmitter.m_handler=(this.p_GetTouchableFan());
	}
	return this.m_touchEmitter;
}
c_Scene.prototype.p_EnableTouchEvents=function(t_flag){
	if(!((this.m_touchEmitter)!=null) && !t_flag){
		return;
	}
	if(t_flag){
		this.p_AddChild(this.p_GetTouchEmitter());
	}else{
		this.p_RemoveChild(this.p_GetTouchEmitter());
	}
}
function c_RaceScene(){
	c_Scene.call(this);
	this.m_player=c_Player.m_new.call(new c_Player);
	this.implments={c_Sceneable:1,c_Renderable:1,c_Updateable:1,c_Suspendable:1};
}
c_RaceScene.prototype=extend_class(c_Scene);
c_RaceScene.m_new=function(){
	c_Scene.m_new.call(this);
	return this;
}
c_RaceScene.prototype.p_AddBackground=function(){
	this.p_AddChild(c_BackgroundSprite.m_new.call(new c_BackgroundSprite,"sky.png",c_Vector2D.m_new.call(new c_Vector2D,0.001,0.0),0.0,this.m_player));
	this.p_AddChild(c_BackgroundSprite.m_new.call(new c_BackgroundSprite,"hills.png",c_Vector2D.m_new.call(new c_Vector2D,0.002,0.002),20.0,this.m_player));
	this.p_AddChild(c_BackgroundSprite.m_new.call(new c_BackgroundSprite,"trees.png",c_Vector2D.m_new.call(new c_Vector2D,0.003,0.002),130.0,this.m_player));
}
c_RaceScene.prototype.p_AddTouchControls=function(){
	var t_accel=c_ButtonCarAccel.m_new.call(new c_ButtonCarAccel,this.m_player);
	t_accel.p_SetSize(c_Vector2D.m_new.call(new c_Vector2D,250.0,250.0));
	t_accel.p_SetPosition(this.p_GetApp().p_GetVirtualSize());
	c_Align.m_Horizontal((t_accel),3);
	c_Align.m_Vertical((t_accel),1);
	this.p_AddChild(t_accel);
	var t_decel=c_ButtonCarDecel.m_new.call(new c_ButtonCarDecel,this.m_player);
	t_decel.p_SetSize(t_accel.p_GetSize());
	t_decel.p_GetPosition().m_y=this.p_GetApp().p_GetVirtualSize().m_y;
	c_Align.m_Horizontal((t_decel),2);
	c_Align.m_Vertical((t_decel),1);
	this.p_AddChild(t_decel);
}
c_RaceScene.prototype.p_OnSceneEnter=function(){
	this.p_AddBackground();
	this.p_AddTouchControls();
	this.p_AddChild(c_KeyControls.m_new.call(new c_KeyControls,this.m_player));
	this.p_AddChild(c_Road.m_new.call(new c_Road,this.m_player));
	this.p_AddChild(this.m_player);
	this.p_EnableKeyEvents(true);
	this.p_EnableTouchEvents(true);
	this.p_GetTouchEmitter().m_retainSize=1;
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	return this;
}
c_Map4.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map4.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map4.prototype.p_RotateLeft4=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map4.prototype.p_RotateRight4=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map4.prototype.p_InsertFixup4=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight4(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft4(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map4.prototype.p_Set4=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node4.m_new.call(new c_Node4,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup4(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map4.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap3(){
	c_Map4.call(this);
}
c_StringMap3.prototype=extend_class(c_Map4);
c_StringMap3.m_new=function(){
	c_Map4.m_new.call(this);
	return this;
}
c_StringMap3.prototype.p_Compare=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node4(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node4.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node4.m_new2=function(){
	return this;
}
function c_List(){
	Object.call(this);
	this.m__head=(c_HeadNode.m_new.call(new c_HeadNode));
}
c_List.m_new=function(){
	return this;
}
c_List.prototype.p_AddLast=function(t_data){
	return c_Node5.m_new.call(new c_Node5,this.m__head,this.m__head.m__pred,t_data);
}
c_List.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast(t_t);
	}
	return this;
}
c_List.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator2.m_new.call(new c_Enumerator2,this);
}
c_List.prototype.p_Equals5=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List.prototype.p_Contains3=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		if(this.p_Equals5(t_node.m__data,t_value)){
			return true;
		}
		t_node=t_node.m__succ;
	}
	return false;
}
c_List.prototype.p_RemoveEach=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		var t_succ=t_node.m__succ;
		if(this.p_Equals5(t_node.m__data,t_value)){
			t_node.p_Remove();
		}
		t_node=t_succ;
	}
	return 0;
}
function c_Node5(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node5.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node5.m_new2=function(){
	return this;
}
c_Node5.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode(){
	c_Node5.call(this);
}
c_HeadNode.prototype=extend_class(c_Node5);
c_HeadNode.m_new=function(){
	c_Node5.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator2(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator2.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator2.m_new2=function(){
	return this;
}
c_Enumerator2.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator2.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_BaseDisplayObject(){
	Object.call(this);
	this.m_size=null;
	this.m_center=null;
	this.m_pos=null;
	this.m_color=null;
	this.implments={c_Colorable:1,c_Positionable:1,c_Sizeable:1};
}
c_BaseDisplayObject.m_new=function(){
	return this;
}
c_BaseDisplayObject.prototype.p_SetSize=function(t_newSize){
	this.m_size=t_newSize;
	this.m_center=t_newSize.p_Copy().p_Div2(2.0);
}
c_BaseDisplayObject.prototype.p_GetSize=function(){
	if(this.m_size==null){
		error("Size not set yet.");
	}
	return this.m_size;
}
c_BaseDisplayObject.prototype.p_GetPosition=function(){
	if(this.m_pos==null){
		this.m_pos=c_Vector2D.m_new.call(new c_Vector2D,0.0,0.0);
	}
	return this.m_pos;
}
c_BaseDisplayObject.prototype.p_SetPosition=function(t_newPos){
	this.m_pos=t_newPos;
}
c_BaseDisplayObject.prototype.p_GetColor=function(){
	if(!((this.m_color)!=null)){
		this.m_color=c_Color.m_new2.call(new c_Color,255.0,255.0,255.0,255.0);
	}
	return this.m_color;
}
c_BaseDisplayObject.prototype.p_GetCenter=function(){
	if(this.m_center==null){
		error("No size set and center therefore unset.");
	}
	return this.m_center;
}
function c_Sprite(){
	c_BaseDisplayObject.call(this);
	this.m_imageName="";
	this.m_image=null;
	this.m_frameSize=null;
	this.m_frameCount=0;
	this.m__scale=c_Vector2D.m_new.call(new c_Vector2D,1.0,1.0);
	this.m_frameSpeed=0;
	this.m_renderPos=c_Vector2D.m_new.call(new c_Vector2D,0.0,0.0);
	this.m_rotation=.0;
	this.m_currentFrame=0;
	this.m_loopAnimation=false;
	this.m_frameTimer=0;
	this.implments={c_Updateable:1,c_Renderable:1,c_Colorable:1,c_Positionable:1,c_Sizeable:1};
}
c_Sprite.prototype=extend_class(c_BaseDisplayObject);
c_Sprite.m_cacheImage=null;
c_Sprite.prototype.p_CacheGetImage=function(t_name){
	return c_Sprite.m_cacheImage.p_Get(t_name);
}
c_Sprite.m_cacheSize=null;
c_Sprite.prototype.p_CacheGetSize=function(t_name){
	return c_Sprite.m_cacheSize.p_Get(t_name);
}
c_Sprite.prototype.p_FailIfImageNotLoaded=function(){
	if(!((this.m_image)!=null)){
		error("Unable to load: "+this.m_imageName);
	}
}
c_Sprite.prototype.p_CacheSet=function(t_name,t_image,t_size){
	c_Sprite.m_cacheImage.p_Set6(t_name,t_image);
	c_Sprite.m_cacheSize.p_Set7(t_name,t_size);
}
c_Sprite.prototype.p_scale=function(){
	return this.m__scale;
}
c_Sprite.prototype.p_scale2=function(t_newScale){
	if((this.m_image)!=null){
		this.p_GetSize().p_Div(this.m__scale).p_Mul(t_newScale);
	}
	this.m__scale=t_newScale;
}
c_Sprite.prototype.p_LoadImage=function(){
	this.m_image=this.p_CacheGetImage(this.m_imageName);
	if((this.m_image)!=null){
		this.p_SetSize(this.p_CacheGetSize(this.m_imageName));
	}
	if(!((this.m_image)!=null)){
		if((this.m_frameSize)!=null){
			this.m_image=bb_graphics2_LoadImage2(this.m_imageName,((this.m_frameSize.m_x)|0),((this.m_frameSize.m_y)|0),this.m_frameCount,1);
			this.p_FailIfImageNotLoaded();
			this.p_SetSize(this.m_frameSize.p_Copy());
		}else{
			this.m_image=bb_graphics2_LoadImage(this.m_imageName,1,1);
			this.p_FailIfImageNotLoaded();
			this.p_SetSize(c_Vector2D.m_new.call(new c_Vector2D,(this.m_image.p_Width()),(this.m_image.p_Height())));
		}
		this.p_CacheSet(this.m_imageName,this.m_image,this.p_GetSize());
	}
	this.p_GetSize().p_Mul(this.p_scale());
}
c_Sprite.m_new=function(t_imageName,t_pos){
	c_BaseDisplayObject.m_new.call(this);
	this.m_imageName=t_imageName;
	this.p_LoadImage();
	return this;
}
c_Sprite.m_new2=function(t_imageName,t_frameSize,t_frameCount,t_frameSpeed,t_pos){
	c_BaseDisplayObject.m_new.call(this);
	this.m_imageName=t_imageName;
	this.m_frameSize=t_frameSize;
	this.m_frameCount=t_frameCount;
	this.m_frameSpeed=t_frameSpeed;
	this.p_LoadImage();
	return this;
}
c_Sprite.m_new3=function(){
	c_BaseDisplayObject.m_new.call(this);
	return this;
}
c_Sprite.prototype.p_OnRender=function(){
	this.p_GetColor().p_Activate();
	this.m_renderPos.p_Set5(this.p_GetCenter()).p_Mul(this.p_scale()).p_Add2(this.p_GetPosition());
	bb_graphics2_DrawImage2(this.m_image,this.m_renderPos.m_x,this.m_renderPos.m_y,this.m_rotation,this.p_scale().m_x,this.p_scale().m_y,this.m_currentFrame);
	this.p_GetColor().p_Deactivate();
}
c_Sprite.prototype.p_animationIsDone=function(){
	if(this.m_loopAnimation){
		return false;
	}
	return this.m_currentFrame==this.m_frameCount;
}
c_Sprite.prototype.p_OnUpdate2=function(t_deltaTimer){
	if(this.m_frameCount<=0){
		return;
	}
	if(this.p_animationIsDone()){
		return;
	}
	if(this.m_frameTimer<this.m_frameSpeed){
		this.m_frameTimer=(((this.m_frameTimer)+t_deltaTimer.p_frameTime())|0);
		return;
	}
	if(this.m_currentFrame+1==this.m_frameCount){
		if(this.m_loopAnimation){
			this.m_currentFrame=1;
		}
	}else{
		this.m_currentFrame+=1;
	}
	this.m_frameTimer=0;
}
c_Sprite.prototype.p_DrawImageRect=function(t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight){
	t_x+=this.p_GetCenter().m_x;
	t_y+=this.p_GetCenter().m_y;
	bb_graphics2_DrawImageRect2(this.m_image,t_x,t_y,((t_srcX)|0),((t_srcY)|0),((t_srcWidth)|0),((t_srcHeight)|0),this.m_rotation,this.p_scale().m_x,this.p_scale().m_y,this.m_currentFrame);
}
c_Sprite.prototype.p_DrawImageRect2=function(t_pos,t_rectPos,t_rectSize){
	this.p_DrawImageRect(t_pos.m_x,t_pos.m_y,t_rectPos.m_x,t_rectPos.m_y,t_rectSize.m_x,t_rectSize.m_y);
}
function c_BackgroundSprite(){
	c_Sprite.call(this);
	this.m_speed=null;
	this.m_player=null;
	this.m_posY=.0;
	this.m_offset=.0;
	this.implments={c_Updateable:1,c_Renderable:1,c_Colorable:1,c_Positionable:1,c_Sizeable:1};
}
c_BackgroundSprite.prototype=extend_class(c_Sprite);
c_BackgroundSprite.m_new=function(t_img,t_speed,t_posY,t_player){
	c_Sprite.m_new.call(this,"images/background/"+t_img,null);
	this.m_speed=t_speed;
	this.m_player=t_player;
	this.m_posY=t_posY;
	return this;
}
c_BackgroundSprite.m_new2=function(){
	c_Sprite.m_new3.call(this);
	return this;
}
c_BackgroundSprite.prototype.p_OnRender=function(){
	this.p_GetColor().p_Activate();
	this.m_offset+=this.m_speed.m_x*this.m_player.p_GetCurrentCurvePower();
	if(this.m_offset>1.0){
		this.m_offset=this.m_offset-1.0;
	}
	if(this.m_offset<0.0){
		this.m_offset=this.m_offset+1.0;
	}
	var t_dstY=this.m_posY+this.m_player.m_y*this.m_speed.m_y*1.6;
	var t_sourceX=Math.floor(this.p_GetSize().m_x*this.m_offset);
	var t_sourceW=bb_math_Min2(this.p_GetSize().m_x,this.p_GetSize().m_x-t_sourceX);
	this.p_DrawImageRect(0.0,t_dstY,t_sourceX,0.0,t_sourceW,this.p_GetSize().m_y);
	if(t_sourceW<this.p_GetSize().m_x){
		this.p_DrawImageRect(t_sourceW-1.0,t_dstY,0.0,0.0,this.p_GetSize().m_x-t_sourceW,this.p_GetSize().m_y);
	}
	this.p_GetColor().p_Deactivate();
}
function c_Vector2D(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
}
c_Vector2D.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Vector2D.prototype.p_Copy=function(){
	return c_Vector2D.m_new.call(new c_Vector2D,this.m_x,this.m_y);
}
c_Vector2D.prototype.p_Div=function(t_v2){
	this.m_x/=t_v2.m_x;
	this.m_y/=t_v2.m_y;
	return this;
}
c_Vector2D.prototype.p_Div2=function(t_factor){
	this.m_y/=t_factor;
	this.m_x/=t_factor;
	return this;
}
c_Vector2D.prototype.p_Mul=function(t_v2){
	this.m_x*=t_v2.m_x;
	this.m_y*=t_v2.m_y;
	return this;
}
c_Vector2D.prototype.p_Mul2=function(t_factor){
	this.m_x*=t_factor;
	this.m_y*=t_factor;
	return this;
}
c_Vector2D.prototype.p_Set5=function(t_v2){
	this.m_x=t_v2.m_x;
	this.m_y=t_v2.m_y;
	return this;
}
c_Vector2D.prototype.p_Add2=function(t_v2){
	this.m_x+=t_v2.m_x;
	this.m_y+=t_v2.m_y;
	return this;
}
c_Vector2D.prototype.p_Add3=function(t_factor){
	this.m_x+=t_factor;
	this.m_y+=t_factor;
	return this;
}
c_Vector2D.prototype.p_Sub=function(t_v2){
	this.m_x-=t_v2.m_x;
	this.m_y-=t_v2.m_y;
	return this;
}
c_Vector2D.prototype.p_Sub2=function(t_factor){
	this.m_x-=t_factor;
	this.m_y-=t_factor;
	return this;
}
c_Vector2D.prototype.p_Length2=function(){
	return Math.sqrt(this.m_x*this.m_x+this.m_y*this.m_y);
}
function c_Player(){
	Object.call(this);
	this.m_pos=.0;
	this.m_speed=.0;
	this.m_carStraight=null;
	this.m_carLeft=null;
	this.m_carRight=null;
	this.m_carUpStraight=null;
	this.m_carUpLeft=null;
	this.m_carUpRight=null;
	this.m_currentRoad=null;
	this.m_y=.0;
	this.m_keyLeft=false;
	this.m_x=.0;
	this.m_keyRight=false;
	this.m_keyFaster=false;
	this.m_keySlower=false;
	this.m_uphill=false;
	this.implments={c_Updateable:1,c_Renderable:1};
}
c_Player.prototype.p_Reset=function(){
	this.m_pos=0.0;
	this.m_speed=0.0;
}
c_Player.prototype.p_AlignCar=function(t_car){
	t_car.p_GetPosition().m_x=c_Director.m_Shared().p_GetApp().p_GetVirtualSize().m_x/2.0;
	t_car.p_GetPosition().m_y=c_Director.m_Shared().p_GetApp().p_GetVirtualSize().m_y;
	t_car.p_scale().m_x=3.5;
	t_car.p_scale().m_y=3.5;
	c_Align.m_Horizontal((t_car),4);
	c_Align.m_Vertical((t_car),1);
}
c_Player.m_new=function(){
	this.p_Reset();
	this.m_carStraight=c_Sprite.m_new.call(new c_Sprite,"images/player/straight.png",null);
	this.p_AlignCar(this.m_carStraight);
	this.m_carLeft=c_Sprite.m_new.call(new c_Sprite,"images/player/left.png",null);
	this.p_AlignCar(this.m_carLeft);
	this.m_carRight=c_Sprite.m_new.call(new c_Sprite,"images/player/right.png",null);
	this.p_AlignCar(this.m_carRight);
	this.m_carUpStraight=c_Sprite.m_new.call(new c_Sprite,"images/player/up-straight.png",null);
	this.p_AlignCar(this.m_carUpStraight);
	this.m_carUpLeft=c_Sprite.m_new.call(new c_Sprite,"images/player/up-left.png",null);
	this.p_AlignCar(this.m_carUpLeft);
	this.m_carUpRight=c_Sprite.m_new.call(new c_Sprite,"images/player/up-right.png",null);
	this.p_AlignCar(this.m_carUpRight);
	return this;
}
c_Player.prototype.p_GetCurrentCurvePower=function(){
	var t_segment=this.m_currentRoad.p_GetPlayerSegment();
	return this.m_speed/12000.0*t_segment.m_curve;
}
c_Player.prototype.p_UpdatePosition=function(t_dt){
	this.m_pos+=this.m_speed*t_dt;
	if(this.m_pos>=this.m_currentRoad.p_Length2()){
		this.m_pos-=this.m_currentRoad.p_Length2();
	}
}
c_Player.prototype.p_HandleSteering=function(t_dt){
	var t_dx=t_dt*2.0*(this.m_speed/12000.0);
	if(this.m_keyLeft){
		this.m_x-=t_dx;
	}else{
		if(this.m_keyRight){
			this.m_x+=t_dx;
		}
	}
	this.m_x-=t_dx*this.p_GetCurrentCurvePower()*0.3;
}
c_Player.prototype.p_HandleThrottle=function(t_dt){
	if(this.m_keyFaster){
		this.m_speed+=2400.0*t_dt;
	}else{
		if(this.m_keySlower){
			this.m_speed+=-12000.0*t_dt;
		}else{
			this.m_speed+=-2400.0*t_dt;
		}
	}
	if((this.m_x<=-1.0 || this.m_x>=1.0) && this.m_speed>3000.0){
		this.m_speed+=-6000.0*t_dt;
	}
}
c_Player.prototype.p_OnUpdate2=function(t_timer){
	if(!((this.m_currentRoad)!=null)){
		this.p_Reset();
		return;
	}
	var t_dt=t_timer.p_frameTime()/1000.0;
	this.p_UpdatePosition(t_dt);
	this.p_HandleSteering(t_dt);
	this.p_HandleThrottle(t_dt);
	this.m_x=bb_math_Clamp2(this.m_x,-2.0,2.0);
	this.m_speed=bb_math_Clamp2(this.m_speed,0.0,12000.0);
}
c_Player.prototype.p_OnRender=function(){
	if(this.m_keyLeft && this.m_speed>0.0){
		if(this.m_uphill){
			this.m_carUpLeft.p_OnRender();
		}else{
			this.m_carLeft.p_OnRender();
		}
	}else{
		if(this.m_keyRight && this.m_speed>0.0){
			if(this.m_uphill){
				this.m_carUpRight.p_OnRender();
			}else{
				this.m_carRight.p_OnRender();
			}
		}else{
			if(this.m_uphill){
				this.m_carUpStraight.p_OnRender();
			}else{
				this.m_carStraight.p_OnRender();
			}
		}
	}
}
c_Player.prototype.p_ControlAccel=function(t_active){
	this.m_keyFaster=t_active;
}
c_Player.prototype.p_ControlDecel=function(t_active){
	this.m_keySlower=t_active;
}
c_Player.prototype.p_ControlLeft=function(t_active){
	this.m_keyLeft=t_active;
}
c_Player.prototype.p_ControlRight=function(t_active){
	this.m_keyRight=t_active;
}
function c_Map5(){
	Object.call(this);
	this.m_root=null;
}
c_Map5.m_new=function(){
	return this;
}
c_Map5.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map5.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map5.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map5.prototype.p_RotateLeft5=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map5.prototype.p_RotateRight5=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map5.prototype.p_InsertFixup5=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight5(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft5(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map5.prototype.p_Set6=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node6.m_new.call(new c_Node6,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup5(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_StringMap4(){
	c_Map5.call(this);
}
c_StringMap4.prototype=extend_class(c_Map5);
c_StringMap4.m_new=function(){
	c_Map5.m_new.call(this);
	return this;
}
c_StringMap4.prototype.p_Compare=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node6(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node6.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node6.m_new2=function(){
	return this;
}
function c_Map6(){
	Object.call(this);
	this.m_root=null;
}
c_Map6.m_new=function(){
	return this;
}
c_Map6.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map6.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map6.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map6.prototype.p_RotateLeft6=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map6.prototype.p_RotateRight6=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map6.prototype.p_InsertFixup6=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight6(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft6(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map6.prototype.p_Set7=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node7.m_new.call(new c_Node7,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup6(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_StringMap5(){
	c_Map6.call(this);
}
c_StringMap5.prototype=extend_class(c_Map6);
c_StringMap5.m_new=function(){
	c_Map6.m_new.call(this);
	return this;
}
c_StringMap5.prototype.p_Compare=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node7(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node7.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node7.m_new2=function(){
	return this;
}
function c_DeviceNonNative(){
	Object.call(this);
}
c_DeviceNonNative.m_GetSize=function(){
	return c_Vector2D.m_new.call(new c_Vector2D,(bb_app3_DeviceWidth()),(bb_app3_DeviceHeight()));
}
function c_Align(){
	Object.call(this);
}
c_Align.m_CheckInterfaces=function(t_object){
	if(!((object_implements((t_object),"c_Sizeable"))!=null)){
		error("Given object must implement Sizeable");
	}
	if(!((object_implements((t_object),"c_Positionable"))!=null)){
		error("Given object must implement Positionable");
	}
}
c_Align.m_GetScale=function(t_object){
	if((object_downcast((t_object),c_Sprite))!=null){
		return object_downcast((t_object),c_Sprite).p_scale();
	}
	return c_Vector2D.m_new.call(new c_Vector2D,1.0,1.0);
}
c_Align.m_Horizontal=function(t_object,t_mode){
	c_Align.m_CheckInterfaces(t_object);
	var t_scale=c_Align.m_GetScale(t_object).m_x;
	var t_1=t_mode;
	if(t_1==2){
	}else{
		if(t_1==3){
			object_implements((t_object),"c_Positionable").p_GetPosition().m_x-=object_implements((t_object),"c_Sizeable").p_GetSize().m_x*t_scale;
		}else{
			if(t_1==4){
				object_implements((t_object),"c_Positionable").p_GetPosition().m_x-=object_implements((t_object),"c_Sizeable").p_GetSize().m_x*t_scale/2.0;
			}else{
				error("Invalid alignment mode ("+String(t_mode)+") given");
			}
		}
	}
}
c_Align.m_Vertical=function(t_object,t_mode){
	c_Align.m_CheckInterfaces(t_object);
	var t_scale=c_Align.m_GetScale(t_object).m_y;
	var t_2=t_mode;
	if(t_2==0){
	}else{
		if(t_2==1){
			object_implements((t_object),"c_Positionable").p_GetPosition().m_y-=object_implements((t_object),"c_Sizeable").p_GetSize().m_y*t_scale;
		}else{
			if(t_2==4){
				object_implements((t_object),"c_Positionable").p_GetPosition().m_y-=object_implements((t_object),"c_Sizeable").p_GetSize().m_y*t_scale/2.0;
			}else{
				error("Invalid alignment mode ("+String(t_mode)+") given");
			}
		}
	}
}
function c_KeyhandlerFan(){
	Object.call(this);
	this.m_pool=c_List2.m_new.call(new c_List2);
	this.implments={c_Keyhandler:1};
}
c_KeyhandlerFan.m_new=function(){
	return this;
}
c_KeyhandlerFan.prototype.p_Add4=function(t_obj){
	if(!this.m_pool.p_Contains4(t_obj)){
		this.m_pool.p_AddLast2(t_obj);
	}
}
c_KeyhandlerFan.prototype.p_Remove2=function(t_obj){
	this.m_pool.p_RemoveEach2(t_obj);
}
c_KeyhandlerFan.prototype.p_OnKeyDown=function(t_event){
	var t_=this.m_pool.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		t_obj.p_OnKeyDown(t_event);
	}
}
c_KeyhandlerFan.prototype.p_OnKeyPress=function(t_event){
	var t_=this.m_pool.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		t_obj.p_OnKeyPress(t_event);
	}
}
c_KeyhandlerFan.prototype.p_OnKeyUp=function(t_event){
	var t_=this.m_pool.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		t_obj.p_OnKeyUp(t_event);
	}
}
function c_List2(){
	Object.call(this);
	this.m__head=(c_HeadNode2.m_new.call(new c_HeadNode2));
}
c_List2.m_new=function(){
	return this;
}
c_List2.prototype.p_AddLast2=function(t_data){
	return c_Node8.m_new.call(new c_Node8,this.m__head,this.m__head.m__pred,t_data);
}
c_List2.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast2(t_t);
	}
	return this;
}
c_List2.prototype.p_Equals6=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List2.prototype.p_Contains4=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		if(this.p_Equals6(t_node.m__data,t_value)){
			return true;
		}
		t_node=t_node.m__succ;
	}
	return false;
}
c_List2.prototype.p_RemoveEach2=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		var t_succ=t_node.m__succ;
		if(this.p_Equals6(t_node.m__data,t_value)){
			t_node.p_Remove();
		}
		t_node=t_succ;
	}
	return 0;
}
c_List2.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator5.m_new.call(new c_Enumerator5,this);
}
function c_Node8(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node8.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node8.m_new2=function(){
	return this;
}
c_Node8.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode2(){
	c_Node8.call(this);
}
c_HeadNode2.prototype=extend_class(c_Node8);
c_HeadNode2.m_new=function(){
	c_Node8.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_TouchableFan(){
	Object.call(this);
	this.m_pool=c_List3.m_new.call(new c_List3);
	this.implments={c_Touchable:1};
}
c_TouchableFan.m_new=function(){
	return this;
}
c_TouchableFan.prototype.p_Add5=function(t_obj){
	if(!this.m_pool.p_Contains5(t_obj)){
		this.m_pool.p_AddLast3(t_obj);
	}
}
c_TouchableFan.prototype.p_Remove3=function(t_obj){
	this.m_pool.p_RemoveEach3(t_obj);
}
c_TouchableFan.prototype.p_OnTouchDown=function(t_event){
	var t_=this.m_pool.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		t_obj.p_OnTouchDown(t_event);
	}
}
c_TouchableFan.prototype.p_OnTouchMove=function(t_event){
	var t_=this.m_pool.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		t_obj.p_OnTouchMove(t_event);
	}
}
c_TouchableFan.prototype.p_OnTouchUp=function(t_event){
	var t_=this.m_pool.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		t_obj.p_OnTouchUp(t_event);
	}
}
function c_List3(){
	Object.call(this);
	this.m__head=(c_HeadNode3.m_new.call(new c_HeadNode3));
}
c_List3.m_new=function(){
	return this;
}
c_List3.prototype.p_AddLast3=function(t_data){
	return c_Node9.m_new.call(new c_Node9,this.m__head,this.m__head.m__pred,t_data);
}
c_List3.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast3(t_t);
	}
	return this;
}
c_List3.prototype.p_Equals7=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List3.prototype.p_Contains5=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		if(this.p_Equals7(t_node.m__data,t_value)){
			return true;
		}
		t_node=t_node.m__succ;
	}
	return false;
}
c_List3.prototype.p_RemoveEach3=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		var t_succ=t_node.m__succ;
		if(this.p_Equals7(t_node.m__data,t_value)){
			t_node.p_Remove();
		}
		t_node=t_succ;
	}
	return 0;
}
c_List3.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator6.m_new.call(new c_Enumerator6,this);
}
function c_Node9(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node9.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node9.m_new2=function(){
	return this;
}
c_Node9.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode3(){
	c_Node9.call(this);
}
c_HeadNode3.prototype=extend_class(c_Node9);
c_HeadNode3.m_new=function(){
	c_Node9.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_TouchArea(){
	Object.call(this);
	this.m_size=c_Vector2D.m_new.call(new c_Vector2D,0.0,0.0);
	this.m_pos=c_Vector2D.m_new.call(new c_Vector2D,0.0,0.0);
	this.implments={c_Touchable:1,c_Positionable:1,c_Sizeable:1};
}
c_TouchArea.m_new=function(){
	return this;
}
c_TouchArea.prototype.p_SetSize=function(t_newSize){
	this.m_size=t_newSize;
}
c_TouchArea.prototype.p_SetPosition=function(t_newPos){
	this.m_pos=t_newPos;
}
c_TouchArea.prototype.p_GetSize=function(){
	return this.m_size;
}
c_TouchArea.prototype.p_GetPosition=function(){
	return this.m_pos;
}
c_TouchArea.prototype.p_IsInside=function(t_touchPos){
	if(t_touchPos.m_x<this.m_pos.m_x){
		return false;
	}
	if(t_touchPos.m_y<this.m_pos.m_y){
		return false;
	}
	if(t_touchPos.m_x>this.m_pos.m_x+this.m_size.m_x){
		return false;
	}
	if(t_touchPos.m_y>this.m_pos.m_y+this.m_size.m_y){
		return false;
	}
	return true;
}
c_TouchArea.prototype.p_OnTouchDownInside=function(t_event){
}
c_TouchArea.prototype.p_OnTouchDown=function(t_event){
	if(this.p_IsInside(t_event.p_pos())){
		this.p_OnTouchDownInside(t_event);
	}
}
c_TouchArea.prototype.p_OnTouchMoveInside=function(t_event){
}
c_TouchArea.prototype.p_OnTouchMove=function(t_event){
	if(this.p_IsInside(t_event.p_pos())){
		this.p_OnTouchMoveInside(t_event);
	}
}
c_TouchArea.prototype.p_OnTouchUpInside=function(t_event){
}
c_TouchArea.prototype.p_OnTouchUp=function(t_event){
	if(this.p_IsInside(t_event.p_pos())){
		this.p_OnTouchUpInside(t_event);
	}
}
function c_ButtonCarAccel(){
	c_TouchArea.call(this);
	this.m_player=null;
	this.m_active=false;
	this.implments={c_Updateable:1,c_Touchable:1,c_Positionable:1,c_Sizeable:1};
}
c_ButtonCarAccel.prototype=extend_class(c_TouchArea);
c_ButtonCarAccel.m_new=function(t_player){
	c_TouchArea.m_new.call(this);
	this.m_player=t_player;
	return this;
}
c_ButtonCarAccel.m_new2=function(){
	c_TouchArea.m_new.call(this);
	return this;
}
c_ButtonCarAccel.prototype.p_OnUpdate2=function(t_timer){
	if(this.m_active){
		this.m_player.p_ControlAccel(true);
	}
}
c_ButtonCarAccel.prototype.p_OnTouchDownInside=function(t_event){
	this.m_active=true;
}
c_ButtonCarAccel.prototype.p_OnTouchMoveInside=function(t_event){
}
c_ButtonCarAccel.prototype.p_OnTouchUpInside=function(t_event){
}
c_ButtonCarAccel.prototype.p_OnTouchUp=function(t_event){
	this.m_active=false;
	this.m_player.p_ControlAccel(false);
}
function c_ButtonCarDecel(){
	c_TouchArea.call(this);
	this.m_player=null;
	this.m_active=false;
	this.implments={c_Updateable:1,c_Touchable:1,c_Positionable:1,c_Sizeable:1};
}
c_ButtonCarDecel.prototype=extend_class(c_TouchArea);
c_ButtonCarDecel.m_new=function(t_player){
	c_TouchArea.m_new.call(this);
	this.m_player=t_player;
	return this;
}
c_ButtonCarDecel.m_new2=function(){
	c_TouchArea.m_new.call(this);
	return this;
}
c_ButtonCarDecel.prototype.p_OnUpdate2=function(t_timer){
	if(this.m_active){
		this.m_player.p_ControlDecel(true);
	}
}
c_ButtonCarDecel.prototype.p_OnTouchDownInside=function(t_event){
	this.m_active=true;
}
c_ButtonCarDecel.prototype.p_OnTouchMoveInside=function(t_event){
}
c_ButtonCarDecel.prototype.p_OnTouchUpInside=function(t_event){
}
c_ButtonCarDecel.prototype.p_OnTouchUp=function(t_event){
	this.m_active=false;
	this.m_player.p_ControlDecel(false);
}
function c_KeyControls(){
	Object.call(this);
	this.m_player=null;
	this.implments={c_Keyhandler:1};
}
c_KeyControls.m_new=function(t_player){
	this.m_player=t_player;
	return this;
}
c_KeyControls.m_new2=function(){
	return this;
}
c_KeyControls.prototype.p_OnKeyDown=function(t_event){
	var t_1=t_event.p_code2();
	if(t_1==87){
		this.m_player.p_ControlAccel(true);
	}else{
		if(t_1==83){
			this.m_player.p_ControlDecel(true);
		}else{
			if(t_1==65){
				this.m_player.p_ControlLeft(true);
			}else{
				if(t_1==68){
					this.m_player.p_ControlRight(true);
				}
			}
		}
	}
}
c_KeyControls.prototype.p_OnKeyPress=function(t_event){
}
c_KeyControls.prototype.p_OnKeyUp=function(t_event){
	var t_2=t_event.p_code2();
	if(t_2==87){
		this.m_player.p_ControlAccel(false);
	}else{
		if(t_2==83){
			this.m_player.p_ControlDecel(false);
		}else{
			if(t_2==65){
				this.m_player.p_ControlLeft(false);
			}else{
				if(t_2==68){
					this.m_player.p_ControlRight(false);
				}
			}
		}
	}
}
function c_Road(){
	Object.call(this);
	this.m_player=null;
	this.m_cameraDepth=.0;
	this.m_segments=c_List4.m_new.call(new c_List4);
	this.m_cameraHeight=1000.0;
	this.m_segmentsArray=[];
	this.implments={c_Renderable:1};
}
c_Road.prototype.p_GetLastY=function(){
	if(this.m_segments.p_Count()==0){
		return 0.0;
	}
	return this.m_segments.p_Last().m_p2.m_world.m_y;
}
c_Road.prototype.p_EaseIn=function(t_a,t_b,t_percent){
	return t_a+(t_b-t_a)*Math.pow(t_percent,2.0);
}
c_Road.prototype.p_EaseInOut=function(t_a,t_b,t_percent){
	return t_a+(t_b-t_a)*(-Math.cos(t_percent*3.14159265358979323846)/2.0+0.5);
}
c_Road.prototype.p_AddSegment=function(t_curve,t_y){
	var t_n=this.m_segments.p_Count();
	var t_segment=c_RoadSegment.m_new.call(new c_RoadSegment);
	t_segment.m_index=t_n;
	t_segment.m_curve=t_curve;
	t_segment.m_p1.m_world.m_y=this.p_GetLastY();
	t_segment.m_p1.m_world.m_z=((t_n+0)*200);
	t_segment.m_p2.m_world.m_y=t_y;
	t_segment.m_p2.m_world.m_z=((t_n+1)*200);
	t_segment.m_color=c_ColorStore.m_GetLight();
	if(Math.floor((t_n)/3.0) % 2.0==0.0){
		t_segment.m_color=c_ColorStore.m_GetDark();
	}
	this.m_segments.p_AddLast4(t_segment);
}
c_Road.prototype.p_EaseOut=function(t_a,t_b,t_percent){
	return t_a+(t_b-t_a)*(1.0-Math.pow(1.0-t_percent,2.0));
}
c_Road.prototype.p_AddRoad=function(t_enter,t_hold,t_leave,t_curve,t_y){
	var t_startY=this.p_GetLastY();
	var t_endY=t_startY+t_y*200.0;
	var t_total=t_enter+t_hold+t_leave;
	for(var t_i=0.0;t_i<t_enter;t_i=t_i+1.0){
		this.p_AddSegment(this.p_EaseIn(0.0,t_curve,t_i/t_enter),this.p_EaseInOut(t_startY,t_endY,t_i/t_total));
	}
	for(var t_i2=0.0;t_i2<t_hold;t_i2=t_i2+1.0){
		this.p_AddSegment(t_curve,this.p_EaseInOut(t_startY,t_endY,(t_i2+t_enter)/t_total));
	}
	for(var t_i3=0.0;t_i3<t_leave;t_i3=t_i3+1.0){
		this.p_AddSegment(this.p_EaseOut(t_curve,0.0,t_i3/t_leave),this.p_EaseInOut(t_startY,t_endY,(t_i3+t_enter+t_hold)/t_total));
	}
}
c_Road.prototype.p_AddStraight=function(t_len){
	this.p_AddRoad((t_len),(t_len),(t_len),0.0,0.0);
}
c_Road.prototype.p_AddHill=function(t_len,t_height){
	this.p_AddRoad((t_len),(t_len),(t_len),0.0,(t_height));
}
c_Road.prototype.p_AddLowRollingHills=function(t_len,t_height){
	this.p_AddRoad((t_len),(t_len),(t_len),0.0,((t_height/2)|0));
	this.p_AddRoad((t_len),(t_len),(t_len),0.0,(t_height*-1));
	this.p_AddRoad((t_len),(t_len),(t_len),0.0,(t_height));
	this.p_AddRoad((t_len),(t_len),(t_len),0.0,0.0);
	this.p_AddRoad((t_len),(t_len),(t_len),0.0,((t_height/2)|0));
	this.p_AddRoad((t_len),(t_len),(t_len),0.0,0.0);
}
c_Road.prototype.p_AddCurve=function(t_len,t_curve,t_height){
	this.p_AddRoad((t_len),(t_len),(t_len),(t_curve),(t_height));
}
c_Road.prototype.p_AddDownhillToEnd=function(t_len){
	this.p_AddRoad((t_len),(t_len),(t_len),-2.0,-this.p_GetLastY()/200.0);
}
c_Road.prototype.p_Reset=function(){
	this.m_segments.p_Clear();
	this.p_AddStraight(12);
	this.p_AddHill(25,20);
	this.p_AddLowRollingHills(25,20);
	this.p_AddCurve(50,4,20);
	this.p_AddLowRollingHills(25,20);
	this.p_AddCurve(100,4,40);
	this.p_AddStraight(50);
	this.p_AddCurve(100,-4,40);
	this.p_AddHill(100,60);
	this.p_AddCurve(100,4,-20);
	this.p_AddHill(100,-40);
	this.p_AddStraight(50);
	this.p_AddDownhillToEnd(200);
}
c_Road.m_new=function(t_player){
	this.m_player=t_player;
	t_player.m_currentRoad=this;
	this.m_cameraDepth=Math.atan(0.87266462499999997);
	this.p_Reset();
	return this;
}
c_Road.m_new2=function(){
	return this;
}
c_Road.prototype.p_GetSegment=function(t_idx){
	if(this.m_segmentsArray.length==0){
		this.m_segmentsArray=this.m_segments.p_ToArray();
	}
	return this.m_segmentsArray[t_idx % this.m_segments.p_Count()];
}
c_Road.prototype.p_GetSegmentFromPosition=function(t_position){
	return this.p_GetSegment((Math.floor(t_position/200.0))|0);
}
c_Road.prototype.p_GetPlayerSegment=function(){
	return this.p_GetSegmentFromPosition(this.m_player.m_pos+this.m_cameraHeight*this.m_cameraDepth);
}
c_Road.prototype.p_Length2=function(){
	return (this.m_segments.p_Count()*200);
}
c_Road.prototype.p_PercentRemaning=function(t_pos,t_total){
	return t_pos % t_total/t_total;
}
c_Road.prototype.p_Interpolate=function(t_a,t_b,t_percent){
	return t_a+(t_b-t_a)*t_percent;
}
c_Road.prototype.p_CalculateFog=function(t_distance,t_density){
	return 1.0/Math.pow(2.718281828459045,t_distance*t_distance*t_density);
}
c_Road.prototype.p_OnRender=function(){
	var t_baseSegment=this.p_GetSegmentFromPosition(this.m_player.m_pos);
	var t_basePercent=this.p_PercentRemaning(this.m_player.m_pos,200.0);
	var t_maxY=c_DeviceNonNative.m_GetSize().m_y;
	var t_playerPercent=this.p_PercentRemaning(this.m_player.m_pos+this.m_cameraHeight*this.m_cameraDepth,200.0);
	this.m_player.m_y=this.p_Interpolate(this.p_GetPlayerSegment().m_p1.m_world.m_y,this.p_GetPlayerSegment().m_p2.m_world.m_y,t_playerPercent);
	var t_x=0.0;
	var t_dx=t_baseSegment.m_curve*t_basePercent*-1.0;
	for(var t_n=0;t_n<=300;t_n=t_n+1){
		var t_segment=this.p_GetSegment(t_baseSegment.m_index+t_n);
		t_segment.m_looped=t_segment.m_index<t_baseSegment.m_index;
		t_segment.m_fog=this.p_CalculateFog((t_n)/300.0,5.0);
		var t_projectPosition=this.m_player.m_pos;
		if(t_segment.m_looped){
			t_projectPosition-=this.p_Length2();
		}
		t_segment.m_p1.p_Project(this.m_player.m_x*2000.0-t_x,this.m_player.m_y+this.m_cameraHeight,t_projectPosition,this.m_cameraDepth);
		t_segment.m_p2.p_Project(this.m_player.m_x*2000.0-t_x-t_dx,this.m_player.m_y+this.m_cameraHeight,t_projectPosition,this.m_cameraDepth);
		t_x+=t_dx;
		t_dx+=t_segment.m_curve;
		if(t_segment.m_p1.m_camera.m_z<=this.m_cameraDepth){
			continue;
		}
		if(t_segment.m_p2.m_screen.m_y>=t_segment.m_p1.m_screen.m_y){
			continue;
		}
		if(t_segment.m_p2.m_screen.m_y>=t_maxY){
			continue;
		}
		t_segment.p_Render();
		t_maxY=t_segment.m_p2.m_screen.m_y;
	}
	this.m_player.m_uphill=this.p_GetPlayerSegment().m_p2.m_world.m_y-this.p_GetPlayerSegment().m_p1.m_world.m_y>0.0;
}
function c_RoadSegment(){
	Object.call(this);
	this.m_p2=c_RoadSegmentPosition.m_new.call(new c_RoadSegmentPosition);
	this.m_index=0;
	this.m_curve=.0;
	this.m_p1=c_RoadSegmentPosition.m_new.call(new c_RoadSegmentPosition);
	this.m_color=null;
	this.m_looped=false;
	this.m_fog=.0;
}
c_RoadSegment.m_new=function(){
	return this;
}
c_RoadSegment.prototype.p_RenderGrass=function(){
	this.m_color.m_grass.p_Activate();
	bb_graphics2_DrawRect(0.0,this.m_p2.m_screen.m_y,c_DeviceNonNative.m_GetSize().m_x,this.m_p1.m_screen.m_y-this.m_p2.m_screen.m_y);
	this.m_color.m_grass.p_Deactivate();
}
c_RoadSegment.prototype.p_GetRumbleWidth=function(t_projectedRoadWidth){
	return t_projectedRoadWidth/(bb_math_Max(6,6));
}
c_RoadSegment.prototype.p_RenderPolygon=function(t_x1,t_y1,t_x2,t_y2,t_x3,t_y3,t_x4,t_y4,t_color){
	t_color.p_Activate();
	bb_graphics2_DrawPoly([t_x1,t_y1,t_x2,t_y2,t_x3,t_y3,t_x4,t_y4]);
	t_color.p_Deactivate();
}
c_RoadSegment.prototype.p_RenderRumbles=function(){
	var t_rumbleW1=this.p_GetRumbleWidth(this.m_p1.m_screen.m_z);
	var t_rumbleW2=this.p_GetRumbleWidth(this.m_p2.m_screen.m_z);
	this.p_RenderPolygon(this.m_p1.m_screen.m_x-this.m_p1.m_screen.m_z-t_rumbleW1,this.m_p1.m_screen.m_y,this.m_p1.m_screen.m_x-this.m_p1.m_screen.m_z,this.m_p1.m_screen.m_y,this.m_p2.m_screen.m_x-this.m_p2.m_screen.m_z,this.m_p2.m_screen.m_y,this.m_p2.m_screen.m_x-this.m_p2.m_screen.m_z-t_rumbleW2,this.m_p2.m_screen.m_y,this.m_color.m_rumble);
	this.p_RenderPolygon(this.m_p1.m_screen.m_x+this.m_p1.m_screen.m_z+t_rumbleW1,this.m_p1.m_screen.m_y,this.m_p1.m_screen.m_x+this.m_p1.m_screen.m_z,this.m_p1.m_screen.m_y,this.m_p2.m_screen.m_x+this.m_p2.m_screen.m_z,this.m_p2.m_screen.m_y,this.m_p2.m_screen.m_x+this.m_p2.m_screen.m_z+t_rumbleW2,this.m_p2.m_screen.m_y,this.m_color.m_rumble);
}
c_RoadSegment.prototype.p_RenderRoad=function(){
	this.p_RenderPolygon(this.m_p1.m_screen.m_x-this.m_p1.m_screen.m_z,this.m_p1.m_screen.m_y,this.m_p1.m_screen.m_x+this.m_p1.m_screen.m_z,this.m_p1.m_screen.m_y,this.m_p2.m_screen.m_x+this.m_p2.m_screen.m_z,this.m_p2.m_screen.m_y,this.m_p2.m_screen.m_x-this.m_p2.m_screen.m_z,this.m_p2.m_screen.m_y,this.m_color.m_road);
}
c_RoadSegment.prototype.p_GetLaneMarkerWidth=function(t_projectedRoadWidth){
	return t_projectedRoadWidth/(bb_math_Max(32,24));
}
c_RoadSegment.prototype.p_RenderLanes=function(){
	var t_laneZ1=this.m_p1.m_screen.m_z*2.0/3.0;
	var t_laneZ2=this.m_p2.m_screen.m_z*2.0/3.0;
	var t_laneX1=this.m_p1.m_screen.m_x-this.m_p1.m_screen.m_z+t_laneZ1;
	var t_laneX2=this.m_p2.m_screen.m_x-this.m_p2.m_screen.m_z+t_laneZ2;
	var t_laneW1=this.p_GetLaneMarkerWidth(this.m_p1.m_screen.m_z);
	var t_laneW2=this.p_GetLaneMarkerWidth(this.m_p2.m_screen.m_z);
	for(var t_lane=1;t_lane<3;t_lane=t_lane+1){
		this.p_RenderPolygon(t_laneX1-t_laneW1/2.0,this.m_p1.m_screen.m_y,t_laneX1+t_laneW1/2.0,this.m_p1.m_screen.m_y,t_laneX2+t_laneW2/2.0,this.m_p2.m_screen.m_y,t_laneX2-t_laneW2/2.0,this.m_p2.m_screen.m_y,this.m_color.m_lane);
		t_laneX1+=t_laneZ1;
		t_laneX2+=t_laneZ2;
	}
}
c_RoadSegment.prototype.p_RenderFog=function(){
	if(this.m_fog>=1.0){
		return;
	}
	this.m_color.m_fog.p_alphaFloat2(1.0-this.m_fog);
	this.m_color.m_fog.p_Activate();
	bb_graphics2_DrawRect(0.0,this.m_p1.m_screen.m_y,c_DeviceNonNative.m_GetSize().m_x,this.m_p2.m_screen.m_y-this.m_p1.m_screen.m_y);
	this.m_color.m_fog.p_Deactivate();
}
c_RoadSegment.prototype.p_Render=function(){
	this.p_RenderGrass();
	this.p_RenderRumbles();
	this.p_RenderRoad();
	if((this.m_color.m_lane)!=null){
		this.p_RenderLanes();
	}
	this.p_RenderFog();
}
function c_List4(){
	Object.call(this);
	this.m__head=(c_HeadNode4.m_new.call(new c_HeadNode4));
}
c_List4.m_new=function(){
	return this;
}
c_List4.prototype.p_AddLast4=function(t_data){
	return c_Node10.m_new.call(new c_Node10,this.m__head,this.m__head.m__pred,t_data);
}
c_List4.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast4(t_t);
	}
	return this;
}
c_List4.prototype.p_Clear=function(){
	this.m__head.m__succ=this.m__head;
	this.m__head.m__pred=this.m__head;
	return 0;
}
c_List4.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List4.prototype.p_Last=function(){
	return this.m__head.m__pred.m__data;
}
c_List4.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator3.m_new.call(new c_Enumerator3,this);
}
c_List4.prototype.p_ToArray=function(){
	var t_arr=new_object_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_Node10(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node10.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node10.m_new2=function(){
	return this;
}
function c_HeadNode4(){
	c_Node10.call(this);
}
c_HeadNode4.prototype=extend_class(c_Node10);
c_HeadNode4.m_new=function(){
	c_Node10.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_RoadSegmentPosition(){
	Object.call(this);
	this.m_world=c_Vector3D.m_new.call(new c_Vector3D,0.0,0.0,0.0);
	this.m_camera=c_Vector3D.m_new.call(new c_Vector3D,0.0,0.0,0.0);
	this.m_screenScale=.0;
	this.m_screen=c_Vector3D.m_new.call(new c_Vector3D,0.0,0.0,0.0);
}
c_RoadSegmentPosition.m_new=function(){
	return this;
}
c_RoadSegmentPosition.prototype.p_Project=function(t_cameraX,t_cameraHeight,t_position,t_cameraDepth){
	this.m_camera.m_x=this.m_world.m_x-t_cameraX;
	this.m_camera.m_y=this.m_world.m_y-t_cameraHeight;
	this.m_camera.m_z=this.m_world.m_z-t_position;
	this.m_screenScale=t_cameraDepth/this.m_camera.m_z;
	var t_device=c_DeviceNonNative.m_GetSize();
	this.m_screen.m_x=(c_MathHelper.m_Round(t_device.m_x/2.0+this.m_screenScale*this.m_camera.m_x*t_device.m_x/2.0));
	this.m_screen.m_y=(c_MathHelper.m_Round(t_device.m_y/2.0-this.m_screenScale*this.m_camera.m_y*t_device.m_y/2.0));
	this.m_screen.m_z=(c_MathHelper.m_Round(this.m_screenScale*2000.0*t_device.m_x/2.0));
}
function c_Vector3D(){
	c_Vector2D.call(this);
	this.m_z=.0;
}
c_Vector3D.prototype=extend_class(c_Vector2D);
c_Vector3D.m_new=function(t_x,t_y,t_z){
	c_Vector2D.m_new.call(this,t_x,t_y);
	this.m_z=t_z;
	return this;
}
function c_MathHelper(){
	Object.call(this);
}
c_MathHelper.m_HexToInt=function(t_hex){
	var t_result=0;
	var t_hexLen=t_hex.length-1;
	t_hex=t_hex.toUpperCase();
	for(var t_i=0;t_i<=t_hexLen;t_i=t_i+1){
		if(t_hex.charCodeAt(t_i)>=48 && t_hex.charCodeAt(t_i)<=57){
			t_result=(((t_result)+(t_hex.charCodeAt(t_i)-48)*Math.pow(16.0,(t_hexLen-t_i)))|0);
		}else{
			t_result=(((t_result)+(t_hex.charCodeAt(t_i)-55)*Math.pow(16.0,(t_hexLen-t_i)))|0);
		}
	}
	return t_result;
}
c_MathHelper.m_Round=function(t_given){
	if(t_given>0.5){
		return ((Math.ceil(t_given))|0);
	}
	return ((Math.floor(t_given))|0);
}
function c_ColorStore(){
	Object.call(this);
	this.m_rumble=null;
	this.m_road=null;
	this.m_grass=null;
	this.m_lane=null;
	this.m_fog=null;
}
c_ColorStore.m_lightInstance=null;
c_ColorStore.m_new=function(){
	return this;
}
c_ColorStore.m_fogInstance=null;
c_ColorStore.m_GetFogColor=function(){
	if(!((c_ColorStore.m_fogInstance)!=null)){
		c_ColorStore.m_fogInstance=c_Color.m_new.call(new c_Color,"#005108");
	}
	return c_ColorStore.m_fogInstance;
}
c_ColorStore.m_GetLight=function(){
	if(!((c_ColorStore.m_lightInstance)!=null)){
		c_ColorStore.m_lightInstance=c_ColorStore.m_new.call(new c_ColorStore);
		c_ColorStore.m_lightInstance.m_rumble=c_Color.m_new.call(new c_Color,"#555555");
		c_ColorStore.m_lightInstance.m_road=c_Color.m_new.call(new c_Color,"#6B6B6B");
		c_ColorStore.m_lightInstance.m_grass=c_Color.m_new.call(new c_Color,"#10AA10");
		c_ColorStore.m_lightInstance.m_lane=c_Color.m_new.call(new c_Color,"#CCCCCC");
		c_ColorStore.m_lightInstance.m_fog=c_ColorStore.m_GetFogColor();
	}
	return c_ColorStore.m_lightInstance;
}
c_ColorStore.m_darkInstance=null;
c_ColorStore.m_GetDark=function(){
	if(!((c_ColorStore.m_darkInstance)!=null)){
		c_ColorStore.m_darkInstance=c_ColorStore.m_new.call(new c_ColorStore);
		c_ColorStore.m_darkInstance.m_rumble=c_Color.m_new.call(new c_Color,"#BBBBBB");
		c_ColorStore.m_darkInstance.m_road=c_Color.m_new.call(new c_Color,"#696969");
		c_ColorStore.m_darkInstance.m_grass=c_Color.m_new.call(new c_Color,"#009A00");
		c_ColorStore.m_darkInstance.m_fog=c_ColorStore.m_GetFogColor();
	}
	return c_ColorStore.m_darkInstance;
}
function c_Color(){
	Object.call(this);
	this.m__red=.0;
	this.m__green=.0;
	this.m__blue=.0;
	this.m__alpha=.0;
	this.m_oldColor=null;
}
c_Color.prototype.p_FromHex=function(t_hex){
	if(string_startswith(t_hex,"#")){
		t_hex=t_hex.slice(1);
	}
	var t_value=c_MathHelper.m_HexToInt(t_hex);
	this.m__red=(t_value>>16&255);
	this.m__green=(t_value>>8&255);
	this.m__blue=(t_value&255);
	this.m__alpha=255.0;
}
c_Color.m_new=function(t_hex){
	this.p_FromHex(t_hex);
	return this;
}
c_Color.prototype.p_UpdateBounds=function(){
	this.m__red=bb_math_Clamp2(this.m__red,0.0,255.0);
	this.m__green=bb_math_Clamp2(this.m__green,0.0,255.0);
	this.m__blue=bb_math_Clamp2(this.m__blue,0.0,255.0);
	this.m__alpha=bb_math_Clamp2(this.m__alpha,0.0,255.0);
}
c_Color.m_new2=function(t_red,t_green,t_blue,t_alpha){
	this.m__red=t_red;
	this.m__green=t_green;
	this.m__blue=t_blue;
	this.m__alpha=t_alpha;
	this.p_UpdateBounds();
	return this;
}
c_Color.prototype.p_red=function(){
	return this.m__red;
}
c_Color.prototype.p_red2=function(t_value){
	this.m__red=t_value;
	this.p_UpdateBounds();
}
c_Color.prototype.p_green=function(){
	return this.m__green;
}
c_Color.prototype.p_green2=function(t_value){
	this.m__green=t_value;
	this.p_UpdateBounds();
}
c_Color.prototype.p_blue=function(){
	return this.m__blue;
}
c_Color.prototype.p_blue2=function(t_value){
	this.m__blue=t_value;
	this.p_UpdateBounds();
}
c_Color.prototype.p_alpha=function(){
	return this.m__alpha;
}
c_Color.prototype.p_alpha2=function(t_value){
	this.m__alpha=t_value;
	this.p_UpdateBounds();
}
c_Color.prototype.p_alphaFloat=function(){
	return this.m__alpha/255.0;
}
c_Color.prototype.p_alphaFloat2=function(t_value){
	this.m__alpha=255.0*t_value;
	this.p_UpdateBounds();
}
c_Color.prototype.p_Set8=function(t_color){
	bb_graphics2_SetColor(t_color.p_red(),t_color.p_green(),t_color.p_blue());
	bb_graphics2_SetAlpha(t_color.p_alphaFloat());
}
c_Color.prototype.p_Activate=function(){
	if(!((this.m_oldColor)!=null)){
		this.m_oldColor=c_Color.m_new2.call(new c_Color,0.0,0.0,0.0,0.0);
	}
	var t_colorStack=bb_graphics2_GetColor();
	this.m_oldColor.p_red2(t_colorStack[0]);
	this.m_oldColor.p_green2(t_colorStack[1]);
	this.m_oldColor.p_blue2(t_colorStack[2]);
	this.m_oldColor.p_alpha2(bb_graphics2_GetAlpha());
	this.p_Set8(this);
}
c_Color.prototype.p_Deactivate=function(){
	if(!((this.m_oldColor)!=null)){
		return;
	}
	this.p_Set8(this.m_oldColor);
	this.m_oldColor=null;
}
function bb_math_Clamp(t_n,t_min,t_max){
	if(t_n<t_min){
		return t_min;
	}
	if(t_n>t_max){
		return t_max;
	}
	return t_n;
}
function bb_math_Clamp2(t_n,t_min,t_max){
	if(t_n<t_min){
		return t_min;
	}
	if(t_n>t_max){
		return t_max;
	}
	return t_n;
}
function c_FpsCounter(){
	c_BaseDisplayObject.call(this);
	this.m_historyLength=0;
	this.m_samplesPerSec=0;
	this.m_fpsHistory=[];
	this.m_sampleDuration=0;
	this.m_fpsCounter=0;
	this.m_maxFps=0;
	this.m_lastSampleTime=.0;
	this.implments={c_Updateable:1,c_Renderable:1,c_Colorable:1,c_Positionable:1,c_Sizeable:1};
}
c_FpsCounter.prototype=extend_class(c_BaseDisplayObject);
c_FpsCounter.m_new=function(t_historyLength,t_samplesPerSec){
	c_BaseDisplayObject.m_new.call(this);
	this.m_historyLength=t_historyLength;
	this.m_samplesPerSec=t_samplesPerSec;
	this.m_fpsHistory=new_number_array(t_historyLength);
	this.m_sampleDuration=((1000.0/(t_samplesPerSec))|0);
	this.p_SetPosition(c_Vector2D.m_new.call(new c_Vector2D,0.0,0.0));
	this.p_SetSize(c_Vector2D.m_new.call(new c_Vector2D,100.0,60.0));
	return this;
}
c_FpsCounter.prototype.p_OnRenderText=function(){
	bb_graphics2_DrawText("FPS: "+String(this.m_fpsHistory[this.m_historyLength-1]),this.p_GetPosition().m_x,this.p_GetPosition().m_y,0.0,0.0);
}
c_FpsCounter.prototype.p_OnRenderHistogram=function(){
	var t_maxPosY=this.p_GetPosition().m_y+this.p_GetSize().m_y;
	var t_maxLineY=t_maxPosY-(this.p_GetPosition().m_y+20.0);
	var t_heightFactor=1.0/(this.m_maxFps);
	for(var t_i=0;t_i<this.m_historyLength;t_i=t_i+1){
		bb_graphics2_DrawLine(this.p_GetPosition().m_x+(t_i),t_maxPosY-t_maxLineY*t_heightFactor*(this.m_fpsHistory[t_i]),this.p_GetPosition().m_x+(t_i),t_maxPosY);
	}
}
c_FpsCounter.prototype.p_OnRender=function(){
	this.m_fpsCounter+=1;
	this.p_GetColor().p_Activate();
	this.p_OnRenderText();
	this.p_OnRenderHistogram();
	this.p_GetColor().p_Deactivate();
}
c_FpsCounter.prototype.p_UpdateHistory=function(){
	this.m_maxFps=0;
	for(var t_i=0;t_i<this.m_historyLength-1;t_i=t_i+1){
		var t_tmp=this.m_fpsHistory[t_i];
		this.m_fpsHistory[t_i]=this.m_fpsHistory[t_i+1];
		this.m_fpsHistory[t_i+1]=t_tmp;
		this.m_maxFps=bb_math_Max(this.m_maxFps,this.m_fpsHistory[t_i]);
	}
}
c_FpsCounter.prototype.p_OnUpdate2=function(t_timer){
	this.m_lastSampleTime+=t_timer.p_frameTime();
	if(this.m_lastSampleTime>=(this.m_sampleDuration)){
		this.m_lastSampleTime=this.m_lastSampleTime-(this.m_sampleDuration);
		this.p_UpdateHistory();
		this.m_fpsHistory[this.m_historyLength-1]=this.m_fpsCounter*this.m_samplesPerSec;
		this.m_maxFps=bb_math_Max(this.m_maxFps,this.m_fpsHistory[this.m_historyLength-1]);
		this.m_fpsCounter=0;
	}
}
function c_KeyEmitter(){
	Object.call(this);
	this.m_handler=null;
	this.m_showKeyboard=true;
	this.m_dirty=false;
	this.m_lastMode=new_bool_array(255);
	this.m_keyboardEnabled=false;
	this.m_active=true;
	this.m_event=c_KeyEvent.m_new2.call(new c_KeyEvent);
	this.implments={c_Updateable:1,c_Suspendable:1};
}
c_KeyEmitter.m_new=function(){
	return this;
}
c_KeyEmitter.prototype.p_OnResume=function(){
}
c_KeyEmitter.prototype.p_Reset=function(){
	if(!this.m_dirty){
		return;
	}
	this.m_dirty=false;
	for(var t_i=0;t_i<this.m_lastMode.length;t_i=t_i+1){
		this.m_lastMode[t_i]=false;
	}
}
c_KeyEmitter.prototype.p_OnSuspend=function(){
	this.p_Reset();
}
c_KeyEmitter.prototype.p_EnableKeyboard=function(){
	if(this.m_keyboardEnabled){
		return;
	}
	this.m_keyboardEnabled=true;
	bb_input_EnableKeyboard();
}
c_KeyEmitter.prototype.p_DisableKeyboard=function(){
	if(!this.m_keyboardEnabled){
		return;
	}
	this.m_keyboardEnabled=false;
	bb_input_DisableKeyboard();
}
c_KeyEmitter.prototype.p_DispatchEvent=function(t_code,t_mode){
	this.m_event.p_code(t_code);
	var t_1=t_mode;
	if(t_1==0){
		this.m_handler.p_OnKeyUp(this.m_event);
	}else{
		if(t_1==1){
			this.m_handler.p_OnKeyDown(this.m_event);
		}else{
			if(t_1==2){
				this.m_handler.p_OnKeyPress(this.m_event);
			}
		}
	}
}
c_KeyEmitter.prototype.p_ProcessKeys=function(){
	var t_mode=false;
	this.m_dirty=true;
	for(var t_i=0;t_i<this.m_lastMode.length;t_i=t_i+1){
		t_mode=bb_input_KeyDown(t_i)==1;
		if(t_mode==this.m_lastMode[t_i]){
			if(t_mode){
				this.p_DispatchEvent(t_i,2);
			}
		}else{
			this.m_lastMode[t_i]=t_mode;
			if(t_mode){
				this.p_DispatchEvent(t_i,1);
			}else{
				this.p_DispatchEvent(t_i,0);
			}
		}
	}
}
c_KeyEmitter.prototype.p_OnUpdate2=function(t_deltatimer){
	if(this.m_showKeyboard){
		this.p_EnableKeyboard();
	}else{
		this.p_DisableKeyboard();
	}
	if(this.m_active && ((this.m_handler)!=null)){
		this.p_ProcessKeys();
	}else{
		this.p_Reset();
	}
}
function c_TouchEmitter(){
	Object.call(this);
	this.m_handler=null;
	this.m_retainSize=-1;
	this.m__touchFingers=31;
	this.m_touchEvents=new_object_array(31);
	this.m_active=true;
	this.m_isTouchDown=new_bool_array(31);
	this.m_touchDownDispatched=new_bool_array(31);
	this.m_minDistance=0.0;
	this.implments={c_Updateable:1,c_Suspendable:1};
}
c_TouchEmitter.m_new=function(){
	return this;
}
c_TouchEmitter.prototype.p_OnResume=function(){
}
c_TouchEmitter.prototype.p_OnSuspend=function(){
	for(var t_i=0;t_i<this.m__touchFingers;t_i=t_i+1){
		this.m_touchEvents[t_i]=null;
	}
}
c_TouchEmitter.prototype.p_ReadTouch=function(){
	var t_diffVector=null;
	var t_vector=null;
	var t_lastTouchDown=false;
	for(var t_i=0;t_i<this.m__touchFingers;t_i=t_i+1){
		t_lastTouchDown=this.m_isTouchDown[t_i];
		this.m_isTouchDown[t_i]=((bb_input_TouchDown(t_i))!=0);
		if(!this.m_isTouchDown[t_i] && !t_lastTouchDown){
			continue;
		}
		if(this.m_touchEvents[t_i]==null){
			this.m_touchDownDispatched[t_i]=false;
			this.m_touchEvents[t_i]=c_TouchEvent.m_new.call(new c_TouchEvent,t_i);
		}
		t_vector=c_Vector2D.m_new.call(new c_Vector2D,bb_input_TouchX(t_i),bb_input_TouchY(t_i));
		t_diffVector=t_vector.p_Copy().p_Sub(this.m_touchEvents[t_i].p_prevPos());
		if(t_diffVector.p_Length2()>=this.m_minDistance){
			this.m_touchEvents[t_i].p_Add2(t_vector);
			if(this.m_retainSize>-1){
				this.m_touchEvents[t_i].p_Trim(this.m_retainSize);
			}
		}
	}
}
c_TouchEmitter.prototype.p_ProcessTouch=function(){
	for(var t_i=0;t_i<this.m__touchFingers;t_i=t_i+1){
		if(this.m_touchEvents[t_i]==null){
			continue;
		}
		if(!this.m_touchDownDispatched[t_i]){
			this.m_handler.p_OnTouchDown(this.m_touchEvents[t_i].p_Copy());
			this.m_touchDownDispatched[t_i]=true;
		}else{
			if(!this.m_isTouchDown[t_i]){
				this.m_handler.p_OnTouchUp(this.m_touchEvents[t_i].p_Copy());
				this.m_touchEvents[t_i]=null;
			}else{
				this.m_handler.p_OnTouchMove(this.m_touchEvents[t_i]);
			}
		}
	}
}
c_TouchEmitter.prototype.p_OnUpdate2=function(t_deltatimer){
	if(!this.m_active){
		return;
	}
	if(!((this.m_handler)!=null)){
		return;
	}
	this.p_ReadTouch();
	this.p_ProcessTouch();
}
function bb_graphics2_GetColor(){
	return [bb_graphics2_context.m_color_r,bb_graphics2_context.m_color_g,bb_graphics2_context.m_color_b];
}
function bb_graphics2_GetColor2(t_color){
	t_color[0]=bb_graphics2_context.m_color_r;
	t_color[1]=bb_graphics2_context.m_color_g;
	t_color[2]=bb_graphics2_context.m_color_b;
	return 0;
}
function bb_graphics2_GetAlpha(){
	return bb_graphics2_context.m_alpha;
}
function bb_graphics2_DrawImage(t_image,t_x,t_y,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics2_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics2_renderDevice.DrawSurface(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty);
	}else{
		bb_graphics2_renderDevice.DrawSurface2(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	return 0;
}
function bb_graphics2_PushMatrix(){
	var t_sp=bb_graphics2_context.m_matrixSp;
	if(t_sp==bb_graphics2_context.m_matrixStack.length){
		bb_graphics2_context.m_matrixStack=resize_number_array(bb_graphics2_context.m_matrixStack,t_sp*2);
	}
	bb_graphics2_context.m_matrixStack[t_sp+0]=bb_graphics2_context.m_ix;
	bb_graphics2_context.m_matrixStack[t_sp+1]=bb_graphics2_context.m_iy;
	bb_graphics2_context.m_matrixStack[t_sp+2]=bb_graphics2_context.m_jx;
	bb_graphics2_context.m_matrixStack[t_sp+3]=bb_graphics2_context.m_jy;
	bb_graphics2_context.m_matrixStack[t_sp+4]=bb_graphics2_context.m_tx;
	bb_graphics2_context.m_matrixStack[t_sp+5]=bb_graphics2_context.m_ty;
	bb_graphics2_context.m_matrixSp=t_sp+6;
	return 0;
}
function bb_graphics2_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	var t_ix2=t_ix*bb_graphics2_context.m_ix+t_iy*bb_graphics2_context.m_jx;
	var t_iy2=t_ix*bb_graphics2_context.m_iy+t_iy*bb_graphics2_context.m_jy;
	var t_jx2=t_jx*bb_graphics2_context.m_ix+t_jy*bb_graphics2_context.m_jx;
	var t_jy2=t_jx*bb_graphics2_context.m_iy+t_jy*bb_graphics2_context.m_jy;
	var t_tx2=t_tx*bb_graphics2_context.m_ix+t_ty*bb_graphics2_context.m_jx+bb_graphics2_context.m_tx;
	var t_ty2=t_tx*bb_graphics2_context.m_iy+t_ty*bb_graphics2_context.m_jy+bb_graphics2_context.m_ty;
	bb_graphics2_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	return 0;
}
function bb_graphics2_Transform2(t_m){
	bb_graphics2_Transform(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics2_Translate(t_x,t_y){
	bb_graphics2_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	return 0;
}
function bb_graphics2_Rotate(t_angle){
	bb_graphics2_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	return 0;
}
function bb_graphics2_Scale(t_x,t_y){
	bb_graphics2_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	return 0;
}
function bb_graphics2_PopMatrix(){
	var t_sp=bb_graphics2_context.m_matrixSp-6;
	bb_graphics2_SetMatrix(bb_graphics2_context.m_matrixStack[t_sp+0],bb_graphics2_context.m_matrixStack[t_sp+1],bb_graphics2_context.m_matrixStack[t_sp+2],bb_graphics2_context.m_matrixStack[t_sp+3],bb_graphics2_context.m_matrixStack[t_sp+4],bb_graphics2_context.m_matrixStack[t_sp+5]);
	bb_graphics2_context.m_matrixSp=t_sp;
	return 0;
}
function bb_graphics2_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics2_PushMatrix();
	bb_graphics2_Translate(t_x,t_y);
	bb_graphics2_Rotate(t_rotation);
	bb_graphics2_Scale(t_scaleX,t_scaleY);
	bb_graphics2_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics2_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics2_renderDevice.DrawSurface(t_image.m_surface,0.0,0.0);
	}else{
		bb_graphics2_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	bb_graphics2_PopMatrix();
	return 0;
}
function c_Enumerator3(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator3.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator3.m_new2=function(){
	return this;
}
c_Enumerator3.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator3.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_math_Min(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function bb_graphics2_DrawImageRect(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics2_context.p_Validate();
	bb_graphics2_renderDevice.DrawSurface2(t_image.m_surface,-t_image.m_tx+t_x,-t_image.m_ty+t_y,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	return 0;
}
function bb_graphics2_DrawImageRect2(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics2_PushMatrix();
	bb_graphics2_Translate(t_x,t_y);
	bb_graphics2_Rotate(t_rotation);
	bb_graphics2_Scale(t_scaleX,t_scaleY);
	bb_graphics2_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics2_context.p_Validate();
	bb_graphics2_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	bb_graphics2_PopMatrix();
	return 0;
}
function bb_graphics2_DrawRect(t_x,t_y,t_w,t_h){
	bb_graphics2_context.p_Validate();
	bb_graphics2_renderDevice.DrawRect(t_x,t_y,t_w,t_h);
	return 0;
}
function bb_graphics2_DrawPoly(t_verts){
	bb_graphics2_context.p_Validate();
	bb_graphics2_renderDevice.DrawPoly(t_verts);
	return 0;
}
function bb_graphics2_DrawPoly2(t_verts,t_image,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics2_context.p_Validate();
	bb_graphics2_renderDevice.DrawPoly2(t_verts,t_image.m_surface,t_f.m_x,t_f.m_y);
	return 0;
}
function bb_graphics2_DrawText(t_text,t_x,t_y,t_xalign,t_yalign){
	if(!((bb_graphics2_context.m_font)!=null)){
		return 0;
	}
	var t_w=bb_graphics2_context.m_font.p_Width();
	var t_h=bb_graphics2_context.m_font.p_Height();
	t_x-=Math.floor((t_w*t_text.length)*t_xalign);
	t_y-=Math.floor((t_h)*t_yalign);
	for(var t_i=0;t_i<t_text.length;t_i=t_i+1){
		var t_ch=t_text.charCodeAt(t_i)-bb_graphics2_context.m_firstChar;
		if(t_ch>=0 && t_ch<bb_graphics2_context.m_font.p_Frames()){
			bb_graphics2_DrawImage(bb_graphics2_context.m_font,t_x+(t_i*t_w),t_y,t_ch);
		}
	}
	return 0;
}
function bb_graphics2_DrawLine(t_x1,t_y1,t_x2,t_y2){
	bb_graphics2_context.p_Validate();
	bb_graphics2_renderDevice.DrawLine(t_x1,t_y1,t_x2,t_y2);
	return 0;
}
function bb_input_EnableKeyboard(){
	return bb_input_device.p_SetKeyboardEnabled(true);
}
function bb_input_DisableKeyboard(){
	return bb_input_device.p_SetKeyboardEnabled(false);
}
function bb_input_KeyDown(t_key){
	return ((bb_input_device.p_KeyDown(t_key))?1:0);
}
function c_KeyEvent(){
	Object.call(this);
	this.m__code=0;
	this.m__char="";
}
c_KeyEvent.prototype.p_code=function(t_newCode){
	this.m__code=t_newCode;
	this.m__char=String.fromCharCode(t_newCode);
}
c_KeyEvent.prototype.p_code2=function(){
	return this.m__code;
}
c_KeyEvent.m_new=function(t_code){
	this.p_code(t_code);
	return this;
}
c_KeyEvent.m_new2=function(){
	return this;
}
function c_TouchEvent(){
	Object.call(this);
	this.m__finger=0;
	this.m__startTime=0;
	this.m__id=0;
	this.m_positions=c_List5.m_new.call(new c_List5);
	this.m__endTime=0;
}
c_TouchEvent.m_nextId=0;
c_TouchEvent.m_new=function(t_finger){
	this.m__finger=t_finger;
	this.m__startTime=bb_app3_Millisecs();
	c_TouchEvent.m_nextId+=1;
	this.m__id=c_TouchEvent.m_nextId;
	return this;
}
c_TouchEvent.m_new2=function(){
	return this;
}
c_TouchEvent.prototype.p_startPos=function(){
	if(this.m_positions.p_Count()==0){
		return c_Vector2D.m_new.call(new c_Vector2D,0.0,0.0);
	}
	return this.m_positions.p_First();
}
c_TouchEvent.prototype.p_prevPos=function(){
	if(this.m_positions.p_Count()==0){
		return c_Vector2D.m_new.call(new c_Vector2D,0.0,0.0);
	}
	if(this.m_positions.p_Count()==1){
		return this.p_startPos();
	}
	return this.m_positions.p_LastNode().p_PrevNode().p_Value();
}
c_TouchEvent.prototype.p_Add2=function(t_pos){
	this.m__endTime=bb_app3_Millisecs();
	if(this.p_prevPos().m_x==t_pos.m_x && this.p_prevPos().m_y==t_pos.m_y){
		return;
	}
	this.m_positions.p_AddLast5(t_pos);
}
c_TouchEvent.prototype.p_Trim=function(t_size){
	if(t_size==0){
		this.m_positions.p_Clear();
		return;
	}
	while(this.m_positions.p_Count()>t_size){
		this.m_positions.p_RemoveFirst();
	}
}
c_TouchEvent.prototype.p_Copy=function(){
	var t_obj=c_TouchEvent.m_new.call(new c_TouchEvent,this.m__finger);
	var t_=this.m_positions.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_pos=t_.p_NextObject();
		t_obj.p_Add2(t_pos);
	}
	return t_obj;
}
c_TouchEvent.prototype.p_pos=function(){
	if(this.m_positions.p_Count()==0){
		return c_Vector2D.m_new.call(new c_Vector2D,0.0,0.0);
	}
	return this.m_positions.p_Last();
}
function bb_input_TouchDown(t_index){
	return ((bb_input_device.p_KeyDown(384+t_index))?1:0);
}
function bb_input_TouchX(t_index){
	return bb_input_device.p_TouchX(t_index);
}
function bb_input_TouchY(t_index){
	return bb_input_device.p_TouchY(t_index);
}
function c_List5(){
	Object.call(this);
	this.m__head=(c_HeadNode5.m_new.call(new c_HeadNode5));
}
c_List5.m_new=function(){
	return this;
}
c_List5.prototype.p_AddLast5=function(t_data){
	return c_Node11.m_new.call(new c_Node11,this.m__head,this.m__head.m__pred,t_data);
}
c_List5.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast5(t_t);
	}
	return this;
}
c_List5.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List5.prototype.p_First=function(){
	return this.m__head.m__succ.m__data;
}
c_List5.prototype.p_LastNode=function(){
	if(this.m__head.m__pred!=this.m__head){
		return this.m__head.m__pred;
	}
	return null;
}
c_List5.prototype.p_Clear=function(){
	this.m__head.m__succ=this.m__head;
	this.m__head.m__pred=this.m__head;
	return 0;
}
c_List5.prototype.p_RemoveFirst=function(){
	var t_data=this.m__head.m__succ.m__data;
	this.m__head.m__succ.p_Remove();
	return t_data;
}
c_List5.prototype.p_Equals8=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List5.prototype.p_Find=function(t_value,t_start){
	while(t_start!=this.m__head){
		if(this.p_Equals8(t_value,t_start.m__data)){
			return t_start;
		}
		t_start=t_start.m__succ;
	}
	return null;
}
c_List5.prototype.p_Find2=function(t_value){
	return this.p_Find(t_value,this.m__head.m__succ);
}
c_List5.prototype.p_RemoveFirst2=function(t_value){
	var t_node=this.p_Find2(t_value);
	if((t_node)!=null){
		t_node.p_Remove();
	}
}
c_List5.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator4.m_new.call(new c_Enumerator4,this);
}
c_List5.prototype.p_Last=function(){
	return this.m__head.m__pred.m__data;
}
function c_Node11(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node11.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node11.m_new2=function(){
	return this;
}
c_Node11.prototype.p_GetNode=function(){
	return this;
}
c_Node11.prototype.p_PrevNode=function(){
	return this.m__pred.p_GetNode();
}
c_Node11.prototype.p_Value=function(){
	return this.m__data;
}
c_Node11.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode5(){
	c_Node11.call(this);
}
c_HeadNode5.prototype=extend_class(c_Node11);
c_HeadNode5.m_new=function(){
	c_Node11.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
c_HeadNode5.prototype.p_GetNode=function(){
	return null;
}
function c_Enumerator4(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator4.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator4.m_new2=function(){
	return this;
}
c_Enumerator4.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator4.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Enumerator5(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator5.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator5.m_new2=function(){
	return this;
}
c_Enumerator5.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator5.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Enumerator6(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator6.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator6.m_new2=function(){
	return this;
}
c_Enumerator6.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator6.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bbInit(){
	bb_reflection__classesMap=null;
	bb_reflection__classes=[];
	bb_reflection__getClass=null;
	c_Stack.m_NIL=null;
	c_Stack2.m_NIL=null;
	bb_reflection__boolClass=null;
	bb_reflection__intClass=null;
	bb_reflection__floatClass=null;
	bb_reflection__stringClass=null;
	bb_reflection__functions=[];
	bb_reflection__init=bb_reflection___init();
	bb_app3__app=null;
	bb_app3__delegate=null;
	bb_app3__game=BBGame.Game();
	bb_reflection__unknownClass=(c_UnknownClass.m_new.call(new c_UnknownClass));
	bb_graphics2_device=null;
	bb_graphics2_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app3__devWidth=0;
	bb_app3__devHeight=0;
	bb_app3__displayModes=[];
	bb_app3__desktopMode=null;
	bb_graphics2_renderDevice=null;
	bb_app3__updateRate=0;
	c_Director.m_instance=null;
	bb_asyncevent__current=null;
	bb_asyncevent__sources=c_Stack8.m_new.call(new c_Stack8);
	c_Stack8.m_NIL=null;
	c_Sprite.m_cacheImage=c_StringMap4.m_new.call(new c_StringMap4);
	c_Sprite.m_cacheSize=c_StringMap5.m_new.call(new c_StringMap5);
	c_ColorStore.m_lightInstance=null;
	c_ColorStore.m_fogInstance=null;
	c_ColorStore.m_darkInstance=null;
	c_TouchEvent.m_nextId=0;
}
//${TRANSCODE_END}
