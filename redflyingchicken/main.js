
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="release";
CFG_HOST="winnt";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=864;height=13;\n[gfx/background.jpg];type=image/jpg;width=1024;height=180;\n[gfx/button_start.png];type=image/png;width=128;height=64;\n[gfx/explosion.png];type=image/png;width=150;height=148;\n[gfx/fireball.png];type=image/png;width=32;height=32;\n[gfx/fonts/font_24_P_1.png];type=image/png;width=512;height=512;\n[gfx/fonts/fontzahl_P_1.png];type=image/png;width=512;height=512;\n[gfx/foreground.png];type=image/png;width=1024;height=180;\n[gfx/gargoyle.png];type=image/png;width=504;height=64;\n[gfx/lower_bar.png];type=image/png;width=64;height=256;\n[gfx/titlescreen.jpg];type=image/jpg;width=640;height=360;\n[gfx/upper_bar.png];type=image/png;width=64;height=256;\n";
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

function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	if((bb_app__app)!=null){
		error("App has already been created");
	}
	bb_app__app=this;
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	bb_app__game.SetDelegate(bb_app__delegate);
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
	bb_app_EndApp();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	this.p_OnClose();
	return 0;
}
function c_RedFlyingChicken(){
	c_App.call(this);
}
c_RedFlyingChicken.prototype=extend_class(c_App);
c_RedFlyingChicken.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_RedFlyingChicken.prototype.p_OnCreate=function(){
	bb_globals_gIsLoadingInitialized=false;
	bb_utils_CheckForResolution();
	bb_init_InitLoadScreen();
	bb_utils_LoadStatistics();
	bb_app_SetUpdateRate(30);
	return 0;
}
c_RedFlyingChicken.prototype.p_OnUpdate=function(){
	bb_globals_gControls.p_update();
	bb_globals_gGame.p_update();
	return 0;
}
c_RedFlyingChicken.prototype.p_OnSuspend=function(){
	bb_utils_SaveStatistics();
	return 0;
}
c_RedFlyingChicken.prototype.p_OnResume=function(){
	bb_utils_LoadStatistics();
	return 0;
}
c_RedFlyingChicken.prototype.p_OnRender=function(){
	bb_globals_gLoopTimeStart=bb_app_Millisecs();
	bb_graphics_Cls(0.0,0.0,0.0);
	bb_graphics_PushMatrix();
	bb_graphics_Scale(bb_globals_gScaleRatio,bb_globals_gScaleRatio);
	var t_1=bb_globals_gGameState;
	if(t_1==1){
		bb_loadScreen_LoadScreen();
	}else{
		if(t_1==2){
			bb_globals_gGame.p_draw();
		}
	}
	bb_graphics_PopMatrix();
	bb_globals_gLoopTimeEnd=bb_app_Millisecs();
	bb_utils_UpdateFPS();
	return 0;
}
var bb_app__app=null;
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
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	bb_graphics_SetFont(null,32);
	this.m__audio=(new gxtkAudio);
	bb_audio_SetAudioDevice(this.m__audio);
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	bb_input_SetInputDevice(this.m__input);
	bb_app_ValidateDeviceWindow(false);
	bb_app_EnumDisplayModes();
	bb_app__app.p_OnCreate();
}
c_GameDelegate.prototype.SuspendGame=function(){
	bb_app__app.p_OnSuspend();
	this.m__audio.Suspend();
}
c_GameDelegate.prototype.ResumeGame=function(){
	this.m__audio.Resume();
	bb_app__app.p_OnResume();
}
c_GameDelegate.prototype.UpdateGame=function(){
	bb_app_ValidateDeviceWindow(true);
	this.m__input.p_BeginUpdate();
	bb_app__app.p_OnUpdate();
	this.m__input.p_EndUpdate();
}
c_GameDelegate.prototype.RenderGame=function(){
	bb_app_ValidateDeviceWindow(true);
	var t_mode=this.m__graphics.BeginRender();
	if((t_mode)!=0){
		bb_graphics_BeginRender();
	}
	if(t_mode==2){
		bb_app__app.p_OnLoading();
	}else{
		bb_app__app.p_OnRender();
	}
	if((t_mode)!=0){
		bb_graphics_EndRender();
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
		bb_app__app.p_OnClose();
	}else{
		if(t_1==416){
			bb_app__app.p_OnBack();
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
var bb_app__delegate=null;
var bb_app__game=null;
var bb_redflyingchicken_gRedFlyingChicken=null;
function bbMain(){
	bb_redflyingchicken_gRedFlyingChicken=c_RedFlyingChicken.m_new.call(new c_RedFlyingChicken);
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	bb_graphics_device=t_dev;
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
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
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
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
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
c_Image.prototype.p_Discard=function(){
	if(((this.m_surface)!=null) && !((this.m_source)!=null)){
		this.m_surface.Discard();
		this.m_surface=null;
	}
	return 0;
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
		bb_graphics_renderDevice.SetMatrix(bb_graphics_context.m_ix,bb_graphics_context.m_iy,bb_graphics_context.m_jx,bb_graphics_context.m_jy,bb_graphics_context.m_tx,bb_graphics_context.m_ty);
		this.m_matDirty=0;
	}
	return 0;
}
var bb_graphics_context=null;
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
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
	}
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	if(!((t_font)!=null)){
		if(!((bb_graphics_context.m_defaultFont)!=null)){
			bb_graphics_context.m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		t_font=bb_graphics_context.m_defaultFont;
		t_firstChar=32;
	}
	bb_graphics_context.m_font=t_font;
	bb_graphics_context.m_firstChar=t_firstChar;
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
c_InputDevice.prototype.p_KeyDown=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyDown[t_key];
	}
	return false;
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
var bb_app__devWidth=0;
var bb_app__devHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	var t_w=bb_app__game.GetDeviceWidth();
	var t_h=bb_app__game.GetDeviceHeight();
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight){
		return;
	}
	bb_app__devWidth=t_w;
	bb_app__devHeight=t_h;
	if(t_notifyApp){
		bb_app__app.p_OnResize();
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
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
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
c_Map.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
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
c_Map.prototype.p_Insert=function(t_key,t_value){
	return this.p_Set(t_key,t_value);
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
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
c_Stack.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Node(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
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
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	var t_modes=bb_app__game.GetDisplayModes();
	var t_mmap=c_IntMap.m_new.call(new c_IntMap);
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		var t_w=t_modes[t_i].width;
		var t_h=t_modes[t_i].height;
		var t_size=t_w<<16|t_h;
		if(t_mmap.p_Contains(t_size)){
		}else{
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,t_modes[t_i].width,t_modes[t_i].height);
			t_mmap.p_Insert(t_size,t_mode);
			t_mstack.p_Push(t_mode);
		}
	}
	bb_app__displayModes=t_mstack.p_ToArray();
	var t_mode2=bb_app__game.GetDesktopMode();
	if((t_mode2)!=null){
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,t_mode2.width,t_mode2.height);
	}else{
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	bb_graphics_context.m_ix=t_ix;
	bb_graphics_context.m_iy=t_iy;
	bb_graphics_context.m_jx=t_jx;
	bb_graphics_context.m_jy=t_jy;
	bb_graphics_context.m_tx=t_tx;
	bb_graphics_context.m_ty=t_ty;
	bb_graphics_context.m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	bb_graphics_context.m_matDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	bb_graphics_SetMatrix(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	bb_graphics_context.m_color_r=t_r;
	bb_graphics_context.m_color_g=t_g;
	bb_graphics_context.m_color_b=t_b;
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	bb_graphics_context.m_alpha=t_alpha;
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	bb_graphics_context.m_blend=t_blend;
	bb_graphics_renderDevice.SetBlend(t_blend);
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	bb_graphics_context.m_scissor_x=t_x;
	bb_graphics_context.m_scissor_y=t_y;
	bb_graphics_context.m_scissor_width=t_width;
	bb_graphics_context.m_scissor_height=t_height;
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_renderDevice=bb_graphics_device;
	bb_graphics_context.m_matrixSp=0;
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	bb_graphics_renderDevice=null;
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	error("");
}
var bb_globals_gIsLoadingInitialized=false;
var bb_globals_gResX=0;
var bb_globals_gResY=0;
var bb_globals_gAspectRatio=0;
var bb_globals_gScaleRatio=0;
var bb_globals_gMaxX=0;
function bb_utils_CheckForResolution(){
	bb_globals_gResX=(bb_app_DeviceWidth());
	bb_globals_gResY=(bb_app_DeviceHeight());
	bb_globals_gAspectRatio=bb_globals_gResX/bb_globals_gResY;
	bb_globals_gScaleRatio=bb_globals_gResY/360.0;
	bb_globals_gMaxX=bb_globals_gResX/bb_globals_gScaleRatio;
}
var bb_globals_gSplashScreen=null;
function c_BitmapFont(){
	Object.call(this);
	this.m_borderChars=[];
	this.m_faceChars=[];
	this.m_shadowChars=[];
	this.m_packedImages=[];
	this.m__drawShadow=true;
	this.m__kerning=null;
	this.m__drawBorder=true;
	this.implments={c_Font:1};
}
c_BitmapFont.prototype.p_LoadPacked=function(t_info,t_fontName,t_dynamicLoad){
	var t_header=t_info.slice(0,t_info.indexOf(",",0));
	var t_separator="";
	var t_2=t_header;
	if(t_2=="P1"){
		t_separator=".";
	}else{
		if(t_2=="P1.01"){
			t_separator="_P_";
		}
	}
	t_info=t_info.slice(t_info.indexOf(",",0)+1);
	this.m_borderChars=new_object_array(65536);
	this.m_faceChars=new_object_array(65536);
	this.m_shadowChars=new_object_array(65536);
	this.m_packedImages=new_object_array(256);
	var t_maxPacked=0;
	var t_maxChar=0;
	var t_prefixName=t_fontName;
	if(string_endswith(t_prefixName.toLowerCase(),".txt")){
		t_prefixName=t_prefixName.slice(0,-4);
	}
	var t_charList=t_info.split(";");
	var t_=t_charList;
	var t_3=0;
	while(t_3<t_.length){
		var t_chr=t_[t_3];
		t_3=t_3+1;
		var t_chrdata=t_chr.split(",");
		if(t_chrdata.length<2){
			break;
		}
		var t_char=null;
		var t_charIndex=parseInt((t_chrdata[0]),10);
		if(t_maxChar<t_charIndex){
			t_maxChar=t_charIndex;
		}
		var t_32=t_chrdata[1];
		if(t_32=="B"){
			this.m_borderChars[t_charIndex]=c_BitMapChar.m_new.call(new c_BitMapChar);
			t_char=this.m_borderChars[t_charIndex];
		}else{
			if(t_32=="F"){
				this.m_faceChars[t_charIndex]=c_BitMapChar.m_new.call(new c_BitMapChar);
				t_char=this.m_faceChars[t_charIndex];
			}else{
				if(t_32=="S"){
					this.m_shadowChars[t_charIndex]=c_BitMapChar.m_new.call(new c_BitMapChar);
					t_char=this.m_shadowChars[t_charIndex];
				}
			}
		}
		t_char.m_packedFontIndex=parseInt((t_chrdata[2]),10);
		if(this.m_packedImages[t_char.m_packedFontIndex]==null){
			this.m_packedImages[t_char.m_packedFontIndex]=bb_graphics_LoadImage(t_prefixName+t_separator+String(t_char.m_packedFontIndex)+".png",1,c_Image.m_DefaultFlags);
			if(t_maxPacked<t_char.m_packedFontIndex){
				t_maxPacked=t_char.m_packedFontIndex;
			}
		}
		t_char.m_packedPosition.m_x=(parseInt((t_chrdata[3]),10));
		t_char.m_packedPosition.m_y=(parseInt((t_chrdata[4]),10));
		t_char.m_packedSize.m_x=(parseInt((t_chrdata[5]),10));
		t_char.m_packedSize.m_y=(parseInt((t_chrdata[6]),10));
		t_char.m_drawingMetrics.m_drawingOffset.m_x=(parseInt((t_chrdata[8]),10));
		t_char.m_drawingMetrics.m_drawingOffset.m_y=(parseInt((t_chrdata[9]),10));
		t_char.m_drawingMetrics.m_drawingSize.m_x=(parseInt((t_chrdata[10]),10));
		t_char.m_drawingMetrics.m_drawingSize.m_y=(parseInt((t_chrdata[11]),10));
		t_char.m_drawingMetrics.m_drawingWidth=(parseInt((t_chrdata[12]),10));
	}
	this.m_borderChars=this.m_borderChars.slice(0,t_maxChar+1);
	this.m_faceChars=this.m_faceChars.slice(0,t_maxChar+1);
	this.m_shadowChars=this.m_shadowChars.slice(0,t_maxChar+1);
	this.m_packedImages=this.m_packedImages.slice(0,t_maxPacked+1);
	return 0;
}
c_BitmapFont.prototype.p_LoadFontData=function(t_Info,t_fontName,t_dynamicLoad){
	if(string_startswith(t_Info,"P1")){
		this.p_LoadPacked(t_Info,t_fontName,t_dynamicLoad);
		return 0;
	}
	var t_tokenStream=t_Info.split(",");
	var t_index=0;
	this.m_borderChars=new_object_array(65536);
	this.m_faceChars=new_object_array(65536);
	this.m_shadowChars=new_object_array(65536);
	var t_prefixName=t_fontName;
	if(string_endswith(t_prefixName.toLowerCase(),".txt")){
		t_prefixName=t_prefixName.slice(0,-4);
	}
	var t_char=0;
	while(t_index<t_tokenStream.length){
		var t_strChar=t_tokenStream[t_index];
		if(string_trim(t_strChar)==""){
			t_index+=1;
			break;
		}
		t_char=parseInt((t_strChar),10);
		t_index+=1;
		var t_kind=t_tokenStream[t_index];
		t_index+=1;
		var t_1=t_kind;
		if(t_1=="{BR"){
			t_index+=3;
			this.m_borderChars[t_char]=c_BitMapChar.m_new.call(new c_BitMapChar);
			this.m_borderChars[t_char].m_drawingMetrics.m_drawingOffset.m_x=(parseInt((t_tokenStream[t_index]),10));
			this.m_borderChars[t_char].m_drawingMetrics.m_drawingOffset.m_y=(parseInt((t_tokenStream[t_index+1]),10));
			this.m_borderChars[t_char].m_drawingMetrics.m_drawingSize.m_x=(parseInt((t_tokenStream[t_index+2]),10));
			this.m_borderChars[t_char].m_drawingMetrics.m_drawingSize.m_y=(parseInt((t_tokenStream[t_index+3]),10));
			this.m_borderChars[t_char].m_drawingMetrics.m_drawingWidth=(parseInt((t_tokenStream[t_index+4]),10));
			if(t_dynamicLoad==false){
				this.m_borderChars[t_char].m_image=bb_graphics_LoadImage(t_prefixName+"_BORDER_"+String(t_char)+".png",1,c_Image.m_DefaultFlags);
				this.m_borderChars[t_char].m_image.p_SetHandle(-this.m_borderChars[t_char].m_drawingMetrics.m_drawingOffset.m_x,-this.m_borderChars[t_char].m_drawingMetrics.m_drawingOffset.m_y);
			}else{
				this.m_borderChars[t_char].p_SetImageResourceName(t_prefixName+"_BORDER_"+String(t_char)+".png");
			}
			t_index+=5;
			t_index+=1;
		}else{
			if(t_1=="{SH"){
				t_index+=3;
				this.m_shadowChars[t_char]=c_BitMapChar.m_new.call(new c_BitMapChar);
				this.m_shadowChars[t_char].m_drawingMetrics.m_drawingOffset.m_x=(parseInt((t_tokenStream[t_index]),10));
				this.m_shadowChars[t_char].m_drawingMetrics.m_drawingOffset.m_y=(parseInt((t_tokenStream[t_index+1]),10));
				this.m_shadowChars[t_char].m_drawingMetrics.m_drawingSize.m_x=(parseInt((t_tokenStream[t_index+2]),10));
				this.m_shadowChars[t_char].m_drawingMetrics.m_drawingSize.m_y=(parseInt((t_tokenStream[t_index+3]),10));
				this.m_shadowChars[t_char].m_drawingMetrics.m_drawingWidth=(parseInt((t_tokenStream[t_index+4]),10));
				var t_filename=t_prefixName+"_SHADOW_"+String(t_char)+".png";
				if(t_dynamicLoad==false){
					this.m_shadowChars[t_char].m_image=bb_graphics_LoadImage(t_filename,1,c_Image.m_DefaultFlags);
					this.m_shadowChars[t_char].m_image.p_SetHandle(-this.m_shadowChars[t_char].m_drawingMetrics.m_drawingOffset.m_x,-this.m_shadowChars[t_char].m_drawingMetrics.m_drawingOffset.m_y);
				}else{
					this.m_shadowChars[t_char].p_SetImageResourceName(t_filename);
				}
				t_index+=5;
				t_index+=1;
			}else{
				if(t_1=="{FC"){
					t_index+=3;
					this.m_faceChars[t_char]=c_BitMapChar.m_new.call(new c_BitMapChar);
					this.m_faceChars[t_char].m_drawingMetrics.m_drawingOffset.m_x=(parseInt((t_tokenStream[t_index]),10));
					this.m_faceChars[t_char].m_drawingMetrics.m_drawingOffset.m_y=(parseInt((t_tokenStream[t_index+1]),10));
					this.m_faceChars[t_char].m_drawingMetrics.m_drawingSize.m_x=(parseInt((t_tokenStream[t_index+2]),10));
					this.m_faceChars[t_char].m_drawingMetrics.m_drawingSize.m_y=(parseInt((t_tokenStream[t_index+3]),10));
					this.m_faceChars[t_char].m_drawingMetrics.m_drawingWidth=(parseInt((t_tokenStream[t_index+4]),10));
					if(t_dynamicLoad==false){
						this.m_faceChars[t_char].m_image=bb_graphics_LoadImage(t_prefixName+"_"+String(t_char)+".png",1,c_Image.m_DefaultFlags);
						this.m_faceChars[t_char].m_image.p_SetHandle(-this.m_faceChars[t_char].m_drawingMetrics.m_drawingOffset.m_x,-this.m_faceChars[t_char].m_drawingMetrics.m_drawingOffset.m_y);
					}else{
						this.m_faceChars[t_char].p_SetImageResourceName(t_prefixName+"_"+String(t_char)+".png");
					}
					t_index+=5;
					t_index+=1;
				}else{
					print("Error loading font! Char = "+String(t_char));
				}
			}
		}
	}
	this.m_borderChars=this.m_borderChars.slice(0,t_char+1);
	this.m_faceChars=this.m_faceChars.slice(0,t_char+1);
	this.m_shadowChars=this.m_shadowChars.slice(0,t_char+1);
	return 0;
}
c_BitmapFont.m_new=function(t_fontDescriptionFilePath,t_dynamicLoad){
	var t_text=bb_app_LoadString(t_fontDescriptionFilePath);
	if(t_text==""){
		print("FONT "+t_fontDescriptionFilePath+" WAS NOT FOUND!!!");
	}
	this.p_LoadFontData(t_text,t_fontDescriptionFilePath,t_dynamicLoad);
	return this;
}
c_BitmapFont.m_new2=function(t_fontDescriptionFilePath){
	var t_text=bb_app_LoadString(t_fontDescriptionFilePath);
	if(t_text==""){
		print("FONT "+t_fontDescriptionFilePath+" WAS NOT FOUND!!!");
	}
	this.p_LoadFontData(t_text,t_fontDescriptionFilePath,true);
	return this;
}
c_BitmapFont.m_new3=function(){
	return this;
}
c_BitmapFont.prototype.p_DrawShadow=function(){
	return this.m__drawShadow;
}
c_BitmapFont.prototype.p_DrawShadow2=function(t_value){
	this.m__drawShadow=t_value;
	return 0;
}
c_BitmapFont.prototype.p_Kerning=function(){
	if(this.m__kerning==null){
		this.m__kerning=c_DrawingPoint.m_new2.call(new c_DrawingPoint);
	}
	return this.m__kerning;
}
c_BitmapFont.prototype.p_Kerning2=function(t_value){
	this.m__kerning=t_value;
}
c_BitmapFont.prototype.p_GetTxtWidth=function(t_text,t_fromChar,t_toChar,t_endOnCR){
	var t_twidth=.0;
	var t_MaxWidth=0.0;
	var t_char=0;
	var t_lastchar=0;
	for(var t_i=t_fromChar;t_i<=t_toChar;t_i=t_i+1){
		t_char=t_text.charCodeAt(t_i-1);
		if(t_char>=0 && t_char<this.m_faceChars.length && t_char!=10 && t_char!=13){
			if(this.m_faceChars[t_char]!=null){
				t_lastchar=t_char;
				t_twidth=t_twidth+this.m_faceChars[t_char].m_drawingMetrics.m_drawingWidth+this.p_Kerning().m_x;
			}
		}else{
			if(t_char==10){
				if(bb_math_Abs2(t_MaxWidth)<bb_math_Abs2(t_twidth)){
					t_MaxWidth=t_twidth-this.p_Kerning().m_x-this.m_faceChars[t_lastchar].m_drawingMetrics.m_drawingWidth+this.m_faceChars[t_lastchar].m_drawingMetrics.m_drawingSize.m_x;
				}
				t_twidth=0.0;
				t_lastchar=t_char;
				if(t_endOnCR){
					return t_MaxWidth;
				}
			}
		}
	}
	if(t_lastchar>=0 && t_lastchar<this.m_faceChars.length){
		if(t_lastchar==32){
		}else{
			if(this.m_faceChars[t_lastchar]!=null){
				t_twidth=t_twidth-this.m_faceChars[t_lastchar].m_drawingMetrics.m_drawingWidth;
				t_twidth=t_twidth+this.m_faceChars[t_lastchar].m_drawingMetrics.m_drawingSize.m_x;
			}
		}
	}
	if(bb_math_Abs2(t_MaxWidth)<bb_math_Abs2(t_twidth)){
		t_MaxWidth=t_twidth-this.p_Kerning().m_x;
	}
	return t_MaxWidth;
}
c_BitmapFont.prototype.p_GetTxtWidth2=function(t_text){
	return this.p_GetTxtWidth(t_text,1,t_text.length,false);
}
c_BitmapFont.prototype.p_DrawCharsText=function(t_text,t_x,t_y,t_target,t_align,t_startPos,t_endPos){
	var t_drx=t_x;
	var t_dry=t_y;
	var t_oldX=t_x;
	var t_xOffset=0;
	if(t_endPos==-1 || t_endPos>t_text.length){
		t_endPos=t_text.length;
	}
	if(t_align!=1){
		var t_lineSepPos=0;
		if(t_endPos!=-1){
			t_lineSepPos=t_endPos;
		}else{
			t_lineSepPos=t_text.indexOf("\n",t_startPos);
		}
		if(t_lineSepPos<0 || t_lineSepPos>t_endPos){
			t_lineSepPos=t_endPos;
		}
		var t_4=t_align;
		if(t_4==2){
			t_xOffset=((this.p_GetTxtWidth(t_text,t_startPos,t_lineSepPos,true)/2.0)|0);
		}else{
			if(t_4==3){
				t_xOffset=((this.p_GetTxtWidth(t_text,t_startPos,t_lineSepPos,true))|0);
			}
		}
	}
	for(var t_i=t_startPos;t_i<=t_endPos;t_i=t_i+1){
		var t_char=t_text.charCodeAt(t_i-1);
		if(t_char>=0 && t_char<=t_target.length){
			if(t_char==10){
				t_dry+=this.m_faceChars[32].m_drawingMetrics.m_drawingSize.m_y+this.p_Kerning().m_y;
				this.p_DrawCharsText(t_text,t_oldX,t_dry,t_target,t_align,t_i+1,t_endPos);
				return 0;
			}else{
				if(t_target[t_char]!=null){
					if(t_target[t_char].p_CharImageLoaded()==false){
						t_target[t_char].p_LoadCharImage();
					}
					if(t_target[t_char].m_image!=null){
						bb_graphics_DrawImage(t_target[t_char].m_image,t_drx-(t_xOffset),t_dry,0);
					}else{
						if(t_target[t_char].m_packedFontIndex>0){
							bb_graphics_DrawImageRect(this.m_packedImages[t_target[t_char].m_packedFontIndex],(-t_xOffset)+t_drx+t_target[t_char].m_drawingMetrics.m_drawingOffset.m_x,t_dry+t_target[t_char].m_drawingMetrics.m_drawingOffset.m_y,((t_target[t_char].m_packedPosition.m_x)|0),((t_target[t_char].m_packedPosition.m_y)|0),((t_target[t_char].m_packedSize.m_x)|0),((t_target[t_char].m_packedSize.m_y)|0),0);
						}
					}
					t_drx+=this.m_faceChars[t_char].m_drawingMetrics.m_drawingWidth+this.p_Kerning().m_x;
				}
			}
		}
	}
	return 0;
}
c_BitmapFont.prototype.p_DrawCharsText2=function(t_text,t_x,t_y,t_mode,t_align,t_init,t_ending){
	if(t_mode==1){
		this.p_DrawCharsText(t_text,t_x,t_y,this.m_borderChars,t_align,t_init,t_ending);
	}else{
		if(t_mode==0){
			this.p_DrawCharsText(t_text,t_x,t_y,this.m_faceChars,t_align,t_init,t_ending);
		}else{
			this.p_DrawCharsText(t_text,t_x,t_y,this.m_shadowChars,t_align,t_init,t_ending);
		}
	}
	return 0;
}
c_BitmapFont.prototype.p_DrawBorder=function(){
	return this.m__drawBorder;
}
c_BitmapFont.prototype.p_DrawBorder2=function(t_value){
	this.m__drawBorder=t_value;
	return 0;
}
c_BitmapFont.prototype.p_DrawText=function(t_text,t_x,t_y,t_align,t_initChar,t_endChar){
	if(this.p_DrawShadow()){
		this.p_DrawCharsText2(t_text,t_x,t_y,2,t_align,t_initChar,t_endChar);
	}
	if(this.p_DrawBorder()){
		this.p_DrawCharsText2(t_text,t_x,t_y,1,t_align,t_initChar,t_endChar);
	}
	this.p_DrawCharsText2(t_text,t_x,t_y,0,t_align,t_initChar,t_endChar);
	return 0;
}
c_BitmapFont.prototype.p_DrawText2=function(t_text,t_x,t_y){
	this.p_DrawText3(t_text,t_x,t_y,1);
	return 0;
}
c_BitmapFont.prototype.p_DrawText3=function(t_text,t_x,t_y,t_align){
	this.p_DrawText(t_text,t_x,t_y,t_align,1,-1);
	return 0;
}
function bb_app_LoadString(t_path){
	return bb_app__game.LoadString(bb_data_FixDataPath(t_path));
}
function c_BitMapChar(){
	Object.call(this);
	this.m_packedFontIndex=0;
	this.m_packedPosition=c_DrawingPoint.m_new2.call(new c_DrawingPoint);
	this.m_packedSize=c_DrawingPoint.m_new2.call(new c_DrawingPoint);
	this.m_drawingMetrics=c_BitMapCharMetrics.m_new.call(new c_BitMapCharMetrics);
	this.m_image=null;
	this.m_imageResourceName="";
	this.m_imageResourceNameBackup="";
}
c_BitMapChar.m_new=function(){
	return this;
}
c_BitMapChar.prototype.p_SetImageResourceName=function(t_value){
	this.m_imageResourceName=t_value;
	return 0;
}
c_BitMapChar.prototype.p_CharImageLoaded=function(){
	if(this.m_image==null && this.m_imageResourceName!=""){
		return false;
	}else{
		return true;
	}
}
c_BitMapChar.prototype.p_LoadCharImage=function(){
	if(this.p_CharImageLoaded()==false){
		this.m_image=bb_graphics_LoadImage(this.m_imageResourceName,1,c_Image.m_DefaultFlags);
		this.m_image.p_SetHandle(-this.m_drawingMetrics.m_drawingOffset.m_x,-this.m_drawingMetrics.m_drawingOffset.m_y);
		this.m_imageResourceNameBackup=this.m_imageResourceName;
		this.m_imageResourceName="";
	}
	return 0;
}
function c_DrawingPoint(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
}
c_DrawingPoint.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_DrawingPoint.m_new2=function(){
	return this;
}
function c_BitMapCharMetrics(){
	Object.call(this);
	this.m_drawingOffset=c_DrawingPoint.m_new2.call(new c_DrawingPoint);
	this.m_drawingSize=c_DrawingPoint.m_new2.call(new c_DrawingPoint);
	this.m_drawingWidth=.0;
}
c_BitMapCharMetrics.m_new=function(){
	return this;
}
var bb_globals_gFontMain=null;
var bb_globals_gFontNumbers=null;
function c_Controls(){
	Object.call(this);
	this.m__isMousePressed=[];
	this.m__isMouseReleased=[];
	this.m__currentMouseX=[];
	this.m__currentMouseY=[];
	this.m__mousePressedX=[];
	this.m__mousePressedY=[];
	this.m__mouseReleasedX=[];
	this.m__mouseReleasedY=[];
	this.m__numberOfTouchEvents=0;
}
c_Controls.m_new=function(){
	this.m__isMousePressed=new_bool_array(5);
	this.m__isMouseReleased=new_bool_array(5);
	this.m__currentMouseX=new_number_array(5);
	this.m__currentMouseY=new_number_array(5);
	this.m__mousePressedX=new_number_array(5);
	this.m__mousePressedY=new_number_array(5);
	this.m__mouseReleasedX=new_number_array(5);
	this.m__mouseReleasedY=new_number_array(5);
	for(var t_i=0;t_i<=4;t_i=t_i+1){
		this.m__isMousePressed[t_i]=false;
		this.m__isMouseReleased[t_i]=false;
	}
	this.m__numberOfTouchEvents=0;
	return this;
}
c_Controls.prototype.p_update=function(){
	this.m__numberOfTouchEvents=0;
	for(var t_i=0;t_i<=4;t_i=t_i+1){
		this.m__currentMouseX[t_i]=bb_input_TouchX(t_i)/bb_globals_gScaleRatio;
		this.m__currentMouseY[t_i]=bb_input_TouchY(t_i)/bb_globals_gScaleRatio;
		if(((bb_input_TouchDown(t_i))!=0) && this.m__isMousePressed[t_i]==false){
			this.m__isMousePressed[t_i]=true;
			this.m__isMouseReleased[t_i]=false;
			this.m__mousePressedX[t_i]=this.m__currentMouseX[t_i];
			this.m__mousePressedY[t_i]=this.m__currentMouseY[t_i];
		}else{
			if(!((bb_input_TouchDown(t_i))!=0) && this.m__isMousePressed[t_i]==true){
				this.m__isMousePressed[t_i]=false;
				this.m__isMouseReleased[t_i]=true;
				this.m__mouseReleasedX[t_i]=this.m__currentMouseX[t_i];
				this.m__mouseReleasedY[t_i]=this.m__currentMouseY[t_i];
			}else{
				if(((bb_input_TouchDown(t_i))!=0) && this.m__isMousePressed[t_i]==true){
					this.m__numberOfTouchEvents+=1;
				}
			}
		}
	}
}
c_Controls.prototype.p_isMousePressed=function(){
	return this.m__numberOfTouchEvents==1;
}
c_Controls.prototype.p_isMouseReleased=function(){
	return this.m__isMouseReleased[0];
}
var bb_globals_gControls=null;
function c_Game(){
	Object.call(this);
	this.m__score=0;
	this.m__backgroundX=0;
	this.m__foregroundX=0;
	this.m__state=0;
	this.m__xPos=0;
	this.m__yPos=.0;
	this.m__acceleration=.0;
	this.m__gameOverStartTime=0;
	this.m__bars=null;
	this.m__currentPassingBar=null;
	this.m__soundChannel=0;
	this.m__playFlapSound=false;
	this.m__thumpSoundPlayed=false;
	this.m__gameOverSoundPlayed=false;
	this.m__currentScoreCounter=0;
	this.m__playScoreSound=false;
	this.m__titleMusicStarted=false;
	this.m__adsVisible=false;
	this.m__touchPressed=false;
	this.implments={c_ButtonCallback:1};
}
c_Game.m_new=function(){
	this.m__score=0;
	this.m__backgroundX=0;
	this.m__foregroundX=0;
	this.m__state=1;
	this.m__xPos=((bb_globals_gMaxX/2.0)|0);
	this.m__yPos=160.0;
	this.m__acceleration=0.0;
	this.m__gameOverStartTime=0;
	this.m__bars=c_List.m_new.call(new c_List);
	this.m__currentPassingBar=null;
	this.m__soundChannel=0;
	this.m__playFlapSound=false;
	this.m__thumpSoundPlayed=false;
	this.m__gameOverSoundPlayed=false;
	this.m__currentScoreCounter=0;
	this.m__playScoreSound=false;
	this.m__titleMusicStarted=false;
	this.m__adsVisible=false;
	return this;
}
c_Game.prototype.p_checkForCollision=function(){
	if(this.m__yPos<32.0 || this.m__yPos>336.0){
		return true;
	}
	var t_=this.m__bars.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_bar=t_.p_NextObject();
		if(t_bar.m__x-(this.m__xPos)>-86.0 && t_bar.m__x-(this.m__xPos)<24.0){
			this.m__currentPassingBar=t_bar;
			if(bb_math_Abs2(this.m__yPos-(t_bar.m__centerY))>30.0){
				return true;
			}
		}
	}
	return false;
}
c_Game.prototype.p_update=function(){
	var t_1=this.m__state;
	if(t_1==1){
		return;
	}else{
		if(t_1==2){
			if(this.m__xPos>140){
				this.m__xPos-=4;
			}
			if(bb_globals_gControls.p_isMousePressed() && !this.m__touchPressed){
				this.m__acceleration=-6.0;
				this.m__touchPressed=true;
				this.m__playFlapSound=true;
			}else{
				if(bb_globals_gControls.p_isMouseReleased()){
					this.m__touchPressed=false;
				}
			}
			this.m__acceleration+=0.5;
			this.m__yPos+=this.m__acceleration;
			if(this.m__bars.p_Count()==0){
				var t_bar=c_Bar.m_new.call(new c_Bar);
				t_bar.m__x=720.0;
				t_bar.m__lowerY=((360.0-((bb_random_Rnd2(64.0,201.0))|0))|0);
				t_bar.m__centerY=t_bar.m__lowerY-40;
				t_bar.m__upperY=t_bar.m__lowerY-256-80;
				this.m__bars.p_AddLast(t_bar);
			}else{
				if(this.m__bars.p_Count()<4){
					var t_bar2=this.m__bars.p_Last();
					if(t_bar2.m__x<500.0){
						var t_newBar=c_Bar.m_new.call(new c_Bar);
						t_newBar.m__x=720.0;
						t_newBar.m__lowerY=((360.0-((bb_random_Rnd2(64.0,201.0))|0))|0);
						t_newBar.m__centerY=t_newBar.m__lowerY-40;
						t_newBar.m__upperY=t_newBar.m__lowerY-256-80;
						this.m__bars.p_AddLast(t_newBar);
					}
				}
			}
			if(this.p_checkForCollision()){
				this.m__state=3;
				this.m__gameOverStartTime=bb_app_Millisecs();
			}
			if((this.m__currentPassingBar)!=null){
				if(this.m__currentPassingBar.m__x-(this.m__xPos)<-90.0){
					this.m__score+=1;
					this.m__currentPassingBar=null;
					this.m__playScoreSound=true;
				}
			}
		}else{
			if(t_1==3){
				this.m__acceleration+=1.0;
				this.m__yPos+=this.m__acceleration;
				if(this.m__yPos>336.0){
					this.m__yPos=336.0;
					this.m__acceleration=0.0;
				}
				var t_dt=bb_app_Millisecs()-this.m__gameOverStartTime;
				if(bb_globals_gControls.p_isMousePressed() && t_dt>2000){
					this.m__state=4;
				}
			}else{
				if(t_1==4){
					if(bb_globals_gControls.p_isMouseReleased()){
						this.m__state=1;
						this.m__xPos=((bb_globals_gMaxX/2.0)|0);
						this.m__yPos=160.0;
						this.m__acceleration=0.0;
						this.m__gameOverStartTime=0;
						this.m__bars.p_Clear();
						if(this.m__score>bb_globals_gHighscore){
							bb_globals_gHighscore=this.m__score;
							bb_utils_SaveStatistics();
						}
						this.m__score=0;
						this.m__currentPassingBar=null;
						this.m__playScoreSound=false;
					}
				}
			}
		}
	}
}
c_Game.prototype.p_draw=function(){
	bb_graphics_DrawImage2(bb_globals_gImages.p_Get(1),(this.m__backgroundX),0.0,0.0,2.0,2.0,0);
	bb_graphics_DrawImage2(bb_globals_gImages.p_Get(1),(this.m__backgroundX+2048),0.0,0.0,2.0,2.0,0);
	var t_=this.m__bars.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_bar=t_.p_NextObject();
		t_bar.p_paint();
	}
	bb_graphics_DrawImage2(bb_globals_gImages.p_Get(2),(this.m__foregroundX),0.0,0.0,2.0,2.0,0);
	bb_graphics_DrawImage2(bb_globals_gImages.p_Get(2),(this.m__foregroundX+2048),0.0,0.0,2.0,2.0,0);
	var t_frame=((bb_app_Millisecs() % 600/150)|0);
	var t_angle=-3.0*this.m__acceleration;
	bb_globals_gFontMain.p_DrawText2("Score:",10.0,15.0);
	bb_globals_gFontNumbers.p_DrawText2(String(this.m__score),104.0,15.0);
	var t_txtWidth=bb_globals_gFontNumbers.p_GetTxtWidth2(String(bb_globals_gHighscore));
	bb_globals_gFontMain.p_DrawText3("Highscore:",bb_globals_gMaxX-10.0-t_txtWidth,15.0,3);
	bb_globals_gFontNumbers.p_DrawText3(String(bb_globals_gHighscore),bb_globals_gMaxX-10.0,15.0,3);
	var t_2=this.m__state;
	if(t_2==1){
		if(!this.m__titleMusicStarted){
			bb_audio_StopMusic();
			bb_audio_PlayMusic("sfx/music.mp3",1);
			bb_audio_SetMusicVolume(0.15);
			this.m__titleMusicStarted=true;
		}
		this.m__backgroundX-=1;
		if(this.m__backgroundX<-2048){
			this.m__backgroundX=0;
		}
		this.m__foregroundX-=4;
		if(this.m__foregroundX<-2048){
			this.m__foregroundX=0;
		}
		bb_graphics_DrawImage2(bb_globals_gImages.p_Get(10),(this.m__xPos),this.m__yPos,t_angle,1.0,1.0,t_frame);
		bb_globals_gGameGUI.p_update();
		bb_globals_gGameGUI.p_paint();
	}else{
		if(t_2==2){
			this.m__titleMusicStarted=false;
			if(this.m__playScoreSound){
				bb_audio_PlaySound(bb_globals_gSounds.p_Get(3),this.m__soundChannel,0);
				this.m__soundChannel+=1;
				if(this.m__soundChannel>7){
					this.m__soundChannel=0;
				}
				this.m__playScoreSound=false;
			}
			this.m__backgroundX-=1;
			if(this.m__backgroundX<-2048){
				this.m__backgroundX=0;
			}
			this.m__foregroundX-=4;
			if(this.m__foregroundX<-2048){
				this.m__foregroundX=0;
			}
			bb_graphics_DrawImage2(bb_globals_gImages.p_Get(10),(this.m__xPos),this.m__yPos,t_angle,1.0,1.0,t_frame);
			if(this.m__playFlapSound){
				bb_audio_PlaySound(bb_globals_gSounds.p_Get(2),this.m__soundChannel,0);
				this.m__playFlapSound=false;
				this.m__soundChannel+=1;
				if(this.m__soundChannel>7){
					this.m__soundChannel=0;
				}
			}
			var t_3=this.m__bars.p_ObjectEnumerator();
			while(t_3.p_HasNext()){
				var t_bar2=t_3.p_NextObject();
				t_bar2.m__x=t_bar2.m__x-4.0;
				if(t_bar2.m__x<-64.0){
					this.m__bars.p_Remove(t_bar2);
				}
			}
		}else{
			if(t_2==3 || t_2==4){
				if(!this.m__thumpSoundPlayed){
					this.m__thumpSoundPlayed=true;
					bb_audio_PlaySound(bb_globals_gSounds.p_Get(4),this.m__soundChannel,0);
					this.m__soundChannel+=1;
					bb_audio_PlaySound(bb_globals_gSounds.p_Get(5),this.m__soundChannel,0);
					this.m__soundChannel+=1;
					if(this.m__soundChannel>7){
						this.m__soundChannel=0;
					}
				}
				var t_dt=bb_app_Millisecs()-this.m__gameOverStartTime;
				var t_dragonAlpha=1.0;
				if(t_dt<500){
					var t_scale=1.5-(t_dt)/1000.0;
					var t_alpha=(t_dt)/500.0;
					t_dragonAlpha=1.0-t_alpha;
					bb_graphics_SetAlpha(t_alpha);
					bb_graphics_PushMatrix();
					bb_graphics_Translate(bb_globals_gMaxX/2.0,160.0);
					bb_graphics_Scale(t_scale,t_scale);
					bb_globals_gFontMain.p_DrawText3("Game Over!",0.0,0.0,2);
					bb_graphics_PopMatrix();
				}else{
					if(t_dt<1000){
						var t_scale2=1.5-(t_dt-500)/1000.0;
						var t_alpha2=(t_dt-500)/500.0;
						t_dragonAlpha=0.0;
						bb_graphics_SetAlpha(t_alpha2);
						if(this.m__score>bb_globals_gHighscore){
							var t_width=(bb_globals_gFontMain.p_GetTxtWidth2("New Highscore: ")+bb_globals_gFontNumbers.p_GetTxtWidth2("0"))/2.0;
							bb_globals_gFontMain.p_DrawText3("New Highscore: ",bb_globals_gMaxX/2.0-t_width,200.0,1);
							bb_globals_gFontNumbers.p_DrawText3("0",bb_globals_gMaxX/2.0+t_width,200.0,3);
						}else{
							var t_width2=(bb_globals_gFontMain.p_GetTxtWidth2("Score: ")+bb_globals_gFontNumbers.p_GetTxtWidth2("0"))/2.0;
							bb_globals_gFontMain.p_DrawText3("Score: ",bb_globals_gMaxX/2.0-t_width2,200.0,1);
							bb_globals_gFontNumbers.p_DrawText3("0",bb_globals_gMaxX/2.0+t_width2,200.0,3);
						}
						bb_graphics_SetAlpha(bb_globals_gAlpha);
						bb_globals_gFontMain.p_DrawText3("Game Over!",bb_globals_gMaxX/2.0,160.0,2);
					}else{
						if(!this.m__gameOverSoundPlayed){
							this.m__gameOverSoundPlayed=true;
							bb_audio_PlaySound(bb_globals_gSounds.p_Get(6),this.m__soundChannel,0);
							this.m__soundChannel+=1;
							if(this.m__soundChannel>7){
								this.m__soundChannel=0;
							}
						}
						t_dragonAlpha=0.0;
						bb_graphics_SetAlpha(bb_globals_gAlpha);
						bb_globals_gFontMain.p_DrawText3("Game Over!",bb_globals_gMaxX/2.0,160.0,2);
						if(this.m__score>bb_globals_gHighscore){
							this.m__currentScoreCounter+=1;
							if(this.m__currentScoreCounter>this.m__score){
								this.m__currentScoreCounter=this.m__score;
							}
							var t_width3=(bb_globals_gFontMain.p_GetTxtWidth2("New Highscore: ")+bb_globals_gFontNumbers.p_GetTxtWidth2(String(this.m__currentScoreCounter)))/2.0;
							bb_globals_gFontMain.p_DrawText3("New Highscore: ",bb_globals_gMaxX/2.0-t_width3,200.0,1);
							bb_globals_gFontNumbers.p_DrawText3(String(this.m__currentScoreCounter),bb_globals_gMaxX/2.0+t_width3,200.0,3);
						}else{
							this.m__currentScoreCounter+=1;
							if(this.m__currentScoreCounter>this.m__score){
								this.m__currentScoreCounter=this.m__score;
							}
							var t_width4=(bb_globals_gFontMain.p_GetTxtWidth2("Score: ")+bb_globals_gFontNumbers.p_GetTxtWidth2(String(this.m__currentScoreCounter)))/2.0;
							bb_globals_gFontMain.p_DrawText3("Score: ",bb_globals_gMaxX/2.0-t_width4,200.0,1);
							bb_globals_gFontNumbers.p_DrawText3(String(this.m__currentScoreCounter),bb_globals_gMaxX/2.0+t_width4,200.0,3);
						}
					}
				}
				bb_graphics_SetAlpha(t_dragonAlpha);
				bb_graphics_DrawImage2(bb_globals_gImages.p_Get(10),(this.m__xPos),this.m__yPos,t_angle,1.0,1.0,0);
				bb_graphics_SetAlpha(bb_globals_gAlpha);
				if(t_dt<900){
					var t_frame2=((t_dt/100)|0);
					bb_graphics_DrawImage2(bb_globals_gImages.p_Get(11),(this.m__xPos),this.m__yPos,0.0,2.0,2.0,t_frame2);
				}
			}
		}
	}
}
c_Game.prototype.p_buttonCallBack=function(t_buttonName){
	this.m__state=2;
	this.m__bars.p_Clear();
	this.m__score=0;
	this.m__playFlapSound=false;
	this.m__thumpSoundPlayed=false;
	this.m__gameOverSoundPlayed=false;
	this.m__currentScoreCounter=0;
	this.m__playScoreSound=false;
}
function c_Bar(){
	Object.call(this);
	this.m__x=.0;
	this.m__lowerY=0;
	this.m__centerY=0;
	this.m__upperY=0;
}
c_Bar.m_new=function(){
	return this;
}
c_Bar.prototype.p_paint=function(){
	bb_graphics_DrawImage(bb_globals_gImages.p_Get(3),this.m__x,(this.m__lowerY),0);
	bb_graphics_DrawImage(bb_globals_gImages.p_Get(4),this.m__x,(this.m__upperY),0);
}
function c_List(){
	Object.call(this);
	this.m__head=(c_HeadNode.m_new.call(new c_HeadNode));
}
c_List.m_new=function(){
	return this;
}
c_List.prototype.p_AddLast=function(t_data){
	return c_Node2.m_new.call(new c_Node2,this.m__head,this.m__head.m__pred,t_data);
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
c_List.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List.prototype.p_Last=function(){
	return this.m__head.m__pred.m__data;
}
c_List.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator.m_new.call(new c_Enumerator,this);
}
c_List.prototype.p_Clear=function(){
	this.m__head.m__succ=this.m__head;
	this.m__head.m__pred=this.m__head;
	return 0;
}
c_List.prototype.p_Equals=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List.prototype.p_RemoveEach=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		var t_succ=t_node.m__succ;
		if(this.p_Equals(t_node.m__data,t_value)){
			t_node.p_Remove2();
		}
		t_node=t_succ;
	}
	return 0;
}
c_List.prototype.p_Remove=function(t_value){
	this.p_RemoveEach(t_value);
}
function c_Node2(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node2.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node2.m_new2=function(){
	return this;
}
c_Node2.prototype.p_Remove2=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode(){
	c_Node2.call(this);
}
c_HeadNode.prototype=extend_class(c_Node2);
c_HeadNode.m_new=function(){
	c_Node2.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
var bb_globals_gGame=null;
function bb_init_InitLoadScreen(){
	bb_globals_gSplashScreen=bb_graphics_LoadImage("gfx/titlescreen.jpg",1,1);
	bb_globals_gFontMain=c_BitmapFont.m_new2.call(new c_BitmapFont,"gfx/fonts/font_24.txt");
	bb_globals_gFontNumbers=c_BitmapFont.m_new2.call(new c_BitmapFont,"gfx/fonts/fontzahl.txt");
	bb_globals_gControls=c_Controls.m_new.call(new c_Controls);
	bb_globals_gGame=c_Game.m_new.call(new c_Game);
}
function bb_app_LoadState(){
	return bb_app__game.LoadState();
}
function bb_app_SaveState(t_state){
	bb_app__game.SaveState(t_state);
}
var bb_globals_gHighscore=0;
function bb_utils_LoadStatistics(){
	var t_stats=bb_app_LoadState();
	if(t_stats.length==0){
		bb_app_SaveState("0");
		return;
	}
	bb_globals_gHighscore=parseInt((t_stats),10);
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	bb_app__updateRate=t_hertz;
	bb_app__game.SetUpdateRate(t_hertz);
}
function bb_input_TouchX(t_index){
	return bb_input_device.p_TouchX(t_index);
}
function bb_input_TouchY(t_index){
	return bb_input_device.p_TouchY(t_index);
}
function bb_input_TouchDown(t_index){
	return ((bb_input_device.p_KeyDown(384+t_index))?1:0);
}
var bb_random_Seed=0;
function bb_random_Rnd(){
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	return (bb_random_Seed>>8&16777215)/16777216.0;
}
function bb_random_Rnd2(t_low,t_high){
	return bb_random_Rnd3(t_high-t_low)+t_low;
}
function bb_random_Rnd3(t_range){
	return bb_random_Rnd()*t_range;
}
function c_Enumerator(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator.m_new2=function(){
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_math_Abs(t_x){
	if(t_x>=0){
		return t_x;
	}
	return -t_x;
}
function bb_math_Abs2(t_x){
	if(t_x>=0.0){
		return t_x;
	}
	return -t_x;
}
function bb_app_Millisecs(){
	return bb_app__game.Millisecs();
}
function bb_utils_SaveStatistics(){
	var t_stats=String(bb_globals_gHighscore);
	bb_app_SaveState(t_stats);
}
var bb_globals_gLoopTimeStart=0;
function bb_graphics_Cls(t_r,t_g,t_b){
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_PushMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp;
	if(t_sp==bb_graphics_context.m_matrixStack.length){
		bb_graphics_context.m_matrixStack=resize_number_array(bb_graphics_context.m_matrixStack,t_sp*2);
	}
	bb_graphics_context.m_matrixStack[t_sp+0]=bb_graphics_context.m_ix;
	bb_graphics_context.m_matrixStack[t_sp+1]=bb_graphics_context.m_iy;
	bb_graphics_context.m_matrixStack[t_sp+2]=bb_graphics_context.m_jx;
	bb_graphics_context.m_matrixStack[t_sp+3]=bb_graphics_context.m_jy;
	bb_graphics_context.m_matrixStack[t_sp+4]=bb_graphics_context.m_tx;
	bb_graphics_context.m_matrixStack[t_sp+5]=bb_graphics_context.m_ty;
	bb_graphics_context.m_matrixSp=t_sp+6;
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	var t_ix2=t_ix*bb_graphics_context.m_ix+t_iy*bb_graphics_context.m_jx;
	var t_iy2=t_ix*bb_graphics_context.m_iy+t_iy*bb_graphics_context.m_jy;
	var t_jx2=t_jx*bb_graphics_context.m_ix+t_jy*bb_graphics_context.m_jx;
	var t_jy2=t_jx*bb_graphics_context.m_iy+t_jy*bb_graphics_context.m_jy;
	var t_tx2=t_tx*bb_graphics_context.m_ix+t_ty*bb_graphics_context.m_jx+bb_graphics_context.m_tx;
	var t_ty2=t_tx*bb_graphics_context.m_iy+t_ty*bb_graphics_context.m_jy+bb_graphics_context.m_ty;
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	return 0;
}
function bb_graphics_Transform2(t_m){
	bb_graphics_Transform(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	return 0;
}
var bb_globals_gGameState=0;
var bb_globals_gFirstCall=false;
var bb_globals_gGameStartTime=0;
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	return 0;
}
function bb_graphics_Rotate(t_angle){
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	return 0;
}
function bb_graphics_PopMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp-6;
	bb_graphics_SetMatrix(bb_graphics_context.m_matrixStack[t_sp+0],bb_graphics_context.m_matrixStack[t_sp+1],bb_graphics_context.m_matrixStack[t_sp+2],bb_graphics_context.m_matrixStack[t_sp+3],bb_graphics_context.m_matrixStack[t_sp+4],bb_graphics_context.m_matrixStack[t_sp+5]);
	bb_graphics_context.m_matrixSp=t_sp;
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,0.0,0.0);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	bb_graphics_PopMatrix();
	return 0;
}
function c_eDrawAlign(){
	Object.call(this);
}
function c_eDrawMode(){
	Object.call(this);
}
function bb_graphics_DrawImageRect(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,-t_image.m_tx+t_x,-t_image.m_ty+t_y,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	return 0;
}
function bb_graphics_DrawImageRect2(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	bb_graphics_PopMatrix();
	return 0;
}
var bb_globals_gAlpha=0;
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
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
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
c_Map2.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_IntMap2(){
	c_Map2.call(this);
}
c_IntMap2.prototype=extend_class(c_Map2);
c_IntMap2.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_IntMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
var bb_globals_gImages=null;
function c_Sound(){
	Object.call(this);
	this.m_sample=null;
}
c_Sound.m_new=function(t_sample){
	this.m_sample=t_sample;
	return this;
}
c_Sound.m_new2=function(){
	return this;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Compare=function(t_lhs,t_rhs){
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
		this.p_InsertFixup3(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map3.prototype.p_FindNode=function(t_key){
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
c_Map3.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_IntMap3(){
	c_Map3.call(this);
}
c_IntMap3.prototype=extend_class(c_Map3);
c_IntMap3.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
c_IntMap3.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
var bb_globals_gSounds=null;
function c_Map4(){
	Object.call(this);
}
c_Map4.m_new=function(){
	return this;
}
function c_IntMap4(){
	c_Map4.call(this);
}
c_IntMap4.prototype=extend_class(c_Map4);
c_IntMap4.m_new=function(){
	c_Map4.m_new.call(this);
	return this;
}
var bb_globals_gLanguages=null;
var bb_globals_gTimeMSOld=0;
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
function bb_audio_LoadSound(t_path){
	var t_sample=bb_audio_device.LoadSample(bb_data_FixDataPath(t_path));
	if((t_sample)!=null){
		return c_Sound.m_new.call(new c_Sound,t_sample);
	}
	return null;
}
function c_Node4(){
	Object.call(this);
	this.m_key=0;
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
function bb_init_LoadResources(){
	bb_globals_gImages.p_Set2(1,bb_graphics_LoadImage("gfx/background.jpg",1,c_Image.m_DefaultFlags));
	bb_globals_gImages.p_Set2(2,bb_graphics_LoadImage("gfx/foreground.png",1,c_Image.m_DefaultFlags));
	bb_globals_gImages.p_Set2(3,bb_graphics_LoadImage("gfx/lower_bar.png",1,c_Image.m_DefaultFlags));
	bb_globals_gImages.p_Set2(4,bb_graphics_LoadImage("gfx/upper_bar.png",1,c_Image.m_DefaultFlags));
	bb_globals_gImages.p_Set2(10,bb_graphics_LoadImage("gfx/gargoyle.png",4,1));
	bb_globals_gImages.p_Set2(11,bb_graphics_LoadImage2("gfx/explosion.png",50,37,9,1));
	bb_globals_gImages.p_Set2(100,bb_graphics_LoadImage("gfx/button_start.png",1,1));
	bb_globals_gSounds.p_Set3(2,bb_audio_LoadSound("sfx/flap.wav"));
	bb_globals_gSounds.p_Set3(3,bb_audio_LoadSound("sfx/point.wav"));
	bb_globals_gSounds.p_Set3(4,bb_audio_LoadSound("sfx/thumb.wav"));
	bb_globals_gSounds.p_Set3(5,bb_audio_LoadSound("sfx/burning.wav"));
	bb_globals_gSounds.p_Set3(6,bb_audio_LoadSound("sfx/gameover.wav"));
}
function c_XGui(){
	Object.call(this);
	this.m__callback=null;
	this.m__scaleRatio=.0;
	this.m__translateY=.0;
	this.m__touchPressed=false;
	this.m__elements=null;
	this.m__touchX=.0;
	this.m__touchY=.0;
}
c_XGui.m_new=function(t_callback,t_scaleRatio,t_translateY){
	this.m__callback=t_callback;
	this.m__scaleRatio=t_scaleRatio;
	this.m__translateY=t_translateY;
	this.m__touchPressed=false;
	this.m__elements=c_List2.m_new.call(new c_List2);
	return this;
}
c_XGui.m_new2=function(){
	return this;
}
c_XGui.prototype.p_addButton=function(t_name,t_image,t_imageP,t_imageD,t_x,t_y,t_sound,t_font,t_text,t_yTextOffset,t_startDelay,t_speed,t_amp){
	var t_button=c_XGuiButton.m_new.call(new c_XGuiButton,this.m__callback,t_name,t_image,t_imageP,t_imageD,t_x,t_y,t_sound,t_font,t_text,t_yTextOffset,t_startDelay,t_speed,t_amp);
	this.m__elements.p_AddLast2(t_button);
	return t_button;
}
c_XGui.prototype.p_update=function(){
	this.m__touchX=bb_input_TouchX(0)/this.m__scaleRatio;
	this.m__touchY=bb_input_TouchY(0)/this.m__scaleRatio-this.m__translateY;
	if((bb_input_TouchDown(0))!=0){
		this.m__touchPressed=true;
	}else{
		this.m__touchPressed=false;
	}
	var t_=this.m__elements.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_button=t_.p_NextObject();
		t_button.p_update2(this.m__touchPressed,((this.m__touchX)|0),((this.m__touchY)|0),true);
	}
}
c_XGui.prototype.p_paint=function(){
	var t_=this.m__elements.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_button=t_.p_NextObject();
		t_button.p_paint();
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
	return c_Node5.m_new.call(new c_Node5,this.m__head,this.m__head.m__pred,t_data);
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
c_List2.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator2.m_new.call(new c_Enumerator2,this);
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
function c_HeadNode2(){
	c_Node5.call(this);
}
c_HeadNode2.prototype=extend_class(c_Node5);
c_HeadNode2.m_new=function(){
	c_Node5.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
var bb_globals_gGameGUI=null;
function c_XGuiButton(){
	Object.call(this);
	this.m__callback=null;
	this.m__name="";
	this.m__image=null;
	this.m__imageP=null;
	this.m__imageD=null;
	this.m__width=0;
	this.m__height=0;
	this.m__x=0;
	this.m__y=0;
	this.m__sound=null;
	this.m__font=null;
	this.m__text="";
	this.m__yTextOffset=0;
	this.m__startDelay=0;
	this.m__speed=.0;
	this.m__amp=.0;
	this.m__size=.0;
	this.m__state=0;
	this.m__soundPlayed=false;
	this.m__clickStartTimeInitialized=false;
	this.m__longPressActivated=false;
	this.m__clickStartTime=0;
	this.implments={c_XGuiElement:1};
}
c_XGuiButton.m_new=function(t_callBack,t_name,t_image,t_imageP,t_imageD,t_x,t_y,t_sound,t_font,t_text,t_yTextOffset,t_startDelay,t_speed,t_amp){
	this.m__callback=t_callBack;
	this.m__name=t_name;
	this.m__image=t_image;
	this.m__imageP=t_imageP;
	this.m__imageD=t_imageD;
	if((this.m__image)!=null){
		this.m__width=t_image.p_Width();
		this.m__height=t_image.p_Height();
	}else{
		if((this.m__imageP)!=null){
			this.m__width=t_imageP.p_Width();
			this.m__height=t_imageP.p_Height();
		}
	}
	this.m__x=t_x;
	this.m__y=t_y;
	this.m__sound=t_sound;
	this.m__font=t_font;
	this.m__text=t_text;
	this.m__yTextOffset=t_yTextOffset;
	this.m__startDelay=t_startDelay;
	this.m__speed=t_speed;
	this.m__amp=t_amp;
	this.m__size=1.0;
	this.m__state=1;
	this.m__soundPlayed=false;
	this.m__clickStartTimeInitialized=false;
	this.m__longPressActivated=false;
	return this;
}
c_XGuiButton.m_new2=function(){
	return this;
}
c_XGuiButton.prototype.p_update2=function(t_touchPressed,t_touchX,t_touchY,t_playSound){
	if(this.m__state==5){
		return;
	}
	this.m__size*=1.05;
	if(this.m__size>1.0){
		this.m__size=1.0;
	}
	if(t_touchX>=this.m__x-((this.m__width/2)|0) && t_touchX<=this.m__x+((this.m__width/2)|0) && t_touchY>=this.m__y-((this.m__height/2)|0) && t_touchY<=this.m__y+((this.m__height/2)|0)){
		if(t_touchPressed){
			if(((this.m__sound)!=null) && t_playSound){
				if(!this.m__soundPlayed){
					bb_audio_PlaySound(this.m__sound,0,0);
					this.m__soundPlayed=true;
				}
			}
			if(!this.m__clickStartTimeInitialized){
				this.m__clickStartTime=bb_app_Millisecs();
				this.m__clickStartTimeInitialized=true;
			}
			this.m__state=3;
			this.m__size*=0.95;
			if(this.m__size<0.9){
				this.m__size=0.9;
			}
			if(bb_app_Millisecs()-this.m__clickStartTime>2000 && !this.m__longPressActivated){
				this.m__state=2;
				this.m__longPressActivated=true;
			}
		}else{
			if(this.m__state==3){
				this.m__longPressActivated=false;
				this.m__clickStartTimeInitialized=false;
				this.m__soundPlayed=false;
				this.m__state=4;
				this.m__callback.p_buttonCallBack(this.m__name);
			}
		}
	}else{
		this.m__state=1;
	}
}
c_XGuiButton.prototype.p_paint=function(){
	var t_scaleX=this.m__size+Math.sin(((bb_app_Millisecs()+this.m__startDelay)/this.m__speed)*D2R)/this.m__amp;
	var t_scaleY=this.m__size+Math.cos(((bb_app_Millisecs()+this.m__startDelay)/this.m__speed)*D2R)/this.m__amp;
	var t_1=this.m__state;
	if(t_1==1){
		if((this.m__image)!=null){
			bb_graphics_DrawImage2(this.m__image,(this.m__x),(this.m__y),0.0,t_scaleX,t_scaleY,0);
		}
		if((this.m__font)!=null){
			bb_graphics_PushMatrix();
			bb_graphics_Translate((this.m__x),(this.m__y+this.m__yTextOffset));
			bb_graphics_Scale(t_scaleX,t_scaleY);
			this.m__font.p_DrawText3(this.m__text,0.0,0.0,2);
			bb_graphics_PopMatrix();
		}
	}else{
		if(t_1==4){
			if((this.m__image)!=null){
				bb_graphics_DrawImage2(this.m__image,(this.m__x),(this.m__y),0.0,t_scaleX,t_scaleY,0);
			}
			if((this.m__font)!=null){
				bb_graphics_PushMatrix();
				bb_graphics_Translate((this.m__x),(this.m__y+this.m__yTextOffset));
				bb_graphics_Scale(t_scaleX,t_scaleY);
				this.m__font.p_DrawText3(this.m__text,0.0,0.0,2);
				bb_graphics_PopMatrix();
			}
		}else{
			if(t_1==3){
				if((this.m__imageP)!=null){
					bb_graphics_DrawImage2(this.m__imageP,(this.m__x),(this.m__y),0.0,t_scaleX,t_scaleY,0);
				}else{
					if((this.m__image)!=null){
						bb_graphics_DrawImage2(this.m__image,(this.m__x),(this.m__y),0.0,t_scaleX,t_scaleY,0);
					}
				}
				if((this.m__font)!=null){
					bb_graphics_PushMatrix();
					bb_graphics_Translate((this.m__x),(this.m__y+this.m__yTextOffset));
					bb_graphics_Scale(t_scaleX,t_scaleY);
					this.m__font.p_DrawText3(this.m__text,0.0,0.0,2);
					bb_graphics_PopMatrix();
				}
			}else{
				if(t_1==2){
					if((this.m__imageP)!=null){
						bb_graphics_DrawImage2(this.m__imageP,(this.m__x),(this.m__y),0.0,t_scaleX,t_scaleY,0);
					}else{
						if((this.m__image)!=null){
							bb_graphics_DrawImage2(this.m__image,(this.m__x),(this.m__y),0.0,t_scaleX,t_scaleY,0);
						}
					}
					if((this.m__font)!=null){
						bb_graphics_PushMatrix();
						bb_graphics_Translate((this.m__x),(this.m__y+this.m__yTextOffset));
						bb_graphics_Scale(t_scaleX,t_scaleY);
						this.m__font.p_DrawText3(this.m__text,0.0,0.0,2);
						bb_graphics_PopMatrix();
					}
				}else{
					if(t_1==5){
						if((this.m__imageD)!=null){
							bb_graphics_DrawImage2(this.m__imageD,(this.m__x),(this.m__y),0.0,t_scaleX,t_scaleY,0);
						}
						if((this.m__font)!=null){
							bb_graphics_PushMatrix();
							bb_graphics_Translate((this.m__x),(this.m__y+this.m__yTextOffset));
							bb_graphics_Scale(t_scaleX,t_scaleY);
							this.m__font.p_DrawText3(this.m__text,0.0,0.0,2);
							bb_graphics_PopMatrix();
						}
					}
				}
			}
		}
	}
}
function bb_init_Initialize(){
	bb_globals_gImages=c_IntMap2.m_new.call(new c_IntMap2);
	bb_globals_gSounds=c_IntMap3.m_new.call(new c_IntMap3);
	bb_globals_gLanguages=c_IntMap4.m_new.call(new c_IntMap4);
	bb_globals_gTimeMSOld=(bb_app_Millisecs());
	bb_init_LoadResources();
	bb_globals_gGameGUI=c_XGui.m_new.call(new c_XGui,(bb_globals_gGame),bb_globals_gScaleRatio,0.0);
	bb_globals_gGameGUI.p_addButton("Start",bb_globals_gImages.p_Get(100),null,null,((bb_globals_gMaxX/2.0)|0),240,null,bb_globals_gFontMain,"START",-16,0,5.0,80.0);
}
var bb_globals_gRequestedState=0;
function bb_audio_StopMusic(){
	bb_audio_device.StopMusic();
	return 0;
}
function bb_audio_PlayMusic(t_path,t_flags){
	return bb_audio_device.PlayMusic(bb_data_FixDataPath(t_path),t_flags);
}
function bb_audio_SetMusicVolume(t_volume){
	bb_audio_device.SetMusicVolume(t_volume);
	return 0;
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
function bb_audio_PlaySound(t_sound,t_channel,t_flags){
	if(((t_sound)!=null) && ((t_sound.m_sample)!=null)){
		bb_audio_device.PlaySample(t_sound.m_sample,t_channel,t_flags);
	}
	return 0;
}
function bb_loadScreen_LoadScreen(){
	bb_graphics_Cls(0.0,0.0,0.0);
	if(bb_globals_gFirstCall){
		bb_globals_gFirstCall=false;
		bb_globals_gGameStartTime=bb_app_Millisecs();
	}
	if(bb_app_Millisecs()-bb_globals_gGameStartTime<1000){
		bb_graphics_DrawImage(bb_globals_gSplashScreen,bb_globals_gMaxX/2.0,180.0,0);
		bb_globals_gFontMain.p_DrawText3("v.1.0.1.9",bb_globals_gMaxX-20.0,320.0,3);
		return;
	}else{
		if(bb_app_Millisecs()-bb_globals_gGameStartTime<3000){
			bb_globals_gAlpha=1.0;
			bb_graphics_SetAlpha(bb_globals_gAlpha);
			bb_graphics_DrawImage(bb_globals_gSplashScreen,bb_globals_gMaxX/2.0,180.0,0);
			bb_globals_gFontMain.p_DrawText3("v.1.0.1.9",bb_globals_gMaxX-20.0,320.0,3);
			if(!bb_globals_gIsLoadingInitialized){
				bb_globals_gIsLoadingInitialized=true;
				bb_init_Initialize();
			}
		}else{
			if(bb_app_Millisecs()-bb_globals_gGameStartTime<4000){
				bb_globals_gAlpha=1.0-(bb_app_Millisecs()-bb_globals_gGameStartTime-3000)/1000.0;
				bb_graphics_SetAlpha(bb_globals_gAlpha);
				bb_graphics_DrawImage(bb_globals_gSplashScreen,bb_globals_gMaxX/2.0,180.0,0);
				bb_globals_gFontMain.p_DrawText3("v.1.0.1.9",bb_globals_gMaxX-20.0,320.0,3);
			}else{
				if(bb_app_Millisecs()-bb_globals_gGameStartTime<5000){
					bb_globals_gRequestedState=2;
					bb_globals_gAlpha=(bb_app_Millisecs()-bb_globals_gGameStartTime-4000)/1000.0;
					bb_graphics_SetAlpha(bb_globals_gAlpha);
					bb_globals_gGame.p_draw();
				}else{
					if(bb_app_Millisecs()-bb_globals_gGameStartTime<5000){
						bb_globals_gAlpha=1.0;
						bb_graphics_SetAlpha(bb_globals_gAlpha);
						bb_globals_gGame.p_draw();
					}else{
						bb_globals_gGameState=2;
						bb_globals_gRequestedState=bb_globals_gGameState;
						bb_globals_gSplashScreen.p_Discard();
						bb_globals_gAlpha=1.0;
						bb_graphics_SetAlpha(bb_globals_gAlpha);
						bb_globals_gGame.p_draw();
					}
				}
			}
		}
	}
}
var bb_globals_gLoopTimeEnd=0;
var bb_globals_gLoopTimeAll=0;
var bb_globals_gRenderTimeAll=0;
var bb_globals_gDiffTimeMS=0;
var bb_globals_gDiffTimeSec=0;
var bb_globals_gFPSCounter=0;
var bb_globals_gFPSLastUpdate=0;
var bb_globals_gRenderTime=0;
var bb_globals_gFPS=0;
function bb_utils_UpdateFPS(){
	bb_globals_gLoopTimeAll=bb_globals_gLoopTimeEnd-bb_globals_gLoopTimeStart;
	bb_globals_gRenderTimeAll=bb_globals_gRenderTimeAll+bb_globals_gLoopTimeAll;
	bb_globals_gDiffTimeMS=(bb_app_Millisecs())-bb_globals_gTimeMSOld;
	bb_globals_gDiffTimeSec=bb_globals_gDiffTimeMS/1000.0;
	bb_globals_gTimeMSOld=(bb_app_Millisecs());
	bb_globals_gFPSCounter=bb_globals_gFPSCounter+1;
	if(bb_globals_gLoopTimeStart-bb_globals_gFPSLastUpdate>500){
		bb_globals_gRenderTime=(bb_globals_gRenderTimeAll)/(bb_globals_gFPSCounter);
		if(bb_globals_gRenderTime<1.0){
			bb_globals_gRenderTime=1.0;
		}
		bb_globals_gRenderTimeAll=0;
		bb_globals_gFPSLastUpdate=bb_globals_gLoopTimeStart;
		bb_globals_gFPS=1000.0/bb_globals_gRenderTime;
		bb_globals_gFPSCounter=0;
	}
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_redflyingchicken_gRedFlyingChicken=null;
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	bb_globals_gIsLoadingInitialized=false;
	bb_globals_gResX=.0;
	bb_globals_gResY=.0;
	bb_globals_gAspectRatio=1.67;
	bb_globals_gScaleRatio=1.0;
	bb_globals_gMaxX=.0;
	bb_globals_gSplashScreen=null;
	bb_globals_gFontMain=null;
	bb_globals_gFontNumbers=null;
	bb_globals_gControls=null;
	bb_globals_gGame=null;
	bb_globals_gHighscore=0;
	bb_app__updateRate=0;
	bb_random_Seed=1234;
	bb_globals_gLoopTimeStart=0;
	bb_globals_gGameState=1;
	bb_globals_gFirstCall=true;
	bb_globals_gGameStartTime=0;
	bb_globals_gAlpha=1.0;
	bb_globals_gImages=null;
	bb_globals_gSounds=null;
	bb_globals_gLanguages=null;
	bb_globals_gTimeMSOld=.0;
	bb_globals_gGameGUI=null;
	bb_globals_gRequestedState=1;
	bb_globals_gLoopTimeEnd=0;
	bb_globals_gLoopTimeAll=0;
	bb_globals_gRenderTimeAll=0;
	bb_globals_gDiffTimeMS=.0;
	bb_globals_gDiffTimeSec=.0;
	bb_globals_gFPSCounter=0;
	bb_globals_gFPSLastUpdate=0;
	bb_globals_gRenderTime=.0;
	bb_globals_gFPS=.0;
}
//${TRANSCODE_END}
