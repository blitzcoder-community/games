
//${CONFIG_BEGIN}
CFG_ANDROID_NATIVE_GL_ENABLED="1";
CFG_BINARY_FILES="|*.obj|*.b3d|*.mtl;*.bin|*.dat";
CFG_BRL_DATABUFFER_IMPLEMENTED="1";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="release";
CFG_HOST="winnt";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MINIB3D_DEBUG_MODEL="0";
CFG_MINIB3D_DRIVER="";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_DEPTH_BUFFER_ENABLED="1";
CFG_OPENGL_GLES20_ENABLED="1";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[wabbit_alpha.png];type=image/png;width=26;height=37;\n[mojo_font.png];type=image/png;width=864;height=13;\n";
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


function BBDataBuffer(){
	this.arrayBuffer=null;
	this.length=0;
}

BBDataBuffer.tbuf=new ArrayBuffer(4);
BBDataBuffer.tbytes=new Int8Array( BBDataBuffer.tbuf );
BBDataBuffer.tshorts=new Int16Array( BBDataBuffer.tbuf );
BBDataBuffer.tints=new Int32Array( BBDataBuffer.tbuf );
BBDataBuffer.tfloats=new Float32Array( BBDataBuffer.tbuf );

BBDataBuffer.prototype._Init=function( buffer ){
  
  this.length=buffer.byteLength;
  
  if (buffer.byteLength != Math.ceil(buffer.byteLength / 4) * 4)
  {
    var new_buffer = new ArrayBuffer(Math.ceil(buffer.byteLength / 4) * 4);
    var src = new Int8Array(buffer);
    var dst = new Int8Array(new_buffer);
    for (var i = 0; i < this.length; i++) {
      dst[i] = src[i];
    }
    buffer = new_buffer;    
  }

	this.arrayBuffer=buffer;
	this.bytes=new Int8Array( buffer );	
	this.shorts=new Int16Array( buffer,0,this.length/2 );	
	this.ints=new Int32Array( buffer,0,this.length/4 );	
	this.floats=new Float32Array( buffer,0,this.length/4 );
}

BBDataBuffer.prototype._New=function( length ){
	if( this.arrayBuffer ) return false;
	
	var buf=new ArrayBuffer( length );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._Load=function( path ){
	if( this.arrayBuffer ) return false;
	
	var buf=BBGame.Game().LoadData( path );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._LoadAsync=function( path,thread ){

	var buf=this;
	
	var xhr=new XMLHttpRequest();
	xhr.open( "GET",BBGame.Game().PathToUrl( path ),true );
	xhr.responseType="arraybuffer";
	
	xhr.onload=function(e){
		if( this.status==200 || this.status==0 ){
			buf._Init( xhr.response );
			thread.result=buf;
		}
		thread.running=false;
	}
	
	xhr.onerror=function(e){
		thread.running=false;
	}
	
	xhr.send();
}


BBDataBuffer.prototype.GetArrayBuffer=function(){
	return this.arrayBuffer;
}

BBDataBuffer.prototype.Length=function(){
	return this.length;
}

BBDataBuffer.prototype.Discard=function(){
	if( this.arrayBuffer ){
		this.arrayBuffer=null;
		this.length=0;
	}
}

BBDataBuffer.prototype.PokeByte=function( addr,value ){
	this.bytes[addr]=value;
}

BBDataBuffer.prototype.PokeShort=function( addr,value ){
	if( addr&1 ){
		BBDataBuffer.tshorts[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		return;
	}
	this.shorts[addr>>1]=value;
}

BBDataBuffer.prototype.PokeInt=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tints[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.ints[addr>>2]=value;
}

BBDataBuffer.prototype.PokeFloat=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tfloats[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.floats[addr>>2]=value;
}

BBDataBuffer.prototype.PeekByte=function( addr ){
	return this.bytes[addr];
}

BBDataBuffer.prototype.PeekShort=function( addr ){
	if( addr&1 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		return BBDataBuffer.tshorts[0];
	}
	return this.shorts[addr>>1];
}

BBDataBuffer.prototype.PeekInt=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tints[0];
	}
	return this.ints[addr>>2];
}

BBDataBuffer.prototype.PeekFloat=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tfloats[0];
	}
	return this.floats[addr>>2];
}


var bb_texs_loading=0;

function BBLoadStaticTexImage( path,info ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	if( info.length>0 ) info[0]=parseInt( game.GetMetaData( path,"width" ) );
	if( info.length>1 ) info[1]=parseInt( game.GetMetaData( path,"height" ) );
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	return img;
}

function BBTextureLoading( tex ){
	return tex && tex._loading;
}

function BBTexturesLoading(){
	return bb_texs_loading;
}

function _glGenerateMipmap( target ){

	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	
	if( tex && tex._loading ){
		tex._genmipmap=true;
	}else{
		gl.generateMipmap( target );
	}
}

function _glBindTexture( target,tex ){
	if( tex ){
		gl.bindTexture( target,tex );
	}else{
		gl.bindTexture( target,null );
	}
}

function _glTexImage2D( target,level,internalformat,width,height,border,format,type,pixels ){

	gl.texImage2D( target,level,internalformat,width,height,border,format,type,pixels ? new Uint8Array(pixels.arrayBuffer) : null );
}

function _glTexImage2D2( target,level,internalformat,format,type,img ){

	if( img.complete ){
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texImage2D( target,level,internalformat,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );	
		return;
	}
	
	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	if( 	tex._loading ){
		tex._loading+=1;
	}else{
		tex._loading=1;
	}

	bb_texs_loading+=1;
	
	var onload=function(){
	
		var tmp=gl.getParameter( gl.TEXTURE_BINDING_2D );
		gl.bindTexture( target,tex );
		
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texImage2D( target,level,internalformat,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );	

		if( tex._genmipmap && tex._loading==1 ){
			gl.generateMipmap( target );
			tex._genmipmap=false;
		}
		gl.bindTexture( target,tmp );
		
		img.removeEventListener( "load",onload );
		tex._loading-=1;
		
		bb_texs_loading-=1;
	}
	
	img.addEventListener( "load",onload );
}

function _glTexImage2D3( target,level,internalformat,format,type,path ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	_glTexImage2D2( target,level,internalformat,format,type,img );
}

function _glTexSubImage2D( target,level,xoffset,yoffset,width,height,format,type,data,dataOffset ){

	gl.texSubImage2D( target,level,xoffset,yoffset,width,height,format,type,new Uint8Array( data.arrayBuffer,dataOffset ) );
	
}

function _glTexSubImage2D2( target,level,xoffset,yoffset,format,type,img ){

	if( img.complete ){
		gl.texSubImage2D( target,level,xoffset,yoffset,format,type,img );
		return;
	}
	
	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	if( 	tex._loading>0 ){
		tex._loading+=1;
	}else{
		tex._loading=1;
	}
	
	bb_texs_loading+=1;

	var onload=function(){
	
		var tmp=gl.getParameter( gl.TEXTURE_BINDING_2D );
		gl.bindTexture( target,tex );

		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texSubImage2D( target,level,xoffset,yoffset,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );

		if( tex._genmipmap && tex._loading==1 ){
			gl.generateMipmap( target );
			tex._genmipmap=false;
		}
		gl.bindTexture( target,tmp );
		
		img.removeEventListener( "load",onload );
		tex._loading-=1;
		
		bb_texs_loading-=1;
	}
	
	img.addEventListener( "load",onload );
}

function _glTexSubImage2D3( target,level,xoffset,yoffset,format,type,path ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	_glTexSubImage2D2( target,level,xoffset,yoffset,format,type,img );
}

// Dodgy code to convert 'any' to i,f,iv,fv...
//
function _mkf( p ){
	if( typeof(p)=="boolean" ) return p?1.0:0.0;
	if( typeof(p)=="number" ) return p;
	return 0.0;
}

function _mki( p ){
	if( typeof(p)=="boolean" ) return p?1:0;
	if( typeof(p)=="number" ) return p|0;
	if( typeof(p)=="object" ) return p;
	return 0;
}

function _mkb( p ){
	if( typeof(p)=="boolean" ) return p;
	if( typeof(p)=="number" ) return p!=0;
	return false;
}

function _mkfv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mkf(p[i]);
		}
	}else{
		params[0]=_mkf(p);
	}
}

function _mkiv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mki(p[i]);
		}
	}else{
		params[0]=_mki(p);
	}
}

function _mkbv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mkb(p[i]);
		}
	}else{
		params[0]=_mkb(p);
	}
}

function _glBufferData( target,size,data,usage ){
	if( !data ){
		gl.bufferData( target,size,usage );
	}else if( size==data.size ){
		gl.bufferData( target,data.arrayBuffer,usage );
	}else{
		gl.bufferData( target,new Int8Array( data.arrayBuffer,0,size ),usage );
	}
}

function _glBufferSubData( target,offset,size,data,dataOffset ){
	if( size==data.size && dataOffset==0 ){
		gl.bufferSubData( target,offset,data.arrayBuffer );
	}else{
		gl.bufferSubData( target,offset,new Int8Array( data.arrayBuffer,dataOffset,size ) );
	}
}


function _glClearDepthf( depth ){
	gl.clearDepth( depth );
}

function _glDepthRange( zNear,zFar ){
	gl.depthRange( zNear,zFar );
}

function _glGetActiveAttrib( program,index,size,type,name ){
	var info=gl.getActiveAttrib( program,index );
	if( size && size.length ) size[0]=info.size;
	if( type && type.length ) type[0]=info.type;
	if( name && name.length ) name[0]=info.name;
}

function _glGetActiveUniform( program,index,size,type,name ){
	var info=gl.getActiveUniform( program,index );
	if( size && size.length ) size[0]=info.size;
	if( type && type.length ) type[0]=info.type;
	if( name && name.length ) name[0]=info.name;
}

function _glGetAttachedShaders( program, maxcount, count, shaders ){
	var t=gl.getAttachedShaders();
	if( count && count.length ) count[0]=t.length;
	if( shaders ){
		var n=t.length;
		if( maxcount<n ) n=maxcount;
		if( shaders.length<n ) n=shaders.length;
		for( var i=0;i<n;++i ) shaders[i]=t[i];
	}
}

function _glGetBooleanv( pname,params ){
	_mkbv( gl.getParameter( pname ),params );
}

function _glGetBufferParameteriv( target, pname, params ){
	_mkiv( gl.glGetBufferParameter( target,pname ),params );
}

function _glGetFloatv( pname,params ){
	_mkfv( gl.getParameter( pname ),params );
}

function _glGetFramebufferAttachmentParameteriv( target, attachment, pname, params ){
	_mkiv( gl.getFrameBufferAttachmentParameter( target,attachment,pname ),params );
}

function _glGetIntegerv( pname, params ){
	_mkiv( gl.getParameter( pname ),params );
}

function _glGetProgramiv( program, pname, params ){
	_mkiv( gl.getProgramParameter( program,pname ),params );
}

function _glGetRenderbufferParameteriv( target, pname, params ){
	_mkiv( gl.getRenderbufferParameter( target,pname ),params );
}

function _glGetShaderiv( shader, pname, params ){
	_mkiv( gl.getShaderParameter( shader,pname ),params );
}

function _glGetString( pname ){
	var p=gl.getParameter( pname );
	if( typeof(p)=="string" ) return p;
	return "";
}

function _glGetTexParameterfv( target, pname, params ){
	_mkfv( gl.getTexParameter( target,pname ),params );
}

function _glGetTexParameteriv( target, pname, params ){
	_mkiv( gl.getTexParameter( target,pname ),params );
}

function _glGetUniformfv( program, location, params ){
	_mkfv( gl.getUniform( program,location ),params );
}

function _glGetUniformiv( program, location, params ){
	_mkiv( gl.getUniform( program,location ),params );
}

function _glGetUniformLocation( program, name ){
	var l=gl.getUniformLocation( program,name );
	if( l ) return l;
	return -1;
}

function _glGetVertexAttribfv( index, pname, params ){
	_mkfv( gl.getVertexAttrib( index,pname ),params );
}

function _glGetVertexAttribiv( index, pname, params ){
	_mkiv( gl.getVertexAttrib( index,pname ),params );
}

function _glReadPixels( x,y,width,height,format,type,data,dataOffset ){
	gl.readPixels( x,y,width,height,format,type,new Uint8Array( data.arrayBuffer,dataOffset,data.length-dataOffset ) );
}

function _glBindBuffer( target,buffer ){
	if( buffer ){
		gl.bindBuffer( target,buffer );
	}else{
		gl.bindBuffer( target,null );
	}
}

function _glBindFramebuffer( target,framebuffer ){
	if( framebuffer ){
		gl.bindFramebuffer( target,framebuffer );
	}else{
		gl.bindFramebuffer( target,null );
	}
}

function _glBindRenderbuffer( target,renderbuffer ){
	if( renderbuffer ){
		gl.bindRenderbuffer( target,renderbuffer );
	}else{
		gl.bindRenderbuffer( target,null );
	}
}

function _glUniform1fv( location, count, v ){
	if( v.length==count ){
		gl.uniform1fv( location,v );
	}else{
		gl.uniform1fv( location,v.slice(0,cont) );
	}
}

function _glUniform1iv( location, count, v ){
	if( v.length==count ){
		gl.uniform1iv( location,v );
	}else{
		gl.uniform1iv( location,v.slice(0,cont) );
	}
}

function _glUniform2fv( location, count, v ){
	var n=count*2;
	if( v.length==n ){
		gl.uniform2fv( location,v );
	}else{
		gl.uniform2fv( location,v.slice(0,n) );
	}
}

function _glUniform2iv( location, count, v ){
	var n=count*2;
	if( v.length==n ){
		gl.uniform2iv( location,v );
	}else{
		gl.uniform2iv( location,v.slice(0,n) );
	}
}

function _glUniform3fv( location, count, v ){
	var n=count*3;
	if( v.length==n ){
		gl.uniform3fv( location,v );
	}else{
		gl.uniform3fv( location,v.slice(0,n) );
	}
}

function _glUniform3iv( location, count, v ){
	var n=count*3;
	if( v.length==n ){
		gl.uniform3iv( location,v );
	}else{
		gl.uniform3iv( location,v.slice(0,n) );
	}
}

function _glUniform4fv( location, count, v ){
	var n=count*4;
	if( v.length==n ){
		gl.uniform4fv( location,v );
	}else{
		gl.uniform4fv( location,v.slice(0,n) );
	}
}

function _glUniform4iv( location, count, v ){
	var n=count*4;
	if( v.length==n ){
		gl.uniform4iv( location,v );
	}else{
		gl.uniform4iv( location,v.slice(0,n) );
	}
}

function _glUniformMatrix2fv( location, count, transpose, value ){
	var n=count*4;
	if( value.length==n ){
		gl.uniformMatrix2fv( location,transpose,value );
	}else{
		gl.uniformMatrix2fv( location,transpose,value.slice(0,n) );
	}
}

function _glUniformMatrix3fv( location, count, transpose, value ){
	var n=count*9;
	if( value.length==n ){
		gl.uniformMatrix3fv( location,transpose,value );
	}else{
		gl.uniformMatrix3fv( location,transpose,value.slice(0,n) );
	}
}

function _glUniformMatrix4fv( location, count, transpose, value ){
	var n=count*16;
	if( value.length==n ){
		gl.uniformMatrix4fv( location,transpose,value );
	}else{
		gl.uniformMatrix4fv( location,transpose,value.slice(0,n) );
	}
}

//
//
// for minib3d html5

function EmptyNullClass(){}; //a hack to support mojo graphicsdevice


function LoadImageData(file, idx) {
	
	//load asynchronously
	//var preimage = new PreLoadImage();
	var image = document.createElement("img");
	var base = this;
	//isLoaded[0] =0;
	
	image.onload = function() {
		image.id = idx;
		//print("idload "+idx);
		
	};
	image.onerror = function() {
		image.id=0;
		//print ("image load error function");
	};

//print ("tpixmap: "+idx+" "+file);		
	image.filename = file;
	image.id =-1;
	image.src = file;

	
	return image;
};


function CheckIsLoaded(image) {
	if (image.id>-1) return true;
	return false;
}

function CreateImageData(w, h) {

	var image = document.createElement("img");
	//white 1x1 image gif
	image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

	image= HTMLResizePixmap(image,w,h,false);

	return image;
}

function HTMLResizePixmap(image,w,h, smooth) {

    var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	
	ctx.imageSmoothingEnabled = smooth;
	ctx.webkitImageSmoothingEnabled = smooth;
	ctx.mozImageSmoothingEnabled = smooth;
	
	//if (w>image.width || h>image.height) {
		//ctx.imageSmoothingEnabled = false;
	//}
	
	canvas.width = w;
	canvas.height = h;
	ctx.clearRect( 0, 0, w, h);
	ctx.drawImage(image, 0, 0, w, h);
	
	//return ctx.getImageData(0,0,w,h);
	image = canvas;

	return image;

}

function HTMLMaskPixmap(image, r,g,b) {
	
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	canvas.width = image.width; canvas.height = image.height;
	
	//ctx.fillRect(0,0, image.width, image.height);
	ctx.drawImage(image, 0, 0);
    var imageData = ctx.getImageData(0, 0, image.width, image.height);
    
	for (var i=0; i<imageData.data.length; i=i+4) {
		if ((imageData.data[i] == r) && (imageData.data[i+1] == g) && (imageData.data[i+2] == b)) {
			imageData.data[i+3] = 0; //turn alpha off
		}
	}
	
	ctx.putImageData(imageData,0,0);
	//image = canvas;
	return canvas;
}



function GetImageInfo( image ) {

	//print("image w/h "+image.width+" "+image.height);
	if (!CheckIsLoaded(image)) return [0,0];
	
	return [image.width, image.height];
	
};


//
// -- pixel read/write functions
//

var _pixelMod= new pixelMod();

function pixelMod() {
	//this.image_cache;
	this.image_cacheread;
	this.imagedata_cache_minib3d;
	
	this.image_cache_canvas ;//= document.createElement("canvas");
	this.image_cache_cxt ;//= this.image_cache_canvas.getContext("2d");
};

pixelMod.prototype.ReadPixel = function( image, x, y) {

	
	if (!(image === this.image_cache_canvas)) {
	
		this.image_cache_canvas = document.createElement("canvas");
		this.image_cache_cxt = this.image_cache_canvas.getContext("2d");
		this.image_cache_canvas.width = image.width; this.image_cache_canvas.height = image.height;
		this.image_cache_cxt.drawImage(image, 0, 0);
		//this.imagedata_cache_minib3d = this.image_cache_cxt.getImageData(0, 0, image.width, image.height);
		//this.image_cache = image;
		
	}
	//var i = (x+y*image.width)*4;
	//return (this.imagedata_cache_minib3d.data[i]|this.imagedata_cache_minib3d.data[i+1]|this.imagedata_cache_minib3d.data[i+2]|this.imagedata_cache_minib3d.data[i+3]);
	this.image_cache_cxt.drawImage(image, 0, 0);
	var p = this.image_cache_cxt.getImageData(x, y, 1, 1);
	return (p.data[0] << 24 |p.data[1] << 16|p.data[2]<<8|p.data[3]);
};

pixelMod.prototype.WritePixel = function( image, x, y, r,g,b,a) {
	
	if (!(image === this.image_cache_canvas)) {

		this.image_cache_canvas = document.createElement("canvas");
		this.image_cache_cxt = this.image_cache_canvas.getContext("2d");
		this.image_cache_canvas.width = image.width; this.image_cache_canvas.height = image.height;
		this.image_cache_cxt.drawImage(image, 0, 0);
		//this.imagedata_cache_minib3d = this.image_cache_cxt.getImageData(0, 0, image.width, image.height);
		//this.image_cache = image;

	}
	
	/*var i = (x+y*image.width)*4;

	this.imagedata_cache_minib3d.data[i]=r;
	this.imagedata_cache_minib3d.data[i+1]=g;
	this.imagedata_cache_minib3d.data[i+2]=b;
	this.imagedata_cache_minib3d.data[i+3]=a;*/
	
	this.image_cache_cxt.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
	this.image_cache_cxt.fillRect (x,y,1,1);
	
	return this.image_cache_canvas;
};



function CheckWebGLContext () {
	test_gl = null;

	try {
		var canvas = document.createElement("canvas");
		// Try to grab the standard context. If it fails, fallback to experimental.
		test_gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		canvas = null;
	}
	catch(e) {}
	
	if (test_gl) return 1;
	return 0;
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
function c_MiniB3DApp(){
	c_App.call(this);
	this.m_preload_list=c_StringList.m_new2.call(new c_StringList);
	this.m_init=0;
	this.m_old_ms=0;
	this.m_renders=0;
	this.m_fps=0;
}
c_MiniB3DApp.prototype=extend_class(c_App);
c_MiniB3DApp.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_MiniB3DApp.prototype.p_PreLoad=function(t_f){
	this.m_preload_list.p_AddLast4(t_f);
	return 0;
}
c_MiniB3DApp.prototype.p_PreLoad2=function(t_f){
	var t_=t_f;
	var t_2=0;
	while(t_2<t_.length){
		var t_s=t_[t_2];
		t_2=t_2+1;
		this.m_preload_list.p_AddLast4(t_s);
	}
	return 0;
}
c_MiniB3DApp.prototype.p_Create=function(){
	return 0;
}
c_MiniB3DApp.prototype.p_Init=function(){
	return 0;
}
c_MiniB3DApp.prototype.p_Minib3dInit=function(){
	if((this.m_init)!=0){
		return;
	}
	if(!((c_TPixmap.m_PreLoadPixmap(this.m_preload_list.p_ToArray()))!=0)){
		return;
	}
	this.m_init=1;
	this.p_Init();
	this.m_init=2;
}
c_MiniB3DApp.prototype.p_OnCreate=function(){
	bb_app_SetUpdateRate(30);
	bb_opengles20_SetRender(0);
	this.p_PreLoad("mojo_font.png");
	this.p_Create();
	this.p_Minib3dInit();
	return 0;
}
c_MiniB3DApp.prototype.p_Update=function(){
	return 0;
}
c_MiniB3DApp.prototype.p_OnUpdate=function(){
	if(!((this.m_init)!=0)){
		this.p_Minib3dInit();
		return 0;
	}
	this.p_Update();
	if(bb_app_Millisecs()-this.m_old_ms>=1000){
		this.m_old_ms=bb_app_Millisecs();
		this.m_fps=this.m_renders;
		this.m_renders=0;
	}
	return 0;
}
c_MiniB3DApp.prototype.p_PreLoadRender=function(){
	return 0;
}
c_MiniB3DApp.m__resumed=false;
c_MiniB3DApp.prototype.p_Render=function(){
	return 0;
}
c_MiniB3DApp.prototype.p_OnRender=function(){
	if(!((this.m_init)!=0)){
		this.p_PreLoadRender();
		return 0;
	}
	if(c_MiniB3DApp.m__resumed){
		c_MiniB3DApp.m__resumed=false;
	}
	this.p_Render();
	bb_functions_RenderWorld();
	this.m_renders=this.m_renders+1;
	return 0;
}
c_MiniB3DApp.m__suspend=false;
c_MiniB3DApp.prototype.p_Resume=function(){
	return 0;
}
c_MiniB3DApp.prototype.p_OnResume=function(){
	c_MiniB3DApp.m__resumed=true;
	if(c_MiniB3DApp.m__suspend){
		c_MiniB3DApp.m__suspend=false;
	}
	this.p_Resume();
	return 0;
}
function c_MyGame(){
	c_MiniB3DApp.call(this);
	this.m_fpsRate=30;
	this.m_mesh=null;
	this.m_cam=null;
	this.m_light=null;
	this.m_bitmap=null;
	this.m_bunnies=null;
	this.m_numBunnies=30;
	this.m_gravity=3.0;
	this.m_maxX=640;
	this.m_minX=0;
	this.m_maxY=480;
	this.m_minY=0;
}
c_MyGame.prototype=extend_class(c_MiniB3DApp);
c_MyGame.m_new=function(){
	c_MiniB3DApp.m_new.call(this);
	return this;
}
c_MyGame.prototype.p_Create=function(){
	bb_app_SetUpdateRate(this.m_fpsRate);
	bb_opengles20_SetRender(0);
	this.p_PreLoad("wabbit_alpha.png");
	return 0;
}
c_MyGame.prototype.p_Init=function(){
	bb_graphics_SetFont(bb_graphics_LoadImage("mojo_font.png",96,2),32);
	this.m_mesh=bb_monkeyutility_CreateMiniB3DMonkey();
	this.m_mesh.p_EntityColor(90.0,90.0,90.0,-1.0);
	this.m_mesh.p_ScaleEntity(2.0,2.0,2.0,0);
	this.m_cam=bb_functions_CreateCamera(null);
	this.m_cam.p_PositionEntity(0.0,0.0,-10.0,0);
	this.m_light=bb_functions_CreateLight(1,null);
	this.m_bitmap=bb_graphics_LoadImage("wabbit_alpha.png",1,c_Image.m_DefaultFlags);
	this.m_bunnies=c_List10.m_new.call(new c_List10);
	var t_bunny=null;
	for(var t_i=0;t_i<this.m_numBunnies;t_i=t_i+1){
		t_bunny=c_Bunny.m_new.call(new c_Bunny);
		t_bunny.m_image=this.m_bitmap;
		t_bunny.m_speedX=bb_random_Rnd()*10.0;
		t_bunny.m_speedY=bb_random_Rnd()*10.0-5.0;
		this.m_bunnies.p_AddLast10(t_bunny);
	}
	return 0;
}
c_MyGame.prototype.p_Update=function(){
	if(((bb_input_KeyHit(432))!=0) || ((bb_input_KeyHit(27))!=0)){
		error("");
	}
	var t_=this.m_bunnies.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_bunny=t_.p_NextObject();
		t_bunny.m_x+=t_bunny.m_speedX;
		t_bunny.m_y+=t_bunny.m_speedY;
		t_bunny.m_speedY+=this.m_gravity;
		if(t_bunny.m_x>(this.m_maxX)){
			t_bunny.m_speedX=t_bunny.m_speedX*-1.0;
			t_bunny.m_x=(this.m_maxX);
		}else{
			if(t_bunny.m_x<(this.m_minX)){
				t_bunny.m_speedX=t_bunny.m_speedX*-1.0;
				t_bunny.m_x=(this.m_minX);
			}
		}
		if(t_bunny.m_y>(this.m_maxY)){
			t_bunny.m_speedY*=-0.8;
			t_bunny.m_y=(this.m_maxY);
			if(bb_random_Rnd()>0.5){
				t_bunny.m_speedY-=bb_random_Rnd()*12.0;
			}
		}else{
			if(t_bunny.m_y<(this.m_minY)){
				t_bunny.m_speedY=0.0;
				t_bunny.m_y=(this.m_minY);
			}
		}
		t_bunny.m_posX=t_bunny.m_x;
		t_bunny.m_posY=t_bunny.m_y+t_bunny.m_z;
	}
	if((bb_input_KeyHit(37))!=0){
		this.m_fpsRate-=5;
		bb_app_SetUpdateRate(this.m_fpsRate);
	}
	if((bb_input_KeyHit(39))!=0){
		this.m_fpsRate+=5;
		bb_app_SetUpdateRate(this.m_fpsRate);
	}
	this.m_mesh.p_TurnEntity(0.0,2.0,0.0,0);
	return 0;
}
c_MyGame.prototype.p_Render=function(){
	bb_mojographics_SetMojoEmulation();
	c_FPSCounter.m_Update();
	var t_=this.m_bunnies.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_b=t_.p_NextObject();
		bb_graphics_DrawImage(t_b.m_image,t_b.m_posX,t_b.m_posY,0);
	}
	bb_graphics_DrawImage(bb_graphics_GetFont(),100.0,200.0,0);
	c_FPSCounter.m_Draw(0,0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_DrawText("FPS Rate: "+String(this.m_fpsRate),100.0,100.0,0.0,0.0);
	bb_graphics_DrawRect(1.0,0.0,1.0,5.0);
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
function bbMain(){
	c_MyGame.m_new.call(new c_MyGame);
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
		return (c_Image.m_new.call(new c_Image)).p_Init2(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init3(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
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
c_InputDevice.prototype.p_KeyHit=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyHit[t_key];
	}
	return 0;
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
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	bb_app__updateRate=t_hertz;
	bb_app__game.SetUpdateRate(t_hertz);
}
function c_TRender(){
	Object.call(this);
}
c_TRender.m_new=function(){
	return this;
}
c_TRender.m_shader2D=null;
c_TRender.m_render=null;
c_TRender.prototype.p_GraphicsInit=function(t_flags){
}
c_TRender.m_draw_list=null;
c_TRender.m_tris_rendered=0;
c_TRender.prototype.p_ContextReady=function(){
}
c_TRender.prototype.p_DeleteTexture=function(t_tex){
}
c_TRender.prototype.p_BindTexture=function(t_tex,t_flags){
}
c_TRender.prototype.p_BindTextureStack=function(){
	var t_=c_TTexture.m_tex_bind_stack.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_tex=t_.p_NextObject();
		if(t_tex.m_bind_flags==-255){
			c_TRender.m_render.p_DeleteTexture(t_tex);
			t_tex.p_FreeTexture_();
		}else{
			c_TRender.m_render.p_BindTexture(t_tex,t_tex.m_bind_flags);
		}
		t_tex.m_bind_flags=-1;
	}
	var t_2=c_TTexture.m_tex_bind_stack.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_tex2=t_2.p_NextObject();
		if(t_tex2.m_freeMemoryAfterBind){
			t_tex2.m_pixmap.p_FreePixmap();
		}
	}
	c_TTexture.m_tex_bind_stack.p_Clear();
	return 0;
}
c_TRender.prototype.p_Reset=function(){
}
c_TRender.prototype.p_UpdateCamera=function(t_cam){
}
c_TRender.prototype.p_UpdateLight=function(t_cam,t_light){
}
c_TRender.m_render_list=null;
c_TRender.m_render_alpha_list=null;
c_TRender.m_wireframe=0;
c_TRender.prototype.p_Render2=function(t_ent,t_cam){
}
c_TRender.prototype.p_Finish=function(){
}
c_TRender.prototype.p_RenderCamera=function(t_cam,t_skip){
	c_TRender.m_render.p_Reset();
	if(!((t_skip)!=0)){
		t_cam.p_Update2(t_cam);
		this.p_UpdateCamera(t_cam);
	}
	var t_=c_TLight.m_light_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_light=t_.p_NextObject();
		this.p_UpdateLight(t_cam,t_light);
	}
	c_TRender.m_render_list.p_Clear();
	c_TRender.m_render_alpha_list.p_Clear();
	var t_mesh=null;
	var t_alpha_count=0;
	var t_wireFrameIsEnabled=c_TRender.m_wireframe;
	var t_2=c_TEntity.m_entity_list.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_ent=t_2.p_NextObject();
		t_mesh=object_downcast((t_ent),c_TMesh);
		if((t_mesh)!=null){
			if(t_mesh.p_Hidden()==true || t_mesh.m_brush.m_alpha==0.0){
				continue;
			}
			if(t_mesh.m_use_cam_layer && t_mesh.m_cam_layer!=t_cam || t_cam.m_use_cam_layer && t_mesh.m_cam_layer!=t_cam){
				continue;
			}
			t_mesh.p_GetBounds(false);
			var t_inview=t_cam.p_EntityInFrustum(t_mesh);
			t_mesh.m_distance_nearplane=t_inview;
			if(t_inview>0.00001){
				t_mesh.m_culled=false;
				c_TRender.m_wireframe=c_TRender.m_wireframe|((t_mesh.m_wireframe)?1:0);
				if(t_mesh.m_auto_fade==1){
					t_mesh.p_AutoFade(t_cam);
				}
				if((object_implements((t_mesh),"c_IRenderUpdate"))!=null){
					object_implements((t_mesh),"c_IRenderUpdate").p_Update2(t_cam);
				}
				if(t_mesh.p_Alpha()){
					t_mesh.m_alpha_order=t_mesh.m_distance_nearplane;
					c_TRender.m_render_alpha_list.p_AddLast3(t_mesh);
				}else{
					c_TRender.m_render.p_Render2((t_mesh),t_cam);
					c_TRender.m_tris_rendered+=t_mesh.m_total_tris;
				}
				c_TRender.m_wireframe=t_wireFrameIsEnabled;
			}
		}
	}
	c_TRender.m_render_alpha_list.p_Sort(1);
	var t_3=c_TRender.m_render_alpha_list.p_ObjectEnumerator();
	while(t_3.p_HasNext()){
		t_mesh=t_3.p_NextObject();
		c_TRender.m_wireframe=c_TRender.m_wireframe|((t_mesh.m_wireframe)?1:0);
		c_TRender.m_render.p_Render2((t_mesh),t_cam);
		c_TRender.m_wireframe=t_wireFrameIsEnabled;
		c_TRender.m_tris_rendered+=t_mesh.m_total_tris;
	}
	this.p_Finish();
}
c_TRender.m_temp_shader=null;
c_TRender.m_alpha_pass=0;
c_TRender.m_camera2D=null;
c_TRender.m_width=0;
c_TRender.m_height=0;
c_TRender.m_RenderDrawList=function(){
	if(c_TRender.m_draw_list.p_IsEmpty() || !c_TRender.m_render.p_ContextReady()){
		return;
	}
	c_TRender.m_render.p_Reset();
	c_TRender.m_shader2D.p_SetShader2D();
	c_MojoEmulationDevice.m__quadCache.p_FlushCache();
	c_TRender.m_alpha_pass=1;
	var t_wireframeIsEnabled=c_TRender.m_wireframe;
	c_TRender.m_wireframe=0;
	c_TRender.m_render.p_UpdateCamera(c_TRender.m_camera2D);
	var t_=c_TRender.m_draw_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_mesh=t_.p_NextObject();
		if(!((t_mesh)!=null)){
			continue;
		}
		if((object_implements((t_mesh),"c_IRenderUpdate"))!=null){
			object_implements((t_mesh),"c_IRenderUpdate").p_Update2(c_TRender.m_camera2D);
		}
		var t_sp=object_downcast((t_mesh),c_TSprite);
		if(t_mesh.m_is_sprite){
			t_sp.m_mat_sp.p_Scale(t_sp.m_pixel_scale[0],t_sp.m_pixel_scale[1],1.0);
			t_mesh.p_EntityFX(64);
		}
		if(t_mesh.p_Alpha()){
			t_mesh.m_alpha_order=1.0;
		}
		c_TRender.m_render.p_Render2((t_mesh),c_TRender.m_camera2D);
		c_TRender.m_tris_rendered+=t_mesh.m_total_tris;
	}
	c_TRender.m_wireframe=t_wireframeIsEnabled;
	c_TRender.m_render.p_Finish();
	c_TRender.m_draw_list.p_Clear();
	c_TRender.m_camera2D.p_CameraClsMode(false,false);
	c_TRender.m_camera2D.p_CameraViewport(0,0,c_TRender.m_width,c_TRender.m_height);
	c_TRender.m_camera2D.p_SetPixelCamera();
}
c_TRender.prototype.p_RenderWorldFinish=function(){
}
c_TRender.m_RenderWorld=function(){
	c_TRender.m_tris_rendered=0;
	if(c_TRender.m_render==null || !c_TRender.m_render.p_ContextReady()){
		return;
	}
	if(c_TTexture.m_tex_bind_stack.p_Length2()>0){
		c_TRender.m_render.p_BindTextureStack();
	}
	var t_=c_TCamera.m_cam_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_cam=t_.p_NextObject();
		if(t_cam.p_Hidden()==true){
			continue;
		}
		c_TShader.m_PreProcess(t_cam);
		if(object_implements((c_TShader.m_g_shader),"c_IShaderRender")==null){
			c_TRender.m_render.p_RenderCamera(t_cam,0);
		}else{
			c_TRender.m_temp_shader=c_TShader.m_g_shader;
			object_implements((c_TShader.m_g_shader),"c_IShaderRender").p_Render3(t_cam);
			c_TShader.m_g_shader=c_TRender.m_temp_shader;
		}
		c_TShader.m_PostProcess(t_cam);
	}
	c_TRender.m_RenderDrawList();
	c_TRender.m_render.p_RenderWorldFinish();
}
c_TRender.m_vbo_enabled=false;
c_TRender.prototype.p_UpdateVBO=function(t_surface){
}
c_TRender.prototype.p_ClearErrors=function(){
	return 1;
}
c_TRender.prototype.p_GetVersion=function(){
}
function c_OpenglES20(){
	c_TRender.call(this);
	this.m_cam_matrix_upload=0;
	this.m_light=new_object_array(8);
	this.m_t_array=new_number_array(16);
	this.m_vmat_array=new_number_array(16);
	this.m_pvmat_array=new_number_array(16);
	this.implments={c_IShader2D:1};
}
c_OpenglES20.prototype=extend_class(c_TRender);
c_OpenglES20.m_new=function(){
	c_TRender.m_new.call(this);
	c_TRender.m_shader2D=(this);
	return this;
}
c_OpenglES20.prototype.p_ContextReady=function(){
	return true;
}
c_OpenglES20.m_last_texture=null;
c_OpenglES20.m_last_surf=null;
c_OpenglES20.m_last_shader=0;
c_OpenglES20.m_last_tex_count=0;
c_OpenglES20.prototype.p_ResetLights=function(){
	this.m_light=new_object_array(8);
	var t_i=0;
	var t_=c_TLight.m_light_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_li=t_.p_NextObject();
		this.m_light[t_i]=t_li;
		t_i+=1;
		if(t_i>8){
			break;
		}
	}
	for(var t_j=t_i;t_j<=7;t_j=t_j+1){
		this.m_light[t_j]=null;
	}
}
c_OpenglES20.m_last_effect=null;
c_OpenglES20.prototype.p_Reset=function(){
	c_OpenglES20.m_last_texture=null;
	c_OpenglES20.m_last_surf=null;
	c_TRender.m_alpha_pass=0;
	c_OpenglES20.m_last_shader=-1;
	this.m_cam_matrix_upload=0;
	c_OpenglES20.m_last_tex_count=-1;
	this.p_ResetLights();
	c_OpenglES20.m_last_effect.p_SetNull();
	c_TShader.m_DefaultShader();
}
c_OpenglES20.prototype.p_Finish=function(){
}
c_OpenglES20.m_alpha_list=null;
c_OpenglES20.m_effect=null;
c_OpenglES20.m_total_errors=0;
c_OpenglES20.m_GetGLError=function(){
	return 0;
}
c_OpenglES20.prototype.p_UpdateVBO=function(t_surf){
	if(t_surf.m_vbo_id[0]==0){
		t_surf.m_vbo_id[0]=gl.createBuffer();
		t_surf.m_vbo_id[1]=gl.createBuffer();
		t_surf.m_vbo_id[2]=gl.createBuffer();
		t_surf.m_vbo_id[3]=gl.createBuffer();
		t_surf.m_vbo_id[4]=gl.createBuffer();
		t_surf.m_vbo_id[5]=gl.createBuffer();
	}
	if(t_surf.m_vbo_id[0]==0){
		return 0;
	}
	if(t_surf.m_reset_vbo==-1){
		t_surf.m_reset_vbo=255;
	}
	if(((t_surf.m_reset_vbo&1)!=0) || ((t_surf.m_reset_vbo&2)!=0) || ((t_surf.m_reset_vbo&4)!=0) || ((t_surf.m_reset_vbo&8)!=0)){
		if(t_surf.m_vbo_dyn && !((t_surf.m_vert_anim).length!=0)){
			_glBindBuffer(34962,t_surf.m_vbo_id[0]);
			if(t_surf.m_reset_vbo!=255){
				_glBufferSubData(34962,0,t_surf.m_no_verts*64,t_surf.m_vert_data.m_buf,0);
			}else{
				_glBufferData(34962,t_surf.m_no_verts*64,t_surf.m_vert_data.m_buf,35048);
			}
		}else{
			if(t_surf.m_vbo_dyn && ((t_surf.m_vert_anim).length!=0) && ((t_surf.m_reset_vbo&1)!=0)){
				_glBindBuffer(34962,t_surf.m_vbo_id[4]);
				if(t_surf.m_reset_vbo!=255){
					_glBufferSubData(34962,0,t_surf.m_no_verts*12,t_surf.m_vert_anim[t_surf.m_anim_frame].m_buf,0);
				}else{
					_glBufferData(34962,t_surf.m_no_verts*12,t_surf.m_vert_anim[t_surf.m_anim_frame].m_buf,35048);
				}
			}else{
				_glBindBuffer(34962,t_surf.m_vbo_id[0]);
				_glBufferData(34962,t_surf.m_no_verts*64,t_surf.m_vert_data.m_buf,35044);
			}
		}
	}
	if((t_surf.m_reset_vbo&16)!=0){
		_glBindBuffer(34963,t_surf.m_vbo_id[5]);
		if(t_surf.m_reset_vbo!=255){
			_glBufferSubData(34963,0,t_surf.m_no_tris*6,t_surf.m_tris.m_buf,0);
		}else{
			_glBufferData(34963,t_surf.m_no_tris*6,t_surf.m_tris.m_buf,35044);
		}
	}
	if((c_OpenglES20.m_GetGLError())!=0){
		print("vbo error");
	}
	t_surf.m_reset_vbo=0;
	return 0;
}
c_OpenglES20.m__usePerPixelLighting=0;
c_OpenglES20.m__nullTexture=null;
c_OpenglES20.prototype.p_ClearErrors=function(){
	return 0;
}
c_OpenglES20.prototype.p_Render2=function(t_ent,t_cam){
	var t_mesh=object_downcast((t_ent),c_TMesh);
	if(!((t_mesh)!=null)){
		return;
	}
	var t_name=t_ent.p_EntityName();
	var t_shader=null;
	t_shader=object_downcast((c_TShader.m_g_shader),c_TShaderGLSL);
	if(!((t_shader.m_active)!=0)){
		return;
	}
	if(((object_downcast((t_ent.m_shader_brush),c_TShaderGLSL))!=null) && !t_shader.m_override && ((t_ent.m_shader_brush.m_active)!=0)){
		t_shader=object_downcast((t_ent.m_shader_brush),c_TShaderGLSL);
		if((object_implements((t_shader),"c_IShaderEntity"))!=null){
			object_implements((t_shader),"c_IShaderEntity").p_RenderEntity(t_cam,t_ent);
			if(t_shader.m_shader_id!=c_OpenglES20.m_last_shader){
				c_OpenglES20.m_last_shader=t_shader.m_shader_id;
			}
			return;
		}
	}
	var t_anim_surf2=null;
	var t_surf=null;
	var t_ccc=0;
	var t_lightflag=1;
	var t_temp_list=t_mesh.m_surf_list;
	c_OpenglES20.m_alpha_list.p_Clear();
	if((t_cam.m_draw2D)!=0){
		c_OpenglES20.m_effect.m_use_depth_test=0;
	}
	for(var t_alphaloop=c_TRender.m_alpha_pass;t_alphaloop<=1;t_alphaloop=t_alphaloop+1){
		var t_=t_temp_list.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			t_surf=t_.p_NextObject();
			t_ccc+=1;
			if(t_surf.m_no_verts==0){
				continue;
			}
			if(t_surf.m_alpha_enable && t_alphaloop<1){
				c_OpenglES20.m_alpha_list.p_AddLast2(t_surf);
				continue;
			}
			var t_vbo=1;
			if(!c_TRender.m_vbo_enabled){
				t_vbo=0;
				if(t_surf.m_vbo_id[0]!=0){
					gl.deleteBuffer(t_surf.m_vbo_id[0]);
					gl.deleteBuffer(t_surf.m_vbo_id[1]);
					gl.deleteBuffer(t_surf.m_vbo_id[2]);
					gl.deleteBuffer(t_surf.m_vbo_id[3]);
					gl.deleteBuffer(t_surf.m_vbo_id[4]);
					gl.deleteBuffer(t_surf.m_vbo_id[5]);
				}
			}
			if((t_vbo)!=0){
				if(t_surf.m_reset_vbo!=0){
					this.p_UpdateVBO(t_surf);
				}else{
					if(t_surf.m_vbo_id[0]==0){
						t_surf.m_reset_vbo=-1;
						this.p_UpdateVBO(t_surf);
					}
				}
			}
			if((t_mesh.m_anim)!=0){
				t_anim_surf2=t_mesh.m_anim_surf[t_surf.m_surf_id];
				if(((t_vbo)!=0) && ((t_anim_surf2)!=null)){
					t_mesh.p_UpdateVertexAnimFrame(t_anim_surf2,t_surf);
					if(t_anim_surf2.m_reset_vbo!=0){
						this.p_UpdateVBO(t_anim_surf2);
					}else{
						if(t_anim_surf2.m_vbo_id[0]==0){
							t_anim_surf2.m_reset_vbo=-1;
							this.p_UpdateVBO(t_anim_surf2);
						}
					}
				}
			}
			c_OpenglES20.m_effect.p_UpdateEffect(t_surf,t_ent,t_cam);
			var t_tex_count=t_ent.m_brush.m_no_texs;
			if(t_surf.m_brush.m_no_texs>t_tex_count){
				t_tex_count=t_surf.m_brush.m_no_texs;
			}
			if(t_tex_count>t_shader.m_MAX_TEXTURES-1){
				t_tex_count=t_shader.m_MAX_TEXTURES-1;
			}
			if(object_downcast((t_shader),c_FullShader)!=null){
				t_shader=c_FullShader.m_GetShader(c_OpenglES20.m__usePerPixelLighting|c_OpenglES20.m_effect.m_use_perpixellighting,1,t_tex_count);
				if(c_OpenglES20.m_effect.m_use_full_bright>0){
					t_shader=c_FullShader.m_fastbrightshader;
				}
			}
			if(!((t_shader.m_u)!=null)){
				continue;
			}
			if(t_shader.m_shader_id!=c_OpenglES20.m_last_shader){
				gl.useProgram(t_shader.m_shader_id);
			}
			t_shader.p_Update();
			var t_skip_sprite_state=false;
			if(c_OpenglES20.m_last_surf==t_surf && t_shader.m_shader_id==c_OpenglES20.m_last_shader){
				t_skip_sprite_state=true;
			}else{
				c_OpenglES20.m_last_surf=t_surf;
			}
			if(t_skip_sprite_state==false){
				if(false && ((c_OpenglES20.m_GetGLError())!=0)){
					print("*pre vbos");
				}
				if((t_vbo)!=0){
					var t_bind=false;
					if(!(((t_mesh.m_anim_render)!=0) || t_surf.m_vbo_dyn)){
						gl.enableVertexAttribArray(t_shader.m_u.m_vertcoords);
						_glBindBuffer(34962,t_surf.m_vbo_id[0]);
						gl.vertexAttribPointer(t_shader.m_u.m_vertcoords,3,5126,false,64,0);
						t_bind=true;
					}
					if(t_shader.m_u.m_normals!=-1){
						gl.enableVertexAttribArray(t_shader.m_u.m_normals);
						if(!t_bind){
							_glBindBuffer(34962,t_surf.m_vbo_id[0]);
						}
						gl.vertexAttribPointer(t_shader.m_u.m_normals,3,5126,false,64,16);
						t_bind=true;
					}
					if(t_shader.m_u.m_colors!=-1){
						gl.enableVertexAttribArray(t_shader.m_u.m_colors);
						if(!t_bind){
							_glBindBuffer(34962,t_surf.m_vbo_id[0]);
						}
						gl.vertexAttribPointer(t_shader.m_u.m_colors,4,5126,false,64,32);
						t_bind=true;
					}
					_glBindBuffer(34963,t_surf.m_vbo_id[5]);
				}else{
					_glBindBuffer(34962,0);
					_glBindBuffer(34963,0);
					print("*** Non-VBO disabled");
				}
			}
			if(((t_mesh.m_anim_render)!=0) || t_surf.m_vbo_dyn || ((t_anim_surf2)!=null)){
				gl.enableVertexAttribArray(t_shader.m_u.m_vertcoords);
				if(((t_anim_surf2)!=null) && ((t_anim_surf2.m_vert_anim).length!=0)){
					_glBindBuffer(34962,t_anim_surf2.m_vbo_id[4]);
					gl.vertexAttribPointer(t_shader.m_u.m_vertcoords,3,5126,false,12,0);
				}else{
					if(((t_mesh.m_anim_render)!=0) && ((t_anim_surf2)!=null)){
						_glBindBuffer(34962,t_anim_surf2.m_vbo_id[0]);
						gl.vertexAttribPointer(t_shader.m_u.m_vertcoords,3,5126,false,64,0);
					}else{
						if(t_surf.m_vbo_dyn){
							_glBindBuffer(34962,t_surf.m_vbo_id[0]);
							gl.vertexAttribPointer(t_shader.m_u.m_vertcoords,3,5126,false,64,0);
						}
					}
				}
			}
			if(false && ((c_OpenglES20.m_GetGLError())!=0)){
				print("*vbos");
			}
			if(t_shader.m_u.m_flags!=-1){
				gl.uniform1f(t_shader.m_u.m_flags,(c_OpenglES20.m_effect.m_fx));
			}
			if(c_OpenglES20.m_effect.m_use_vertex_colors<0){
				c_OpenglES20.m_effect.m_use_vertex_colors=0;
			}
			if(t_shader.m_u.m_colorflag!=-1){
				gl.uniform1f(t_shader.m_u.m_colorflag,(c_OpenglES20.m_effect.m_use_vertex_colors));
			}
			if(c_OpenglES20.m_effect.m_use_full_bright<0){
				c_OpenglES20.m_effect.m_use_full_bright=0;
			}
			if(t_shader.m_u.m_lightflag!=-1){
				gl.uniform1f(t_shader.m_u.m_lightflag,1.0-(c_OpenglES20.m_effect.m_use_full_bright));
			}
			if(t_shader.m_u.m_ambient_color!=-1){
				_glUniform4fv(t_shader.m_u.m_ambient_color,1,c_OpenglES20.m_effect.m_ambient);
			}
			if(t_shader.m_u.m_base_color!=-1){
				_glUniform4fv(t_shader.m_u.m_base_color,1,c_OpenglES20.m_effect.m_diffuse);
			}
			if(t_shader.m_u.m_shininess!=-1){
				gl.uniform1f(t_shader.m_u.m_shininess,c_OpenglES20.m_effect.m_shine);
			}
			if(!t_skip_sprite_state){
				if((c_OpenglES20.m_effect.m_use_flatshade)!=0){
				}
				if(c_OpenglES20.m_effect.m_use_backface_culling!=c_OpenglES20.m_last_effect.m_use_backface_culling){
					if(c_OpenglES20.m_effect.m_use_backface_culling==0){
						gl.disable(2884);
					}else{
						gl.enable(2884);
					}
				}
				if(c_OpenglES20.m_effect.m_blend>-1){
					var t_1=c_OpenglES20.m_effect.m_blend;
					if(t_1==0){
						gl.blendFuncSeparate(770,771,1,771);
					}else{
						if(t_1==1){
							gl.blendFunc(770,771);
						}else{
							if(t_1==2){
								gl.blendFunc(774,0);
							}else{
								if(t_1==3){
									gl.blendFunc(770,1);
								}else{
									if(t_1==4){
										gl.blendFunc(1,1);
									}
								}
							}
						}
					}
				}
				if(c_OpenglES20.m_effect.m_blend!=c_OpenglES20.m_last_effect.m_blend){
					if(c_OpenglES20.m_effect.m_blend>-1){
						gl.enable(3042);
					}else{
						gl.disable(3042);
					}
				}
				if(c_OpenglES20.m_effect.m_use_depth_test!=c_OpenglES20.m_last_effect.m_use_depth_test){
					if(c_OpenglES20.m_effect.m_use_depth_test==0){
						gl.disable(2929);
					}else{
						gl.enable(2929);
					}
				}
				if(c_OpenglES20.m_effect.m_use_depth_write!=c_OpenglES20.m_last_effect.m_use_depth_write){
					if(c_OpenglES20.m_effect.m_use_depth_write==0){
						gl.depthMask(false);
					}else{
						gl.depthMask(true);
					}
				}
				if(c_OpenglES20.m_effect.m_use_alpha_test>0){
					if(t_shader.m_u.m_alphaflag!=-1){
						gl.uniform1f(t_shader.m_u.m_alphaflag,0.5);
					}
				}else{
					if(t_shader.m_u.m_alphaflag!=-1){
						gl.uniform1f(t_shader.m_u.m_alphaflag,0.0);
					}
				}
				if(c_OpenglES20.m_effect.m_use_fog>0){
					if(t_shader.m_u.m_fogflag!=-1){
						gl.uniform1i(t_shader.m_u.m_fogflag,t_cam.m_fog_mode);
					}
					if(t_shader.m_u.m_fog_color!=-1){
						_glUniform4fv(t_shader.m_u.m_fog_color,1,[t_cam.m_fog_r,t_cam.m_fog_g,t_cam.m_fog_b,1.0]);
					}
					if(t_shader.m_u.m_fog_range!=-1){
						_glUniform2fv(t_shader.m_u.m_fog_range,1,[t_cam.m_fog_range_near,t_cam.m_fog_range_far]);
					}
				}else{
					if(t_shader.m_u.m_fogflag!=-1){
						gl.uniform1i(t_shader.m_u.m_fogflag,0);
					}
				}
			}
			if(t_tex_count<c_OpenglES20.m_last_tex_count){
				for(var t_i=t_tex_count;t_i<=t_shader.m_MAX_TEXTURES-1;t_i=t_i+1){
					gl.activeTexture(33984+t_i);
					_glBindTexture(3553,0);
				}
			}
			var t_bindTexCoords0=false;
			var t_bindTexCoords1=false;
			for(var t_ix=t_tex_count-1;t_ix>=0;t_ix=t_ix+-1){
				var t_texture=null;
				var t_tex_flags=0;
				var t_tex_blend=0;
				var t_tex_coords=0;
				var t_tex_u_scale=1.0;
				var t_tex_v_scale=1.0;
				var t_tex_u_pos=.0;
				var t_tex_v_pos=.0;
				var t_tex_ang=.0;
				var t_tex_cube_mode=0;
				var t_frame=0;
				var t_tex_smooth=0;
				if(t_surf.m_brush.m_tex[t_ix]!=null || t_ent.m_brush.m_tex[t_ix]!=null){
					if(t_ent.m_brush.m_tex[t_ix]!=null){
						t_texture=t_ent.m_brush.m_tex[t_ix];
						t_tex_flags=t_ent.m_brush.m_tex[t_ix].m_flags;
						t_tex_blend=t_ent.m_brush.m_tex[t_ix].m_blend;
						t_tex_coords=t_ent.m_brush.m_tex[t_ix].m_coords;
						t_tex_u_scale=t_ent.m_brush.m_tex[t_ix].m_u_scale;
						t_tex_v_scale=t_ent.m_brush.m_tex[t_ix].m_v_scale;
						t_tex_u_pos=t_ent.m_brush.m_tex[t_ix].m_u_pos;
						t_tex_v_pos=t_ent.m_brush.m_tex[t_ix].m_v_pos;
						t_tex_ang=t_ent.m_brush.m_tex[t_ix].m_angle;
						t_tex_cube_mode=t_ent.m_brush.m_tex[t_ix].m_cube_mode;
						t_frame=t_ent.m_brush.m_tex[t_ix].m_tex_frame;
						t_tex_smooth=((t_ent.m_brush.m_tex[t_ix].m_tex_smooth)?1:0);
					}else{
						t_texture=t_surf.m_brush.m_tex[t_ix];
						t_tex_flags=t_surf.m_brush.m_tex[t_ix].m_flags;
						t_tex_blend=t_surf.m_brush.m_tex[t_ix].m_blend;
						t_tex_coords=t_surf.m_brush.m_tex[t_ix].m_coords;
						t_tex_u_scale=t_surf.m_brush.m_tex[t_ix].m_u_scale;
						t_tex_v_scale=t_surf.m_brush.m_tex[t_ix].m_v_scale;
						t_tex_u_pos=t_surf.m_brush.m_tex[t_ix].m_u_pos;
						t_tex_v_pos=t_surf.m_brush.m_tex[t_ix].m_v_pos;
						t_tex_ang=t_surf.m_brush.m_tex[t_ix].m_angle;
						t_tex_cube_mode=t_surf.m_brush.m_tex[t_ix].m_cube_mode;
						t_frame=t_surf.m_brush.m_tex[t_ix].m_tex_frame;
						t_tex_smooth=((t_surf.m_brush.m_tex[t_ix].m_tex_smooth)?1:0);
					}
					if(t_texture.m_width==0){
						t_texture=c_OpenglES20.m__nullTexture;
					}
					if(t_texture==c_OpenglES20.m_last_texture && t_ix==0){
					}else{
						c_OpenglES20.m_last_texture=t_texture;
						gl.activeTexture(33984+t_ix);
						_glBindTexture(3553,t_texture.m_gltex[0]);
						if(t_shader.m_u.m_texture[t_ix]!=-1){
							gl.uniform1i(t_shader.m_u.m_texture[t_ix],t_ix);
						}
						if((t_tex_flags&8)!=0){
							if((t_tex_smooth)!=0){
								gl.texParameteri(3553,10240,9729);
								gl.texParameteri(3553,10241,9985);
							}else{
								gl.texParameteri(3553,10240,9728);
								gl.texParameteri(3553,10241,9984);
							}
						}else{
							if((t_tex_smooth)!=0){
								gl.texParameteri(3553,10240,9729);
								gl.texParameteri(3553,10241,9729);
							}else{
								gl.texParameteri(3553,10240,9728);
								gl.texParameteri(3553,10241,9728);
							}
						}
						if((t_tex_flags&16)!=0){
							gl.texParameteri(3553,10242,33071);
						}else{
							gl.texParameteri(3553,10242,10497);
						}
						if((t_tex_flags&32)!=0){
							gl.texParameteri(3553,10243,33071);
						}else{
							gl.texParameteri(3553,10243,10497);
						}
					}
					if(t_tex_coords==0){
						t_bindTexCoords0=true;
					}
					if(t_tex_coords==1){
						t_bindTexCoords1=true;
					}
					if(t_shader.m_u.m_tex_position[t_ix]!=-1){
						gl.uniform2f(t_shader.m_u.m_tex_position[t_ix],t_tex_u_pos,t_tex_v_pos);
					}
					if(t_shader.m_u.m_tex_rotation[t_ix]!=-1){
						gl.uniform2f(t_shader.m_u.m_tex_rotation[t_ix],Math.cos((t_tex_ang)*D2R),Math.sin((t_tex_ang)*D2R));
					}
					if(t_shader.m_u.m_tex_scale[t_ix]!=-1){
						gl.uniform2f(t_shader.m_u.m_tex_scale[t_ix],t_tex_u_scale,t_tex_v_scale);
					}
					if(t_shader.m_u.m_tex_blend[t_ix]!=-1){
						gl.uniform2f(t_shader.m_u.m_tex_blend[t_ix],(t_tex_blend),(t_tex_blend));
					}
					if(t_ix==0 && t_shader.m_u.m_texfx_normal[t_ix]!=-1){
						gl.uniform1f(t_shader.m_u.m_texfx_normal[t_ix],(((t_tex_flags&1024)>0)?1:0));
					}
					if(t_shader.m_u.m_vertCoordSet[t_ix]!=-1){
						gl.uniform1f(t_shader.m_u.m_vertCoordSet[t_ix],(t_tex_coords));
					}
					if(false && ((c_OpenglES20.m_GetGLError())!=0)){
						print("*tex "+String(t_ix));
					}
				}
			}
			if(t_tex_count==0){
				c_OpenglES20.m_last_texture=null;
				gl.activeTexture(33984);
				t_bindTexCoords0=false;
				t_bindTexCoords1=false;
			}
			if(((t_vbo)!=0) && !t_skip_sprite_state){
				if(t_shader.m_u.m_texcoords0!=-1 && t_bindTexCoords0==true){
					gl.enableVertexAttribArray(t_shader.m_u.m_texcoords0);
					_glBindBuffer(34962,t_surf.m_vbo_id[0]);
					gl.vertexAttribPointer(t_shader.m_u.m_texcoords0,2,5126,false,64,48);
				}
				if(t_shader.m_u.m_texcoords1!=-1 && t_bindTexCoords1==true){
					gl.enableVertexAttribArray(t_shader.m_u.m_texcoords1);
					_glBindBuffer(34962,t_surf.m_vbo_id[0]);
					gl.vertexAttribPointer(t_shader.m_u.m_texcoords1,2,5126,false,64,56);
				}
				if(t_bindTexCoords0==false && t_shader.m_u.m_texcoords0!=-1){
					gl.disableVertexAttribArray(t_shader.m_u.m_texcoords0);
				}
				if(t_bindTexCoords1==false && t_shader.m_u.m_texcoords1!=-1){
					gl.disableVertexAttribArray(t_shader.m_u.m_texcoords1);
				}
			}else{
				if(!t_skip_sprite_state){
				}
			}
			if(t_shader.m_u.m_texflag!=-1){
				gl.uniform1f(t_shader.m_u.m_texflag,(t_tex_count));
			}
			if(false && ((c_OpenglES20.m_GetGLError())!=0)){
				print("*tex2");
			}
			if(c_OpenglES20.m_last_shader!=t_shader.m_shader_id){
				for(var t_li=0;t_li<=t_shader.m_MAX_LIGHTS-1;t_li=t_li+1){
					if((this.m_light[t_li])!=null){
						if(t_shader.m_u.m_light_type[t_li]!=-1){
							gl.uniform1f(t_shader.m_u.m_light_type[t_li],(this.m_light[t_li].m_light_type));
						}
						this.m_light[t_li].m_mat.p_ToArray2(this.m_t_array);
						if(t_shader.m_u.m_light_matrix[t_li]!=-1){
							_glUniformMatrix4fv(t_shader.m_u.m_light_matrix[t_li],1,false,this.m_t_array);
						}
						if(t_shader.m_u.m_light_att[t_li]!=-1){
							_glUniform4fv(t_shader.m_u.m_light_att[t_li],1,[this.m_light[t_li].m_const_att,this.m_light[t_li].m_lin_att,this.m_light[t_li].m_quad_att,this.m_light[t_li].m_actual_range]);
						}
						if(t_shader.m_u.m_light_color[t_li]!=-1){
							_glUniform4fv(t_shader.m_u.m_light_color[t_li],1,[this.m_light[t_li].m_red,this.m_light[t_li].m_green,this.m_light[t_li].m_blue,1.0]);
						}
						if(t_shader.m_u.m_light_spot[t_li]!=-1){
							_glUniform3fv(t_shader.m_u.m_light_spot[t_li],1,[Math.cos((this.m_light[t_li].m_outer_ang)*D2R),Math.cos((this.m_light[t_li].m_inner_ang)*D2R),this.m_light[t_li].m_spot_exp]);
						}
					}else{
						if(t_shader.m_u.m_light_type[t_li]!=-1){
							gl.uniform1f(t_shader.m_u.m_light_type[t_li],0.0);
						}
						if(t_shader.m_u.m_light_color[t_li]!=-1){
							_glUniform4fv(t_shader.m_u.m_light_color[t_li],1,[0.0,0.0,0.0,1.0]);
						}
					}
				}
			}
			if(t_mesh.m_is_sprite==false){
				t_mesh.m_mat.p_ToArray2(this.m_t_array);
				if(t_shader.m_u.m_m_matrix!=-1){
					_glUniformMatrix4fv(t_shader.m_u.m_m_matrix,1,false,this.m_t_array);
				}
			}else{
				object_downcast((t_mesh),c_TSprite).m_mat_sp.p_ToArray2(this.m_t_array);
				if(t_shader.m_u.m_m_matrix!=-1){
					_glUniformMatrix4fv(t_shader.m_u.m_m_matrix,1,false,this.m_t_array);
				}
			}
			if(t_shader.m_u.m_v_matrix!=-1){
				_glUniformMatrix4fv(t_shader.m_u.m_v_matrix,1,false,this.m_vmat_array);
			}
			if(t_shader.m_u.m_p_matrix!=-1){
				_glUniformMatrix4fv(t_shader.m_u.m_p_matrix,1,false,this.m_pvmat_array);
			}
			if(t_shader.m_u.m_scaleInv!=-1){
				_glUniform3fv(t_shader.m_u.m_scaleInv,1,[1.0/t_mesh.m_gsx,1.0/t_mesh.m_gsy,1.0/t_mesh.m_gsz]);
			}
			if(false && ((c_OpenglES20.m_GetGLError())!=0)){
				print("*mats flags");
			}
			if((c_TRender.m_wireframe)!=0){
				if((t_vbo)!=0){
					gl.drawElements(2,t_surf.m_no_tris*3,5123,0);
				}
			}else{
				if((t_vbo)!=0){
					gl.drawElements(4,t_surf.m_no_tris*3,5123,0);
				}
			}
			if(false && ((c_OpenglES20.m_GetGLError())!=0)){
				print("*glDrawElements");
			}
			c_OpenglES20.m_last_tex_count=t_tex_count;
			c_OpenglES20.m_last_effect.p_Overwrite2(c_OpenglES20.m_effect);
			c_OpenglES20.m_last_shader=t_shader.m_shader_id;
		}
		if(!((c_OpenglES20.m_alpha_list)!=null)){
			break;
		}
		t_temp_list=(c_OpenglES20.m_alpha_list);
	}
	t_temp_list=null;
	this.p_ClearErrors();
}
c_OpenglES20.prototype.p_GetVersion=function(){
	var t_webgl="";
	var t_st="";
	if(!((window.WebGLRenderingContext)!=0)){
		error("** WebGL not found. Please upgrade or check browser options. \n\n");
	}
	if(!((CheckWebGLContext())!=0)){
		error("** WebGL Context not found. Please upgrade or check browser options. \n\n");
	}
	var t_s=_glGetString(7938);
	t_webgl=t_s.split(" ")[0];
	var t_num=0;
	for(var t_i=0;t_i<=t_s.length-1;t_i=t_i+1){
		if(t_s.charCodeAt(t_i)>47 && t_s.charCodeAt(t_i)<58){
			t_st=t_st+String.fromCharCode(t_s.charCodeAt(t_i));
			if(t_num==0){
				t_num=1;
			}
		}else{
			if(t_s.charCodeAt(t_i)==46){
				if(t_num==2){
					break;
				}
				t_st=t_st+String.fromCharCode(t_s.charCodeAt(t_i));
				t_num=2;
			}else{
				if(t_num!=0){
					break;
				}
			}
		}
	}
	var t_sn=1.0;
	if(string_trim(t_webgl.toLowerCase())=="webgl"){
		t_sn=-1.0;
	}
	return ((parseFloat(t_st)*10.0)|0)/10.0*t_sn;
}
c_OpenglES20.prototype.p_EnableStates=function(){
	gl.enable(2929);
	gl.depthMask(true);
	_glClearDepthf(1.0);
	gl.depthFunc(515);
	gl.enable(2884);
	gl.enable(3089);
	gl.enable(3042);
}
c_OpenglES20.prototype.p_GraphicsInit=function(t_flags){
	var t_version=((this.p_GetVersion())|0);
	if((t_version)>0.0){
		print("..OPENGL "+String(t_version));
	}else{
		print("..WEBGL "+String(-t_version));
	}
	if((t_version)<1.999 && (t_version)>0.0){
		error("Requires OpenGL 2.0 or higher");
	}
	c_TPixmapGL.m_Init();
	c_FrameBufferGL.m_supportFBO=1;
	c_TTexture.m_TextureFilter("",9);
	c_TRender.m_width=bb_app_DeviceWidth();
	c_TRender.m_height=bb_app_DeviceHeight();
	c_TRender.m_vbo_enabled=true;
	c_OpenglES20.m__usePerPixelLighting=(((t_flags&2)>0)?1:0);
	this.p_EnableStates();
	c_TEntity.m_global_mat.p_LoadIdentity();
	this.p_ClearErrors();
	c_TShader.m_LoadDefaultShader2(c_FullShader.m_new.call(new c_FullShader));
	c_OpenglES20.m__nullTexture=bb_functions_CreateTexture(1,1,1,1);
	if(gl.getError()!=0){
		return 0;
	}
	return 1;
}
c_OpenglES20.prototype.p_DeleteTexture=function(t_tex){
	if((t_tex.m_gltex[0])!=0){
		gl.deleteTexture(t_tex.m_gltex[0]);
	}
	t_tex.m_gltex[0]=0;
	return 0;
}
c_OpenglES20.prototype.p_BindTexture=function(t_tex,t_flags){
	c_TRender.m_render.p_ClearErrors();
	if((t_flags&4)!=0){
	}
	var t_width=t_tex.m_pixmap.m_width;
	var t_height=t_tex.m_pixmap.m_height;
	if(t_width==0 || t_height==0){
		return t_tex;
	}
	if(!((t_tex.m_gltex[0])!=0)){
		t_tex.m_gltex[0]=gl.createTexture();
	}else{
		if((t_tex.m_pixmap.m_bind)!=0){
			return t_tex;
		}
	}
	_glBindTexture(3553,t_tex.m_gltex[0]);
	if((t_flags&8)!=0){
		gl.texParameteri(3553,10240,9729);
		gl.texParameteri(3553,10241,9985);
	}else{
		gl.texParameteri(3553,10240,9728);
		gl.texParameteri(3553,10241,9728);
	}
	if((t_flags&16)!=0){
		gl.texParameteri(3553,10242,33071);
	}else{
		gl.texParameteri(3553,10242,10497);
	}
	if((t_flags&32)!=0){
		gl.texParameteri(3553,10243,33071);
	}else{
		gl.texParameteri(3553,10243,10497);
	}
	var t_mipmap=0;
	var t_mip_level=0;
	if((t_flags&8)!=0){
		t_mipmap=1;
	}
	var t_pix=object_downcast((t_tex.m_pixmap),c_TPixmapGL);
	do{
		gl.pixelStorei(3317,1);
		gl.texImage2D(3553,t_mip_level,6408,6408,5121,t_pix.m_pixels);
		var t_err=gl.getError();
		if(t_err!=0){
			error("** out of texture memory ** "+String(t_err));
		}
		if(!((t_mipmap)!=0) || (t_width==1 || t_height==1)){
			break;
		}
		if(t_width>1){
			t_width=(((t_width)*0.5)|0);
		}
		if(t_height>1){
			t_height=(((t_height)*0.5)|0);
		}
		if(t_tex.m_resize_smooth){
			t_pix=object_downcast((t_pix.p_ResizePixmap(t_width,t_height)),c_TPixmapGL);
		}else{
			t_pix=object_downcast((t_pix.p_ResizePixmapNoSmooth(t_width,t_height)),c_TPixmapGL);
		}
		t_mip_level+=1;
	}while(!(false));
	t_tex.m_no_mipmaps=t_mip_level;
	t_tex.m_pixmap.p_SetBind();
	return t_tex;
}
c_OpenglES20.prototype.p_BindTextureStack=function(){
	c_TRender.prototype.p_BindTextureStack.call(this);
	var t_=c_FrameBufferGL.m_fboStack.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_fbo=t_.p_NextObject();
		c_FrameBufferGL.m_BindFBO(object_downcast((t_fbo),c_FrameBufferGL));
	}
	c_FrameBufferGL.m_fboStack.p_Clear();
	return 0;
}
c_OpenglES20.prototype.p_UpdateLight=function(t_cam,t_light){
	return 0;
}
c_OpenglES20.prototype.p_UpdateCamera=function(t_cam){
	if(((c_FrameBufferGL.m_framebuffer_active)!=null) && c_FrameBufferGL.m_framebuffer_active.m_texture.m_width>0){
		var t_fw=(c_FrameBufferGL.m_framebuffer_active.m_texture.m_width);
		var t_fh=(c_FrameBufferGL.m_framebuffer_active.m_texture.m_height);
		var t_scalew=1.0;
		var t_scaleh=1.0;
		if(t_cam.m_vwidth>t_cam.m_vheight){
			t_scaleh=c_FrameBufferGL.m_framebuffer_active.m_UVH;
		}else{
			t_scalew=c_FrameBufferGL.m_framebuffer_active.m_UVW;
		}
		if(t_fw<(t_cam.m_vwidth) || t_fh<(t_cam.m_vheight)){
			gl.viewport(t_cam.m_vx,t_cam.m_vy,((t_fw*t_scalew)|0),((t_fh*t_scaleh)|0));
			gl.scissor(t_cam.m_vx,t_cam.m_vy,((t_fw*t_scalew)|0),((t_fh*t_scaleh)|0));
		}else{
			gl.viewport(t_cam.m_vx,t_cam.m_vy,t_cam.m_vwidth,t_cam.m_vheight);
			gl.scissor(t_cam.m_vx,t_cam.m_vy,t_cam.m_vwidth,t_cam.m_vheight);
		}
	}else{
		if((t_cam.m_draw2D)!=0){
			gl.viewport(0,0,bb_app_DeviceWidth(),bb_app_DeviceHeight());
		}else{
			gl.viewport(t_cam.m_vx,t_cam.m_vy,t_cam.m_vwidth,t_cam.m_vheight);
		}
		gl.enable(3089);
		gl.scissor(t_cam.m_viewport[0],t_cam.m_viewport[1],t_cam.m_viewport[2],t_cam.m_viewport[3]);
	}
	gl.clearColor(t_cam.m_cls_r,t_cam.m_cls_g,t_cam.m_cls_b,1.0);
	if(t_cam.m_cls_color==true && t_cam.m_cls_zbuffer==true){
		gl.depthMask(true);
		gl.clear(16640);
	}else{
		if(t_cam.m_cls_color==true){
			gl.clear(16384);
		}else{
			if(t_cam.m_cls_zbuffer==true){
				gl.depthMask(true);
				gl.clear(256);
			}
		}
	}
	this.m_vmat_array=t_cam.m_mod_mat.p_ToArray();
	this.m_pvmat_array=t_cam.m_projview_mat.p_ToArray();
	if(false && ((c_OpenglES20.m_GetGLError())!=0)){
		print("*cam err");
	}
	return 0;
}
c_OpenglES20.prototype.p_SetShader2D=function(){
	c_TShader.m_SetShader(c_FullShader.m_fastbrightshader);
}
function c_BlankShader(){
	Object.call(this);
	this.implments={c_IShader2D:1};
}
c_BlankShader.m_new=function(){
	return this;
}
c_BlankShader.prototype.p_SetShader2D=function(){
}
function c_MojoEmulationDevice(){
	gxtkGraphics.call(this);
	this.m_mesh=null;
	this.m_layer=0;
	this.m_solid=new_object_array(512);
	this.m_lastBlend=-1;
	this.m_lastSurface=null;
	this.m_mat=c_Matrix.m_new.call(new c_Matrix);
	this.m_fontImage=null;
	this.m_fontFile="mojo_font.png";
	this.m_colora=1.0;
	this.m_colorr=0;
	this.m_colorg=0;
	this.m_colorb=0;
	this.m_zdepth=1.99999;
}
c_MojoEmulationDevice.prototype=extend_class(gxtkGraphics);
c_MojoEmulationDevice.m__device=null;
c_MojoEmulationDevice.m__olddevice=null;
c_MojoEmulationDevice.m_new=function(){
	return this;
}
c_MojoEmulationDevice.m__quadCache=null;
c_MojoEmulationDevice.prototype.p_NewLayer=function(){
	if(this.m_mesh==null){
		return;
	}
	this.m_layer+=1;
	if(this.m_layer>512){
		this.m_layer=0;
	}
	if(!((this.m_solid[this.m_layer])!=null)){
		this.m_solid[this.m_layer]=this.m_mesh.p_CreateSurface(null);
	}else{
		this.m_mesh.p_AddSurface(this.m_solid[this.m_layer]);
	}
	this.m_solid[this.m_layer].m_no_verts=0;
	this.m_solid[this.m_layer].m_no_tris=0;
	this.m_solid[this.m_layer].m_vbo_dyn=true;
	this.m_solid[this.m_layer].m_brush.m_fx=35;
	this.m_mesh.m_brush.m_blend=0;
}
c_MojoEmulationDevice.prototype.p_Reset=function(){
	if(!((this.m_mesh)!=null)){
		this.m_mesh=bb_functions_CreateMesh(null);
		this.m_mesh.m_entity_link.p_Remove();
		this.m_mesh.p_EntityFX(67);
		this.m_layer=-1;
		this.p_NewLayer();
	}
	this.m_mesh.m_no_surfs=1;
	this.m_mesh.m_surf_list.p_Clear();
	this.m_mesh.m_surf_list.p_AddLast2(this.m_solid[0]);
	this.m_solid[0].m_no_verts=0;
	this.m_solid[0].m_no_tris=0;
	this.m_layer=0;
	this.m_lastBlend=0;
	this.m_lastSurface=null;
	c_TRender.m_draw_list.p_AddLast3(this.m_mesh);
	this.m_mat.p_LoadIdentity();
	return 0;
}
c_MojoEmulationDevice.m_firstTimeRun=false;
c_MojoEmulationDevice.prototype.p_InitFont=function(){
	if(((this.m_fontImage)!=null) && this.m_fontImage.p_Width()>0){
		return;
	}
	this.m_fontImage=bb_graphics_LoadImage(this.m_fontFile,96,2);
	if(((this.m_fontImage)!=null) && this.m_fontImage.p_Width()>0){
		bb_graphics_SetFont(this.m_fontImage,32);
	}
}
c_MojoEmulationDevice.m_SetDevice=function(){
	if(!((c_MojoEmulationDevice.m__device)!=null)){
		c_MojoEmulationDevice.m__olddevice=bb_graphics_GetGraphicsDevice();
		c_MojoEmulationDevice.m__device=c_MojoEmulationDevice.m_new.call(new c_MojoEmulationDevice);
		c_MojoEmulationDevice.m__quadCache=c_QuadCache.m_new.call(new c_QuadCache);
	}
	c_MojoEmulationDevice.m__device.p_Reset();
	bb_graphics_SetGraphicsDevice(c_MojoEmulationDevice.m__device);
	bb_graphics_BeginRender();
	if(c_MojoEmulationDevice.m_firstTimeRun){
		c_MojoEmulationDevice.m__device.p_InitFont();
	}else{
		bb_functions_PreLoadPixmap2(c_MojoEmulationDevice.m__device.m_fontFile);
	}
	c_MojoEmulationDevice.m_firstTimeRun=true;
}
c_MojoEmulationDevice.prototype.Width=function(){
	return c_TRender.m_width;
}
c_MojoEmulationDevice.prototype.Height=function(){
	return c_TRender.m_height;
}
c_MojoEmulationDevice.prototype.LoadSurface=function(t_path){
	var t_msurf=c_MojoSurface.m_PreLoad(t_path,this.m_mesh,c_MojoEmulationDevice.m__device);
	return (t_msurf);
}
c_MojoEmulationDevice.prototype.CreateSurface=function(t_width,t_height){
	var t_msurf=c_MojoSurface.m_Create("");
	return (t_msurf);
}
c_MojoEmulationDevice.prototype.WritePixels2=function(t_surface,t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch){
	return 0;
}
c_MojoEmulationDevice.prototype.Cls=function(t_r,t_g,t_b){
	c_TRender.m_camera2D.p_CameraClsColor(t_r,t_g,t_b);
	c_TRender.m_camera2D.p_CameraClsMode(true,false);
	return 0;
}
c_MojoEmulationDevice.prototype.SetAlpha=function(t_alpha){
	this.m_colora=t_alpha;
	return 0;
}
c_MojoEmulationDevice.prototype.SetColor=function(t_r,t_g,t_b){
	this.m_colorr=((t_r)|0);
	this.m_colorg=((t_g)|0);
	this.m_colorb=((t_b)|0);
	return 0;
}
c_MojoEmulationDevice.prototype.SetMatrix=function(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	this.m_mat.m_grid[0][0]=t_ix;
	this.m_mat.m_grid[1][0]=t_iy;
	this.m_mat.m_grid[0][1]=t_jx;
	this.m_mat.m_grid[1][1]=t_jy;
	this.m_mat.m_grid[3][0]=t_tx;
	this.m_mat.m_grid[3][1]=-t_ty;
	return 0;
}
c_MojoEmulationDevice.prototype.SetScissor=function(t_x,t_y,t_width,t_height){
	c_TRender.m_camera2D.p_CameraScissor(t_x,t_y,t_width,t_height);
	return 0;
}
c_MojoEmulationDevice.prototype.SetBlend=function(t_blend){
	if(t_blend!=this.m_lastBlend){
		this.p_NewLayer();
	}
	if(t_blend==1){
		this.m_solid[this.m_layer].m_brush.m_blend=3;
	}else{
		if(t_blend==1){
			this.m_solid[this.m_layer].m_brush.m_blend=4;
		}else{
			this.m_solid[this.m_layer].m_brush.m_blend=1;
			this.m_solid[this.m_layer].m_brush.m_blend=0;
		}
	}
	this.m_lastBlend=t_blend;
	return 0;
}
c_MojoEmulationDevice.prototype.p_Check=function(t_s){
	if(t_s!=this.m_lastSurface){
		this.p_NewLayer();
		this.m_lastSurface=t_s;
	}
	return 0;
}
c_MojoEmulationDevice.prototype.p_AddQuad=function(t_s,t_x,t_y,t_w,t_h,t_u,t_v,t_uw,t_vh){
	var t_p0=[];
	var t_p1=[];
	var t_p2=[];
	var t_p3=[];
	var t_r=.0;
	var t_g=.0;
	var t_b=.0;
	t_p0=bb_mojographics_Transform2D(this.m_mat,t_x,-t_h-t_y,this.m_zdepth);
	t_p1=bb_mojographics_Transform2D(this.m_mat,t_x,-t_y,this.m_zdepth);
	t_p2=bb_mojographics_Transform2D(this.m_mat,t_x+t_w,-t_y,this.m_zdepth);
	t_p3=bb_mojographics_Transform2D(this.m_mat,t_x+t_w,-t_h-t_y,this.m_zdepth);
	t_r=(this.m_colorr)*0.0039215686274509803;
	t_g=(this.m_colorg)*0.0039215686274509803;
	t_b=(this.m_colorb)*0.0039215686274509803;
	c_MojoEmulationDevice.m__quadCache.p_AddCache(t_s,[t_p0[0],t_p0[1],-t_p0[2],0.0,1.0,1.0,1.0,0.0,t_r,t_g,t_b,this.m_colora,t_u,t_vh,t_u,t_vh,t_p1[0],t_p1[1],-t_p1[2],0.0,1.0,1.0,1.0,0.0,t_r,t_g,t_b,this.m_colora,t_u,t_v,t_u,t_v,t_p2[0],t_p2[1],-t_p2[2],0.0,1.0,1.0,1.0,0.0,t_r,t_g,t_b,this.m_colora,t_uw,t_v,t_uw,t_v,t_p3[0],t_p3[1],-t_p3[2],0.0,1.0,1.0,1.0,0.0,t_r,t_g,t_b,this.m_colora,t_uw,t_vh,t_uw,t_vh]);
	t_s.m_reset_vbo=-1;
}
c_MojoEmulationDevice.prototype.DrawPoint=function(t_x,t_y){
	this.p_Check(null);
	this.p_AddQuad(this.m_solid[this.m_layer],t_x,t_y,1.0,1.0,0.0,0.0,1.0,1.0);
	return 0;
}
c_MojoEmulationDevice.prototype.DrawRect=function(t_x,t_y,t_w,t_h){
	this.p_Check(null);
	this.p_AddQuad(this.m_solid[this.m_layer],t_x,t_y,t_w,t_h,0.0,0.0,1.0,1.0);
	return 0;
}
c_MojoEmulationDevice.prototype.DrawLine=function(t_x1,t_y1,t_x2,t_y2){
	this.p_Check(null);
	var t_p0=[];
	t_p0=bb_mojographics_Transform2D(this.m_mat,t_x1,-t_y1,this.m_zdepth);
	t_x1=t_p0[0];
	t_y1=t_p0[1];
	t_p0=bb_mojographics_Transform2D(this.m_mat,t_x2,-t_y2,this.m_zdepth);
	t_x2=t_p0[0];
	t_y2=t_p0[1];
	var t_px=t_y1-t_y2;
	var t_py=-(t_x1-t_x2);
	var t_d=1.0/Math.sqrt(t_px*t_px+t_py*t_py);
	t_px=t_px*t_d;
	t_py=t_py*t_d;
	var t_v0=this.m_solid[this.m_layer].p_AddVertex(t_x2,t_y2,this.m_zdepth,0.0,1.0,0.0);
	var t_v1=this.m_solid[this.m_layer].p_AddVertex(t_x1,t_y1,this.m_zdepth,0.0,0.0,0.0);
	var t_v2=this.m_solid[this.m_layer].p_AddVertex(t_x1+t_px,t_y1+t_py,this.m_zdepth,1.0,0.0,0.0);
	this.m_solid[this.m_layer].p_AddTriangle(t_v0,t_v1,t_v2);
	var t_v3=this.m_solid[this.m_layer].p_AddVertex(t_x2+t_px,t_y2+t_py,this.m_zdepth,1.0,0.0,0.0);
	this.m_solid[this.m_layer].p_AddTriangle(t_v0,t_v2,t_v3);
	this.m_solid[this.m_layer].p_VertexColor(t_v0,(this.m_colorr),(this.m_colorg),(this.m_colorb),this.m_colora);
	this.m_solid[this.m_layer].p_VertexColor(t_v1,(this.m_colorr),(this.m_colorg),(this.m_colorb),this.m_colora);
	this.m_solid[this.m_layer].p_VertexColor(t_v2,(this.m_colorr),(this.m_colorg),(this.m_colorb),this.m_colora);
	this.m_solid[this.m_layer].p_VertexColor(t_v3,(this.m_colorr),(this.m_colorg),(this.m_colorb),this.m_colora);
	this.m_solid[this.m_layer].m_reset_vbo=-1;
	return 0;
}
c_MojoEmulationDevice.prototype.DrawPoly=function(t_verts){
	this.p_Check(null);
	var t_p0=[];
	var t_p1=[];
	var t_p2=[];
	var t_p3=[];
	var t_r=.0;
	var t_g=.0;
	var t_b=.0;
	var t_tris=new_number_array((t_verts.length-7)*6*3);
	var t_t=0;
	var t_vt=this.m_solid[this.m_layer].m_no_verts;
	t_r=(this.m_colorr)*0.0039215686274509803;
	t_g=(this.m_colorg)*0.0039215686274509803;
	t_b=(this.m_colorb)*0.0039215686274509803;
	for(var t_i=0;t_i<=t_verts.length-7;t_i=t_i+6){
		t_p0=bb_mojographics_Transform2D(this.m_mat,t_verts[t_i+0],-t_verts[t_i+1],this.m_zdepth);
		t_p1=bb_mojographics_Transform2D(this.m_mat,t_verts[t_i+2],-t_verts[t_i+3],this.m_zdepth);
		t_p2=bb_mojographics_Transform2D(this.m_mat,t_verts[t_i+4],-t_verts[t_i+5],this.m_zdepth);
		t_vt=t_vt+3;
		this.m_solid[this.m_layer].p_AddVertex2([t_p0[0],t_p0[1],-t_p0[2],0.0,1.0,1.0,1.0,0.0,(this.m_colorr)*0.0039215686274509803,(this.m_colorg)*0.0039215686274509803,(this.m_colorb)*0.0039215686274509803,this.m_colora,0.0,0.0,0.0,0.0,t_p1[0],t_p1[1],-t_p1[2],0.0,1.0,1.0,1.0,0.0,(this.m_colorr)*0.0039215686274509803,(this.m_colorg)*0.0039215686274509803,(this.m_colorb)*0.0039215686274509803,this.m_colora,0.0,0.0,0.0,0.0,t_p2[0],t_p2[1],-t_p2[2],0.0,1.0,1.0,1.0,0.0,(this.m_colorr)*0.0039215686274509803,(this.m_colorg)*0.0039215686274509803,(this.m_colorb)*0.0039215686274509803,this.m_colora,0.0,0.0,0.0,0.0],-1);
		t_tris[t_t]=t_vt-3;
		t_tris[t_t+1]=t_vt-2;
		t_tris[t_t+2]=t_vt-1;
		t_t=t_t+3;
	}
	this.m_solid[this.m_layer].p_AddTriangle2(t_tris,-1);
	return 0;
}
c_MojoEmulationDevice.prototype.DrawOval=function(t_x,t_y,t_w,t_h){
	this.p_Check(null);
	if(t_w<0.0){
		t_w=-t_w;
	}
	if(t_h<0.0){
		t_h=-t_h;
	}
	var t_seg=(((t_w+t_h)*0.2)|0);
	if(t_seg<14){
		t_seg=14;
	}
	var t_deg=0.0;
	var t_deginc=360.0/(t_seg);
	var t_verts=new_number_array(t_seg*6+1);
	for(var t_i=0;t_i<=t_verts.length-7;t_i=t_i+6){
		t_verts[t_i+0]=t_x;
		t_verts[t_i+1]=t_y;
		t_verts[t_i+2]=t_x+t_w*Math.cos((t_deg)*D2R);
		t_verts[t_i+3]=t_y+t_h*Math.sin((t_deg)*D2R);
		t_verts[t_i+4]=t_x+t_w*Math.cos((t_deg+t_deginc)*D2R);
		t_verts[t_i+5]=t_y+t_h*Math.sin((t_deg+t_deginc)*D2R);
		t_deg+=t_deginc;
	}
	this.DrawPoly(t_verts);
	return 0;
}
c_MojoEmulationDevice.prototype.DrawSurface2=function(t_surface,t_x,t_y,t_srcx,t_srcy,t_srcw,t_srch){
	var t_s=object_downcast((t_surface),c_MojoSurface);
	if(!((t_s)!=null)){
		return 0;
	}
	this.p_Check(t_s);
	if((t_s.m_tex)!=null){
		this.m_solid[this.m_layer].p_PaintSurface2(t_s.m_tex,0);
	}
	var t_xstep=t_s.m_xstep;
	var t_ystep=t_s.m_ystep;
	var t_upos=(t_srcx)*t_xstep;
	var t_vpos=(t_srcy)*t_ystep;
	this.p_AddQuad(this.m_solid[this.m_layer],t_x,t_y,(t_srcw),(t_srch),t_upos,t_vpos,t_upos+t_xstep*(t_srcw),t_vpos+t_ystep*(t_srch));
	return 0;
}
c_MojoEmulationDevice.prototype.DrawSurface=function(t_surface,t_x,t_y){
	this.DrawSurface2(t_surface,t_x,t_y,0,0,t_surface.Width(),t_surface.Height());
	return 0;
}
c_MojoEmulationDevice.prototype.ReadPixels=function(t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch){
	return 0;
}
function bb_graphics_GetGraphicsDevice(){
	return bb_graphics_device;
}
function c_QuadCache(){
	Object.call(this);
	this.m_q_num=0;
	this.m_q_cache=new_number_array(1280);
	this.m_q_surf=null;
	this.m_q_tri=new_number_array(128);
}
c_QuadCache.m_new=function(){
	return this;
}
c_QuadCache.prototype.p_FlushCache=function(){
	if(this.m_q_num==0){
		return;
	}
	var t_n=this.m_q_num;
	var t_v4=this.m_q_surf.p_AddVertex2(this.m_q_cache,this.m_q_num*64);
	t_v4=t_v4+1-this.m_q_num*4;
	var t_k=0;
	for(var t_j=0;t_j<=t_n-1;t_j=t_j+1){
		this.m_q_tri[t_k+0]=t_v4;
		this.m_q_tri[t_k+1]=t_v4+1;
		this.m_q_tri[t_k+2]=t_v4+2;
		this.m_q_tri[t_k+3]=t_v4;
		this.m_q_tri[t_k+4]=t_v4+2;
		this.m_q_tri[t_k+5]=t_v4+3;
		t_k=t_k+6;
		t_v4=t_v4+4;
	}
	this.m_q_surf.p_AddTriangle2(this.m_q_tri,this.m_q_num*6);
	this.m_q_num=0;
	this.m_q_surf=null;
}
c_QuadCache.prototype.p_AddCache=function(t_s,t_v){
	if(t_s!=this.m_q_surf || this.m_q_num>19){
		this.p_FlushCache();
	}
	this.m_q_surf=t_s;
	var t_offset=this.m_q_num*64;
	for(var t_i=0;t_i<=63;t_i=t_i+1){
		this.m_q_cache[t_offset+t_i]=t_v[t_i];
	}
	this.m_q_num+=1;
}
function c_TEntity(){
	Object.call(this);
	this.m_mat=c_Matrix.m_new.call(new c_Matrix);
	this.m_loc_mat=c_Matrix.m_new.call(new c_Matrix);
	this.m_classname="";
	this.m_parent=null;
	this.m_px=.0;
	this.m_py=.0;
	this.m_pz=.0;
	this.m_rx=.0;
	this.m_ry=.0;
	this.m_rz=.0;
	this.m_sx=1.0;
	this.m_sy=1.0;
	this.m_sz=1.0;
	this.m_gsx=1.0;
	this.m_gsy=1.0;
	this.m_gsz=1.0;
	this.m_collision=c_TCollision.m_new.call(new c_TCollision);
	this.m_child_list=c_EntityList.m_new.call(new c_EntityList);
	this.m_parent_link=null;
	this.m_order=0;
	this.m_entity_link=null;
	this.m_brush=c_TBrush.m_new.call(new c_TBrush);
	this.m_hide=false;
	this.m_name="";
	this.m_use_cam_layer=false;
	this.m_cam_layer=null;
	this.m_cull_radius=.0;
	this.m_auto_fade=0;
	this.m_fade_near=.0;
	this.m_fade_far=.0;
	this.m_fade_alpha=.0;
	this.m_using_alpha=false;
	this.m_alpha_order=.0;
	this.m_shader_brush=null;
	this.m_anim=0;
	this.m_anim_render=0;
}
c_TEntity.m_new=function(){
	this.m_mat.p_LoadIdentity();
	this.m_loc_mat.p_LoadIdentity();
	return this;
}
c_TEntity.prototype.p_UpdateMat=function(t_load_identity){
	if(t_load_identity==true){
		this.m_mat.p_LoadIdentity();
	}
	if(t_load_identity==false && ((this.m_parent)!=null)){
		this.m_mat.p_Overwrite(this.m_parent.m_mat);
	}
	this.m_mat.p_Translate(this.m_px,this.m_py,this.m_pz);
	this.m_mat.p_Rotate(this.m_rx,this.m_ry,this.m_rz);
	this.m_mat.p_Scale(this.m_sx,this.m_sy,this.m_sz);
	if(t_load_identity){
		this.m_loc_mat.p_Overwrite(this.m_mat);
	}
	if((this.m_parent)!=null){
		this.m_gsx=this.m_parent.m_gsx*this.m_sx;
		this.m_gsy=this.m_parent.m_gsy*this.m_sy;
		this.m_gsz=this.m_parent.m_gsz*this.m_sz;
	}else{
		this.m_gsx=this.m_sx;
		this.m_gsy=this.m_sy;
		this.m_gsz=this.m_sz;
	}
	this.m_collision.m_updated_shape=false;
}
c_TEntity.prototype.p_AddParent=function(t_parent_ent){
	this.m_parent=t_parent_ent;
	if(this.m_parent!=null){
		this.m_mat.p_Overwrite(this.m_parent.m_mat);
		this.p_UpdateMat(false);
		this.m_parent_link=this.m_parent.m_child_list.p_AddLast(this);
	}
	return 0;
}
c_TEntity.m_entity_list=null;
c_TEntity.prototype.p_EntityFX=function(t_fx_no){
	this.m_brush.m_fx=t_fx_no;
	return this;
}
c_TEntity.prototype.p_EntityFX2=function(){
	return this.m_brush.m_fx;
}
c_TEntity.prototype.p_Hidden=function(){
	return this.m_hide;
}
c_TEntity.prototype.p_EntityX=function(t_glob){
	if(t_glob==0){
		return this.m_px;
	}else{
		return this.m_mat.m_grid[3][0];
	}
}
c_TEntity.prototype.p_EntityY=function(t_glob){
	if(t_glob==0){
		return this.m_py;
	}else{
		return this.m_mat.m_grid[3][1];
	}
}
c_TEntity.prototype.p_EntityZ=function(t_glob){
	if(t_glob==0){
		return -this.m_pz;
	}else{
		return -this.m_mat.m_grid[3][2];
	}
}
c_TEntity.prototype.p_EntityDistanceSquared=function(t_ent2){
	var t_xd=t_ent2.m_mat.m_grid[3][0]-this.m_mat.m_grid[3][0];
	var t_yd=t_ent2.m_mat.m_grid[3][1]-this.m_mat.m_grid[3][1];
	var t_zd=-t_ent2.m_mat.m_grid[3][2]+this.m_mat.m_grid[3][2];
	return t_xd*t_xd+t_yd*t_yd+t_zd*t_zd;
}
c_TEntity.prototype.p_EntityDistance=function(t_ent2){
	return Math.sqrt(this.p_EntityDistanceSquared(t_ent2));
}
c_TEntity.prototype.p_EntityColor=function(t_r,t_g,t_b,t_a){
	this.m_brush.m_red=t_r*0.0039215686274509803;
	this.m_brush.m_green=t_g*0.0039215686274509803;
	this.m_brush.m_blue=t_b*0.0039215686274509803;
	if(t_a>=0.0){
		this.m_brush.m_alpha=t_a;
	}
	return this;
}
c_TEntity.prototype.p_EntityColor2=function(t_color){
	this.p_EntityColor(((t_color&16711680)>>16),((t_color&65280)>>8),(t_color&255),-1.0);
	return this;
}
c_TEntity.prototype.p_EntityScaleX=function(t_glob){
	if(t_glob==1){
		if(this.m_parent!=null){
			var t_ent=this;
			var t_x=this.m_sx;
			do{
				t_x=t_x*t_ent.m_parent.m_sx;
				t_ent=t_ent.m_parent;
			}while(!(t_ent.m_parent==null));
			return t_x;
		}
	}
	return this.m_sx;
}
c_TEntity.prototype.p_EntityScaleY=function(t_glob){
	if(t_glob==1){
		if(this.m_parent!=null){
			var t_ent=this;
			var t_y=this.m_sy;
			do{
				t_y=t_y*t_ent.m_parent.m_sy;
				t_ent=t_ent.m_parent;
			}while(!(t_ent.m_parent==null));
			return t_y;
		}
	}
	return this.m_sy;
}
c_TEntity.prototype.p_EntityScaleZ=function(t_glob){
	if(t_glob==1){
		if(this.m_parent!=null){
			var t_ent=this;
			var t_z=this.m_sz;
			do{
				t_z=t_z*t_ent.m_parent.m_sz;
				t_ent=t_ent.m_parent;
			}while(!(t_ent.m_parent==null));
			return t_z;
		}
	}
	return this.m_sz;
}
c_TEntity.prototype.p_UpdateMatRot=function(t_load_identity){
	if(t_load_identity==false && ((this.m_parent)!=null)){
		this.m_mat.m_grid[0][0]=this.m_parent.m_mat.m_grid[0][0];
		this.m_mat.m_grid[0][1]=this.m_parent.m_mat.m_grid[0][1];
		this.m_mat.m_grid[0][2]=this.m_parent.m_mat.m_grid[0][2];
		this.m_mat.m_grid[1][0]=this.m_parent.m_mat.m_grid[1][0];
		this.m_mat.m_grid[1][1]=this.m_parent.m_mat.m_grid[1][1];
		this.m_mat.m_grid[1][2]=this.m_parent.m_mat.m_grid[1][2];
		this.m_mat.m_grid[2][0]=this.m_parent.m_mat.m_grid[2][0];
		this.m_mat.m_grid[2][1]=this.m_parent.m_mat.m_grid[2][1];
		this.m_mat.m_grid[2][2]=this.m_parent.m_mat.m_grid[2][2];
		this.m_mat.p_Rotate(this.m_rx,this.m_ry,this.m_rz);
		this.m_mat.p_Scale(this.m_sx,this.m_sy,this.m_sz);
	}else{
		this.m_mat.p_FastRotateScale(this.m_rx,this.m_ry,this.m_rz,this.m_sx,this.m_sy,this.m_sz);
	}
	if((this.m_parent)!=null){
		this.m_gsx=this.m_parent.m_gsx*this.m_sx;
		this.m_gsy=this.m_parent.m_gsy*this.m_sy;
		this.m_gsz=this.m_parent.m_gsz*this.m_sz;
	}else{
		this.m_gsx=this.m_sx;
		this.m_gsy=this.m_sy;
		this.m_gsz=this.m_sz;
	}
	if(t_load_identity){
		this.m_loc_mat.p_Overwrite(this.m_mat);
	}
	return 0;
}
c_TEntity.prototype.p_UpdateMatTrans=function(t_load_identity){
	if(t_load_identity==false && ((this.m_parent)!=null)){
		this.m_mat.m_grid[3][0]=this.m_parent.m_mat.m_grid[0][0]*this.m_px+this.m_parent.m_mat.m_grid[1][0]*this.m_py+this.m_parent.m_mat.m_grid[2][0]*this.m_pz+this.m_parent.m_mat.m_grid[3][0];
		this.m_mat.m_grid[3][1]=this.m_parent.m_mat.m_grid[0][1]*this.m_px+this.m_parent.m_mat.m_grid[1][1]*this.m_py+this.m_parent.m_mat.m_grid[2][1]*this.m_pz+this.m_parent.m_mat.m_grid[3][1];
		this.m_mat.m_grid[3][2]=this.m_parent.m_mat.m_grid[0][2]*this.m_px+this.m_parent.m_mat.m_grid[1][2]*this.m_py+this.m_parent.m_mat.m_grid[2][2]*this.m_pz+this.m_parent.m_mat.m_grid[3][2];
	}else{
		this.m_mat.m_grid[3][0]=this.m_px;
		this.m_mat.m_grid[3][1]=this.m_py;
		this.m_mat.m_grid[3][2]=this.m_pz;
	}
	if(t_load_identity){
		this.m_loc_mat.p_Overwrite(this.m_mat);
	}
	return 0;
}
c_TEntity.m_UpdateChildren=function(t_ent_p,t_type){
	var t_=t_ent_p.m_child_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ent_c=t_.p_NextObject();
		if(object_downcast((t_ent_c),c_TBone)==null){
			if(t_type==0){
				t_ent_c.m_mat.p_Overwrite(t_ent_p.m_mat);
				t_ent_c.p_UpdateMat(false);
			}else{
				if(t_type==1){
					t_ent_c.p_UpdateMatTrans(false);
				}else{
					t_ent_c.m_mat.p_Overwrite(t_ent_p.m_mat);
					t_ent_c.p_UpdateMat(false);
				}
			}
			c_TEntity.m_UpdateChildren(t_ent_c,t_type);
		}else{
			object_downcast((t_ent_c),c_TBone).p_UpdateMatrix(t_ent_c.m_loc_mat);
		}
	}
	return 0;
}
c_TEntity.prototype.p_ScaleEntity=function(t_x,t_y,t_z,t_glob){
	this.m_sx=t_x;
	this.m_sy=t_y;
	this.m_sz=t_z;
	if(t_glob==1 && this.m_parent!=null){
		this.m_sx=this.m_sx/this.m_parent.m_gsx;
		this.m_sy=this.m_sy/this.m_parent.m_gsy;
		this.m_sz=this.m_sz/this.m_parent.m_gsz;
	}
	if(object_downcast((this),c_TBone)!=null){
		object_downcast((this),c_TBone).p_ScaleBone(this.m_sx,this.m_sy,this.m_sz,t_glob);
		return null;
	}
	if(this.m_parent!=null){
		this.p_UpdateMatRot(false);
	}else{
		this.p_UpdateMatRot(true);
	}
	if(this.m_child_list.p_IsEmpty()!=true){
		c_TEntity.m_UpdateChildren(this,0);
	}
	return this;
}
c_TEntity.prototype.p_ScaleEntity2=function(t_e){
	this.p_ScaleEntity(t_e.p_EntityScaleX(0),t_e.p_EntityScaleY(0),t_e.p_EntityScaleZ(0),1);
	return this;
}
c_TEntity.prototype.p_X=function(){
	return this.m_mat.m_grid[3][0];
}
c_TEntity.prototype.p_X2=function(t_xx){
	this.m_mat.m_grid[3][0]=t_xx;
}
c_TEntity.prototype.p_Y=function(){
	return this.m_mat.m_grid[3][1];
}
c_TEntity.prototype.p_Y2=function(t_yy){
	this.m_mat.m_grid[3][1]=t_yy;
}
c_TEntity.prototype.p_Z=function(){
	return -this.m_mat.m_grid[3][2];
}
c_TEntity.prototype.p_Z2=function(t_zz){
	this.m_mat.m_grid[3][2]=-t_zz;
}
c_TEntity.m_temp_mat=null;
c_TEntity.prototype.p_PositionEntity=function(t_x,t_y,t_z,t_glob){
	t_z=-t_z;
	if(t_glob==1 && this.m_parent!=null){
		c_TEntity.m_temp_mat=this.m_parent.m_mat.p_Copy().p_Inverse();
		var t_psx=this.m_parent.m_gsx;
		var t_psy=this.m_parent.m_gsy;
		var t_psz=this.m_parent.m_gsz;
		var t_pos=c_TEntity.m_temp_mat.p_TransformPoint(t_x,t_y,t_z,1.0);
		t_x=t_pos[0]/(t_psx*t_psx);
		t_y=t_pos[1]/(t_psy*t_psy);
		t_z=t_pos[2]/(t_psz*t_psz);
	}
	if(object_downcast((this),c_TBone)!=null){
		object_downcast((this),c_TBone).p_PositionBone(t_x,t_y,t_z,t_glob);
		return this;
	}
	this.m_px=t_x;
	this.m_py=t_y;
	this.m_pz=t_z;
	if(this.m_parent!=null){
		this.p_UpdateMatTrans(false);
	}else{
		this.p_UpdateMatTrans(true);
	}
	if(this.m_child_list.p_IsEmpty()!=true){
		c_TEntity.m_UpdateChildren(this,1);
	}
	return this;
}
c_TEntity.prototype.p_PositionEntity2=function(t_e){
	this.p_PositionEntity(t_e.p_X(),t_e.p_Y(),t_e.p_Z(),1);
	return this;
}
c_TEntity.prototype.p_TurnEntity=function(t_x,t_y,t_z,t_glob){
	if(t_glob==1 && this.m_parent!=null){
	}
	this.m_rx=this.m_rx+-t_x;
	this.m_ry=this.m_ry+t_y;
	this.m_rz=this.m_rz+t_z;
	if(object_downcast((this),c_TBone)!=null){
		object_downcast((this),c_TBone).p_RotateBone(this.m_rx,this.m_ry,this.m_rz,t_glob);
		return this;
	}
	if(this.m_parent!=null){
		this.p_UpdateMatRot(false);
	}else{
		this.p_UpdateMatRot(true);
	}
	if(this.m_child_list.p_IsEmpty()!=true){
		c_TEntity.m_UpdateChildren(this,0);
	}
	return this;
}
c_TEntity.prototype.p_EntityName=function(){
	return this.m_name;
}
c_TEntity.m_global_mat=null;
function c_TMesh(){
	c_TEntity.call(this);
	this.m_surf_list=c_List2.m_new.call(new c_List2);
	this.m_no_surfs=0;
	this.m_anim_surf=[];
	this.m_anim_surf_frame=[];
	this.m_reset_bounds=1;
	this.m_col_tree=c_TColTree.m_new.call(new c_TColTree);
	this.m_total_tris=0;
	this.m_min_x=.0;
	this.m_max_x=.0;
	this.m_min_y=.0;
	this.m_max_y=.0;
	this.m_min_z=.0;
	this.m_max_z=.0;
	this.m_vec_temp=c_Vector.m_new.call(new c_Vector,0.0,0.0,0.0);
	this.m_vecbounds=new_object_array(6);
	this.m_center_x=.0;
	this.m_center_y=.0;
	this.m_center_z=.0;
	this.m_distance_nearplane=.0;
	this.m_culled=false;
	this.m_wireframe=false;
	this.m_is_sprite=false;
}
c_TMesh.prototype=extend_class(c_TEntity);
c_TMesh.m_new=function(){
	c_TEntity.m_new.call(this);
	return this;
}
c_TMesh.m_CreateMesh=function(t_parent_ent){
	var t_mesh=c_TMesh.m_new.call(new c_TMesh);
	t_mesh.m_classname="Mesh";
	if((t_parent_ent)!=null){
		t_mesh.p_AddParent(t_parent_ent);
	}
	t_mesh.m_entity_link=c_TEntity.m_entity_list.p_EntityListAdd(t_mesh);
	if(t_mesh.m_parent!=null){
		t_mesh.m_mat.p_Overwrite(t_mesh.m_parent.m_mat);
		t_mesh.p_UpdateMat(false);
	}else{
		t_mesh.p_UpdateMat(true);
	}
	return t_mesh;
}
c_TMesh.prototype.p_CreateSurfaceID=function(){
	this.m_no_surfs=this.m_no_surfs+1;
	return this.m_no_surfs-1;
}
c_TMesh.prototype.p_CreateSurface=function(t_bru){
	var t_surf=c_TSurface.m_new.call(new c_TSurface);
	this.m_surf_list.p_AddLast2(t_surf);
	if(t_bru!=null){
		t_surf.m_brush=t_bru.p_Copy();
	}
	t_surf.m_surf_id=this.p_CreateSurfaceID();
	this.m_anim_surf=resize_object_array(this.m_anim_surf,this.m_no_surfs);
	this.m_anim_surf_frame=resize_number_array(this.m_anim_surf_frame,this.m_no_surfs);
	this.m_reset_bounds=1;
	this.m_col_tree.m_reset_col_tree=1;
	return t_surf;
}
c_TMesh.prototype.p_AddSurface=function(t_surf){
	this.m_surf_list.p_AddLast2(t_surf);
	t_surf.m_surf_id=this.p_CreateSurfaceID();
	this.m_anim_surf=resize_object_array(this.m_anim_surf,this.m_no_surfs);
	this.m_anim_surf_frame=resize_number_array(this.m_anim_surf_frame,this.m_no_surfs);
	this.m_reset_bounds=1;
	this.m_col_tree.m_reset_col_tree=1;
	return t_surf;
}
c_TMesh.prototype.p_GetTotalTris=function(){
	var t_t=0;
	var t_=this.m_surf_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_s=t_.p_NextObject();
		t_t=t_t+t_s.m_no_tris;
	}
	return t_t;
}
c_TMesh.prototype.p_GetBounds=function(t_reset){
	if(this.m_reset_bounds==1 || t_reset==true){
		this.m_total_tris=this.p_GetTotalTris();
		this.m_reset_bounds=0;
		this.m_min_x=999999999.0;
		this.m_max_x=-999999999.0;
		this.m_min_y=999999999.0;
		this.m_max_y=-999999999.0;
		this.m_min_z=999999999.0;
		this.m_max_z=-999999999.0;
		var t_cc=0;
		var t_=this.m_surf_list.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_surf=t_.p_NextObject();
			t_cc+=1;
			for(var t_v=0;t_v<t_surf.m_no_verts;t_v=t_v+1){
				t_surf.m_vert_data.p_GetVertCoords(this.m_vec_temp,t_v);
				if(this.m_vec_temp.m_x<this.m_min_x){
					this.m_min_x=this.m_vec_temp.m_x;
					this.m_vecbounds[0]=this.m_vec_temp.p_Copy();
				}
				if(this.m_vec_temp.m_x>this.m_max_x){
					this.m_max_x=this.m_vec_temp.m_x;
					this.m_vecbounds[1]=this.m_vec_temp.p_Copy();
				}
				if(this.m_vec_temp.m_y<this.m_min_y){
					this.m_min_y=this.m_vec_temp.m_y;
					this.m_vecbounds[2]=this.m_vec_temp.p_Copy();
				}
				if(this.m_vec_temp.m_y>this.m_max_y){
					this.m_max_y=this.m_vec_temp.m_y;
					this.m_vecbounds[3]=this.m_vec_temp.p_Copy();
				}
				if(this.m_vec_temp.m_z<this.m_min_z){
					this.m_min_z=this.m_vec_temp.m_z;
					this.m_vecbounds[4]=this.m_vec_temp.p_Copy();
				}
				if(this.m_vec_temp.m_z>this.m_max_z){
					this.m_max_z=this.m_vec_temp.m_z;
					this.m_vecbounds[5]=this.m_vec_temp.p_Copy();
				}
			}
		}
		var t_width=this.m_max_x-this.m_min_x;
		var t_height=this.m_max_y-this.m_min_y;
		var t_depth=this.m_max_z-this.m_min_z;
		if(t_cc==0){
			t_width=0.0;
			t_height=0.0;
			t_depth=0.0;
		}
		if(this.m_cull_radius>=0.0){
			if(t_width>=t_height && t_width>=t_depth){
				this.m_cull_radius=t_width;
			}else{
				if(t_height>=t_width && t_height>=t_depth){
					this.m_cull_radius=t_height;
				}else{
					this.m_cull_radius=t_depth;
				}
			}
			this.m_cull_radius=this.m_cull_radius*0.5;
			var t_crs=this.m_cull_radius*this.m_cull_radius;
			this.m_cull_radius=Math.sqrt(t_crs+t_crs+t_crs);
		}
		this.m_center_x=this.m_min_x+t_width*0.5;
		this.m_center_y=this.m_min_y+t_height*0.5;
		this.m_center_z=this.m_min_z+t_depth*0.5;
	}
	return 0;
}
c_TMesh.prototype.p_AutoFade=function(t_cam){
	var t_dist=t_cam.p_EntityDistance(this);
	if(t_dist>this.m_fade_near && t_dist<this.m_fade_far){
		this.m_fade_alpha=(t_dist-this.m_fade_near)/(this.m_fade_far-this.m_fade_near);
	}else{
		if(t_dist<this.m_fade_near){
			this.m_fade_alpha=0.0;
		}else{
			this.m_fade_alpha=1.0;
		}
	}
	return 0;
}
c_TMesh.prototype.p_Alpha=function(){
	var t_alpha=false;
	if(this.m_brush.m_alpha<1.0 || this.m_brush.m_blend==2 || this.m_brush.m_blend==3 || ((this.m_brush.m_fx&32)!=0)){
		t_alpha=true;
	}else{
		if(this.m_brush.m_tex[0]!=null){
			if((this.m_brush.m_tex[0].m_flags&2)!=0){
				t_alpha=true;
			}
		}
	}
	var t_=this.m_surf_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_surf=t_.p_NextObject();
		t_surf.m_alpha_enable=false;
		if(t_surf.m_brush!=null){
			if(t_surf.m_brush.m_alpha<1.0 || t_surf.m_brush.m_blend==2 || t_surf.m_brush.m_blend==3 || ((t_surf.m_brush.m_fx&32)!=0)){
				t_alpha=true;
			}else{
				if(t_surf.m_brush.m_tex[0]!=null){
					if((t_surf.m_brush.m_tex[0].m_flags&2)!=0){
						t_alpha=true;
					}
				}
			}
		}
		if(this.m_fade_alpha!=0.0){
			t_alpha=true;
		}
		if(t_alpha==true){
			t_surf.m_alpha_enable=true;
		}
	}
	this.m_using_alpha=t_alpha;
	return t_alpha;
}
c_TMesh.prototype.p_CountSurfaces=function(){
	return this.m_no_surfs;
}
c_TMesh.prototype.p_GetSurface=function(t_surf_no_get){
	var t_surf_no=0;
	var t_=this.m_surf_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_surf=t_.p_NextObject();
		t_surf_no=t_surf_no+1;
		if(t_surf_no_get==t_surf_no){
			return t_surf;
		}
	}
	return null;
}
c_TMesh.prototype.p_UpdateNormals=function(t_create_only){
	for(var t_s=1;t_s<=this.p_CountSurfaces();t_s=t_s+1){
		var t_surf=this.p_GetSurface(t_s);
		t_surf.p_UpdateNormals(t_create_only);
		t_surf.m_reset_vbo=t_surf.m_reset_vbo|4;
	}
	return 0;
}
c_TMesh.prototype.p_UpdateVertexAnimFrame=function(t_surf,t_orig_surf){
	if(!((t_surf)!=null)){
		return;
	}
	t_surf.m_anim_frame=this.m_anim_surf_frame[t_orig_surf.m_surf_id];
	t_surf.m_reset_vbo=t_surf.m_reset_vbo|1;
}
function c_Matrix(){
	Object.call(this);
	this.m_grid=new_array_array(4);
}
c_Matrix.m_new=function(){
	this.m_grid=[[0.0,0.0,0.0,0.0],[0.0,0.0,0.0,0.0],[0.0,0.0,0.0,0.0],[0.0,0.0,0.0,0.0]];
	return this;
}
c_Matrix.m_new2=function(t_a,t_b,t_c){
	this.m_grid[0]=[t_a.m_x,t_a.m_y,t_a.m_z,0.0];
	this.m_grid[1]=[t_b.m_x,t_b.m_y,t_b.m_z,0.0];
	this.m_grid[2]=[t_c.m_x,t_c.m_y,t_c.m_z,0.0];
	this.m_grid[3]=[0.0,0.0,0.0,1.0];
	return this;
}
c_Matrix.prototype.p_LoadIdentity=function(){
	this.m_grid[0][0]=1.0;
	this.m_grid[0][1]=0.0;
	this.m_grid[0][2]=0.0;
	this.m_grid[0][3]=0.0;
	this.m_grid[1][0]=0.0;
	this.m_grid[1][1]=1.0;
	this.m_grid[1][2]=0.0;
	this.m_grid[1][3]=0.0;
	this.m_grid[2][0]=0.0;
	this.m_grid[2][1]=0.0;
	this.m_grid[2][2]=1.0;
	this.m_grid[2][3]=0.0;
	this.m_grid[3][0]=0.0;
	this.m_grid[3][1]=0.0;
	this.m_grid[3][2]=0.0;
	this.m_grid[3][3]=1.0;
}
c_Matrix.prototype.p_Overwrite=function(t_mat){
	this.m_grid[0][0]=t_mat.m_grid[0][0];
	this.m_grid[1][0]=t_mat.m_grid[1][0];
	this.m_grid[2][0]=t_mat.m_grid[2][0];
	this.m_grid[3][0]=t_mat.m_grid[3][0];
	this.m_grid[0][1]=t_mat.m_grid[0][1];
	this.m_grid[1][1]=t_mat.m_grid[1][1];
	this.m_grid[2][1]=t_mat.m_grid[2][1];
	this.m_grid[3][1]=t_mat.m_grid[3][1];
	this.m_grid[0][2]=t_mat.m_grid[0][2];
	this.m_grid[1][2]=t_mat.m_grid[1][2];
	this.m_grid[2][2]=t_mat.m_grid[2][2];
	this.m_grid[3][2]=t_mat.m_grid[3][2];
	this.m_grid[0][3]=t_mat.m_grid[0][3];
	this.m_grid[1][3]=t_mat.m_grid[1][3];
	this.m_grid[2][3]=t_mat.m_grid[2][3];
	this.m_grid[3][3]=t_mat.m_grid[3][3];
}
c_Matrix.prototype.p_Translate=function(t_x,t_y,t_z){
	this.m_grid[3][0]=this.m_grid[0][0]*t_x+this.m_grid[1][0]*t_y+this.m_grid[2][0]*t_z+this.m_grid[3][0];
	this.m_grid[3][1]=this.m_grid[0][1]*t_x+this.m_grid[1][1]*t_y+this.m_grid[2][1]*t_z+this.m_grid[3][1];
	this.m_grid[3][2]=this.m_grid[0][2]*t_x+this.m_grid[1][2]*t_y+this.m_grid[2][2]*t_z+this.m_grid[3][2];
}
c_Matrix.prototype.p_Rotate=function(t_rx,t_ry,t_rz){
	var t_cos_ang=.0;
	var t_sin_ang=.0;
	var t_m20=.0;
	var t_m21=.0;
	var t_m22=.0;
	var t_m00=.0;
	var t_m01=.0;
	var t_m02=.0;
	var t_r1=.0;
	var t_r2=.0;
	var t_r3=.0;
	t_cos_ang=Math.cos((t_ry)*D2R);
	t_sin_ang=Math.sin((t_ry)*D2R);
	t_m00=this.m_grid[0][0]*t_cos_ang+this.m_grid[2][0]*-t_sin_ang;
	t_m01=this.m_grid[0][1]*t_cos_ang+this.m_grid[2][1]*-t_sin_ang;
	t_m02=this.m_grid[0][2]*t_cos_ang+this.m_grid[2][2]*-t_sin_ang;
	t_m20=this.m_grid[0][0]*t_sin_ang+this.m_grid[2][0]*t_cos_ang;
	t_m21=this.m_grid[0][1]*t_sin_ang+this.m_grid[2][1]*t_cos_ang;
	t_m22=this.m_grid[0][2]*t_sin_ang+this.m_grid[2][2]*t_cos_ang;
	t_cos_ang=Math.cos((t_rx)*D2R);
	t_sin_ang=Math.sin((t_rx)*D2R);
	var t_m10=this.m_grid[1][0]*t_cos_ang+t_m20*t_sin_ang;
	var t_m11=this.m_grid[1][1]*t_cos_ang+t_m21*t_sin_ang;
	var t_m12=this.m_grid[1][2]*t_cos_ang+t_m22*t_sin_ang;
	this.m_grid[2][0]=this.m_grid[1][0]*-t_sin_ang+t_m20*t_cos_ang;
	this.m_grid[2][1]=this.m_grid[1][1]*-t_sin_ang+t_m21*t_cos_ang;
	this.m_grid[2][2]=this.m_grid[1][2]*-t_sin_ang+t_m22*t_cos_ang;
	t_cos_ang=Math.cos((t_rz)*D2R);
	t_sin_ang=Math.sin((t_rz)*D2R);
	this.m_grid[0][0]=t_m00*t_cos_ang+t_m10*t_sin_ang;
	this.m_grid[0][1]=t_m01*t_cos_ang+t_m11*t_sin_ang;
	this.m_grid[0][2]=t_m02*t_cos_ang+t_m12*t_sin_ang;
	this.m_grid[1][0]=t_m00*-t_sin_ang+t_m10*t_cos_ang;
	this.m_grid[1][1]=t_m01*-t_sin_ang+t_m11*t_cos_ang;
	this.m_grid[1][2]=t_m02*-t_sin_ang+t_m12*t_cos_ang;
}
c_Matrix.prototype.p_Scale=function(t_sx,t_sy,t_sz){
	if(t_sx==1.0 && t_sy==1.0 && t_sz==1.0){
		return;
	}
	this.m_grid[0][0]=this.m_grid[0][0]*t_sx;
	this.m_grid[0][1]=this.m_grid[0][1]*t_sx;
	this.m_grid[0][2]=this.m_grid[0][2]*t_sx;
	this.m_grid[1][0]=this.m_grid[1][0]*t_sy;
	this.m_grid[1][1]=this.m_grid[1][1]*t_sy;
	this.m_grid[1][2]=this.m_grid[1][2]*t_sy;
	this.m_grid[2][0]=this.m_grid[2][0]*t_sz;
	this.m_grid[2][1]=this.m_grid[2][1]*t_sz;
	this.m_grid[2][2]=this.m_grid[2][2]*t_sz;
}
c_Matrix.prototype.p_Inverse=function(){
	var t_mat=c_Matrix.m_new.call(new c_Matrix);
	var t_tx=0.0;
	var t_ty=0.0;
	var t_tz=0.0;
	t_mat.m_grid[0][0]=this.m_grid[0][0];
	t_mat.m_grid[1][0]=this.m_grid[0][1];
	t_mat.m_grid[2][0]=this.m_grid[0][2];
	t_mat.m_grid[0][1]=this.m_grid[1][0];
	t_mat.m_grid[1][1]=this.m_grid[1][1];
	t_mat.m_grid[2][1]=this.m_grid[1][2];
	t_mat.m_grid[0][2]=this.m_grid[2][0];
	t_mat.m_grid[1][2]=this.m_grid[2][1];
	t_mat.m_grid[2][2]=this.m_grid[2][2];
	t_mat.m_grid[0][3]=0.0;
	t_mat.m_grid[1][3]=0.0;
	t_mat.m_grid[2][3]=0.0;
	t_mat.m_grid[3][3]=1.0;
	t_tx=this.m_grid[3][0];
	t_ty=this.m_grid[3][1];
	t_tz=this.m_grid[3][2];
	t_mat.m_grid[3][0]=-(this.m_grid[0][0]*t_tx+this.m_grid[0][1]*t_ty+this.m_grid[0][2]*t_tz);
	t_mat.m_grid[3][1]=-(this.m_grid[1][0]*t_tx+this.m_grid[1][1]*t_ty+this.m_grid[1][2]*t_tz);
	t_mat.m_grid[3][2]=-(this.m_grid[2][0]*t_tx+this.m_grid[2][1]*t_ty+this.m_grid[2][2]*t_tz);
	return t_mat;
}
c_Matrix.prototype.p_Multiply4=function(t_mat){
	var t_m00=this.m_grid[0][0]*t_mat.m_grid[0][0]+this.m_grid[1][0]*t_mat.m_grid[0][1]+this.m_grid[2][0]*t_mat.m_grid[0][2]+this.m_grid[3][0]*t_mat.m_grid[0][3];
	var t_m01=this.m_grid[0][1]*t_mat.m_grid[0][0]+this.m_grid[1][1]*t_mat.m_grid[0][1]+this.m_grid[2][1]*t_mat.m_grid[0][2]+this.m_grid[3][1]*t_mat.m_grid[0][3];
	var t_m02=this.m_grid[0][2]*t_mat.m_grid[0][0]+this.m_grid[1][2]*t_mat.m_grid[0][1]+this.m_grid[2][2]*t_mat.m_grid[0][2]+this.m_grid[3][2]*t_mat.m_grid[0][3];
	var t_m03=this.m_grid[0][3]*t_mat.m_grid[0][0]+this.m_grid[1][3]*t_mat.m_grid[0][1]+this.m_grid[2][3]*t_mat.m_grid[0][2]+this.m_grid[3][3]*t_mat.m_grid[0][3];
	var t_m10=this.m_grid[0][0]*t_mat.m_grid[1][0]+this.m_grid[1][0]*t_mat.m_grid[1][1]+this.m_grid[2][0]*t_mat.m_grid[1][2]+this.m_grid[3][0]*t_mat.m_grid[1][3];
	var t_m11=this.m_grid[0][1]*t_mat.m_grid[1][0]+this.m_grid[1][1]*t_mat.m_grid[1][1]+this.m_grid[2][1]*t_mat.m_grid[1][2]+this.m_grid[3][1]*t_mat.m_grid[1][3];
	var t_m12=this.m_grid[0][2]*t_mat.m_grid[1][0]+this.m_grid[1][2]*t_mat.m_grid[1][1]+this.m_grid[2][2]*t_mat.m_grid[1][2]+this.m_grid[3][2]*t_mat.m_grid[1][3];
	var t_m13=this.m_grid[0][3]*t_mat.m_grid[1][0]+this.m_grid[1][3]*t_mat.m_grid[1][1]+this.m_grid[2][3]*t_mat.m_grid[1][2]+this.m_grid[3][3]*t_mat.m_grid[1][3];
	var t_m20=this.m_grid[0][0]*t_mat.m_grid[2][0]+this.m_grid[1][0]*t_mat.m_grid[2][1]+this.m_grid[2][0]*t_mat.m_grid[2][2]+this.m_grid[3][0]*t_mat.m_grid[2][3];
	var t_m21=this.m_grid[0][1]*t_mat.m_grid[2][0]+this.m_grid[1][1]*t_mat.m_grid[2][1]+this.m_grid[2][1]*t_mat.m_grid[2][2]+this.m_grid[3][1]*t_mat.m_grid[2][3];
	var t_m22=this.m_grid[0][2]*t_mat.m_grid[2][0]+this.m_grid[1][2]*t_mat.m_grid[2][1]+this.m_grid[2][2]*t_mat.m_grid[2][2]+this.m_grid[3][2]*t_mat.m_grid[2][3];
	var t_m23=this.m_grid[0][3]*t_mat.m_grid[2][0]+this.m_grid[1][3]*t_mat.m_grid[2][1]+this.m_grid[2][3]*t_mat.m_grid[2][2]+this.m_grid[3][3]*t_mat.m_grid[2][3];
	var t_m30=this.m_grid[0][0]*t_mat.m_grid[3][0]+this.m_grid[1][0]*t_mat.m_grid[3][1]+this.m_grid[2][0]*t_mat.m_grid[3][2]+this.m_grid[3][0]*t_mat.m_grid[3][3];
	var t_m31=this.m_grid[0][1]*t_mat.m_grid[3][0]+this.m_grid[1][1]*t_mat.m_grid[3][1]+this.m_grid[2][1]*t_mat.m_grid[3][2]+this.m_grid[3][1]*t_mat.m_grid[3][3];
	var t_m32=this.m_grid[0][2]*t_mat.m_grid[3][0]+this.m_grid[1][2]*t_mat.m_grid[3][1]+this.m_grid[2][2]*t_mat.m_grid[3][2]+this.m_grid[3][2]*t_mat.m_grid[3][3];
	var t_m33=this.m_grid[0][3]*t_mat.m_grid[3][0]+this.m_grid[1][3]*t_mat.m_grid[3][1]+this.m_grid[2][3]*t_mat.m_grid[3][2]+this.m_grid[3][3]*t_mat.m_grid[3][3];
	this.m_grid[0][0]=t_m00;
	this.m_grid[0][1]=t_m01;
	this.m_grid[0][2]=t_m02;
	this.m_grid[0][3]=t_m03;
	this.m_grid[1][0]=t_m10;
	this.m_grid[1][1]=t_m11;
	this.m_grid[1][2]=t_m12;
	this.m_grid[1][3]=t_m13;
	this.m_grid[2][0]=t_m20;
	this.m_grid[2][1]=t_m21;
	this.m_grid[2][2]=t_m22;
	this.m_grid[2][3]=t_m23;
	this.m_grid[3][0]=t_m30;
	this.m_grid[3][1]=t_m31;
	this.m_grid[3][2]=t_m32;
	this.m_grid[3][3]=t_m33;
}
c_Matrix.prototype.p_Multiply42=function(t_v1){
	var t_v2=c_Vector.m_new.call(new c_Vector,0.0,0.0,0.0);
	t_v2.m_x=this.m_grid[0][0]*t_v1.m_x+this.m_grid[1][0]*t_v1.m_y+this.m_grid[2][0]*t_v1.m_z+this.m_grid[3][0];
	t_v2.m_y=this.m_grid[0][1]*t_v1.m_x+this.m_grid[1][1]*t_v1.m_y+this.m_grid[2][1]*t_v1.m_z+this.m_grid[3][1];
	t_v2.m_z=this.m_grid[0][2]*t_v1.m_x+this.m_grid[1][2]*t_v1.m_y+this.m_grid[2][2]*t_v1.m_z+this.m_grid[3][2];
	return t_v2;
}
c_Matrix.prototype.p_ToArray=function(){
	var t_arr=new_number_array(16);
	t_arr[0]=this.m_grid[0][0];
	t_arr[1]=this.m_grid[0][1];
	t_arr[2]=this.m_grid[0][2];
	t_arr[3]=this.m_grid[0][3];
	t_arr[4]=this.m_grid[1][0];
	t_arr[5]=this.m_grid[1][1];
	t_arr[6]=this.m_grid[1][2];
	t_arr[7]=this.m_grid[1][3];
	t_arr[8]=this.m_grid[2][0];
	t_arr[9]=this.m_grid[2][1];
	t_arr[10]=this.m_grid[2][2];
	t_arr[11]=this.m_grid[2][3];
	t_arr[12]=this.m_grid[3][0];
	t_arr[13]=this.m_grid[3][1];
	t_arr[14]=this.m_grid[3][2];
	t_arr[15]=this.m_grid[3][3];
	return t_arr;
}
c_Matrix.prototype.p_ToArray2=function(t_arr){
	t_arr[0]=this.m_grid[0][0];
	t_arr[1]=this.m_grid[0][1];
	t_arr[2]=this.m_grid[0][2];
	t_arr[3]=this.m_grid[0][3];
	t_arr[4]=this.m_grid[1][0];
	t_arr[5]=this.m_grid[1][1];
	t_arr[6]=this.m_grid[1][2];
	t_arr[7]=this.m_grid[1][3];
	t_arr[8]=this.m_grid[2][0];
	t_arr[9]=this.m_grid[2][1];
	t_arr[10]=this.m_grid[2][2];
	t_arr[11]=this.m_grid[2][3];
	t_arr[12]=this.m_grid[3][0];
	t_arr[13]=this.m_grid[3][1];
	t_arr[14]=this.m_grid[3][2];
	t_arr[15]=this.m_grid[3][3];
}
c_Matrix.prototype.p_TransformPoint=function(t_x,t_y,t_z,t_w){
	var t_p0=.0;
	var t_p1=.0;
	var t_p2=.0;
	var t_p3=.0;
	t_p0=this.m_grid[0][0]*t_x+this.m_grid[1][0]*t_y+this.m_grid[2][0]*t_z+this.m_grid[3][0]*t_w;
	t_p1=this.m_grid[0][1]*t_x+this.m_grid[1][1]*t_y+this.m_grid[2][1]*t_z+this.m_grid[3][1]*t_w;
	t_p2=this.m_grid[0][2]*t_x+this.m_grid[1][2]*t_y+this.m_grid[2][2]*t_z+this.m_grid[3][2]*t_w;
	return [t_p0,t_p1,t_p2];
}
c_Matrix.prototype.p_Multiply=function(t_mat){
	var t_m00=this.m_grid[0][0]*t_mat.m_grid[0][0]+this.m_grid[1][0]*t_mat.m_grid[0][1]+this.m_grid[2][0]*t_mat.m_grid[0][2]+this.m_grid[3][0]*t_mat.m_grid[0][3];
	var t_m01=this.m_grid[0][1]*t_mat.m_grid[0][0]+this.m_grid[1][1]*t_mat.m_grid[0][1]+this.m_grid[2][1]*t_mat.m_grid[0][2]+this.m_grid[3][1]*t_mat.m_grid[0][3];
	var t_m02=this.m_grid[0][2]*t_mat.m_grid[0][0]+this.m_grid[1][2]*t_mat.m_grid[0][1]+this.m_grid[2][2]*t_mat.m_grid[0][2]+this.m_grid[3][2]*t_mat.m_grid[0][3];
	var t_m10=this.m_grid[0][0]*t_mat.m_grid[1][0]+this.m_grid[1][0]*t_mat.m_grid[1][1]+this.m_grid[2][0]*t_mat.m_grid[1][2]+this.m_grid[3][0]*t_mat.m_grid[1][3];
	var t_m11=this.m_grid[0][1]*t_mat.m_grid[1][0]+this.m_grid[1][1]*t_mat.m_grid[1][1]+this.m_grid[2][1]*t_mat.m_grid[1][2]+this.m_grid[3][1]*t_mat.m_grid[1][3];
	var t_m12=this.m_grid[0][2]*t_mat.m_grid[1][0]+this.m_grid[1][2]*t_mat.m_grid[1][1]+this.m_grid[2][2]*t_mat.m_grid[1][2]+this.m_grid[3][2]*t_mat.m_grid[1][3];
	var t_m20=this.m_grid[0][0]*t_mat.m_grid[2][0]+this.m_grid[1][0]*t_mat.m_grid[2][1]+this.m_grid[2][0]*t_mat.m_grid[2][2]+this.m_grid[3][0]*t_mat.m_grid[2][3];
	var t_m21=this.m_grid[0][1]*t_mat.m_grid[2][0]+this.m_grid[1][1]*t_mat.m_grid[2][1]+this.m_grid[2][1]*t_mat.m_grid[2][2]+this.m_grid[3][1]*t_mat.m_grid[2][3];
	var t_m22=this.m_grid[0][2]*t_mat.m_grid[2][0]+this.m_grid[1][2]*t_mat.m_grid[2][1]+this.m_grid[2][2]*t_mat.m_grid[2][2]+this.m_grid[3][2]*t_mat.m_grid[2][3];
	var t_m30=this.m_grid[0][0]*t_mat.m_grid[3][0]+this.m_grid[1][0]*t_mat.m_grid[3][1]+this.m_grid[2][0]*t_mat.m_grid[3][2]+this.m_grid[3][0]*t_mat.m_grid[3][3];
	var t_m31=this.m_grid[0][1]*t_mat.m_grid[3][0]+this.m_grid[1][1]*t_mat.m_grid[3][1]+this.m_grid[2][1]*t_mat.m_grid[3][2]+this.m_grid[3][1]*t_mat.m_grid[3][3];
	var t_m32=this.m_grid[0][2]*t_mat.m_grid[3][0]+this.m_grid[1][2]*t_mat.m_grid[3][1]+this.m_grid[2][2]*t_mat.m_grid[3][2]+this.m_grid[3][2]*t_mat.m_grid[3][3];
	this.m_grid[0][0]=t_m00;
	this.m_grid[0][1]=t_m01;
	this.m_grid[0][2]=t_m02;
	this.m_grid[1][0]=t_m10;
	this.m_grid[1][1]=t_m11;
	this.m_grid[1][2]=t_m12;
	this.m_grid[2][0]=t_m20;
	this.m_grid[2][1]=t_m21;
	this.m_grid[2][2]=t_m22;
	this.m_grid[3][0]=t_m30;
	this.m_grid[3][1]=t_m31;
	this.m_grid[3][2]=t_m32;
}
c_Matrix.prototype.p_Multiply2=function(t_v1){
	var t_v2=c_Vector.m_new.call(new c_Vector,0.0,0.0,0.0);
	t_v2.m_x=this.m_grid[0][0]*t_v1.m_x+this.m_grid[1][0]*t_v1.m_y+this.m_grid[2][0]*t_v1.m_z;
	t_v2.m_y=this.m_grid[0][1]*t_v1.m_x+this.m_grid[1][1]*t_v1.m_y+this.m_grid[2][1]*t_v1.m_z;
	t_v2.m_z=this.m_grid[0][2]*t_v1.m_x+this.m_grid[1][2]*t_v1.m_y+this.m_grid[2][2]*t_v1.m_z;
	return t_v2;
}
c_Matrix.prototype.p_Multiply3=function(t_q){
	var t_t=this.p_Multiply2(t_q.m_o);
	return c_Line.m_new2.call(new c_Line,t_t,this.p_Multiply2(t_q.m_o.p_Add(t_q.m_d)).p_Subtract(t_t));
}
c_Matrix.prototype.p_CreateMatrix=function(t_rx,t_ry,t_rz,t_scx,t_scy,t_scz,t_px,t_py,t_pz){
	var t_sx=.0;
	var t_sy=.0;
	var t_sz=.0;
	var t_cx=.0;
	var t_cy=.0;
	var t_cz=.0;
	var t_theta=.0;
	t_sx=Math.sin((t_rx)*D2R);
	t_cx=Math.cos((t_rx)*D2R);
	t_sy=Math.sin((t_ry)*D2R);
	t_cy=Math.cos((t_ry)*D2R);
	t_sz=Math.sin((t_rz)*D2R);
	t_cz=Math.cos((t_rz)*D2R);
	var t_sycz=t_sy*t_cz;
	var t_cysz=t_cy*t_sz;
	var t_sysz=t_sy*t_sz;
	var t_cycz=t_cy*t_cz;
	this.m_grid[0][0]=(t_cycz+t_sysz*t_sx)*t_scx;
	this.m_grid[0][1]=t_cx*t_sz*t_scx;
	this.m_grid[0][2]=(-t_sycz+t_cysz*t_sx)*t_scx;
	this.m_grid[0][3]=0.0;
	this.m_grid[1][0]=(-t_cysz+t_sycz*t_sx)*t_scy;
	this.m_grid[1][1]=t_cx*t_cz*t_scy;
	this.m_grid[1][2]=(t_sysz+t_cycz*t_sx)*t_scy;
	this.m_grid[1][3]=0.0;
	this.m_grid[2][0]=t_sy*t_cx*t_scz;
	this.m_grid[2][1]=-t_sx*t_scz;
	this.m_grid[2][2]=t_cx*t_cy*t_scz;
	this.m_grid[2][3]=0.0;
	this.m_grid[3][0]=t_px;
	this.m_grid[3][1]=t_py;
	this.m_grid[3][2]=t_pz;
	this.m_grid[3][3]=1.0;
}
c_Matrix.prototype.p_FastRotateScale=function(t_rx,t_ry,t_rz,t_scx,t_scy,t_scz){
	this.p_CreateMatrix(t_rx,t_ry,t_rz,t_scx,t_scy,t_scz,this.m_grid[3][0],this.m_grid[3][1],this.m_grid[3][2]);
}
c_Matrix.prototype.p_Copy=function(){
	var t_mat=c_Matrix.m_new.call(new c_Matrix);
	t_mat.m_grid[0][0]=this.m_grid[0][0];
	t_mat.m_grid[1][0]=this.m_grid[1][0];
	t_mat.m_grid[2][0]=this.m_grid[2][0];
	t_mat.m_grid[3][0]=this.m_grid[3][0];
	t_mat.m_grid[0][1]=this.m_grid[0][1];
	t_mat.m_grid[1][1]=this.m_grid[1][1];
	t_mat.m_grid[2][1]=this.m_grid[2][1];
	t_mat.m_grid[3][1]=this.m_grid[3][1];
	t_mat.m_grid[0][2]=this.m_grid[0][2];
	t_mat.m_grid[1][2]=this.m_grid[1][2];
	t_mat.m_grid[2][2]=this.m_grid[2][2];
	t_mat.m_grid[3][2]=this.m_grid[3][2];
	t_mat.m_grid[0][3]=this.m_grid[0][3];
	t_mat.m_grid[1][3]=this.m_grid[1][3];
	t_mat.m_grid[2][3]=this.m_grid[2][3];
	t_mat.m_grid[3][3]=this.m_grid[3][3];
	return t_mat;
}
c_Matrix.prototype.p_RotateRoll=function(t_ang){
	var t_cos_ang=Math.cos((t_ang)*D2R);
	var t_sin_ang=Math.sin((t_ang)*D2R);
	var t_m00=this.m_grid[0][0]*t_cos_ang+this.m_grid[1][0]*t_sin_ang;
	var t_m01=this.m_grid[0][1]*t_cos_ang+this.m_grid[1][1]*t_sin_ang;
	var t_m02=this.m_grid[0][2]*t_cos_ang+this.m_grid[1][2]*t_sin_ang;
	this.m_grid[1][0]=this.m_grid[0][0]*-t_sin_ang+this.m_grid[1][0]*t_cos_ang;
	this.m_grid[1][1]=this.m_grid[0][1]*-t_sin_ang+this.m_grid[1][1]*t_cos_ang;
	this.m_grid[1][2]=this.m_grid[0][2]*-t_sin_ang+this.m_grid[1][2]*t_cos_ang;
	this.m_grid[0][0]=t_m00;
	this.m_grid[0][1]=t_m01;
	this.m_grid[0][2]=t_m02;
}
function c_Vector(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
	this.m_z=.0;
}
c_Vector.m_new=function(t_xx,t_yy,t_zz){
	this.m_x=t_xx;
	this.m_y=t_yy;
	this.m_z=t_zz;
	return this;
}
c_Vector.prototype.p_Copy=function(){
	return c_Vector.m_new.call(new c_Vector,this.m_x,this.m_y,this.m_z);
}
c_Vector.prototype.p_Add=function(t_vec){
	return c_Vector.m_new.call(new c_Vector,this.m_x+t_vec.m_x,this.m_y+t_vec.m_y,this.m_z+t_vec.m_z);
}
c_Vector.prototype.p_Add2=function(t_vx,t_vy,t_vz){
	return c_Vector.m_new.call(new c_Vector,this.m_x+t_vx,this.m_y+t_vy,this.m_z+t_vz);
}
c_Vector.prototype.p_Normalize=function(){
	if(this.m_x==0.0 && this.m_y==0.0 && this.m_z==0.0){
		return c_Vector.m_new.call(new c_Vector,0.0,0.0,0.0);
	}
	var t_d=1.0/Math.sqrt(this.m_x*this.m_x+this.m_y*this.m_y+this.m_z*this.m_z);
	return c_Vector.m_new.call(new c_Vector,this.m_x*t_d,this.m_y*t_d,this.m_z*t_d);
}
c_Vector.prototype.p_Subtract=function(t_vec){
	return c_Vector.m_new.call(new c_Vector,this.m_x-t_vec.m_x,this.m_y-t_vec.m_y,this.m_z-t_vec.m_z);
}
c_Vector.prototype.p_Subtract2=function(t_vx,t_vy,t_vz){
	return c_Vector.m_new.call(new c_Vector,this.m_x-t_vx,this.m_y-t_vy,this.m_z-t_vz);
}
function c_TCollision(){
	Object.call(this);
	this.m_updated_shape=false;
}
c_TCollision.m_new=function(){
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
c_List.prototype.p_FirstNode=function(){
	if(this.m__head.m__succ!=this.m__head){
		return this.m__head.m__succ;
	}
	return null;
}
c_List.prototype.p_AddFirst=function(t_data){
	return c_Node2.m_new.call(new c_Node2,this.m__head.m__succ,this.m__head,t_data);
}
c_List.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator7.m_new.call(new c_Enumerator7,this);
}
c_List.prototype.p_IsEmpty=function(){
	return this.m__head.m__succ==this.m__head;
}
function c_EntityList(){
	c_List.call(this);
}
c_EntityList.prototype=extend_class(c_List);
c_EntityList.m_new=function(){
	c_List.m_new.call(this);
	return this;
}
c_EntityList.prototype.p_EntityListAdd=function(t_obj){
	var t_llink=this.p_FirstNode();
	if(t_obj.m_order>0){
		t_llink=this.p_AddFirst(t_obj);
		return t_llink;
	}else{
		t_llink=this.p_AddLast(t_obj);
		return t_llink;
	}
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
c_Node2.prototype.p_Remove=function(){
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
function bb_functions_CreateMesh(t_parent){
	return c_TMesh.m_CreateMesh(t_parent);
}
function c_TBrush(){
	Object.call(this);
	this.m_red=1.0;
	this.m_green=1.0;
	this.m_blue=1.0;
	this.m_tex=new_object_array(8);
	this.m_no_texs=0;
	this.m_fx=0;
	this.m_name="";
	this.m_alpha=1.0;
	this.m_shine=0.05;
	this.m_shine_strength=100.0;
	this.m_blend=0;
}
c_TBrush.m_new=function(){
	return this;
}
c_TBrush.m_new2=function(t_hexcolor){
	this.m_red=((t_hexcolor&16711680)>>16)*0.0039215686274509803;
	this.m_green=((t_hexcolor&65280)>>8)*0.0039215686274509803;
	this.m_blue=(t_hexcolor&255)*0.0039215686274509803;
	this.m_tex[0]=c_TTexture.m_new.call(new c_TTexture);
	return this;
}
c_TBrush.m_new3=function(t_r,t_g,t_b){
	this.m_red=(t_r)*0.0039215686274509803;
	this.m_green=(t_g)*0.0039215686274509803;
	this.m_blue=(t_b)*0.0039215686274509803;
	this.m_tex[0]=c_TTexture.m_new.call(new c_TTexture);
	return this;
}
c_TBrush.prototype.p_BrushTexture=function(t_texture,t_frame,t_index){
	this.m_tex[t_index]=t_texture;
	if(t_index+1>this.m_no_texs){
		this.m_no_texs=t_index+1;
	}
	if(t_frame<0){
		t_frame=0;
	}
	if(t_frame>t_texture.m_no_frames-1){
		t_frame=t_texture.m_no_frames-1;
	}
	t_texture.m_tex_frame=t_frame;
	if(t_frame>0 && t_texture.m_no_frames>1){
		var t_x=t_frame % t_texture.m_frame_xstep;
		var t_y=((t_frame/t_texture.m_frame_ystep)|0) % t_texture.m_frame_ystep;
		t_texture.m_u_pos=(t_x)*t_texture.m_frame_ustep;
		t_texture.m_v_pos=(t_y)*t_texture.m_frame_vstep;
	}
}
c_TBrush.m_new4=function(t_texture){
	this.p_BrushTexture(t_texture,0,0);
	return this;
}
c_TBrush.prototype.p_Copy=function(){
	var t_brush=c_TBrush.m_new.call(new c_TBrush);
	t_brush.m_no_texs=this.m_no_texs;
	t_brush.m_name=this.m_name;
	t_brush.m_red=this.m_red;
	t_brush.m_green=this.m_green;
	t_brush.m_blue=this.m_blue;
	t_brush.m_alpha=this.m_alpha;
	t_brush.m_shine=this.m_shine;
	t_brush.m_shine_strength=this.m_shine_strength;
	t_brush.m_blend=this.m_blend;
	t_brush.m_fx=this.m_fx;
	if((this.m_tex[0])!=null){
		t_brush.m_tex[0]=this.m_tex[0];
	}
	if((this.m_tex[1])!=null){
		t_brush.m_tex[1]=this.m_tex[1];
	}
	if((this.m_tex[2])!=null){
		t_brush.m_tex[2]=this.m_tex[2];
	}
	if((this.m_tex[3])!=null){
		t_brush.m_tex[3]=this.m_tex[3];
	}
	if((this.m_tex[4])!=null){
		t_brush.m_tex[4]=this.m_tex[4];
	}
	if((this.m_tex[5])!=null){
		t_brush.m_tex[5]=this.m_tex[5];
	}
	if((this.m_tex[6])!=null){
		t_brush.m_tex[6]=this.m_tex[6];
	}
	if((this.m_tex[7])!=null){
		t_brush.m_tex[7]=this.m_tex[7];
	}
	return t_brush;
}
c_TBrush.m_CreateBrush=function(t_r,t_g,t_b){
	var t_brush=c_TBrush.m_new3.call(new c_TBrush,((t_r)|0),((t_g)|0),((t_b)|0));
	return t_brush;
}
c_TBrush.prototype.p_BrushFX=function(t_fx_no){
	this.m_fx=t_fx_no;
	return 0;
}
c_TBrush.prototype.p_BrushColorFloat=function(t_r,t_g,t_b,t_a){
	this.m_red=t_r;
	this.m_green=t_g;
	this.m_blue=t_b;
	if(t_a>=0.0){
		this.m_alpha=t_a;
	}
	return 0;
}
c_TBrush.prototype.p_BrushAlpha=function(t_a){
	this.m_alpha=t_a;
	return 0;
}
function c_TTexture(){
	Object.call(this);
	this.m_resize_smooth=false;
	this.m_no_frames=1;
	this.m_tex_frame=0;
	this.m_frame_xstep=0;
	this.m_frame_ystep=0;
	this.m_frame_ustep=1.0;
	this.m_u_pos=.0;
	this.m_frame_vstep=1.0;
	this.m_v_pos=.0;
	this.m_bind_flags=-1;
	this.m_tex_link=null;
	this.m_pixmap=null;
	this.m_file="";
	this.m_gltex=new_number_array(1);
	this.m_freeMemoryAfterBind=false;
	this.m_flags=0;
	this.m_orig_width=0;
	this.m_orig_height=0;
	this.m_width=0;
	this.m_height=0;
	this.m_frame_startx=0;
	this.m_frame_starty=0;
	this.m_u_scale=1.0;
	this.m_v_scale=1.0;
	this.m_blend=2;
	this.m_coords=0;
	this.m_angle=.0;
	this.m_cube_mode=1;
	this.m_tex_smooth=true;
	this.m_no_mipmaps=0;
}
c_TTexture.m_useGlobalResizeSmooth=false;
c_TTexture.m_new=function(){
	this.m_resize_smooth=c_TTexture.m_useGlobalResizeSmooth;
	return this;
}
c_TTexture.m_tex_bind_stack=null;
c_TTexture.prototype.p_FreeTexture_=function(){
	this.m_tex_link.p_Remove();
	if((this.m_pixmap)!=null){
		this.m_pixmap.p_DecBind();
		if(this.m_pixmap.p_GetBindCount()==0){
			c_TPixmap.m_preloader.p_RemoveFromStack(this.m_file);
			this.m_pixmap.p_FreePixmap();
		}
	}
	this.m_gltex[0]=0;
	return 0;
}
c_TTexture.m_default_texflags=0;
c_TTexture.prototype.p_FilterFlags=function(){
	var t_=c_TTextureFilter.m_filter_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_filter=t_.p_NextObject();
		var t_len1=t_filter.m_text.length;
		var t_len2=this.m_file.length-t_len1;
		var t_file2=this.m_file.slice(t_len2);
		if(t_file2==t_filter.m_text){
			this.m_flags=this.m_flags|t_filter.m_flags;
		}
	}
	return 0;
}
c_TTexture.m_tex_list=null;
c_TTexture.prototype.p_TexInList=function(){
	var t_=c_TTexture.m_tex_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_tex=t_.p_NextObject();
		if(this.m_file==t_tex.m_file && this.m_flags==t_tex.m_flags){
			return t_tex;
		}
	}
	return null;
}
c_TTexture.m_Pow2Size=function(t_n){
	var t_t=1;
	while(t_t<t_n){
		t_t=t_t<<1;
	}
	return t_t;
}
c_TTexture.m_AdjustPixmap=function(t_pixmap,t_resize_smooth,t_tex){
	var t_width=c_TTexture.m_Pow2Size(t_pixmap.m_width);
	var t_height=c_TTexture.m_Pow2Size(t_pixmap.m_height);
	if(t_width!=t_pixmap.m_width || t_height!=t_pixmap.m_height){
		if(t_resize_smooth){
			t_pixmap=t_pixmap.p_ResizePixmap(t_width,t_height);
		}else{
			t_pixmap=t_pixmap.p_ResizePixmapNoSmooth(t_width,t_height);
		}
	}
	return t_pixmap;
}
c_TTexture.prototype.p_SetAnimationFrames=function(t_first_frame,t_frame_count,t_frame_width,t_frame_height){
	this.m_frame_xstep=((this.m_pixmap.m_width/t_frame_width)|0);
	this.m_frame_ystep=((this.m_pixmap.m_height/t_frame_height)|0);
	this.m_frame_startx=t_first_frame % this.m_frame_xstep;
	this.m_frame_starty=((t_first_frame/this.m_frame_ystep)|0) % this.m_frame_ystep;
	if(t_frame_count<0){
		t_frame_count=this.m_frame_xstep*this.m_frame_ystep;
	}
	this.m_no_frames=t_frame_count;
	if(this.m_no_frames>1){
		this.m_frame_ustep=1.0/(this.m_frame_xstep);
		this.m_frame_vstep=1.0/(this.m_frame_ystep);
		this.m_u_scale=this.m_frame_ustep;
		this.m_v_scale=this.m_frame_vstep;
		this.m_u_pos=(this.m_frame_startx)*this.m_frame_ustep;
		this.m_v_pos=(this.m_frame_starty)*this.m_frame_vstep;
	}
}
c_TTexture.m_PushBindTexture=function(t_tex,t_flags){
	t_tex.m_bind_flags=t_flags;
	c_TTexture.m_tex_bind_stack.p_Push7(t_tex);
	return 0;
}
c_TTexture.m_LoadAnimTexture=function(t_file,t_flags,t_frame_width,t_frame_height,t_first_frame,t_frame_count,t_tex,t_force_new){
	if(t_tex==null){
		t_tex=c_TTexture.m_new.call(new c_TTexture);
	}
	t_tex.m_file=t_file;
	t_tex.p_FilterFlags();
	if(t_flags>-1){
		t_tex.m_flags=t_flags;
	}
	var t_old_tex=null;
	if(!((t_force_new)!=0)){
		t_old_tex=t_tex.p_TexInList();
	}
	if(t_old_tex!=null && t_old_tex!=t_tex){
		return t_old_tex;
	}else{
		if(t_old_tex!=t_tex){
			t_tex.m_tex_link=c_TTexture.m_tex_list.p_AddLast9(t_tex);
		}
	}
	var t_new_scx=1.0;
	var t_new_scy=1.0;
	var t_oldw=0;
	var t_oldh=0;
	t_tex.m_pixmap=c_TPixmap.m_LoadPixmap(t_file);
	if(t_tex.m_pixmap.m_height==0){
		return t_tex;
	}
	t_oldw=t_tex.m_pixmap.m_width;
	t_oldh=t_tex.m_pixmap.m_height;
	t_tex.m_orig_width=t_oldw;
	t_tex.m_orig_height=t_oldh;
	if((t_tex.m_flags&256)==0){
		t_tex.m_pixmap=c_TTexture.m_AdjustPixmap(t_tex.m_pixmap,t_tex.m_resize_smooth,t_tex);
	}
	t_tex.m_width=t_tex.m_pixmap.m_width;
	t_tex.m_height=t_tex.m_pixmap.m_height;
	if(t_oldw!=t_tex.m_width || t_oldh!=t_tex.m_height){
		t_new_scx=(t_tex.m_width)/(t_oldw);
		t_new_scy=(t_tex.m_height)/(t_oldh);
	}
	if(t_frame_width==0 && t_frame_height==0){
		t_frame_width=t_tex.m_pixmap.m_width;
		t_frame_height=t_tex.m_pixmap.m_height;
	}else{
		t_frame_width=(((t_frame_width)*t_new_scx)|0);
		t_frame_height=(((t_frame_height)*t_new_scy)|0);
	}
	t_tex.p_SetAnimationFrames(t_first_frame,t_frame_count,t_frame_width,t_frame_height);
	c_TTexture.m_PushBindTexture(t_tex,t_flags);
	return t_tex;
}
c_TTexture.m_LoadTexture=function(t_file,t_flags,t_tex){
	return c_TTexture.m_LoadAnimTexture(t_file,t_flags,0,0,0,1,t_tex,0);
}
c_TTexture.m_LoadTexture2=function(t_pixmap,t_flags,t_tex){
	if(!((t_tex)!=null)){
		t_tex=c_TTexture.m_new.call(new c_TTexture);
		t_tex.m_tex_link=c_TTexture.m_tex_list.p_AddLast9(t_tex);
	}
	t_tex.p_FilterFlags();
	if(t_flags>-1){
		t_tex.m_flags=t_flags;
	}
	if(t_pixmap==null){
		return t_tex;
	}
	t_tex.m_pixmap=t_pixmap;
	if(t_tex.m_pixmap.m_height==0){
		return t_tex;
	}
	if((t_tex.m_flags&256)==0){
		t_tex.m_pixmap=c_TTexture.m_AdjustPixmap(t_tex.m_pixmap,t_tex.m_resize_smooth,t_tex);
	}
	t_tex.m_width=t_tex.m_pixmap.m_width;
	t_tex.m_height=t_tex.m_pixmap.m_height;
	c_TTexture.m_PushBindTexture(t_tex,t_flags);
	return t_tex;
}
c_TTexture.prototype.p_TextureHeight=function(){
	return this.m_height;
}
c_TTexture.m_TextureFilter=function(t_match_text,t_flags){
	var t_filter=c_TTextureFilter.m_new.call(new c_TTextureFilter);
	t_filter.m_text=t_match_text;
	t_filter.m_flags=t_flags;
	c_TTextureFilter.m_filter_list.p_AddLast8(t_filter);
	return 0;
}
c_TTexture.m_CreateTexture=function(t_width,t_height,t_flags,t_frames,t_tex){
	if(t_tex==null){
		t_tex=c_TTexture.m_new.call(new c_TTexture);
		t_tex.m_tex_link=c_TTexture.m_tex_list.p_AddLast9(t_tex);
	}
	t_width=c_TTexture.m_Pow2Size(t_width);
	t_height=c_TTexture.m_Pow2Size(t_height);
	t_tex.m_pixmap=c_TPixmap.m_CreatePixmap(t_width*t_frames,t_height,4);
	t_tex.m_flags=t_flags;
	t_tex.m_no_frames=t_frames;
	t_tex.m_gltex=t_tex.m_gltex.slice(0,t_tex.m_no_frames);
	var t_pixmap=t_tex.m_pixmap;
	if((t_tex.m_flags&256)==0){
		t_pixmap=c_TTexture.m_AdjustPixmap(t_pixmap,t_tex.m_resize_smooth,t_tex);
	}
	t_tex.m_width=t_pixmap.m_width;
	t_tex.m_height=t_pixmap.m_height;
	t_tex.m_orig_width=t_tex.m_width;
	t_tex.m_orig_height=t_tex.m_height;
	c_TTexture.m_PushBindTexture(t_tex,t_flags);
	return t_tex;
}
c_TTexture.prototype.p_ResizeNoSmooth=function(){
	this.m_resize_smooth=false;
	return 0;
}
c_TTexture.prototype.p_FreeTexture=function(){
	c_TTexture.m_PushBindTexture(this,-255);
	return 0;
}
function c_TSurface(){
	Object.call(this);
	this.m_brush=c_TBrush.m_new.call(new c_TBrush);
	this.m_surf_id=0;
	this.m_no_verts=0;
	this.m_no_tris=0;
	this.m_vbo_dyn=false;
	this.m_vert_data=c_VertexDataBuffer.m_new.call(new c_VertexDataBuffer);
	this.m_alpha_enable=false;
	this.m_vert_array_size=1;
	this.m_tri_array_size=1;
	this.m_tris=c_ShortBuffer.m_new.call(new c_ShortBuffer);
	this.m_reset_vbo=-1;
	this.m_vbo_id=[0,0,0,0,0,0,0];
	this.m_vert_anim=[];
	this.m_anim_frame=0;
}
c_TSurface.m_new=function(){
	return this;
}
c_TSurface.prototype.p_AddVertex=function(t_x,t_y,t_z,t_u,t_v,t_w){
	this.m_no_verts=this.m_no_verts+1;
	if(this.m_no_verts>=this.m_vert_array_size){
		do{
			this.m_vert_array_size=this.m_vert_array_size+512;
		}while(!(this.m_vert_array_size>this.m_no_verts));
		var t_vas=this.m_vert_array_size;
		this.m_vert_data=bb_monkeybuffer_CopyDataBuffer2(this.m_vert_data,c_VertexDataBuffer.m_Create(t_vas));
	}
	var t_vid=this.m_no_verts-1;
	var t_data=[t_x,t_y,-t_z,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,t_u,t_v,t_u,t_v];
	this.m_vert_data.p_PokeFloatArray(t_vid,t_data,-1);
	return t_vid;
}
c_TSurface.prototype.p_AddVertex2=function(t_data,t_len){
	if(t_len==-1){
		t_len=t_data.length;
	}
	var t_total=t_len>>4;
	var t_vid=this.m_no_verts;
	this.m_no_verts=this.m_no_verts+t_total;
	if(this.m_no_verts>=this.m_vert_array_size){
		do{
			this.m_vert_array_size=this.m_vert_array_size+512;
		}while(!(this.m_vert_array_size>this.m_no_verts));
		var t_vas=this.m_vert_array_size;
		this.m_vert_data=bb_monkeybuffer_CopyDataBuffer2(this.m_vert_data,c_VertexDataBuffer.m_Create(t_vas));
	}
	this.m_vert_data.p_PokeFloatArray(t_vid,t_data,t_len);
	return t_vid+(t_total-1);
}
c_TSurface.prototype.p_AddTriangle=function(t_v0,t_v1,t_v2){
	this.m_no_tris=this.m_no_tris+1;
	if(this.m_no_tris>=this.m_tri_array_size){
		do{
			this.m_tri_array_size=this.m_tri_array_size+512;
		}while(!(this.m_tri_array_size>this.m_no_tris));
		var t_tas=this.m_tri_array_size;
		this.m_tris=bb_monkeybuffer_CopyShortBuffer(this.m_tris,c_ShortBuffer.m_Create(t_tas*3));
	}
	var t_v0i=this.m_no_tris*3-3;
	var t_v1i=this.m_no_tris*3-2;
	var t_v2i=this.m_no_tris*3-1;
	this.m_tris.p_Poke(t_v0i,[t_v2,t_v1,t_v0],-1);
	this.m_reset_vbo=-1;
	return this.m_no_tris;
}
c_TSurface.prototype.p_AddTriangle2=function(t_arr,t_len){
	if(t_len==-1){
		t_len=t_arr.length;
	}
	var t_t0=this.m_no_tris*3;
	this.m_no_tris=this.m_no_tris+((t_len/3)|0);
	if(this.m_no_tris>=this.m_tri_array_size){
		do{
			this.m_tri_array_size=this.m_tri_array_size+512;
		}while(!(this.m_tri_array_size>this.m_no_tris));
		var t_tas=this.m_tri_array_size;
		this.m_tris=bb_monkeybuffer_CopyShortBuffer(this.m_tris,c_ShortBuffer.m_Create(t_tas*3));
	}
	var t_temp=0;
	for(var t_t=0;t_t<=t_len-1;t_t=t_t+3){
		t_temp=t_arr[t_t];
		t_arr[t_t]=t_arr[t_t+2];
		t_arr[t_t+2]=t_temp;
	}
	this.m_tris.p_Poke(t_t0,t_arr,t_len);
	this.m_reset_vbo=-1;
	return this.m_no_tris;
}
c_TSurface.prototype.p_PaintSurface=function(t_bru){
	if(this.m_brush==null){
		this.m_brush=c_TBrush.m_new.call(new c_TBrush);
	}
	this.m_brush.m_no_texs=t_bru.m_no_texs;
	this.m_brush.m_name=t_bru.m_name;
	this.m_brush.m_red=t_bru.m_red;
	this.m_brush.m_green=t_bru.m_green;
	this.m_brush.m_blue=t_bru.m_blue;
	this.m_brush.m_alpha=t_bru.m_alpha;
	this.m_brush.m_shine=t_bru.m_shine;
	this.m_brush.m_blend=t_bru.m_blend;
	this.m_brush.m_fx=t_bru.m_fx;
	for(var t_i=0;t_i<=7;t_i=t_i+1){
		this.m_brush.m_tex[t_i]=t_bru.m_tex[t_i];
	}
	return 0;
}
c_TSurface.prototype.p_PaintSurface2=function(t_tex,t_index){
	if(this.m_brush==null){
		this.m_brush=c_TBrush.m_new.call(new c_TBrush);
	}
	this.m_brush.m_no_texs=bb_math_Max(this.m_brush.m_no_texs,t_index+1);
	this.m_brush.m_tex[t_index]=t_tex;
	return 0;
}
c_TSurface.prototype.p_VertexNormal=function(t_vid,t_nx,t_ny,t_nz){
	this.m_vert_data.p_PokeNormals(t_vid,t_nx,t_ny,-t_nz);
	this.m_reset_vbo=this.m_reset_vbo|4;
	return 0;
}
c_TSurface.prototype.p_VertexTexCoords=function(t_vid,t_u,t_v,t_w,t_coord_set){
	if(t_coord_set==0){
		this.m_vert_data.p_PokeTexCoords0(t_vid,t_u,t_v);
	}else{
		if(t_coord_set==1){
			this.m_vert_data.p_PokeTexCoords1(t_vid,t_u,t_v);
		}
	}
	this.m_reset_vbo=this.m_reset_vbo|2;
	return 0;
}
c_TSurface.prototype.p_CropSurfaceBuffers=function(){
	if(this.m_no_verts<1 && this.m_no_tris<1){
		return 0;
	}
	this.m_vert_data=bb_monkeybuffer_CopyDataBuffer2(this.m_vert_data,c_VertexDataBuffer.m_Create(this.m_no_verts));
	this.m_tris=bb_monkeybuffer_CopyShortBuffer(this.m_tris,c_ShortBuffer.m_Create(this.m_no_tris*3));
	this.m_vert_array_size=this.m_no_verts;
	this.m_tri_array_size=this.m_no_tris;
	return 0;
}
c_TSurface.prototype.p_TriangleVertex=function(t_tri_no,t_corner){
	return this.m_tris.p_Peek(t_tri_no*3+(2-t_corner));
}
c_TSurface.prototype.p_UpdateNormals=function(t_create_only){
	var t_norm_map=c_NormMap.m_new.call(new c_NormMap);
	for(var t_t=0;t_t<=this.m_no_tris-1;t_t=t_t+1){
		var t_tri_no=(t_t+1)*3;
		var t_v0=this.m_tris.p_Peek(t_tri_no-3);
		var t_v1=this.m_tris.p_Peek(t_tri_no-2);
		var t_v2=this.m_tris.p_Peek(t_tri_no-1);
		var t_ax=this.m_vert_data.p_VertexX(t_v1)-this.m_vert_data.p_VertexX(t_v0);
		var t_ay=this.m_vert_data.p_VertexY(t_v1)-this.m_vert_data.p_VertexY(t_v0);
		var t_az=this.m_vert_data.p_VertexZ(t_v1)-this.m_vert_data.p_VertexZ(t_v0);
		var t_bx=this.m_vert_data.p_VertexX(t_v2)-this.m_vert_data.p_VertexX(t_v1);
		var t_by=this.m_vert_data.p_VertexY(t_v2)-this.m_vert_data.p_VertexY(t_v1);
		var t_bz=this.m_vert_data.p_VertexZ(t_v2)-this.m_vert_data.p_VertexZ(t_v1);
		var t_nx=t_ay*t_bz-t_az*t_by;
		var t_ny=t_az*t_bx-t_ax*t_bz;
		var t_nz=t_ax*t_by-t_ay*t_bx;
		var t_norm=c_Vector.m_new.call(new c_Vector,t_nx,t_ny,t_nz);
		var t_vnorm=null;
		var t_vx=null;
		var t_new_norm=null;
		var t_vhelper=null;
		for(var t_c=0;t_c<=2;t_c=t_c+1){
			var t_v=this.p_TriangleVertex(t_t,t_c);
			t_vx=this.m_vert_data.p_PeekVertCoords(t_v);
			t_vhelper=t_norm_map.p_Get2(t_vx);
			if(!((t_vhelper)!=null)){
				t_vhelper=c_NormHelperClass.m_new.call(new c_NormHelperClass);
				t_vhelper.m_vec=c_Vector.m_new.call(new c_Vector,0.0,0.0,0.0);
				t_vhelper.m_vert=t_v;
			}
			t_vhelper.m_vec=t_norm.p_Add(t_vhelper.m_vec);
			if(!t_create_only){
				t_norm_map.p_Set3(t_vx,t_vhelper);
			}
		}
	}
	for(var t_v3=0;t_v3<=this.m_no_verts-1;t_v3=t_v3+1){
		var t_vx2=this.m_vert_data.p_PeekVertCoords(t_v3);
		var t_norm2=t_norm_map.p_Get2(t_vx2);
		if((t_norm2)!=null){
			t_norm2.m_vec=t_norm2.m_vec.p_Normalize();
			this.m_vert_data.p_PokeNormals(t_v3,t_norm2.m_vec.m_x,t_norm2.m_vec.m_y,t_norm2.m_vec.m_z);
		}
	}
	this.m_reset_vbo=this.m_reset_vbo|4;
	return 0;
}
c_TSurface.prototype.p_VertexColor=function(t_vid,t_r,t_g,t_b,t_a){
	this.m_vert_data.p_PokeColor(t_vid,t_r*0.0039215686274509803,t_g*0.0039215686274509803,t_b*0.0039215686274509803,t_a);
	this.m_reset_vbo=this.m_reset_vbo|8;
	return 0;
}
function c_List2(){
	Object.call(this);
	this.m__head=(c_HeadNode2.m_new.call(new c_HeadNode2));
}
c_List2.m_new=function(){
	return this;
}
c_List2.prototype.p_AddLast2=function(t_data){
	return c_Node3.m_new.call(new c_Node3,this.m__head,this.m__head.m__pred,t_data);
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
c_List2.prototype.p_Clear=function(){
	this.m__head.m__succ=this.m__head;
	this.m__head.m__pred=this.m__head;
	return 0;
}
c_List2.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator8.m_new.call(new c_Enumerator8,this);
}
function c_Node3(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node3.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node3.m_new2=function(){
	return this;
}
function c_HeadNode2(){
	c_Node3.call(this);
}
c_HeadNode2.prototype=extend_class(c_Node3);
c_HeadNode2.m_new=function(){
	c_Node3.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_TColTree(){
	Object.call(this);
	this.m_reset_col_tree=0;
}
c_TColTree.m_new=function(){
	return this;
}
function c_MojoSurface(){
	EmptyNullClass.call(this);
	this.m_tex=null;
	this.m_path="";
	this.m_loaded=0;
	this.m_xstep=.0;
	this.m_ystep=.0;
}
c_MojoSurface.prototype=extend_class(EmptyNullClass);
c_MojoSurface.m_new=function(){
	return this;
}
c_MojoSurface.m_Create=function(t_path){
	var t_s=c_MojoSurface.m_new.call(new c_MojoSurface);
	t_s.m_tex=bb_functions_CreateTexture(0,0,1,1);
	if(t_path!=""){
		t_s.m_path=t_path;
	}
	return t_s;
}
c_MojoSurface.m_list=[];
c_MojoSurface.m_isLoading=false;
c_MojoSurface.prototype.Width=function(){
	return this.m_tex.m_orig_width;
}
c_MojoSurface.prototype.Height=function(){
	return this.m_tex.m_orig_height;
}
c_MojoSurface.prototype.p_LoadTexture=function(t_path,t_mesh,t_device){
	this.m_tex.p_ResizeNoSmooth();
	this.m_tex.m_pixmap.p_ClearBind();
	c_TTexture.m_LoadAnimTexture(t_path,3,0,0,0,1,this.m_tex,1);
	this.m_loaded=1;
	this.m_xstep=1.0/(this.Width());
	this.m_ystep=1.0/(this.Height());
	return this.m_tex!=null;
}
c_MojoSurface.m_PreLoad=function(t_path,t_mesh,t_device){
	var t_s=c_MojoSurface.m_Create(t_path);
	var t_sz=c_MojoSurface.m_list.length;
	c_MojoSurface.m_list=resize_string_array(c_MojoSurface.m_list,t_sz+1);
	c_MojoSurface.m_list[t_sz]=t_path;
	c_MojoSurface.m_isLoading=true;
	t_s.p_LoadTexture(t_path,t_mesh,t_device);
	return t_s;
}
c_MojoSurface.prototype.Discard=function(){
	if((this.m_tex)!=null){
		this.m_tex.p_FreeTexture();
	}
	this.m_tex=null;
	return 0;
}
c_MojoSurface.prototype.Loaded=function(){
	return this.m_loaded;
}
function c_List3(){
	Object.call(this);
	this.m__head=(c_HeadNode3.m_new.call(new c_HeadNode3));
}
c_List3.m_new=function(){
	return this;
}
c_List3.prototype.p_AddLast3=function(t_data){
	return c_Node4.m_new.call(new c_Node4,this.m__head,this.m__head.m__pred,t_data);
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
c_List3.prototype.p_Clear=function(){
	this.m__head.m__succ=this.m__head;
	this.m__head.m__pred=this.m__head;
	return 0;
}
c_List3.prototype.p_Compare2=function(t_lhs,t_rhs){
	error("Unable to compare items");
	return 0;
}
c_List3.prototype.p_Sort=function(t_ascending){
	var t_ccsgn=-1;
	if((t_ascending)!=0){
		t_ccsgn=1;
	}
	var t_insize=1;
	do{
		var t_merges=0;
		var t_tail=this.m__head;
		var t_p=this.m__head.m__succ;
		while(t_p!=this.m__head){
			t_merges+=1;
			var t_q=t_p.m__succ;
			var t_qsize=t_insize;
			var t_psize=1;
			while(t_psize<t_insize && t_q!=this.m__head){
				t_psize+=1;
				t_q=t_q.m__succ;
			}
			do{
				var t_t=null;
				if(((t_psize)!=0) && ((t_qsize)!=0) && t_q!=this.m__head){
					var t_cc=this.p_Compare2(t_p.m__data,t_q.m__data)*t_ccsgn;
					if(t_cc<=0){
						t_t=t_p;
						t_p=t_p.m__succ;
						t_psize-=1;
					}else{
						t_t=t_q;
						t_q=t_q.m__succ;
						t_qsize-=1;
					}
				}else{
					if((t_psize)!=0){
						t_t=t_p;
						t_p=t_p.m__succ;
						t_psize-=1;
					}else{
						if(((t_qsize)!=0) && t_q!=this.m__head){
							t_t=t_q;
							t_q=t_q.m__succ;
							t_qsize-=1;
						}else{
							break;
						}
					}
				}
				t_t.m__pred=t_tail;
				t_tail.m__succ=t_t;
				t_tail=t_t;
			}while(!(false));
			t_p=t_q;
		}
		t_tail.m__succ=this.m__head;
		this.m__head.m__pred=t_tail;
		if(t_merges<=1){
			return 0;
		}
		t_insize*=2;
	}while(!(false));
}
c_List3.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator9.m_new.call(new c_Enumerator9,this);
}
c_List3.prototype.p_IsEmpty=function(){
	return this.m__head.m__succ==this.m__head;
}
function c_Node4(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node4.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node4.m_new2=function(){
	return this;
}
function c_HeadNode3(){
	c_Node4.call(this);
}
c_HeadNode3.prototype=extend_class(c_Node4);
c_HeadNode3.m_new=function(){
	c_Node4.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_TPixmap(){
	Object.call(this);
	this.m_bind=0;
	this.m_height=0;
	this.m_width=0;
}
c_TPixmap.m_preloader=null;
c_TPixmap.m_PreLoadPixmap=function(t_file){
	return c_TPixmap.m_preloader.p_PreLoad2(t_file);
}
c_TPixmap.prototype.p_DecBind=function(){
	this.m_bind-=1;
	if(this.m_bind<0){
		this.m_bind=0;
	}
}
c_TPixmap.prototype.p_GetBindCount=function(){
	return this.m_bind;
}
c_TPixmap.prototype.p_FreePixmap=function(){
}
c_TPixmap.m_manager=null;
c_TPixmap.m_LoadPixmap=function(t_f){
	return c_TPixmap.m_manager.p_LoadPixmap(t_f);
}
c_TPixmap.prototype.p_ResizePixmap=function(t_neww,t_newh){
}
c_TPixmap.prototype.p_ResizePixmapNoSmooth=function(t_neww,t_newh){
}
c_TPixmap.m_new=function(){
	return this;
}
c_TPixmap.m_CreatePixmap=function(t_w,t_h,t_format){
	return c_TPixmap.m_manager.p_CreatePixmap(t_w,t_h,t_format);
}
c_TPixmap.prototype.p_SetBind=function(){
	this.m_bind+=1;
}
c_TPixmap.prototype.p_ClearBind=function(){
	this.m_bind=0;
}
function c_TPixmapPreloader(){
	Object.call(this);
	this.m_manager=null;
	this.m_old_file=new_string_array(1);
	this.m_start_stack=c_Stack2.m_new.call(new c_Stack2);
	this.m_finish_stack=c_Stack2.m_new.call(new c_Stack2);
	this.m_total=0;
	this.m_loading=false;
}
c_TPixmapPreloader.prototype.p_CheckAllLoaded=function(){
	if(this.m_start_stack.p_IsEmpty()){
		this.m_loading=false;
		return 1;
	}
	return 0;
}
c_TPixmapPreloader.prototype.p_PreLoad2=function(t_file){
	if(!((this.m_manager)!=null)){
		error("**ERROR: no preload manager");
	}
	if(t_file[0]!=this.m_old_file[0] || t_file[t_file.length-1]!=this.m_old_file[this.m_old_file.length-1]){
		var t_=t_file;
		var t_2=0;
		while(t_2<t_.length){
			var t_f=t_[t_2];
			t_2=t_2+1;
			if(t_f==""){
				continue;
			}
			var t_skip=false;
			var t_3=this.m_start_stack.p_ObjectEnumerator();
			while(t_3.p_HasNext()){
				var t_ss=t_3.p_NextObject();
				if(t_ss.m_file==t_f){
					t_skip=true;
					break;
				}
			}
			var t_4=this.m_finish_stack.p_ObjectEnumerator();
			while(t_4.p_HasNext()){
				var t_ss2=t_4.p_NextObject();
				if(t_ss2.m_file==t_f){
					t_skip=true;
					break;
				}
			}
			if(t_skip!=true){
				this.m_total+=1;
				this.m_start_stack.p_Insert2(0,c_PixmapStack.m_new.call(new c_PixmapStack,t_f,bb_data_FixDataPath(t_f),this.m_total));
			}
		}
		this.m_old_file=t_file;
	}
	if(!this.m_start_stack.p_IsEmpty()){
		this.m_loading=true;
		var t_f2=null;
		var t_5=this.m_start_stack.p_Backwards().p_ObjectEnumerator();
		while(t_5.p_HasNext()){
			t_f2=t_5.p_NextObject();
			if(t_f2.m_loading==false){
				this.m_manager.p_PreLoadData(t_f2.m_file,t_f2.m_id);
				t_f2.m_loading=true;
				break;
			}else{
				if(this.m_manager.p_IsLoaded(t_f2.m_id)){
					this.m_start_stack.p_RemoveEach(t_f2);
					this.m_finish_stack.p_Push4(t_f2);
				}
			}
		}
	}
	return this.p_CheckAllLoaded();
}
c_TPixmapPreloader.prototype.p_RemoveFromStack=function(t_file){
	if(!this.m_finish_stack.p_IsEmpty()){
		var t_j=0;
		var t_=this.m_finish_stack.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_i=t_.p_NextObject();
			t_j=t_j+1;
			if(t_i.m_file==t_file || t_i.m_new_file==t_file){
				this.m_finish_stack.p_Remove2(t_j);
				break;
			}
		}
	}
}
c_TPixmapPreloader.m_new=function(t_m){
	this.m_manager=t_m;
	return this;
}
c_TPixmapPreloader.m_new2=function(){
	return this;
}
c_TPixmapPreloader.prototype.p_GetID=function(t_file){
	if(!this.m_finish_stack.p_IsEmpty()){
		var t_=this.m_finish_stack.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_i=t_.p_NextObject();
			if(t_i.m_file==t_file || t_i.m_new_file==t_file){
				return t_i.m_id;
			}
		}
	}
	return 0;
}
c_TPixmapPreloader.prototype.p_GetPixmapPreLoad=function(t_p,t_file){
	var t_id=this.p_GetID(t_file);
	this.m_manager.p_SetPixmapFromID(t_p,t_id,t_file);
}
function c_PixmapStack(){
	Object.call(this);
	this.m_file="";
	this.m_new_file="";
	this.m_id=0;
	this.m_loading=false;
}
c_PixmapStack.m_new=function(t_f,t_nf,t_i){
	this.m_file=t_f;
	this.m_new_file=t_nf;
	this.m_id=t_i;
	return this;
}
c_PixmapStack.m_new2=function(){
	return this;
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
c_Stack2.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator.m_new.call(new c_Enumerator,this);
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
c_Stack2.prototype.p_Insert2=function(t_index,t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	for(var t_i=this.m_length;t_i>t_index;t_i=t_i+-1){
		this.m_data[t_i]=this.m_data[t_i-1];
	}
	this.m_data[t_index]=t_value;
	this.m_length+=1;
}
c_Stack2.prototype.p_IsEmpty=function(){
	return this.m_length==0;
}
c_Stack2.prototype.p_Backwards=function(){
	return c_BackwardsStack.m_new.call(new c_BackwardsStack,this);
}
c_Stack2.prototype.p_Equals=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_Stack2.prototype.p_RemoveEach=function(t_value){
	var t_i=0;
	var t_j=this.m_length;
	while(t_i<this.m_length){
		if(!this.p_Equals(this.m_data[t_i],t_value)){
			t_i+=1;
			continue;
		}
		var t_b=t_i;
		var t_e=t_i+1;
		while(t_e<this.m_length && this.p_Equals(this.m_data[t_e],t_value)){
			t_e+=1;
		}
		while(t_e<this.m_length){
			this.m_data[t_b]=this.m_data[t_e];
			t_b+=1;
			t_e+=1;
		}
		this.m_length-=t_e-t_b;
		t_i+=1;
	}
	t_i=this.m_length;
	while(t_i<t_j){
		this.m_data[t_i]=c_Stack2.m_NIL;
		t_i+=1;
	}
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
c_Stack2.prototype.p_Remove2=function(t_index){
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		this.m_data[t_i]=this.m_data[t_i+1];
	}
	this.m_length-=1;
	this.m_data[this.m_length]=c_Stack2.m_NIL;
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
function c_BackwardsStack(){
	Object.call(this);
	this.m_stack=null;
}
c_BackwardsStack.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_BackwardsStack.m_new2=function(){
	return this;
}
c_BackwardsStack.prototype.p_ObjectEnumerator=function(){
	return c_BackwardsEnumerator.m_new.call(new c_BackwardsEnumerator,this.m_stack);
}
function c_BackwardsEnumerator(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_BackwardsEnumerator.m_new=function(t_stack){
	this.m_stack=t_stack;
	this.m_index=t_stack.m_length;
	return this;
}
c_BackwardsEnumerator.m_new2=function(){
	return this;
}
c_BackwardsEnumerator.prototype.p_HasNext=function(){
	return this.m_index>0;
}
c_BackwardsEnumerator.prototype.p_NextObject=function(){
	this.m_index-=1;
	return this.m_stack.m_data[this.m_index];
}
function bb_functions_PreLoadPixmap(t_fs){
	return c_TPixmap.m_PreLoadPixmap(t_fs);
}
function bb_functions_PreLoadPixmap2(t_fs){
	return c_TPixmap.m_PreLoadPixmap([t_fs]);
}
function bb_mojographics_SetMojoEmulation(){
	c_MojoEmulationDevice.m_SetDevice();
}
function bb_opengles20_SetRender(t_flags){
	c_TRender.m_render=(c_OpenglES20.m_new.call(new c_OpenglES20));
	c_TRender.m_render.p_GraphicsInit(t_flags);
	bb_mojographics_SetMojoEmulation();
	return 0;
}
function c_List4(){
	Object.call(this);
	this.m__head=(c_HeadNode4.m_new.call(new c_HeadNode4));
}
c_List4.m_new=function(){
	return this;
}
c_List4.prototype.p_AddLast4=function(t_data){
	return c_Node5.m_new.call(new c_Node5,this.m__head,this.m__head.m__pred,t_data);
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
c_List4.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List4.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator2.m_new.call(new c_Enumerator2,this);
}
c_List4.prototype.p_ToArray=function(){
	var t_arr=new_string_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_StringList(){
	c_List4.call(this);
}
c_StringList.prototype=extend_class(c_List4);
c_StringList.m_new=function(t_data){
	c_List4.m_new2.call(this,t_data);
	return this;
}
c_StringList.m_new2=function(){
	c_List4.m_new.call(this);
	return this;
}
function c_Node5(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data="";
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
function c_HeadNode4(){
	c_Node5.call(this);
}
c_HeadNode4.prototype=extend_class(c_Node5);
c_HeadNode4.m_new=function(){
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
function bb_app_Millisecs(){
	return bb_app__game.Millisecs();
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
c_Stack3.m_NIL=null;
c_Stack3.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack3.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack3.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack3.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator3.m_new.call(new c_Enumerator3,this);
}
c_Stack3.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack3.m_NIL;
	}
	this.m_length=0;
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
function c_TextureStack(){
	c_Stack3.call(this);
}
c_TextureStack.prototype=extend_class(c_Stack3);
c_TextureStack.m_new=function(){
	c_Stack3.m_new.call(this);
	return this;
}
function c_Enumerator3(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator3.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator3.m_new2=function(){
	return this;
}
c_Enumerator3.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator3.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function c_Node6(){
	Object.call(this);
	this.m__pred=null;
	this.m__succ=null;
	this.m__data=null;
}
c_Node6.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
c_Node6.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node6.m_new2=function(){
	return this;
}
function c_TCamera(){
	c_TEntity.call(this);
	this.m_fov_y=.0;
	this.m_range_near=1.0;
	this.m_range_far=1000.0;
	this.m_aspect=.0;
	this.m_viewport=new_number_array(4);
	this.m_eyedx=0.0;
	this.m_focus=1.0;
	this.m_eyedy=0.0;
	this.m_proj_mode=1;
	this.m_proj_mat=c_Matrix.m_new.call(new c_Matrix);
	this.m_draw2D=0;
	this.m_oldw=0;
	this.m_vwidth=0;
	this.m_oldh=0;
	this.m_vheight=0;
	this.m_vx=0;
	this.m_vy=0;
	this.m_mod_mat=c_Matrix.m_new.call(new c_Matrix);
	this.m_view_mat=c_Matrix.m_new.call(new c_Matrix);
	this.m_projview_mat=c_Matrix.m_new.call(new c_Matrix);
	this.m_frustum=[];
	this.m_cls_color=true;
	this.m_cls_zbuffer=true;
	this.m_zoom=1.0;
	this.m_inv_zoom=1.0;
	this.m_cam_link=null;
	this.m_fog_mode=0;
	this.m_fog_r=.0;
	this.m_fog_g=.0;
	this.m_fog_b=.0;
	this.m_fog_range_near=1.0;
	this.m_fog_range_far=1000.0;
	this.m_cls_r=0.0;
	this.m_cls_g=0.0;
	this.m_cls_b=0.0;
}
c_TCamera.prototype=extend_class(c_TEntity);
c_TCamera.m_cam_list=null;
c_TCamera.prototype.p_SetPixelCamera=function(){
	if(((this.m_draw2D)!=0) && this.m_oldw==this.m_vwidth && this.m_oldh==this.m_vheight){
		return 0;
	}
	this.m_oldw=this.m_vwidth;
	this.m_oldh=this.m_vheight;
	this.m_draw2D=1;
	if(this.m_name==""){
		this.m_name="pixel";
	}
	var t_left=(this.m_vx)-(this.m_vwidth)*0.5;
	var t_right=(this.m_vwidth)+t_left;
	var t_bottom=(this.m_vy)-(this.m_vheight)/2.0;
	var t_top=(this.m_vheight)+t_bottom;
	var t_near=1.0;
	var t_far=2.0;
	var t_tx=-(t_right+t_left)/(t_right-t_left);
	var t_ty=-(t_top+t_bottom)/(t_top-t_bottom);
	var t_tz=-(t_far+t_near)/(t_far-t_near);
	this.m_proj_mat.m_grid[0][0]=2.0/(t_right-t_left);
	this.m_proj_mat.m_grid[0][1]=0.0;
	this.m_proj_mat.m_grid[0][2]=0.0;
	this.m_proj_mat.m_grid[0][3]=0.0;
	this.m_proj_mat.m_grid[1][0]=0.0;
	this.m_proj_mat.m_grid[1][1]=2.0/(t_top-t_bottom);
	this.m_proj_mat.m_grid[1][2]=0.0;
	this.m_proj_mat.m_grid[1][3]=0.0;
	this.m_proj_mat.m_grid[2][0]=0.0;
	this.m_proj_mat.m_grid[2][1]=0.0;
	this.m_proj_mat.m_grid[2][2]=-2.0/(t_far-t_near);
	this.m_proj_mat.m_grid[2][3]=0.0;
	this.m_proj_mat.m_grid[3][0]=t_tx-1.0;
	this.m_proj_mat.m_grid[3][1]=t_ty+1.0;
	this.m_proj_mat.m_grid[3][2]=t_tz;
	this.m_proj_mat.m_grid[3][3]=1.0;
	this.m_mod_mat.p_LoadIdentity();
	this.m_mat.p_LoadIdentity();
	this.m_view_mat=this.m_mod_mat;
	this.m_projview_mat.p_Overwrite(this.m_proj_mat);
	return 0;
}
c_TCamera.prototype.p_accFrustum=function(t_left_,t_right_,t_bottom,t_top,t_zNear,t_zFar,t_pixdx,t_pixdy){
	var t_xwsize=.0;
	var t_ywsize=.0;
	var t_dx=.0;
	var t_dy=.0;
	if(((t_pixdx)!=0.0) || ((t_pixdy)!=0.0)){
		t_xwsize=t_right_-t_left_;
		t_ywsize=t_top-t_bottom;
		t_dx=-(t_pixdx*t_xwsize/(this.m_viewport[2])+this.m_eyedx*t_zNear/this.m_focus);
		t_dy=-(t_pixdy*t_ywsize/(this.m_viewport[3])+this.m_eyedy*t_zNear/this.m_focus);
	}
	if(this.m_proj_mode==1){
		if(this.m_name==""){
			this.m_name="perspective";
		}
		t_left_+=t_dx;
		t_right_+=t_dx;
		t_bottom+=t_dy;
		t_top+=t_dy;
		this.m_proj_mat.m_grid[0][0]=2.0*t_zNear/(t_right_-t_left_);
		this.m_proj_mat.m_grid[1][0]=0.0;
		this.m_proj_mat.m_grid[2][0]=(t_right_+t_left_)/(t_right_-t_left_);
		this.m_proj_mat.m_grid[3][0]=0.0;
		this.m_proj_mat.m_grid[0][1]=0.0;
		this.m_proj_mat.m_grid[1][1]=2.0*t_zNear/(t_top-t_bottom);
		this.m_proj_mat.m_grid[2][1]=(t_top+t_bottom)/(t_top-t_bottom);
		this.m_proj_mat.m_grid[3][1]=0.0;
		this.m_proj_mat.m_grid[0][2]=0.0;
		this.m_proj_mat.m_grid[1][2]=0.0;
		this.m_proj_mat.m_grid[2][2]=-(t_zFar+t_zNear)/(t_zFar-t_zNear);
		this.m_proj_mat.m_grid[3][2]=-(2.0*t_zFar*t_zNear)/(t_zFar-t_zNear);
		this.m_proj_mat.m_grid[0][3]=0.0;
		this.m_proj_mat.m_grid[1][3]=0.0;
		this.m_proj_mat.m_grid[2][3]=-1.0;
		this.m_proj_mat.m_grid[3][3]=0.0;
	}else{
		if(this.m_proj_mode==2){
			if(this.m_name==""){
				this.m_name="isometric";
			}
			t_left_+=t_dx;
			t_right_+=t_dx;
			t_bottom+=t_dy;
			t_top+=t_dy;
			this.m_proj_mat.m_grid[0][0]=2.0/(t_right_-t_left_);
			this.m_proj_mat.m_grid[0][1]=0.0;
			this.m_proj_mat.m_grid[0][2]=0.0;
			this.m_proj_mat.m_grid[0][3]=0.0;
			this.m_proj_mat.m_grid[1][0]=0.0;
			this.m_proj_mat.m_grid[1][1]=2.0/(t_top-t_bottom);
			this.m_proj_mat.m_grid[1][2]=0.0;
			this.m_proj_mat.m_grid[1][3]=0.0;
			this.m_proj_mat.m_grid[2][0]=0.0;
			this.m_proj_mat.m_grid[2][1]=0.0;
			this.m_proj_mat.m_grid[2][2]=-2.0/(t_zFar-t_zNear);
			this.m_proj_mat.m_grid[2][3]=0.0;
			this.m_proj_mat.m_grid[3][0]=-(t_right_+t_left_)/(t_right_-t_left_);
			this.m_proj_mat.m_grid[3][1]=-(t_top+t_bottom)/(t_top-t_bottom);
			this.m_proj_mat.m_grid[3][2]=-(t_zFar+t_zNear)/(t_zFar-t_zNear);
			this.m_proj_mat.m_grid[3][3]=1.0;
		}else{
			if(this.m_proj_mode==3){
				this.p_SetPixelCamera();
			}
		}
	}
	return 0;
}
c_TCamera.prototype.p_accPerspective=function(t_fovy,t_zNear,t_zFar,t_pixdx,t_pixdy){
	var t_fov2=.0;
	var t_left_=.0;
	var t_right_=.0;
	var t_bottom=.0;
	var t_top=.0;
	t_fov2=t_fovy*0.5;
	t_top=t_zNear/(Math.cos((t_fov2)*D2R)/Math.sin((t_fov2)*D2R));
	t_bottom=-t_top;
	t_right_=t_top*this.m_aspect;
	t_left_=-t_right_;
	this.p_accFrustum(t_left_,t_right_,t_bottom,t_top,t_zNear,t_zFar,t_pixdx,t_pixdy);
	return 0;
}
c_TCamera.prototype.p_ExtractFrustum=function(){
	var t_clip=this.m_projview_mat.p_ToArray();
	var t_t=.0;
	this.m_frustum[0][0]=t_clip[3]-t_clip[0];
	this.m_frustum[0][1]=t_clip[7]-t_clip[4];
	this.m_frustum[0][2]=t_clip[11]-t_clip[8];
	this.m_frustum[0][3]=t_clip[15]-t_clip[12];
	t_t=1.0/Math.sqrt(this.m_frustum[0][0]*this.m_frustum[0][0]+this.m_frustum[0][1]*this.m_frustum[0][1]+this.m_frustum[0][2]*this.m_frustum[0][2]);
	this.m_frustum[0][0]*=t_t;
	this.m_frustum[0][1]*=t_t;
	this.m_frustum[0][2]*=t_t;
	this.m_frustum[0][3]*=t_t;
	this.m_frustum[1][0]=t_clip[3]+t_clip[0];
	this.m_frustum[1][1]=t_clip[7]+t_clip[4];
	this.m_frustum[1][2]=t_clip[11]+t_clip[8];
	this.m_frustum[1][3]=t_clip[15]+t_clip[12];
	t_t=1.0/Math.sqrt(this.m_frustum[1][0]*this.m_frustum[1][0]+this.m_frustum[1][1]*this.m_frustum[1][1]+this.m_frustum[1][2]*this.m_frustum[1][2]);
	this.m_frustum[1][0]*=t_t;
	this.m_frustum[1][1]*=t_t;
	this.m_frustum[1][2]*=t_t;
	this.m_frustum[1][3]*=t_t;
	this.m_frustum[2][0]=t_clip[3]+t_clip[1];
	this.m_frustum[2][1]=t_clip[7]+t_clip[5];
	this.m_frustum[2][2]=t_clip[11]+t_clip[9];
	this.m_frustum[2][3]=t_clip[15]+t_clip[13];
	t_t=1.0/Math.sqrt(this.m_frustum[2][0]*this.m_frustum[2][0]+this.m_frustum[2][1]*this.m_frustum[2][1]+this.m_frustum[2][2]*this.m_frustum[2][2]);
	this.m_frustum[2][0]*=t_t;
	this.m_frustum[2][1]*=t_t;
	this.m_frustum[2][2]*=t_t;
	this.m_frustum[2][3]*=t_t;
	this.m_frustum[3][0]=t_clip[3]-t_clip[1];
	this.m_frustum[3][1]=t_clip[7]-t_clip[5];
	this.m_frustum[3][2]=t_clip[11]-t_clip[9];
	this.m_frustum[3][3]=t_clip[15]-t_clip[13];
	t_t=1.0/Math.sqrt(this.m_frustum[3][0]*this.m_frustum[3][0]+this.m_frustum[3][1]*this.m_frustum[3][1]+this.m_frustum[3][2]*this.m_frustum[3][2]);
	this.m_frustum[3][0]*=t_t;
	this.m_frustum[3][1]*=t_t;
	this.m_frustum[3][2]*=t_t;
	this.m_frustum[3][3]*=t_t;
	this.m_frustum[4][0]=t_clip[3]-t_clip[2];
	this.m_frustum[4][1]=t_clip[7]-t_clip[6];
	this.m_frustum[4][2]=t_clip[11]-t_clip[10];
	this.m_frustum[4][3]=t_clip[15]-t_clip[14];
	t_t=1.0/Math.sqrt(this.m_frustum[4][0]*this.m_frustum[4][0]+this.m_frustum[4][1]*this.m_frustum[4][1]+this.m_frustum[4][2]*this.m_frustum[4][2]);
	this.m_frustum[4][0]*=t_t;
	this.m_frustum[4][1]*=t_t;
	this.m_frustum[4][2]*=t_t;
	this.m_frustum[4][3]*=t_t;
	this.m_frustum[5][0]=t_clip[3]+t_clip[2];
	this.m_frustum[5][1]=t_clip[7]+t_clip[6];
	this.m_frustum[5][2]=t_clip[11]+t_clip[10];
	this.m_frustum[5][3]=t_clip[15]+t_clip[14];
	t_t=1.0/Math.sqrt(this.m_frustum[5][0]*this.m_frustum[5][0]+this.m_frustum[5][1]*this.m_frustum[5][1]+this.m_frustum[5][2]*this.m_frustum[5][2]);
	this.m_frustum[5][0]*=t_t;
	this.m_frustum[5][1]*=t_t;
	this.m_frustum[5][2]*=t_t;
	this.m_frustum[5][3]*=t_t;
	return 0;
}
c_TCamera.prototype.p_Update2=function(t_cam){
	this.p_accPerspective(this.m_fov_y,this.m_range_near,this.m_range_far,0.0,0.0);
	this.m_mod_mat=this.m_mat.p_Inverse();
	if(((this.m_eyedx)!=0.0) || ((this.m_eyedy)!=0.0)){
		this.m_mod_mat.p_Translate(-this.m_eyedx,-this.m_eyedy,0.0);
	}
	this.m_view_mat=this.m_mod_mat;
	this.m_projview_mat.p_Overwrite(this.m_proj_mat);
	this.m_projview_mat.p_Multiply4(this.m_mod_mat);
	if((t_cam)!=null){
		this.p_ExtractFrustum();
	}
	return 0;
}
c_TCamera.prototype.p_EntityInFrustum=function(t_ent){
	var t_x=t_ent.p_EntityX(1);
	var t_y=t_ent.p_EntityY(1);
	var t_z=t_ent.p_EntityZ(1);
	var t_radius=bb_math_Abs2(t_ent.m_cull_radius);
	var t_mesh=object_downcast((t_ent),c_TMesh);
	if((t_mesh)!=null){
		var t_r=t_ent.m_mat.p_TransformPoint(t_mesh.m_center_x,t_mesh.m_center_y,t_mesh.m_center_z,1.0);
		t_x=t_r[0];
		t_y=t_r[1];
		t_z=t_r[2];
		var t_gs=bb_math_Max2(bb_math_Max2(t_ent.m_gsx,t_ent.m_gsy),t_ent.m_gsz);
		t_radius=t_radius*t_gs;
		if(t_radius<0.0){
			t_radius=-t_radius;
		}
	}
	var t_d=.0;
	t_d=this.m_frustum[0][0]*t_x+this.m_frustum[0][1]*t_y+this.m_frustum[0][2]*t_z+this.m_frustum[0][3];
	if(t_d<=-t_radius){
		return 0.0;
	}
	t_d=this.m_frustum[1][0]*t_x+this.m_frustum[1][1]*t_y+this.m_frustum[1][2]*t_z+this.m_frustum[1][3];
	if(t_d<=-t_radius){
		return 0.0;
	}
	t_d=this.m_frustum[2][0]*t_x+this.m_frustum[2][1]*t_y+this.m_frustum[2][2]*t_z+this.m_frustum[2][3];
	if(t_d<=-t_radius){
		return 0.0;
	}
	t_d=this.m_frustum[3][0]*t_x+this.m_frustum[3][1]*t_y+this.m_frustum[3][2]*t_z+this.m_frustum[3][3];
	if(t_d<=-t_radius){
		return 0.0;
	}
	t_d=this.m_frustum[4][0]*t_x+this.m_frustum[4][1]*t_y+this.m_frustum[4][2]*t_z+this.m_frustum[4][3];
	if(t_d<=-t_radius){
		return 0.0;
	}
	t_d=this.m_frustum[5][0]*t_x+this.m_frustum[5][1]*t_y+this.m_frustum[5][2]*t_z+this.m_frustum[5][3];
	if(t_d<=-t_radius){
		return 0.0;
	}
	return t_d+t_radius;
}
c_TCamera.m_new=function(){
	c_TEntity.m_new.call(this);
	this.m_frustum=bb_monkeyutility_AllocateFloatArray(6,4);
	return this;
}
c_TCamera.prototype.p_CameraClsMode=function(t_color,t_zbuffer){
	this.m_cls_color=t_color;
	this.m_cls_zbuffer=t_zbuffer;
	return 0;
}
c_TCamera.prototype.p_CameraZoom=function(t_zoom_val){
	this.m_zoom=t_zoom_val;
	this.m_inv_zoom=1.0/t_zoom_val;
	this.m_fov_y=(Math.atan(1.0/(this.m_zoom*((this.m_vwidth)/(this.m_vheight))))*R2D)*2.0;
	return 0;
}
c_TCamera.prototype.p_CameraViewport=function(t_x,t_y,t_w,t_h){
	this.m_vx=t_x;
	this.m_vy=c_TRender.m_height-t_h-t_y;
	this.m_vwidth=t_w;
	this.m_vheight=t_h;
	this.p_CameraZoom(this.m_zoom);
	this.m_aspect=(this.m_vwidth)/(this.m_vheight);
	this.m_viewport[0]=this.m_vx;
	this.m_viewport[1]=this.m_vy;
	this.m_viewport[2]=t_w;
	this.m_viewport[3]=t_h;
	return 0;
}
c_TCamera.m_CreateCamera=function(t_parent_ent){
	var t_cam=c_TCamera.m_new.call(new c_TCamera);
	t_cam.p_CameraViewport(0,0,c_TRender.m_width,c_TRender.m_height);
	t_cam.m_classname="Camera";
	t_cam.m_name="proj"+String(c_TCamera.m_cam_list.p_Count());
	t_cam.p_AddParent(t_parent_ent);
	t_cam.m_entity_link=c_TEntity.m_entity_list.p_EntityListAdd(t_cam);
	t_cam.m_cam_link=c_TCamera.m_cam_list.p_EntityListAdd2(t_cam);
	if(t_cam.m_parent!=null){
		t_cam.m_mat.p_Overwrite(t_cam.m_parent.m_mat);
		t_cam.p_UpdateMat(false);
	}else{
		t_cam.p_UpdateMat(true);
	}
	return t_cam;
}
c_TCamera.prototype.p_CameraClsColor=function(t_r,t_g,t_b){
	this.m_cls_r=t_r/255.0;
	this.m_cls_g=t_g/255.0;
	this.m_cls_b=t_b/255.0;
	return 0;
}
c_TCamera.prototype.p_CameraScissor=function(t_x,t_y,t_w,t_h){
	if(t_x<0){
		t_x=0;
	}
	if(t_x>c_TRender.m_width){
		t_x=c_TRender.m_width;
	}
	if(t_y<0){
		t_y=0;
	}
	if(t_y>c_TRender.m_height){
		t_y=c_TRender.m_height;
	}
	if(t_w<0){
		t_w=0;
	}
	if(t_w>c_TRender.m_width){
		t_w=c_TRender.m_width;
	}
	if(t_h<0){
		t_h=0;
	}
	if(t_h>c_TRender.m_height){
		t_h=c_TRender.m_height;
	}
	t_y=c_TRender.m_height-t_h-t_y;
	this.m_viewport[0]=t_x;
	this.m_viewport[1]=t_y;
	this.m_viewport[2]=t_w;
	this.m_viewport[3]=t_h;
	return 0;
}
function c_List5(){
	Object.call(this);
	this.m__head=(c_HeadNode5.m_new.call(new c_HeadNode5));
}
c_List5.m_new=function(){
	return this;
}
c_List5.prototype.p_AddLast5=function(t_data){
	return c_Node7.m_new.call(new c_Node7,this.m__head,this.m__head.m__pred,t_data);
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
c_List5.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator4.m_new.call(new c_Enumerator4,this);
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
c_List5.prototype.p_FirstNode=function(){
	if(this.m__head.m__succ!=this.m__head){
		return this.m__head.m__succ;
	}
	return null;
}
c_List5.prototype.p_AddFirst2=function(t_data){
	return c_Node7.m_new.call(new c_Node7,this.m__head.m__succ,this.m__head,t_data);
}
function c_EntityList2(){
	c_List5.call(this);
}
c_EntityList2.prototype=extend_class(c_List5);
c_EntityList2.m_new=function(){
	c_List5.m_new.call(this);
	return this;
}
c_EntityList2.prototype.p_EntityListAdd2=function(t_obj){
	var t_llink=this.p_FirstNode();
	if(t_obj.m_order>0){
		t_llink=this.p_AddFirst2(t_obj);
		return t_llink;
	}else{
		t_llink=this.p_AddLast5(t_obj);
		return t_llink;
	}
}
function c_Node7(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node7.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node7.m_new2=function(){
	return this;
}
function c_HeadNode5(){
	c_Node7.call(this);
}
c_HeadNode5.prototype=extend_class(c_Node7);
c_HeadNode5.m_new=function(){
	c_Node7.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
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
function c_TShader(){
	c_TBrush.call(this);
	this.m_active=0;
	this.m_override=false;
	this.m_shader_id=0;
	this.m_vertex_id=0;
	this.m_fragment_id=0;
}
c_TShader.prototype=extend_class(c_TBrush);
c_TShader.m_process_list=null;
c_TShader.m_PreProcess=function(t_cam){
	var t_=c_TShader.m_process_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_sh=t_.p_NextObject();
		object_implements((t_sh),"c_IShaderProcess").p_PreProcess(t_cam);
	}
	return 0;
}
c_TShader.m_g_shader=null;
c_TShader.m_PostProcess=function(t_cam){
	var t_=c_TShader.m_process_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_sh=t_.p_NextObject();
		object_implements((t_sh),"c_IShaderProcess").p_PostProcess(t_cam);
	}
	return 0;
}
c_TShader.m_default_shader=null;
c_TShader.m_DefaultShader=function(){
	if(!((c_TShader.m_g_shader)!=null)){
		return null;
	}
	c_TShader.m_g_shader.m_active=0;
	c_TShader.m_g_shader=c_TShader.m_default_shader;
	c_TShader.m_g_shader.m_active=1;
	return c_TShader.m_default_shader;
}
c_TShader.prototype.p_Update=function(){
	return 0;
}
c_TShader.m_new=function(){
	c_TBrush.m_new.call(this);
	return this;
}
c_TShader.prototype.p_ResetShader=function(){
}
c_TShader.prototype.p_CompileShader=function(t_source,t_type){
}
c_TShader.m_LoadDefaultShader=function(t_vp_file,t_fp_file){
	return null;
}
c_TShader.m_SetShader=function(t_sh){
	if((c_TShader.m_g_shader)!=null){
		c_TShader.m_g_shader.m_active=0;
	}
	c_TShader.m_g_shader=t_sh;
	c_TShader.m_g_shader.m_active=1;
	return 0;
}
c_TShader.m_LoadDefaultShader2=function(t_sh){
	c_TShader.m_default_shader=t_sh;
	c_TShader.m_SetShader(c_TShader.m_default_shader);
}
c_TShader.prototype.p_Copy=function(){
}
function c_List6(){
	Object.call(this);
	this.m__head=(c_HeadNode6.m_new.call(new c_HeadNode6));
}
c_List6.m_new=function(){
	return this;
}
c_List6.prototype.p_AddLast6=function(t_data){
	return c_Node8.m_new.call(new c_Node8,this.m__head,this.m__head.m__pred,t_data);
}
c_List6.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast6(t_t);
	}
	return this;
}
c_List6.prototype.p_ObjectEnumerator=function(){
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
function c_HeadNode6(){
	c_Node8.call(this);
}
c_HeadNode6.prototype=extend_class(c_Node8);
c_HeadNode6.m_new=function(){
	c_Node8.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
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
function c_TLight(){
	c_TEntity.call(this);
	this.m_light_type=0;
	this.m_light_link=null;
	this.m_const_att=0.5;
	this.m_lin_att=1.0;
	this.m_quad_att=0.0;
	this.m_actual_range=1000.0;
	this.m_red=1.0;
	this.m_green=1.0;
	this.m_blue=1.0;
	this.m_outer_ang=45.0;
	this.m_inner_ang=0.0;
	this.m_spot_exp=10.0;
}
c_TLight.prototype=extend_class(c_TEntity);
c_TLight.m_light_list=null;
c_TLight.m_no_lights=0;
c_TLight.m_max_lights=0;
c_TLight.m_new=function(){
	c_TEntity.m_new.call(this);
	return this;
}
c_TLight.m_CreateLight=function(t_l_type,t_parent_ent){
	if(c_TLight.m_no_lights>=c_TLight.m_max_lights){
		return null;
	}
	var t_light=c_TLight.m_new.call(new c_TLight);
	t_light.m_light_type=t_l_type;
	t_light.m_classname="Light";
	c_TLight.m_no_lights=c_TLight.m_no_lights+1;
	t_light.m_light_link=c_TLight.m_light_list.p_AddLast7(t_light);
	t_light.m_entity_link=c_TEntity.m_entity_list.p_EntityListAdd(t_light);
	if((t_parent_ent)!=null){
		t_light.p_AddParent(t_parent_ent);
	}
	if(t_light.m_light_type==1){
		t_light.m_const_att=10.0;
		t_light.m_lin_att=10.0;
	}
	if(t_light.m_parent!=null){
		t_light.m_mat.p_Overwrite(t_light.m_parent.m_mat);
		t_light.p_UpdateMat(false);
	}else{
		t_light.p_UpdateMat(true);
	}
	return t_light;
}
c_TLight.m_ambient_red=0;
c_TLight.m_ambient_green=0;
c_TLight.m_ambient_blue=0;
function c_List7(){
	Object.call(this);
	this.m__head=(c_HeadNode7.m_new.call(new c_HeadNode7));
}
c_List7.m_new=function(){
	return this;
}
c_List7.prototype.p_AddLast7=function(t_data){
	return c_Node9.m_new.call(new c_Node9,this.m__head,this.m__head.m__pred,t_data);
}
c_List7.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast7(t_t);
	}
	return this;
}
c_List7.prototype.p_ObjectEnumerator=function(){
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
function c_HeadNode7(){
	c_Node9.call(this);
}
c_HeadNode7.prototype=extend_class(c_Node9);
c_HeadNode7.m_new=function(){
	c_Node9.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
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
function c_RenderAlphaList(){
	c_List3.call(this);
}
c_RenderAlphaList.prototype=extend_class(c_List3);
c_RenderAlphaList.m_new=function(){
	c_List3.m_new.call(this);
	return this;
}
c_RenderAlphaList.prototype.p_Compare2=function(t_left,t_right){
	if(t_left.m_alpha_order>t_right.m_alpha_order){
		return -1;
	}
	return ((t_left.m_alpha_order<t_right.m_alpha_order)?1:0);
}
function c_Enumerator7(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator7.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator7.m_new2=function(){
	return this;
}
c_Enumerator7.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator7.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Enumerator8(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator8.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator8.m_new2=function(){
	return this;
}
c_Enumerator8.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator8.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_VertexDataBuffer(){
	Object.call(this);
	this.m_buf=null;
}
c_VertexDataBuffer.m_new=function(){
	return this;
}
c_VertexDataBuffer.prototype.p_GetVertCoords=function(t_vec,t_vid){
	var t_v=t_vid*64+0;
	t_vec.m_x=this.m_buf.PeekFloat(t_v+0);
	t_vec.m_y=this.m_buf.PeekFloat(t_v+4);
	t_vec.m_z=this.m_buf.PeekFloat(t_v+8);
}
c_VertexDataBuffer.m_Create=function(t_i){
	var t_b=c_VertexDataBuffer.m_new.call(new c_VertexDataBuffer);
	t_b.m_buf=bb_monkeybuffer_CreateDataBuffer((t_i+1)*64);
	return t_b;
}
c_VertexDataBuffer.prototype.p_PokeFloatArray=function(t_i,t_arr,t_len){
	if(t_len==-1){
		t_len=t_arr.length;
	}
	for(var t_v=0;t_v<=t_len-1;t_v=t_v+1){
		this.m_buf.PokeFloat(t_i*64+t_v*4,t_arr[t_v]);
	}
}
c_VertexDataBuffer.prototype.p_PokeNormals=function(t_i,t_x,t_y,t_z){
	var t_index=t_i*64+16;
	this.m_buf.PokeFloat(t_index,t_x);
	this.m_buf.PokeFloat(t_index+4,t_y);
	this.m_buf.PokeFloat(t_index+8,t_z);
	return 0;
}
c_VertexDataBuffer.prototype.p_PokeTexCoords0=function(t_i,t_s0,t_t0){
	var t_index=t_i*64+48;
	this.m_buf.PokeFloat(t_index,t_s0);
	this.m_buf.PokeFloat(t_index+4,t_t0);
	return 0;
}
c_VertexDataBuffer.prototype.p_PokeTexCoords1=function(t_i,t_s1,t_t1){
	var t_index=t_i*64+48;
	this.m_buf.PokeFloat(t_index+8,t_s1);
	this.m_buf.PokeFloat(t_index+12,t_t1);
	return 0;
}
c_VertexDataBuffer.prototype.p_VertexX=function(t_vid){
	return this.m_buf.PeekFloat(t_vid*64+0+0);
}
c_VertexDataBuffer.prototype.p_VertexY=function(t_vid){
	return this.m_buf.PeekFloat(t_vid*64+0+4);
}
c_VertexDataBuffer.prototype.p_VertexZ=function(t_vid){
	return this.m_buf.PeekFloat(t_vid*64+0+8);
}
c_VertexDataBuffer.prototype.p_PeekVertCoords=function(t_vid){
	var t_v=t_vid*64+0;
	return c_Vector.m_new.call(new c_Vector,this.m_buf.PeekFloat(t_v+0),this.m_buf.PeekFloat(t_v+4),this.m_buf.PeekFloat(t_v+8));
}
c_VertexDataBuffer.prototype.p_PokeColor=function(t_i,t_r,t_g,t_b,t_a){
	var t_index=t_i*64+32;
	this.m_buf.PokeFloat(t_index,t_r);
	this.m_buf.PokeFloat(t_index+4,t_g);
	this.m_buf.PokeFloat(t_index+8,t_b);
	this.m_buf.PokeFloat(t_index+12,t_a);
	return 0;
}
function c_DataBuffer(){
	BBDataBuffer.call(this);
}
c_DataBuffer.prototype=extend_class(BBDataBuffer);
c_DataBuffer.m_new=function(t_length,t_direct){
	if(!this._New(t_length)){
		error("Allocate DataBuffer failed");
	}
	return this;
}
c_DataBuffer.m_new2=function(){
	return this;
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
function c_Enumerator9(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator9.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator9.m_new2=function(){
	return this;
}
c_Enumerator9.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator9.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_monkeybuffer_CreateDataBuffer(t_i){
	return c_DataBuffer.m_new.call(new c_DataBuffer,t_i,false);
}
function bb_monkeybuffer_GetBufferLength(t_buf){
	return t_buf.Length();
}
function bb_monkeybuffer_CopyDataBuffer(t_src,t_dest){
	if(t_src==null){
		return t_dest;
	}
	var t_size=bb_monkeybuffer_GetBufferLength(t_src);
	if(bb_monkeybuffer_GetBufferLength(t_dest)<t_size){
		t_size=bb_monkeybuffer_GetBufferLength(t_dest);
	}
	for(var t_i=0;t_i<=t_size-1;t_i=t_i+1){
		t_dest.PokeByte(t_i,t_src.PeekByte(t_i));
	}
	return t_dest;
}
function bb_monkeybuffer_CopyDataBuffer2(t_src,t_dest){
	if(t_src.m_buf==null){
		return t_dest;
	}
	var t_size=bb_monkeybuffer_GetBufferLength(t_src.m_buf);
	if(bb_monkeybuffer_GetBufferLength(t_dest.m_buf)<t_size){
		t_size=bb_monkeybuffer_GetBufferLength(t_dest.m_buf);
	}
	for(var t_i=0;t_i<=t_size-1;t_i=t_i+4){
		t_dest.m_buf.PokeInt(t_i,t_src.m_buf.PeekInt(t_i));
	}
	return t_dest;
}
function bb_monkeybuffer_CopyDataBuffer3(t_src,t_dest,t_begin,t_bend){
	if(t_src.m_buf==null){
		return t_dest;
	}
	t_begin*=64;
	t_bend*=64;
	if(t_begin==0 && t_bend==0){
		t_bend=bb_monkeybuffer_GetBufferLength(t_src.m_buf)-1;
	}
	if(bb_monkeybuffer_GetBufferLength(t_dest.m_buf)-1<t_bend){
		t_bend=bb_monkeybuffer_GetBufferLength(t_dest.m_buf)-1;
	}
	for(var t_i=t_begin;t_i<=t_bend;t_i=t_i+4){
		t_dest.m_buf.PokeInt(t_i,t_src.m_buf.PeekInt(t_i));
	}
	return t_dest;
}
function c_ShortBuffer(){
	Object.call(this);
	this.m_buf=null;
}
c_ShortBuffer.m_new=function(){
	return this;
}
c_ShortBuffer.m_i2f=null;
c_ShortBuffer.m_Create=function(t_i){
	c_ShortBuffer.m_i2f=bb_monkeybuffer_CreateDataBuffer(4);
	var t_b=c_ShortBuffer.m_new.call(new c_ShortBuffer);
	t_b.m_buf=bb_monkeybuffer_CreateDataBuffer(t_i*2+1);
	return t_b;
}
c_ShortBuffer.prototype.p_Length2=function(){
	return (((bb_monkeybuffer_GetBufferLength(this.m_buf))*0.5)|0);
}
c_ShortBuffer.prototype.p_Peek=function(t_i){
	return this.m_buf.PeekShort(t_i*2);
}
c_ShortBuffer.prototype.p_Poke=function(t_i,t_arr,t_len){
	if(t_len==-1){
		t_len=t_arr.length;
	}
	for(var t_v=0;t_v<=t_len-1;t_v=t_v+1){
		this.m_buf.PokeShort((t_i+t_v)*2,t_arr[t_v]);
	}
}
c_ShortBuffer.prototype.p_Poke2=function(t_i,t_v){
	this.m_buf.PokeShort(t_i*2,t_v);
}
function bb_monkeybuffer_CopyShortBuffer(t_src,t_dest){
	if(t_src==null || t_src.m_buf==null){
		return t_dest;
	}
	var t_size=t_src.p_Length2();
	if(t_dest.p_Length2()<t_size){
		t_size=t_dest.p_Length2();
	}
	for(var t_i=0;t_i<=t_size-1;t_i=t_i+1){
		t_dest.p_Poke2(t_i,t_src.p_Peek(t_i));
	}
	return t_dest;
}
function bb_monkeyutility_AllocateFloatArray(t_i,t_j){
	var t_arr=new_array_array(t_i);
	for(var t_ind=0;t_ind<t_i;t_ind=t_ind+1){
		t_arr[t_ind]=new_number_array(t_j);
	}
	return t_arr;
}
function c_TSprite(){
	c_TMesh.call(this);
	this.m_pixel_scale=new_number_array(2);
	this.m_mat_sp=c_Matrix.m_new.call(new c_Matrix);
	this.m_scale_x=1.0;
	this.m_scale_y=1.0;
	this.m_view_mode=1;
	this.m_angle=.0;
	this.m_handle_x=.0;
	this.m_handle_y=.0;
	this.implments={c_IRenderUpdate:1};
}
c_TSprite.prototype=extend_class(c_TMesh);
c_TSprite.prototype.p_ScaleSprite=function(t_s_x,t_s_y){
	this.m_scale_x=t_s_x;
	this.m_scale_y=t_s_y;
	if((this.m_parent)!=null){
		this.m_gsx=t_s_x*this.m_parent.m_gsx;
		this.m_gsy=t_s_y*this.m_parent.m_gsy;
		this.m_gsz=this.m_gsx;
	}else{
		this.m_gsx=t_s_x;
		this.m_gsy=t_s_y;
		this.m_gsz=this.m_gsx;
	}
	return (this);
}
c_TSprite.prototype.p_ScaleEntity=function(t_x,t_y,t_z,t_glob){
	this.p_ScaleSprite(t_x,t_y);
	return (this);
}
c_TSprite.m_temp_mat=null;
c_TSprite.prototype.p_Update2=function(t_cam){
	if(this.m_view_mode!=2){
		var t_x=this.m_mat.m_grid[3][0];
		var t_y=this.m_mat.m_grid[3][1];
		var t_z=this.m_mat.m_grid[3][2];
		c_TSprite.m_temp_mat.p_Overwrite(t_cam.m_mat);
		c_TSprite.m_temp_mat.m_grid[3][0]=t_x;
		c_TSprite.m_temp_mat.m_grid[3][1]=t_y;
		c_TSprite.m_temp_mat.m_grid[3][2]=t_z;
		this.m_mat_sp.p_Overwrite(c_TSprite.m_temp_mat);
		if(this.m_angle!=0.0){
			this.m_mat_sp.p_RotateRoll(this.m_angle);
		}
		if(this.m_scale_x!=1.0 || this.m_scale_y!=1.0){
			this.m_mat_sp.p_Scale(this.m_scale_x,this.m_scale_y,1.0);
		}
		if(this.m_handle_x!=0.0 || this.m_handle_y!=0.0){
			this.m_mat_sp.p_Translate(-this.m_handle_x,-this.m_handle_y,0.0);
		}
	}else{
		this.m_mat_sp.p_Overwrite(this.m_mat);
		if(this.m_scale_x!=1.0 || this.m_scale_y!=1.0){
			this.m_mat_sp.p_Scale(this.m_scale_x,this.m_scale_y,1.0);
		}
	}
	return 0;
}
function bb_functions_RenderWorld(){
	c_TRender.m_RenderWorld();
	return 0;
}
function c_TModelObj(){
	Object.call(this);
	this.m_data="";
	this.m_length=0;
	this.m_pos=0;
	this.m_stack=c_StringStack.m_new2.call(new c_StringStack);
}
c_TModelObj.m_override_texflags=0;
c_TModelObj.m_new=function(){
	return this;
}
c_TModelObj.prototype.p_ReadLine=function(){
	var t_s="";
	this.m_stack.p_Clear();
	while(!(this.m_data.charCodeAt(this.m_pos)==10 || this.m_data.charCodeAt(this.m_pos)==13)){
		if(this.m_pos<this.m_data.length){
			if(this.m_data.charCodeAt(this.m_pos)>0){
				this.m_stack.p_Push10(String.fromCharCode(this.m_data.charCodeAt(this.m_pos)));
			}
			this.m_pos+=1;
		}else{
			break;
		}
	}
	this.m_pos+=1;
	if(this.m_pos<this.m_data.length){
		if(this.m_data.charCodeAt(this.m_pos)==10 || this.m_data.charCodeAt(this.m_pos)==13){
			this.m_pos+=1;
		}
	}
	return this.m_stack.p_Join("");
}
c_TModelObj.m_url_path="";
c_TModelObj.m_ParseMTLLib=function(t_url,t_mtllib_string){
	var t_MatLib=new_object_array(0);
	var t_stream=c_TModelObj.m_new.call(new c_TModelObj);
	t_stream.m_data=bb_app_LoadString(t_url);
	if(!((t_stream.m_data).length!=0) && ((t_mtllib_string).length!=0)){
		t_stream.m_data=t_mtllib_string;
	}
	if(!((t_stream.m_data).length!=0)){
		t_stream.m_data=bb_app_LoadString(t_url+".txt");
		if(!((t_stream.m_data).length!=0)){
			print("**TModelObj: Material obj file not found: "+t_url);
			return t_MatLib;
		}
	}
	t_stream.m_length=t_stream.m_data.length;
	var t_CMI=-1;
	var t_is_brush=0;
	while(t_stream.m_pos<t_stream.m_length){
		var t_Line=t_stream.p_ReadLine();
		var t_tag=t_Line.slice(0,9).toLowerCase();
		if(t_tag.slice(0,7)=="newmtl "){
			t_MatLib=resize_object_array(t_MatLib,t_MatLib.length+1);
			t_CMI=t_MatLib.length-1;
			t_MatLib[t_CMI]=c_TObjMtl.m_new.call(new c_TObjMtl);
			t_MatLib[t_CMI].m_name=string_trim(t_Line.slice(7));
			t_MatLib[t_CMI].m_brush=bb_functions_CreateBrush(255.0,255.0,255.0);
			t_MatLib[t_CMI].m_brush.p_BrushFX(0);
			t_MatLib[t_CMI].m_brush.m_name=t_MatLib[t_CMI].m_name;
			t_is_brush=1;
		}
		if(t_tag.slice(0,3)=="kd " && ((t_is_brush)!=0)){
			var t_data=string_trim(t_Line.slice(3))+" ";
			var t_f=new_number_array(3);
			for(var t_i=0;t_i<=2;t_i=t_i+1){
				var t_fl=t_data.indexOf(" ",0);
				if(t_i<2){
					t_f[t_i]=parseFloat(t_data.slice(0,t_fl));
				}else{
					t_f[t_i]=parseFloat(t_data);
				}
				t_data=t_data.slice(t_fl+1);
			}
			t_MatLib[t_CMI].m_brush.p_BrushColorFloat(t_f[0],t_f[1],t_f[2],-1.0);
		}
		if(t_tag.slice(0,2)=="d " && ((t_is_brush)!=0)){
			t_MatLib[t_CMI].m_brush.p_BrushAlpha(parseFloat(t_Line.slice(2)));
		}
		if(t_tag.slice(0,3)=="tr " && ((t_is_brush)!=0)){
			t_MatLib[t_CMI].m_brush.p_BrushAlpha(parseFloat(t_Line.slice(2)));
		}
		if(t_tag.slice(0,7)=="map_kd " && ((t_is_brush)!=0)){
			var t_texfile=string_trim(t_Line.slice(7)).split("\\");
			if(t_texfile.length<2){
				t_texfile=string_trim(t_Line.slice(7)).split("/");
			}
			t_texfile[0]=t_texfile[t_texfile.length-1];
			var t_flags=c_TTexture.m_default_texflags;
			if(c_TModelObj.m_override_texflags>-1){
				t_flags=c_TModelObj.m_override_texflags;
			}
			t_MatLib[t_CMI].m_texture=bb_functions_LoadTexture(c_TModelObj.m_url_path+t_texfile[0],t_flags);
			if(t_MatLib[t_CMI].m_texture.p_TextureHeight()>1){
				t_MatLib[t_CMI].m_brush.p_BrushTexture(t_MatLib[t_CMI].m_texture,0,0);
			}else{
			}
		}
	}
	return t_MatLib;
}
c_TModelObj.m_CustomSplit=function(t_st,t_delim){
	var t_out=new_string_array(3);
	if(t_st.length<1){
		return [""];
	}
	var t_n=0;
	var t_nn=0;
	var t_reset=1;
	var t_s="";
	for(var t_i=0;t_i<=t_st.length-1;t_i=t_i+1){
		if((t_reset)!=0){
			t_out[t_n]="0";
			t_reset=0;
		}
		if(t_st.charCodeAt(t_i)==t_delim.charCodeAt(0)){
			var t_ii=t_i+t_nn;
			t_s=t_st.slice(t_i,t_ii);
			t_n+=1;
			t_reset=1;
			t_nn=0;
		}else{
			t_out[t_n]=t_out[t_n]+String.fromCharCode(t_st.charCodeAt(t_i));
			t_nn+=1;
		}
	}
	return t_out;
}
c_TModelObj.m_ParseFaces=function(t_data){
	var t_data1=t_data.split(" ");
	var t_s=0;
	var t_fdata=new_object_array(t_data1.length);
	for(var t_i=0;t_i<=t_data1.length-1;t_i=t_i+1){
		if(t_data1[t_i]==""){
			continue;
		}
		t_fdata[t_s]=c_TFaceData.m_new.call(new c_TFaceData);
		var t_D2=c_TModelObj.m_CustomSplit(t_data1[t_i],"/");
		if(t_D2[0]!=""){
			t_fdata[t_s].m_vi=parseInt((t_D2[0]),10);
		}
		if(t_D2[1]!=""){
			t_fdata[t_s].m_ti=parseInt((t_D2[1]),10);
		}
		if(t_D2[2]!=""){
			t_fdata[t_s].m_ni=parseInt((t_D2[2]),10);
		}
		if(t_fdata[t_s].m_vi<0){
			t_fdata[t_s].m_vi=0;
		}
		if(t_fdata[t_s].m_ti<0){
			t_fdata[t_s].m_ti=0;
		}
		if(t_fdata[t_s].m_ni<0){
			t_fdata[t_s].m_ni=0;
		}
		t_s+=1;
	}
	t_fdata=resize_object_array(t_fdata,t_s);
	return t_fdata;
}
c_TModelObj.m_ParseObj=function(t_s,t_flags,t_mtllib_string){
	var t_stream=c_TModelObj.m_new.call(new c_TModelObj);
	t_stream.m_data=t_s;
	t_stream.m_length=t_stream.m_data.length;
	var t_StreamLine=0;
	if(t_stream.m_length==0){
		return null;
	}
	var t_matlibs=c_StringMap.m_new.call(new c_StringMap);
	var t_vertexP=new_object_array(1024);
	var t_vertexN=new_object_array(1024);
	var t_vertexT=new_object_array(1024);
	var t_faces=new_object_array(1024);
	var t_gname="";
	var t_snumber=-1;
	var t_curmtl="";
	var t_Readface=true;
	var t_vertsAdded=false;
	var t_hasNorms=0;
	var t_VC=0;
	var t_VN=0;
	var t_VT=0;
	var t_FC=0;
	var t_TRI=0;
	var t_SC=0;
	var t_mesh=c_TMesh.m_CreateMesh(null);
	var t_surface=null;
	var t_surfaceCache=new_number_array(255);
	var t_mtlCache=new_string_array(255);
	var t_currMtl=null;
	while(t_stream.m_pos<t_stream.m_length){
		var t_Line=string_trim(t_stream.p_ReadLine());
		if(t_Line.length<1){
			continue;
		}
		if(String(t_Line.charCodeAt(0))=="#"){
		}else{
			var t_tag=t_Line.slice(0,9).toLowerCase();
			if(t_tag.slice(0,2)=="o "){
				t_mesh.m_name=t_Line.slice(2);
			}
			if(t_tag.slice(0,2)=="v "){
				if(t_VC>=t_vertexP.length-1){
					t_vertexP=resize_object_array(t_vertexP,t_vertexP.length+1024);
				}
				t_vertexP[t_VC+1]=c_TObjVertex.m_new.call(new c_TObjVertex);
				t_vertexP[t_VC+1].p_GetValues(t_Line.slice(2));
				t_VC+=1;
			}
			if(t_tag.slice(0,3)=="vn "){
				if(t_VN>=t_vertexN.length-1){
					t_vertexN=resize_object_array(t_vertexN,t_vertexN.length+1024);
				}
				t_vertexN[t_VN+1]=c_TObjNormal.m_new.call(new c_TObjNormal);
				t_vertexN[t_VN+1].p_GetValues(t_Line.slice(3));
				t_VN+=1;
				t_hasNorms=1;
			}
			if(t_tag.slice(0,3)=="vt "){
				if(t_VT>=t_vertexT.length-1){
					t_vertexT=resize_object_array(t_vertexT,t_vertexT.length+1024);
				}
				t_vertexT[t_VT+1]=c_TObjTexCoord.m_new.call(new c_TObjTexCoord);
				t_vertexT[t_VT+1].p_GetValues(t_Line.slice(3));
				t_VT+=1;
			}
			if(t_tag.slice(0,2)=="g "){
				t_gname=t_Line.slice(2).toLowerCase();
			}
			if(t_tag.slice(0,2)=="s "){
				var t_tt=t_Line.slice(2).toLowerCase();
				if(t_tt!="off"){
					t_snumber=parseInt((t_Line.slice(2)),10);
				}
			}
			if(t_tag.slice(0,7)=="mtllib "){
				var t_lib=c_TModelObj.m_ParseMTLLib(c_TModelObj.m_url_path+t_Line.slice(7),t_mtllib_string);
				var t_=t_lib;
				var t_2=0;
				while(t_2<t_.length){
					var t_obj=t_[t_2];
					t_2=t_2+1;
					if((t_obj)!=null){
						t_matlibs.p_Set2(t_obj.m_name,t_obj);
					}
				}
			}
			if(t_tag.slice(0,7)=="usemtl "){
				t_currMtl=t_matlibs.p_Get(string_trim(t_Line.slice(7)));
				var t_mmtrue=0;
				var t_surfnum=0;
				if(t_currMtl!=null){
					if((t_currMtl.m_meshSurface)!=null){
					}else{
						t_currMtl.m_meshSurface=t_mesh.p_CreateSurface(null);
						t_currMtl.m_meshSurface.p_PaintSurface(t_currMtl.m_brush);
						t_SC+=1;
					}
					t_surface=t_currMtl.m_meshSurface;
					if(!((t_currMtl.m_cache)!=null)){
						t_currMtl.m_cache=c_VertCache.m_new.call(new c_VertCache,16);
					}
					while(t_currMtl.m_cache.m_size<t_VC+1){
						t_currMtl.m_cache=c_VertCache.m_new.call(new c_VertCache,t_currMtl.m_cache.m_size+16);
					}
				}
			}
			if(t_tag.slice(0,2)=="f "){
				if(t_surface==null){
					t_surface=t_mesh.p_CreateSurface(null);
				}
				if(!((t_currMtl)!=null)){
					t_currMtl=c_TObjMtl.m_new.call(new c_TObjMtl);
				}
				t_currMtl.m_meshSurface=t_surface;
				if((t_surface)!=null){
					var t_V=c_TModelObj.m_ParseFaces(t_Line.slice(2));
					for(var t_i2=2;t_i2<=t_V.length-1;t_i2=t_i2+1){
						var t_v0=t_V[0].m_vi;
						var t_v1=t_V[t_i2-1].m_vi;
						var t_v2=t_V[t_i2].m_vi;
						var t_t=0;
						t_t=t_currMtl.m_cache.p_CheckVert(t_v0,t_V[0].m_ti,t_V[0].m_ni);
						if(t_t==0){
							t_v0=t_surface.p_AddVertex(t_vertexP[t_v0].m_x,t_vertexP[t_v0].m_y,-t_vertexP[t_v0].m_z,0.0,0.0,0.0);
							t_currMtl.m_cache.p_SetCache(t_V[0].m_vi,t_v0+1,t_V[0].m_ti,t_V[0].m_ni);
						}else{
							if(t_t==-1){
								t_v0=t_surface.p_AddVertex(t_vertexP[t_v0].m_x,t_vertexP[t_v0].m_y,-t_vertexP[t_v0].m_z,0.0,0.0,0.0);
								t_currMtl.m_cache.p_SetCache(t_V[0].m_vi,t_v0+1,t_V[0].m_ti,t_V[0].m_ni);
							}else{
								t_v0=t_t-1;
							}
						}
						t_t=t_currMtl.m_cache.p_CheckVert(t_v1,t_V[t_i2-1].m_ti,t_V[t_i2-1].m_ni);
						if(t_t==0){
							t_v1=t_surface.p_AddVertex(t_vertexP[t_v1].m_x,t_vertexP[t_v1].m_y,-t_vertexP[t_v1].m_z,0.0,0.0,0.0);
							t_currMtl.m_cache.p_SetCache(t_V[t_i2-1].m_vi,t_v1+1,t_V[t_i2-1].m_ti,t_V[t_i2-1].m_ni);
						}else{
							if(t_t==-1){
								t_v1=t_surface.p_AddVertex(t_vertexP[t_v1].m_x,t_vertexP[t_v1].m_y,-t_vertexP[t_v1].m_z,0.0,0.0,0.0);
								t_currMtl.m_cache.p_SetCache(t_V[t_i2-1].m_vi,t_v1+1,t_V[t_i2-1].m_ti,t_V[t_i2-1].m_ni);
							}else{
								t_v1=t_t-1;
							}
						}
						t_t=t_currMtl.m_cache.p_CheckVert(t_v2,t_V[t_i2].m_ti,t_V[t_i2].m_ni);
						if(t_t==0){
							t_v2=t_surface.p_AddVertex(t_vertexP[t_v2].m_x,t_vertexP[t_v2].m_y,-t_vertexP[t_v2].m_z,0.0,0.0,0.0);
							t_currMtl.m_cache.p_SetCache(t_V[t_i2].m_vi,t_v2+1,t_V[t_i2].m_ti,t_V[t_i2].m_ni);
						}else{
							if(t_t==-1){
								t_v2=t_surface.p_AddVertex(t_vertexP[t_v2].m_x,t_vertexP[t_v2].m_y,-t_vertexP[t_v2].m_z,0.0,0.0,0.0);
								t_currMtl.m_cache.p_SetCache(t_V[t_i2].m_vi,t_v2+1,t_V[t_i2].m_ti,t_V[t_i2].m_ni);
							}else{
								t_v2=t_t-1;
							}
						}
						if(t_vertexN[1]!=null && t_V[0].m_ni!=0){
							t_surface.p_VertexNormal(t_v0,t_vertexN[t_V[0].m_ni].m_nx,t_vertexN[t_V[0].m_ni].m_ny,t_vertexN[t_V[0].m_ni].m_nz);
							t_surface.p_VertexNormal(t_v1,t_vertexN[t_V[t_i2-1].m_ni].m_nx,t_vertexN[t_V[t_i2-1].m_ni].m_ny,t_vertexN[t_V[t_i2-1].m_ni].m_nz);
							t_surface.p_VertexNormal(t_v2,t_vertexN[t_V[t_i2].m_ni].m_nx,t_vertexN[t_V[t_i2].m_ni].m_ny,t_vertexN[t_V[t_i2].m_ni].m_nz);
						}
						if(t_vertexT[1]!=null && t_V[0].m_ti!=0){
							t_surface.p_VertexTexCoords(t_v0,t_vertexT[t_V[0].m_ti].m_u,1.0-t_vertexT[t_V[0].m_ti].m_v,0.0,0);
							t_surface.p_VertexTexCoords(t_v1,t_vertexT[t_V[t_i2-1].m_ti].m_u,1.0-t_vertexT[t_V[t_i2-1].m_ti].m_v,0.0,0);
							t_surface.p_VertexTexCoords(t_v2,t_vertexT[t_V[t_i2].m_ti].m_u,1.0-t_vertexT[t_V[t_i2].m_ti].m_v,0.0,0);
						}
						t_surface.p_AddTriangle(t_v0,t_v2,t_v1);
						t_TRI+=1;
					}
					t_FC+=1;
				}
			}
		}
	}
	t_stream.m_data="";
	var t_3=t_mesh.m_surf_list.p_ObjectEnumerator();
	while(t_3.p_HasNext()){
		var t_surfx=t_3.p_NextObject();
		t_surfx.p_CropSurfaceBuffers();
	}
	if(!((t_hasNorms)!=0)){
		t_mesh.p_UpdateNormals(false);
	}
	return t_mesh;
}
c_TModelObj.m_LoadMeshString=function(t_data,t_mtllib,t_flags){
	c_TModelObj.m_override_texflags=t_flags;
	var t_mesh=c_TModelObj.m_ParseObj(t_data,t_flags,t_mtllib);
	if(t_mesh==null){
		print("**Error: bad OBJ string ");
	}else{
	}
	if((t_mesh)!=null){
		t_mesh.m_name="ModelOBJ";
	}
	return t_mesh;
}
function c_TObjMtl(){
	Object.call(this);
	this.m_cache=null;
	this.m_name="";
	this.m_brush=null;
	this.m_texture=null;
	this.m_meshSurface=null;
}
c_TObjMtl.m_new=function(){
	this.m_cache=c_VertCache.m_new.call(new c_VertCache,1);
	return this;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	return this;
}
c_Map2.prototype.p_Compare3=function(t_lhs,t_rhs){
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
		t_cmp=this.p_Compare3(t_key,t_node.m_key);
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
	t_node=c_Node11.m_new.call(new c_Node11,t_key,t_value,-1,t_parent);
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
c_Map2.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare3(t_key,t_node.m_key);
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
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map2.prototype.p_Values=function(){
	return c_MapValues.m_new.call(new c_MapValues,this);
}
c_Map2.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
function c_StringMap(){
	c_Map2.call(this);
}
c_StringMap.prototype=extend_class(c_Map2);
c_StringMap.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare3=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_TObjVertex(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
	this.m_z=.0;
}
c_TObjVertex.m_new=function(){
	return this;
}
c_TObjVertex.prototype.p_GetValues=function(t_data){
	var t_f=new_number_array(3);
	for(var t_i=0;t_i<=2;t_i=t_i+1){
		var t_fl=t_data.indexOf(" ",0);
		if(t_i<2){
			t_f[t_i]=parseFloat(t_data.slice(0,t_fl));
		}else{
			t_f[t_i]=parseFloat(t_data);
		}
		t_data=t_data.slice(t_fl+1);
	}
	this.m_x=t_f[0];
	this.m_y=t_f[1];
	this.m_z=t_f[2];
	return 0;
}
function c_TObjNormal(){
	Object.call(this);
	this.m_nx=.0;
	this.m_ny=.0;
	this.m_nz=.0;
}
c_TObjNormal.m_new=function(){
	return this;
}
c_TObjNormal.prototype.p_GetValues=function(t_data){
	var t_f=new_number_array(3);
	for(var t_i=0;t_i<=2;t_i=t_i+1){
		var t_fl=t_data.indexOf(" ",0);
		if(t_i<2){
			t_f[t_i]=parseFloat(t_data.slice(0,t_fl));
		}else{
			t_f[t_i]=parseFloat(t_data);
		}
		t_data=t_data.slice(t_fl+1);
	}
	this.m_nx=t_f[0];
	this.m_ny=t_f[1];
	this.m_nz=t_f[2];
	return 0;
}
function c_TObjTexCoord(){
	Object.call(this);
	this.m_u=.0;
	this.m_v=.0;
}
c_TObjTexCoord.m_new=function(){
	return this;
}
c_TObjTexCoord.prototype.p_GetValues=function(t_data){
	var t_f=new_number_array(2);
	for(var t_i=0;t_i<=1;t_i=t_i+1){
		var t_fl=t_data.indexOf(" ",0);
		if(t_i<1){
			t_f[t_i]=parseFloat(t_data.slice(0,t_fl));
		}else{
			t_f[t_i]=parseFloat(t_data);
		}
		t_data=t_data.slice(t_fl+1);
	}
	this.m_u=t_f[0];
	this.m_v=t_f[1];
	return 0;
}
function c_TFaceData(){
	Object.call(this);
	this.m_vi=0;
	this.m_ti=0;
	this.m_ni=0;
}
c_TFaceData.m_new=function(){
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
c_Stack4.m_NIL="";
c_Stack4.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack4.m_NIL;
	}
	this.m_length=0;
}
c_Stack4.prototype.p_Push10=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_string_array(this.m_data,this.m_length*2+10);
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
	var t_t=new_string_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_StringStack(){
	c_Stack4.call(this);
}
c_StringStack.prototype=extend_class(c_Stack4);
c_StringStack.m_new=function(t_data){
	c_Stack4.m_new2.call(this,t_data);
	return this;
}
c_StringStack.m_new2=function(){
	c_Stack4.m_new.call(this);
	return this;
}
c_StringStack.prototype.p_Join=function(t_separator){
	return this.p_ToArray().join(t_separator);
}
function bb_tutility_Dprint(t_x,t_y,t_z,t_a,t_b,t_c){
	var t_st=t_x+" "+t_y+" "+t_z+" "+t_a+" "+t_b+" "+t_c;
	print(t_st);
	return 0;
}
function bb_app_LoadString(t_path){
	return bb_app__game.LoadString(bb_data_FixDataPath(t_path));
}
function c_VertCache(){
	Object.call(this);
	this.m_realvertindex=new_number_array(1);
	this.m_texusedindex=new_number_array(1);
	this.m_normusedindex=new_number_array(1);
	this.m_size=1;
}
c_VertCache.m_new=function(t_i){
	this.m_realvertindex=new_number_array(t_i);
	this.m_texusedindex=new_number_array(t_i);
	this.m_normusedindex=new_number_array(t_i);
	this.m_size=t_i;
	return this;
}
c_VertCache.m_new2=function(){
	return this;
}
c_VertCache.prototype.p_CheckVert=function(t_i,t_ti,t_ni){
	if(t_i>this.m_size-1){
		return 0;
	}
	if(!((this.m_realvertindex[t_i])!=0)){
		return 0;
	}
	if(this.m_texusedindex[t_i]!=t_ti && t_ti!=0){
		return -1;
	}
	if(this.m_normusedindex[t_i]!=t_ni && t_ni!=0){
		return -1;
	}
	return this.m_realvertindex[t_i];
}
c_VertCache.prototype.p_SetCache=function(t_i,t_reali,t_ti,t_ni){
	if(t_i>this.m_size-1){
		this.m_realvertindex=resize_number_array(this.m_realvertindex,t_i+1);
		this.m_texusedindex=resize_number_array(this.m_texusedindex,t_i+1);
		this.m_normusedindex=resize_number_array(this.m_normusedindex,t_i+1);
		this.m_size=t_i+1;
	}
	this.m_realvertindex[t_i]=t_reali;
	this.m_texusedindex[t_i]=t_ti;
	this.m_normusedindex[t_i]=t_ni;
	return 0;
}
function bb_functions_CreateBrush(t_r,t_g,t_b){
	return c_TBrush.m_CreateBrush(t_r,t_g,t_b);
}
function c_TTextureFilter(){
	Object.call(this);
	this.m_text="";
	this.m_flags=0;
}
c_TTextureFilter.m_filter_list=null;
c_TTextureFilter.m_new=function(){
	return this;
}
function c_List8(){
	Object.call(this);
	this.m__head=(c_HeadNode8.m_new.call(new c_HeadNode8));
}
c_List8.m_new=function(){
	return this;
}
c_List8.prototype.p_AddLast8=function(t_data){
	return c_Node10.m_new.call(new c_Node10,this.m__head,this.m__head.m__pred,t_data);
}
c_List8.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast8(t_t);
	}
	return this;
}
c_List8.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator10.m_new.call(new c_Enumerator10,this);
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
function c_HeadNode8(){
	c_Node10.call(this);
}
c_HeadNode8.prototype=extend_class(c_Node10);
c_HeadNode8.m_new=function(){
	c_Node10.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator10(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator10.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator10.m_new2=function(){
	return this;
}
c_Enumerator10.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator10.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_List9(){
	Object.call(this);
	this.m__head=(c_HeadNode9.m_new.call(new c_HeadNode9));
}
c_List9.m_new=function(){
	return this;
}
c_List9.prototype.p_AddLast9=function(t_data){
	return c_Node6.m_new.call(new c_Node6,this.m__head,this.m__head.m__pred,t_data);
}
c_List9.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast9(t_t);
	}
	return this;
}
c_List9.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator11.m_new.call(new c_Enumerator11,this);
}
function c_HeadNode9(){
	c_Node6.call(this);
}
c_HeadNode9.prototype=extend_class(c_Node6);
c_HeadNode9.m_new=function(){
	c_Node6.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator11(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator11.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator11.m_new2=function(){
	return this;
}
c_Enumerator11.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator11.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_functions_LoadTexture(t_file,t_flags){
	return c_TTexture.m_LoadTexture(t_file,t_flags,null);
}
function c_Node11(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node11.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node11.m_new2=function(){
	return this;
}
c_Node11.prototype.p_NextNode=function(){
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
function bb_functions_CountSurfaces(t_mesh){
	return t_mesh.p_CountSurfaces();
}
function c_MapValues(){
	Object.call(this);
	this.m_map=null;
}
c_MapValues.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapValues.m_new2=function(){
	return this;
}
c_MapValues.prototype.p_ObjectEnumerator=function(){
	return c_ValueEnumerator.m_new.call(new c_ValueEnumerator,this.m_map.p_FirstNode());
}
function c_ValueEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_ValueEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_ValueEnumerator.m_new2=function(){
	return this;
}
c_ValueEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_ValueEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_value;
}
function c_NormHelperClass(){
	Object.call(this);
	this.m_vec=null;
	this.m_vert=0;
}
c_NormHelperClass.m_new=function(){
	return this;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Compare4=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_FindNode3=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare4(t_key,t_node.m_key);
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
c_Map3.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode3(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
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
		t_cmp=this.p_Compare4(t_key,t_node.m_key);
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
	t_node=c_Node12.m_new.call(new c_Node12,t_key,t_value,-1,t_parent);
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
function c_NormMap(){
	c_Map3.call(this);
}
c_NormMap.prototype=extend_class(c_Map3);
c_NormMap.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
c_NormMap.prototype.p_Compare4=function(t_lhs,t_rhs){
	if(t_lhs.m_x<t_rhs.m_x){
		return -1;
	}
	if(t_lhs.m_x>t_rhs.m_x){
		return 1;
	}
	if(t_lhs.m_y<t_rhs.m_y){
		return -1;
	}
	if(t_lhs.m_y>t_rhs.m_y){
		return 1;
	}
	if(t_lhs.m_z<t_rhs.m_z){
		return -1;
	}
	return ((t_lhs.m_z>t_rhs.m_z)?1:0);
}
function c_Node12(){
	Object.call(this);
	this.m_key=null;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node12.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node12.m_new2=function(){
	return this;
}
function bb_monkeyutility_CreateMiniB3DMonkey(){
	var t_MINIB3DMONKEY1="o minib3d_logo.obj\nmtllib minib3d_logo.mtl\ng default\nv -0.95 -1.0505 0.924505\nv -0.95 -1.0505 -0.975495\nv 0.95 -1.0505 -0.975495\nv 0.95 -1.0505 0.924505\nv -0.95 0.8495 0.924505\nv -0.95 0.8495 -0.975495\nv -0.95 -1.0505 -0.975495\nv -0.95 -1.0505 0.924505\nv 0.95 0.8495 -0.975495\nv -0.95 0.8495 -0.975495\nv -0.95 0.8495 0.924505\nv 0.95 0.8495 0.924505\nv 0.95 -1.0505 -0.975495\nv 0.95 0.8495 -0.975495\nv 0.95 0.8495 0.924505\nv 0.95 -1.0505 0.924505\nv -0.95 -1.0505 -0.975495\nv -0.95 0.8495 -0.975495\nv 0.95 0.8495 -0.975495\nv 0.95 -1.0505 -0.975495\nv -0.330252 0.2404 0.975495\nv -0.533484 0.2404 0.975495\nv -0.533484 0.0652 0.975495\nv -0.330252 0.0652 0.975495\nv -0.533484 0.0652 0.975495\nv -0.533484 0.0652 0.503331\nv -0.330252 0.0652 0.503331\nv -0.330252 0.0652 0.975495\nv -0.533484 0.2404 0.975495\nv -0.533484 0.2404 0.503331\nv -0.533484 0.0652 0.503331\nv -0.533484 0.0652 0.975495\nv -0.330252 0.2404 0.503331\nv -0.533484 0.2404 0.503331\nv -0.533484 0.2404 0.975495\nv -0.330252 0.2404 0.975495\nv -0.330252 0.0652 0.503331\nv -0.330252 0.2404 0.503331\nv -0.330252 0.2404 0.975495\nv -0.330252 0.0652 0.975495\nv -0.533484 0.0652 0.503331\nv -0.533484 0.2404 0.503331\nv -0.330252 0.2404 0.503331\nv -0.330252 0.0652 0.503331\nv 0.533484 0.2404 0.975495\nv 0.330252 0.2404 0.975495\nv 0.330252 0.0652 0.975495\nv 0.533484 0.0652 0.975495\nv 0.330252 0.0652 0.975495\nv 0.330252 0.0652 0.503331\nv 0.533484 0.0652 0.503331\nv 0.533484 0.0652 0.975495\nv 0.330252 0.2404 0.975495\nv 0.330252 0.2404 0.503331\nv 0.330252 0.0652 0.503331\nv 0.330252 0.0652 0.975495\nv 0.533484 0.2404 0.503331\nv 0.330252 0.2404 0.503331\nv 0.330252 0.2404 0.975495\nv 0.533484 0.2404 0.975495\nv 0.533484 0.0652 0.503331\nv 0.533484 0.2404 0.503331\nv 0.533484 0.2404 0.975495\nv 0.533484 0.0652 0.975495\nv 0.330252 0.0652 0.503331\nv 0.330252 0.2404 0.503331\nv 0.533484 0.2404 0.503331\nv 0.533484 0.0652 0.503331\nv -1.25 0.2495 0.224505\nv -1.25 0.2495 -0.175495\nv -1.25 -0.3505 -0.175495\nv -1.25 -0.3505 0.224505\nv -1.25 -0.3505 -0.175495\nv -0.811969 -0.3505 -0.175495\nv -0.811969 -0.3505 0.224505\nv -1.25 -0.3505 0.224505\nv -1.25 0.2495 -0.175495\nv -0.811969 0.2495 -0.175495\nv -0.811969 -0.3505 -0.175495\nv -1.25 -0.3505 -0.175495\nv -0.811969 0.2495 0.224505\nv -0.811969 0.2495 -0.175495\nv -1.25 0.2495 -0.175495\nv -1.25 0.2495 0.224505\nv -0.811969 -0.3505 0.224505\nv -0.811969 0.2495 0.224505\nv -1.25 0.2495 0.224505\nv -1.25 -0.3505 0.224505\nv -0.811969 -0.3505 -0.175495\nv -0.811969 0.2495 -0.175495\nv -0.811969 0.2495 0.224505\nv -0.811969 -0.3505 0.224505\nv 1.25 -0.3505 -0.175495\nv 1.25 0.2495 -0.175495\nv 1.25 0.2495 0.224505\nv 1.25 -0.3505 0.224505\nv 0.811969 -0.3505 0.224505\nv 0.811969 -0.3505 -0.175495\nv 1.25 -0.3505 -0.175495\nv 1.25 -0.3505 0.224505\nv 0.811969 -0.3505 -0.175495\nv 0.811969 0.2495 -0.175495\nv 1.25 0.2495 -0.175495\nv 1.25 -0.3505 -0.175495\nv 1.25 0.2495 -0.175495\nv 0.811969 0.2495 -0.175495\nv 0.811969 0.2495 0.224505\nv 1.25 0.2495 0.224505\nv 1.25 0.2495 0.224505\nv 0.811969 0.2495 0.224505\nv 0.811969 -0.3505 0.224505\nv 1.25 -0.3505 0.224505\nv 0.811969 0.2495 0.224505\nv 0.811969 0.2495 -0.175495\nv 0.811969 -0.3505 -0.175495\nv 0.811969 -0.3505 0.224505\nv -0.1 0.798 0.244005\nv -0.1 0.798 0.244005\nv -0.25 1.0505 0.244005\nv -0.4 0.798 0.244005\nv -0.25 1.0505 0.244005\nv -0.25 1.0505 -0.168274\nv -0.4 0.798 -0.168274\nv -0.4 0.798 0.244005\nv -0.1 0.798 0.244005\nv -0.1 0.798 -0.168274\nv -0.25 1.0505 -0.168274\nv -0.25 1.0505 0.244005\nv -0.1 0.798 -0.168274\nv -0.1 0.798 -0.168274\nv -0.1 0.798 0.244005\nv -0.1 0.798 0.244005\nv -0.4 0.798 -0.168274\nv -0.1 0.798 -0.168274\nv -0.1 0.798 0.244005\nv -0.4 0.798 0.244005\nv -0.25 1.0505 -0.168274\nv -0.1 0.798 -0.168274\nv -0.1 0.798 -0.168274\nv -0.4 0.798 -0.168274\nv -0.52 0.798 0.244005\nv -0.52 0.798 0.244005\nv -0.67 1.0505 0.244005\nv -0.82 0.798 0.244005\nv -0.67 1.0505 0.244005\nv -0.67 1.0505 -0.168274\nv -0.82 0.798 -0.168274\nv -0.82 0.798 0.244005\nv -0.52 0.798 0.244005\nv -0.52 0.798 -0.168274\nv -0.67 1.0505 -0.168274\nv -0.67 1.0505 0.244005\nv -0.52 0.798 -0.168274\nv -0.52 0.798 -0.168274\nv -0.52 0.798 0.244005\nv -0.52 0.798 0.244005\nv -0.82 0.798 -0.168274\nv -0.52 0.798 -0.168274\nv -0.52 0.798 0.244005\nv -0.82 0.798 0.244005\nv -0.67 1.0505 -0.168274\nv -0.52 0.798 -0.168274\nv -0.52 0.798 -0.168274\nv -0.82 0.798 -0.168274\nv -0.31 0.798 0.244005\nv -0.31 0.798 0.244005\nv -0.46 1.0505 0.244005\nv -0.61 0.798 0.244005\nv -0.46 1.0505 0.244005\nv -0.46 1.0505 -0.168274\nv -0.61 0.798 -0.168274\nv -0.61 0.798 0.244005\nv -0.31 0.798 0.244005\nv -0.31 0.798 -0.168274\nv -0.46 1.0505 -0.168274\nv -0.46 1.0505 0.244005\nv -0.31 0.798 -0.168274\nv -0.31 0.798 -0.168274\nv -0.31 0.798 0.244005\nv -0.31 0.798 0.244005\nv -0.61 0.798 -0.168274\nv -0.31 0.798 -0.168274\nv -0.31 0.798 0.244005\nv -0.61 0.798 0.244005\nv -0.46 1.0505 -0.168274\nv -0.31 0.798 -0.168274\nv -0.31 0.798 -0.168274\nv -0.61 0.798 -0.168274\nv 0.95 0.8495 0.924505\nv 0.8 0.6995 0.874505\nv 0.8 -0.9005 0.874505\nv 0.95 -1.0505 0.924505\nv 0.8 -0.9005 0.874505\nv -0.8 -0.9005 0.874505\nv -0.95 -1.0505 0.924505\nv 0.95 -1.0505 0.924505\nv -0.8 -0.9005 0.874505\nv -0.8 0.6995 0.874505\nv -0.95 0.8495 0.924505\nv -0.95 -1.0505 0.924505\nv 0.95 0.8495 0.924505\nv -0.95 0.8495 0.924505\nv -0.8 0.6995 0.874505\nv 0.8 0.6995 0.874505\nv 0.8 0.6995 0.874505\nv -0.8 0.6995 0.874505\nv -0.8 -0.9005 0.874505\nv 0.8 -0.9005 0.874505\nvn -0.611216 -0.347834 0.710933\nvn -0.611216 -0.347834 0.710933\nvn -0.611216 -0.347834 -0.710933\nvn -0.611216 -0.347834 -0.710933\nvn -0.57735 -0.57735 0.57735\nvn -0.57735 -0.57735 -0.57735\nvn -0.57735 -0.57735 -0.57735\nvn -0.57735 0.57735 -0.57735\nvn -0.57735 0.57735 0.57735\nvn -0.57735 0.57735 -0.57735\nvn -0.321084 0.321084 0.89096\nvn -0.321084 -0.321084 0.89096\nvn -0.162221 -0.162221 0.973329\nvn -0.162221 0.162221 0.973329\nvn -0.12395 0.451338 0.883703\nvn -0.12395 0.451338 -0.883703\nvn -0.12395 0.451338 0.883703\nvn -0.12395 0.451338 -0.883703\nvn 0 0 1\nvn 0 0.714577 0.699557\nvn 0 0.714577 -0.699557\nvn 4.16968e-008 0.714577 0.699557\nvn 4.16968e-008 0.714577 -0.699557\nvn 4.16968e-008 0.714577 0.699557\nvn 4.16968e-008 0.714577 -0.699557\nvn 0.162221 -0.162221 0.973329\nvn 0.162221 0.162221 0.973329\nvn 0.321084 -0.321084 0.89096\nvn 0.321084 0.321084 0.89096\nvn 0.57735 -0.57735 0.57735\nvn 0.57735 -0.57735 -0.57735\nvn 0.57735 -0.57735 -0.57735\nvn 0.57735 0.57735 -0.57735\nvn 0.57735 0.57735 0.57735\nvn 0.57735 0.57735 -0.57735\ng minib3d_logo_1\nusemtl brown\ns off\nf 1//12 2//7 3//32 4//28\nf 5//11 6//8 7//7 8//12\nf 9//33 10//8 11//11 12//29\nf 13//32 14//33 15//29 16//28\n";
	var t_MINIB3DMONKEY2="f 17//7 18//8 19//33 20//32\nusemtl black\ns off\nf 21//34 22//9 23//5 24//30\nf 25//5 26//6 27//31 28//30\nf 29//9 30//10 31//6 32//5\nf 33//35 34//10 35//9 36//34\nf 37//31 38//35 39//34 40//30\nf 41//6 42//10 43//35 44//31\nf 45//34 46//9 47//5 48//30\nf 49//5 50//6 51//31 52//30\nf 53//9 54//10 55//6 56//5\nf 57//35 58//10 59//9 60//34\nf 61//31 62//35 63//34 64//30\nf 65//6 66//10 67//35 68//31\nusemtl yellow\ns off\nf 69//9 70//10 71//6 72//5\nf 73//6 74//31 75//30 76//5\nf 77//10 78//35 79//31 80//6\nf 81//34 82//35 83//10 84//9\nf 85//30 86//34 87//9 88//5\nf 89//31 90//35 91//34 92//30\nf 93//31 94//35 95//34 96//30\nf 97//5 98//6 99//31 100//30\nf 101//6 102//10 103//35 104//31\nf 105//35 106//10 107//9 108//34\nf 109//34 110//9 111//5 112//30\nf 113//9 114//10 115//6 116//5\nusemtl brown\ns off\nf 117//5 118//15 119//20 120//2\nf 121//20 122//21 123//3 124//2\nf 125//15 126//16 127//21 128//20\nf 129//6 130//16 131//15 132//5\nf 133//3 134//6 135//5 136//2\nf 137//21 138//16 139//6 140//3\nf 141//5 142//17 143//24 144//2\nf 145//24 146//25 147//3 148//2\nf 149//17 150//18 151//25 152//24\nf 153//6 154//18 155//17 156//5\nf 157//3 158//6 159//5 160//2\nf 161//25 162//18 163//6 164//3\nf 165//5 166//15 167//22 168//1\nf 169//22 170//23 171//4 172//1\nf 173//15 174//16 175//23 176//22\nf 177//6 178//16 179//15 180//5\nf 181//4 182//6 183//5 184//1\nf 185//23 186//16 187//6 188//4\nf 189//29 190//13 191//14 192//28\nf 193//14 194//27 195//12 196//28\nf 197//27 198//26 199//11 200//12\nf 201//29 202//11 203//26 204//13\nusemtl yellow\ns off\nf 205//19 206//19 207//19 208//19\ng Default\nv -0.475196 -0.40127 0.194883\nv -0.475196 -0.21219 0.194883\nv -0.304439 -0.21219 0.194883\nv -0.304439 -0.40127 0.194883\nv -0.30457 -0.40054 0.194883\nv -0.30457 -0.292135 0.194883\nv 0.310419 -0.292865 0.194883\nv 0.310419 -0.40127 0.194883\nv 0.310287 -0.40127 0.194883\nv 0.310287 -0.21219 0.194883\nv 0.481045 -0.21219 0.194883\nv 0.481045 -0.40127 0.194883\nv -0.304439 -0.21219 0.194883\nv -0.304439 -0.21219 0.953718\nv -0.304439 -0.40127 0.953718\nv -0.304439 -0.40127 0.194883\nv -0.475196 -0.21219 0.194883\nv -0.475196 -0.21219 0.953718\nv -0.304439 -0.21219 0.953718\nv -0.304439 -0.21219 0.194883\nv -0.475196 -0.40127 0.953718\nv -0.475196 -0.21219 0.953718\nv -0.475196 -0.21219 0.194883\nv -0.475196 -0.40127 0.194883\nv -0.304439 -0.40127 0.953718\nv -0.475196 -0.40127 0.953718\nv -0.475196 -0.40127 0.194883\nv -0.304439 -0.40127 0.194883\nv 0.310419 -0.292865 0.194883\nv 0.310419 -0.292865 0.953718\nv 0.310419 -0.40127 0.953718\nv 0.310419 -0.40127 0.194883\nv -0.30457 -0.292135 0.953718\nv 0.310419 -0.292865 0.953718\nv 0.310419 -0.292865 0.194883\nv -0.30457 -0.292135 0.194883\nv -0.30457 -0.40054 0.953718\nv -0.30457 -0.292135 0.953718\nv -0.30457 -0.292135 0.194883\nv -0.30457 -0.40054 0.194883\nv 0.310419 -0.40127 0.194883\nv 0.310419 -0.40127 0.953718\nv -0.30457 -0.40054 0.953718\nv -0.30457 -0.40054 0.194883\nv 0.481045 -0.21219 0.194883\nv 0.481045 -0.21219 0.953718\nv 0.481045 -0.40127 0.953718\nv 0.481045 -0.40127 0.194883\nv 0.310287 -0.21219 0.953718\nv 0.481045 -0.21219 0.953718\nv 0.481045 -0.21219 0.194883\nv 0.310287 -0.21219 0.194883\nv 0.310287 -0.40127 0.953718\nv 0.310287 -0.21219 0.953718\nv 0.310287 -0.21219 0.194883\nv 0.310287 -0.40127 0.194883\nv 0.481045 -0.40127 0.194883\nv 0.481045 -0.40127 0.953718\nv 0.310287 -0.40127 0.953718\nv 0.310287 -0.40127 0.194883\nv -0.304439 -0.40127 0.953718\nv -0.304439 -0.21219 0.953718\nv -0.475196 -0.21219 0.953718\nv -0.475196 -0.40127 0.953718\nv -0.304439 -0.40127 0.953718\nv 0.310287 -0.40127 0.953718\nv 0.310419 -0.292865 0.953718\nv -0.30457 -0.292135 0.953718\nv 0.481045 -0.40127 0.953718\nv 0.481045 -0.21219 0.953718\nv 0.310287 -0.21219 0.953718\nv 0.310287 -0.40127 0.953718\nvn -0.707526 -0.706687 -0\nvn -0.577807 -0.577122 -0.577122\nvn -0.57735 -0.57735 0.57735\nvn -0.57735 -0.57735 -0.57735\nvn -0.57735 0.57735 0.57735\nvn -0.57735 0.57735 -0.57735\nvn -0.576893 0.577578 0.577579\nvn -0.576893 0.577578 -0.577579\nvn -0.408248 -0.408248 0.816497\nvn 0.408248 -0.408248 0.816497\nvn 0.576893 -0.577578 -0.577579\nvn 0.57735 -0.57735 0.57735\nvn 0.57735 -0.57735 -0.57735\nvn 0.57735 0.57735 0.57735\nvn 0.57735 0.57735 -0.57735\nvn 0.577807 0.577122 0.577122\nvn 0.577807 0.577122 -0.577122\nvn 0.706687 -0.707526 -0\ng minib3d_logo_2\nusemtl black\ns off\nf 209//39 210//41 211//50 212//48\nf 213//37 214//43 215//52 216//46\nf 217//39 218//41 219//50 220//48\nf 221//50 222//49 223//45 224//48\nf 225//41 226//40 227//49 228//50\nf 229//38 230//40 231//41 232//39\nf 233//45 234//38 235//39 236//48\nf 237//52 238//51 239//53 240//46\nf 241//42 242//51 243//52 244//43\nf 245//36 246//42 247//43 248//37\nf 249//46 250//53 251//36 252//37\nf 253//50 254//49 255//47 256//48\nf 257//40 258//49 259//50 260//41\nf 261//44 262//40 263//41 264//39\nf 265//48 266//47 267//44 268//39\nf 269//45 270//49 271//40 272//38\nf 273//45 274//44 275//51 276//42\nf 277//47 278//49 279//40 280//44\n";
	var t_mtl="newmtl black\nKa 0 0 0\nKd 0.156863 0.156863 0.156863\nKs 0 0 0\nNi 1\nNs 400\nTf 1 1 1\nd 1\n\nnewmtl brown\nKa 0 0 0\nKd 0.537255 0.396078 0.286275\nKs 0 0 0\nNi 1\nNs 400\nTf 1 1 1\nd 1\n\nnewmtl yellow\nKa 0 0 0\nKd 0.996078 0.929412 0.662745\nKs 0 0 0\nNi 1\nNs 400\nTf 1 1 1\nd 1\n\n";
	var t_m=c_TModelObj.m_LoadMeshString(t_MINIB3DMONKEY1+t_MINIB3DMONKEY2,t_mtl,-1);
	t_m.p_UpdateNormals(false);
	return t_m;
}
function c_TBone(){
	c_TEntity.call(this);
	this.m_rest_mat=c_Matrix.m_new.call(new c_Matrix);
	this.m_mat2=c_Matrix.m_new.call(new c_Matrix);
	this.m_tform_mat=c_Matrix.m_new.call(new c_Matrix);
	this.m_inv_mat=c_Matrix.m_new.call(new c_Matrix);
}
c_TBone.prototype=extend_class(c_TEntity);
c_TBone.m_t_mat=null;
c_TBone.m_new_mat=null;
c_TBone.prototype.p_UpdateMatrix=function(t_mat0){
	this.m_loc_mat.p_Overwrite(t_mat0);
	this.m_mat2.p_Overwrite(this.m_loc_mat);
	if(this.m_parent!=null){
		this.m_mat.p_Overwrite(this.m_parent.m_mat);
		this.m_mat.p_Multiply(this.m_loc_mat);
		this.m_gsx=this.m_parent.m_gsx*this.m_sx;
		this.m_gsy=this.m_parent.m_gsy*this.m_sy;
		this.m_gsz=this.m_parent.m_gsz*this.m_sz;
	}
	if(object_downcast((this.m_parent),c_TBone)!=null){
		c_TBone.m_new_mat.p_Overwrite(object_downcast((this.m_parent),c_TBone).m_mat2);
		c_TBone.m_new_mat.p_Multiply(this.m_loc_mat);
		this.m_mat2.p_Overwrite(c_TBone.m_new_mat);
	}
	this.m_tform_mat.p_Overwrite(this.m_mat2);
	this.m_tform_mat.p_Multiply(this.m_inv_mat);
}
c_TBone.m_UpdateNonBoneChild=function(t_ent_p){
	if(object_downcast((t_ent_p),c_TBone)==null){
		c_TBone.m_new_mat.p_Overwrite(t_ent_p.m_parent.m_mat);
		if(object_downcast((t_ent_p),c_TBone)!=null){
			c_TBone.m_new_mat.m_grid[3][2]=-c_TBone.m_new_mat.m_grid[3][2];
		}
		t_ent_p.m_mat.p_Overwrite(c_TBone.m_new_mat);
		t_ent_p.p_UpdateMat(false);
	}
}
c_TBone.m_UpdateBoneChildren=function(t_p){
	var t_=t_p.m_child_list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ent=t_.p_NextObject();
		var t_bo=object_downcast((t_ent),c_TBone);
		if(t_bo!=null){
			t_bo.p_UpdateMatrix(t_bo.m_loc_mat);
		}else{
			c_TBone.m_UpdateNonBoneChild(t_ent);
		}
		c_TBone.m_UpdateBoneChildren(t_ent);
	}
}
c_TBone.prototype.p_ScaleBone=function(t_x,t_y,t_z,t_glob){
	this.m_sx=t_x;
	this.m_sy=t_y;
	this.m_sz=t_z;
	c_TBone.m_t_mat.p_Overwrite(this.m_rest_mat);
	c_TBone.m_t_mat.m_grid[3][0]=this.m_px+this.m_rest_mat.m_grid[3][0];
	c_TBone.m_t_mat.m_grid[3][1]=this.m_py+this.m_rest_mat.m_grid[3][1];
	c_TBone.m_t_mat.m_grid[3][2]=this.m_pz+this.m_rest_mat.m_grid[3][2];
	c_TBone.m_t_mat.p_Rotate(this.m_rx,this.m_ry,this.m_rz);
	c_TBone.m_t_mat.p_Scale(t_x,t_y,t_z);
	this.p_UpdateMatrix(c_TBone.m_t_mat);
	this.m_gsx=this.m_parent.m_gsx*this.m_sx;
	this.m_gsy=this.m_parent.m_gsy*this.m_sy;
	this.m_gsz=this.m_parent.m_gsz*this.m_sz;
	if(this.m_child_list.p_IsEmpty()!=true){
		c_TBone.m_UpdateBoneChildren(this);
	}
	return 0;
}
c_TBone.prototype.p_PositionBone=function(t_x,t_y,t_z,t_glob){
	this.m_px=t_x;
	this.m_py=t_y;
	this.m_pz=t_z;
	c_TBone.m_t_mat.p_Overwrite(this.m_rest_mat);
	c_TBone.m_t_mat.p_Multiply(this.m_loc_mat);
	c_TBone.m_t_mat.m_grid[3][0]=t_x+this.m_rest_mat.m_grid[3][0];
	c_TBone.m_t_mat.m_grid[3][1]=t_y+this.m_rest_mat.m_grid[3][1];
	c_TBone.m_t_mat.m_grid[3][2]=t_z+this.m_rest_mat.m_grid[3][2];
	this.p_UpdateMatrix(c_TBone.m_t_mat);
	if(this.m_child_list.p_IsEmpty()!=true){
		c_TBone.m_UpdateBoneChildren(this);
	}
	return 0;
}
c_TBone.prototype.p_RotateBone=function(t_x,t_y,t_z,t_glob){
	this.m_rx=-t_x;
	this.m_ry=t_y;
	this.m_rz=t_z;
	c_TBone.m_t_mat.p_Overwrite(this.m_rest_mat);
	c_TBone.m_t_mat.m_grid[3][0]=this.m_px+this.m_rest_mat.m_grid[3][0];
	c_TBone.m_t_mat.m_grid[3][1]=this.m_py+this.m_rest_mat.m_grid[3][1];
	c_TBone.m_t_mat.m_grid[3][2]=this.m_pz+this.m_rest_mat.m_grid[3][2];
	c_TBone.m_t_mat.p_Rotate(t_x,t_y,t_z);
	this.p_UpdateMatrix(c_TBone.m_t_mat);
	if(this.m_child_list.p_IsEmpty()!=true){
		c_TBone.m_UpdateBoneChildren(this);
	}
	return 0;
}
function c_Line(){
	Object.call(this);
	this.m_o=null;
	this.m_d=null;
}
c_Line.m_new=function(){
	this.m_o=c_Vector.m_new.call(new c_Vector,0.0,0.0,0.0);
	this.m_d=c_Vector.m_new.call(new c_Vector,0.0,0.0,0.0);
	return this;
}
c_Line.m_new2=function(t_oo,t_dd){
	this.m_o=t_oo.p_Copy();
	this.m_d=t_dd.p_Copy();
	return this;
}
c_Line.m_new3=function(t_ox,t_oy,t_oz,t_dx,t_dy,t_dz){
	this.m_o=c_Vector.m_new.call(new c_Vector,t_ox,t_oy,t_oz);
	this.m_d=c_Vector.m_new.call(new c_Vector,t_dx,t_dy,t_dz);
	return this;
}
function bb_functions_CreateCamera(t_parent){
	return c_TCamera.m_CreateCamera(t_parent);
}
function bb_functions_CreateLight(t_light_type,t_parent){
	return c_TLight.m_CreateLight(t_light_type,t_parent);
}
function c_Bunny(){
	Object.call(this);
	this.m_image=null;
	this.m_speedX=0.0;
	this.m_speedY=0.0;
	this.m_x=0.0;
	this.m_y=0.0;
	this.m_posX=0.0;
	this.m_z=0.0;
	this.m_posY=0.0;
}
c_Bunny.m_new=function(){
	return this;
}
function c_List10(){
	Object.call(this);
	this.m__head=(c_HeadNode10.m_new.call(new c_HeadNode10));
}
c_List10.m_new=function(){
	return this;
}
c_List10.prototype.p_AddLast10=function(t_data){
	return c_Node13.m_new.call(new c_Node13,this.m__head,this.m__head.m__pred,t_data);
}
c_List10.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast10(t_t);
	}
	return this;
}
c_List10.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator12.m_new.call(new c_Enumerator12,this);
}
function c_Node13(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node13.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node13.m_new2=function(){
	return this;
}
function c_HeadNode10(){
	c_Node13.call(this);
}
c_HeadNode10.prototype=extend_class(c_Node13);
c_HeadNode10.m_new=function(){
	c_Node13.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
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
function bb_input_KeyHit(t_key){
	return bb_input_device.p_KeyHit(t_key);
}
function c_Enumerator12(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator12.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator12.m_new2=function(){
	return this;
}
c_Enumerator12.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator12.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_FPSCounter(){
	Object.call(this);
}
c_FPSCounter.m_startTime=0;
c_FPSCounter.m_fpsCount=0;
c_FPSCounter.m_totalFPS=0;
c_FPSCounter.m_Update=function(){
	if(bb_app_Millisecs()-c_FPSCounter.m_startTime>=1000){
		c_FPSCounter.m_totalFPS=c_FPSCounter.m_fpsCount;
		c_FPSCounter.m_fpsCount=0;
		c_FPSCounter.m_startTime=bb_app_Millisecs();
	}else{
		c_FPSCounter.m_fpsCount+=1;
	}
}
c_FPSCounter.m_Draw=function(t_x,t_y,t_ax,t_ay){
	bb_graphics_DrawText("FPS: "+String(c_FPSCounter.m_totalFPS),(t_x),(t_y),t_ax,t_ay);
}
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
function bb_graphics_Translate(t_x,t_y){
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	return 0;
}
function bb_graphics_Rotate(t_angle){
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
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
function bb_graphics_GetFont(){
	return bb_graphics_context.m_font;
}
function bb_graphics_DrawText(t_text,t_x,t_y,t_xalign,t_yalign){
	if(!((bb_graphics_context.m_font)!=null)){
		return 0;
	}
	var t_w=bb_graphics_context.m_font.p_Width();
	var t_h=bb_graphics_context.m_font.p_Height();
	t_x-=Math.floor((t_w*t_text.length)*t_xalign);
	t_y-=Math.floor((t_h)*t_yalign);
	for(var t_i=0;t_i<t_text.length;t_i=t_i+1){
		var t_ch=t_text.charCodeAt(t_i)-bb_graphics_context.m_firstChar;
		if(t_ch>=0 && t_ch<bb_graphics_context.m_font.p_Frames()){
			bb_graphics_DrawImage(bb_graphics_context.m_font,t_x+(t_i*t_w),t_y,t_ch);
		}
	}
	return 0;
}
function bb_graphics_DrawRect(t_x,t_y,t_w,t_h){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawRect(t_x,t_y,t_w,t_h);
	return 0;
}
function c_EffectState(){
	Object.call(this);
	this.m_use_full_bright=0;
	this.m_use_vertex_colors=0;
	this.m_use_flatshade=0;
	this.m_use_fog=1;
	this.m_ambient=[1.0,1.0,1.0,1.0];
	this.m_diffuse=[1.0,1.0,1.0,1.0];
	this.m_specular=[1.0,1.0,1.0,1.0];
	this.m_shininess=[100.0];
	this.m_use_depth_test=0;
	this.m_use_depth_write=0;
	this.m_use_backface_culling=0;
	this.m_use_alpha_test=0;
	this.m_use_perpixellighting=0;
	this.m_red=.0;
	this.m_green=.0;
	this.m_blue=.0;
	this.m_alpha=.0;
	this.m_shine=.0;
	this.m_blend=0;
	this.m_fx=0;
	this.m_num_tex=0;
	this.m_tex=[];
}
c_EffectState.m_new=function(){
	return this;
}
c_EffectState.prototype.p_SetNull=function(){
	this.m_use_full_bright=-1;
	this.m_use_vertex_colors=-1;
	this.m_use_flatshade=-1;
	this.m_use_fog=-1;
	this.m_ambient=[-1.0,-1.0,-1.0,1.0];
	this.m_diffuse=[-1.0,-1.0,-1.0,1.0];
	this.m_specular=[-1.0,-1.0,-1.0,1.0];
	this.m_shininess=[-1.0];
	this.m_use_depth_test=-1;
	this.m_use_depth_write=-1;
	this.m_use_backface_culling=-1;
	this.m_use_alpha_test=0;
	this.m_use_perpixellighting=0;
	this.m_red=-1.0;
	this.m_green=-1.0;
	this.m_blue=-1.0;
	this.m_alpha=-1.0;
	this.m_shine=-1.0;
	this.m_blend=99999;
	this.m_fx=99999;
	this.m_num_tex=-1;
}
c_EffectState.prototype.p_UpdateEffect=function(t_surf,t_ent,t_cam){
	var t_ambient_red=.0;
	var t_ambient_green=.0;
	var t_ambient_blue=.0;
	this.m_red=t_ent.m_brush.m_red;
	this.m_green=t_ent.m_brush.m_green;
	this.m_blue=t_ent.m_brush.m_blue;
	this.m_alpha=t_ent.m_brush.m_alpha;
	this.m_shine=t_ent.m_brush.m_shine;
	this.m_blend=t_ent.m_brush.m_blend;
	this.m_fx=t_ent.m_brush.m_fx;
	this.m_num_tex=t_ent.m_brush.m_no_texs;
	this.m_tex=t_ent.m_brush.m_tex;
	if((t_surf.m_brush)!=null){
		var t_shine2=0.0;
		this.m_red=this.m_red*t_surf.m_brush.m_red;
		this.m_green=this.m_green*t_surf.m_brush.m_green;
		this.m_blue=this.m_blue*t_surf.m_brush.m_blue;
		this.m_alpha=this.m_alpha*t_surf.m_brush.m_alpha;
		t_shine2=t_surf.m_brush.m_shine;
		if(this.m_shine==0.0){
			this.m_shine=t_shine2;
		}
		if(this.m_shine!=0.0 && t_shine2!=0.0){
			this.m_shine=this.m_shine*t_shine2;
		}
		if(this.m_blend==0){
			this.m_blend=t_surf.m_brush.m_blend;
		}
		this.m_fx=this.m_fx|t_surf.m_brush.m_fx;
		if(this.m_num_tex<t_surf.m_brush.m_no_texs){
			this.m_num_tex=t_surf.m_brush.m_no_texs;
			this.m_tex=t_surf.m_brush.m_tex;
		}
	}
	this.m_alpha=this.m_alpha-t_ent.m_fade_alpha;
	this.m_use_depth_test=1;
	this.m_use_depth_write=1;
	var t_enable_blend=0;
	if(t_ent.m_using_alpha==true){
		if(t_ent.m_brush.m_alpha<1.0){
			t_enable_blend=1;
			this.m_use_depth_write=0;
		}else{
			if(t_surf.m_alpha_enable==true){
				t_enable_blend=1;
				this.m_use_depth_write=0;
			}else{
				t_enable_blend=0;
				this.m_use_depth_test=1;
				this.m_use_depth_write=1;
			}
		}
	}else{
		t_enable_blend=0;
	}
	if(t_enable_blend==0){
		this.m_blend=-1;
	}
	this.m_use_vertex_colors=0;
	this.m_use_flatshade=0;
	this.m_use_fog=((t_cam.m_fog_mode>0)?1:0);
	if((this.m_fx&1)!=0){
		t_ambient_red=0.0;
		t_ambient_green=0.0;
		t_ambient_blue=0.0;
		this.m_use_full_bright=1;
	}else{
		t_ambient_red=c_TLight.m_ambient_red;
		t_ambient_green=c_TLight.m_ambient_green;
		t_ambient_blue=c_TLight.m_ambient_blue;
		this.m_use_full_bright=0;
	}
	if((this.m_fx&2)!=0){
		this.m_use_vertex_colors=1;
		this.m_red=1.0;
		this.m_green=1.0;
		this.m_blue=1.0;
		this.m_alpha=1.0;
	}
	if((this.m_fx&4)!=0){
		this.m_use_flatshade=1;
	}
	if((this.m_fx&8)!=0){
		this.m_use_fog=0;
	}
	if((this.m_fx&16)!=0){
		this.m_use_backface_culling=0;
	}else{
		this.m_use_backface_culling=1;
	}
	if((this.m_fx&64)!=0){
		this.m_use_depth_test=0;
		this.m_use_depth_write=0;
	}
	this.m_use_alpha_test=0;
	var t_tex_alphatest=0;
	if(this.m_num_tex>0){
		for(var t_i=0;t_i<=this.m_num_tex-1;t_i=t_i+1){
			if((this.m_tex[t_i])!=null){
				t_tex_alphatest|=this.m_tex[t_i].m_flags&4;
			}
		}
	}
	if((this.m_fx&128)>0 || t_tex_alphatest>0){
		this.m_use_alpha_test=1;
		this.m_use_depth_test=1;
		this.m_use_depth_write=1;
	}
	if((this.m_fx&256)!=0){
		this.m_use_perpixellighting=1;
	}
	this.m_ambient=[t_ambient_red,t_ambient_green,t_ambient_blue,0.0];
	this.m_diffuse=[this.m_red,this.m_green,this.m_blue,this.m_alpha];
	this.m_specular=[this.m_shine,this.m_shine,this.m_shine,1.0];
	this.m_shininess=[100.0];
	if((t_cam.m_draw2D)!=0){
		if((this.m_fx&64)==0){
			this.m_use_depth_test=0;
			this.m_use_depth_write=0;
		}
		this.m_use_fog=0;
		this.m_use_full_bright=1;
	}
}
c_EffectState.prototype.p_Overwrite2=function(t_e){
	this.m_use_full_bright=t_e.m_use_full_bright;
	this.m_use_vertex_colors=t_e.m_use_vertex_colors;
	this.m_use_flatshade=t_e.m_use_flatshade;
	this.m_use_fog=t_e.m_use_fog;
	this.m_ambient=[t_e.m_ambient[0],t_e.m_ambient[1],t_e.m_ambient[2],t_e.m_ambient[3]];
	this.m_diffuse=[t_e.m_diffuse[0],t_e.m_diffuse[1],t_e.m_diffuse[2],t_e.m_diffuse[3]];
	this.m_specular=[t_e.m_specular[0],t_e.m_specular[1],t_e.m_specular[2],t_e.m_specular[3]];
	this.m_shininess=[t_e.m_shininess[0]];
	this.m_use_depth_test=t_e.m_use_depth_test;
	this.m_use_depth_write=t_e.m_use_depth_write;
	this.m_use_backface_culling=t_e.m_use_backface_culling;
	this.m_red=t_e.m_red;
	this.m_green=t_e.m_green;
	this.m_blue=t_e.m_blue;
	this.m_alpha=t_e.m_alpha;
	this.m_shine=t_e.m_shine;
	this.m_blend=t_e.m_blend;
	this.m_fx=t_e.m_fx;
	this.m_use_alpha_test=t_e.m_use_alpha_test;
	this.m_use_perpixellighting=t_e.m_use_perpixellighting;
	this.m_num_tex=t_e.m_num_tex;
}
function c_TShaderGLSL(){
	c_TShader.call(this);
	this.m_MAX_TEXTURES=1;
	this.m_u=null;
	this.m_MAX_LIGHTS=1;
	this.m_webgl_shader=0;
	this.m_use_base_variables=1;
}
c_TShaderGLSL.prototype=extend_class(c_TShader);
c_TShaderGLSL.m_new=function(){
	c_TShader.m_new.call(this);
	return this;
}
c_TShaderGLSL.prototype.p_ResetShader=function(){
	error("** Must extend ResetShader for context loss:"+this.m_name);
	return 0;
}
c_TShaderGLSL.prototype.p_CompileShader=function(t_source,t_type){
	if(t_source.length<2){
		print("**Shader file not found");
		return 0;
	}
	var t_id=gl.createShader(t_type);
	this.m_webgl_shader=t_id;
	if(t_type==35633){
		this.m_vertex_id=t_id;
	}
	if(t_type==35632){
		this.m_fragment_id=t_id;
	}
	gl.shaderSource(t_id,t_source);
	gl.compileShader(t_id);
	var t_result=new_number_array(1);
	_glGetShaderiv(t_id,35713,t_result);
	if(t_result[0]!=1){
		var t_log="";
		t_log=gl.getShaderInfoLog(t_id);
		print(t_log);
		print("**Shader Compile Error "+String(t_result[0]));
		gl.deleteShader(t_id);
		if(t_type==35633){
			this.m_vertex_id=0;
		}else{
			this.m_fragment_id=0;
		}
		return 0;
	}
	return 1;
}
c_TShaderGLSL.m_GetGLError=function(){
	var t_gle=gl.getError();
	if(t_gle!=0){
		print("*glerror: "+String(t_gle));
		return 1;
	}
	return 0;
}
c_TShaderGLSL.prototype.p_LinkVariables=function(){
	if((this.m_active)!=0){
		this.m_use_base_variables=1;
		this.m_active=this.m_u.p_Link(this.m_shader_id);
		if((c_TShaderGLSL.m_GetGLError())!=0){
			bb_tutility_Dprint("** uniform assignment","","","","","");
		}
	}
	return 0;
}
c_TShaderGLSL.prototype.p_LinkShader=function(){
	this.m_shader_id=gl.createProgram();
	if(this.m_shader_id<0){
		print("**Shader Program not created.");
	}
	gl.attachShader(this.m_shader_id,this.m_vertex_id);
	gl.attachShader(this.m_shader_id,this.m_fragment_id);
	gl.linkProgram(this.m_shader_id);
	var t_result=new_number_array(1);
	_glGetProgramiv(this.m_shader_id,35714,t_result);
	var t_log="";
	t_log=gl.getProgramInfoLog(this.m_shader_id);
	if(t_result[0]!=1){
		print("**Shader Linking Error ");
		gl.deleteShader(this.m_vertex_id);
		gl.deleteShader(this.m_fragment_id);
		gl.deleteProgram(this.m_shader_id);
		this.m_vertex_id=0;
		this.m_fragment_id=0;
		this.m_shader_id=0;
		return 0;
	}
	this.m_active=1;
	this.m_u=c_ShaderUniforms.m_new.call(new c_ShaderUniforms);
	this.p_LinkVariables();
	return 1;
}
c_TShaderGLSL.prototype.p_Copy=function(){
	var t_brush=c_TShaderGLSL.m_new.call(new c_TShaderGLSL);
	t_brush.m_no_texs=this.m_no_texs;
	t_brush.m_name=this.m_name;
	t_brush.m_red=this.m_red;
	t_brush.m_green=this.m_green;
	t_brush.m_blue=this.m_blue;
	t_brush.m_alpha=this.m_alpha;
	t_brush.m_shine=this.m_shine;
	t_brush.m_blend=this.m_blend;
	t_brush.m_fx=this.m_fx;
	t_brush.m_tex[0]=this.m_tex[0];
	t_brush.m_tex[1]=this.m_tex[1];
	t_brush.m_tex[2]=this.m_tex[2];
	t_brush.m_tex[3]=this.m_tex[3];
	t_brush.m_tex[4]=this.m_tex[4];
	t_brush.m_tex[5]=this.m_tex[5];
	t_brush.m_tex[6]=this.m_tex[6];
	t_brush.m_tex[7]=this.m_tex[7];
	t_brush.m_shader_id=this.m_shader_id;
	t_brush.m_fragment_id=this.m_fragment_id;
	t_brush.m_vertex_id=this.m_vertex_id;
	t_brush.m_u=this.m_u;
	t_brush.m_override=this.m_override;
	t_brush.m_active=1;
	t_brush.p_LinkVariables();
	t_brush.m_active=this.m_active;
	t_brush.m_use_base_variables=this.m_use_base_variables;
	return (t_brush);
}
function c_SurfaceAlphaList(){
	c_List2.call(this);
}
c_SurfaceAlphaList.prototype=extend_class(c_List2);
c_SurfaceAlphaList.m_new=function(){
	c_List2.m_new.call(this);
	return this;
}
function c_FloatBuffer(){
	Object.call(this);
	this.m_buf=null;
}
function c_TVertexAnim(){
	c_FloatBuffer.call(this);
}
c_TVertexAnim.prototype=extend_class(c_FloatBuffer);
function c_FullShader(){
	c_TShaderGLSL.call(this);
}
c_FullShader.prototype=extend_class(c_TShaderGLSL);
c_FullShader.m_shader=[];
c_FullShader.m_GetShader=function(t_ppl,t_num_lights,t_num_texs){
	return c_FullShader.m_shader[2*t_num_texs+t_ppl];
}
c_FullShader.m_fastbrightshader=null;
c_FullShader.m_init_id=0;
c_FullShader.prototype.p_ResetShader=function(){
	if((c_FullShader.m_shader[0])!=null){
		for(var t_i=0;t_i<=9;t_i=t_i+1){
			c_FullShader.m_shader[t_i].m_shader_id=0;
		}
	}
	c_FullShader.m_shader[0]=(c_MultiShader.m_new.call(new c_MultiShader,0,1,0,false));
	c_FullShader.m_shader[1]=(c_MultiShader.m_new.call(new c_MultiShader,1,1,0,false));
	c_FullShader.m_shader[2]=(c_MultiShader.m_new.call(new c_MultiShader,0,1,1,false));
	c_FullShader.m_shader[3]=(c_MultiShader.m_new.call(new c_MultiShader,1,1,1,false));
	c_FullShader.m_shader[4]=(c_MultiShader.m_new.call(new c_MultiShader,0,1,2,false));
	c_FullShader.m_shader[5]=(c_MultiShader.m_new.call(new c_MultiShader,1,1,2,false));
	c_FullShader.m_shader[6]=(c_MultiShader.m_new.call(new c_MultiShader,0,1,3,false));
	c_FullShader.m_shader[7]=(c_MultiShader.m_new.call(new c_MultiShader,1,1,3,false));
	c_FullShader.m_shader[8]=(c_MultiShader.m_new.call(new c_MultiShader,0,1,4,false));
	c_FullShader.m_shader[9]=(c_MultiShader.m_new.call(new c_MultiShader,1,1,4,false));
	c_FullShader.m_init_id=c_FullShader.m_shader[0].m_shader_id;
	this.m_shader_id=c_FullShader.m_shader[0].m_shader_id;
	if((c_FullShader.m_shader[0].m_active)!=0){
		bb_tutility_Dprint("..FullShader success","","","","","");
	}
	this.m_active=c_FullShader.m_shader[0].m_active;
	if((c_FullShader.m_fastbrightshader)!=null){
		c_FastBrightShader.m_init_id=0;
		c_FullShader.m_fastbrightshader.m_shader_id=0;
	}
	c_FullShader.m_fastbrightshader=(c_FastBrightShader.m_new.call(new c_FastBrightShader));
	return 0;
}
c_FullShader.m_global_uniforms=null;
c_FullShader.m_new=function(){
	c_TShaderGLSL.m_new.call(this);
	this.m_MAX_TEXTURES=4;
	this.m_MAX_LIGHTS=1;
	this.m_name="FullShader";
	if(c_FullShader.m_init_id==0 && this.m_shader_id==0){
		this.p_ResetShader();
	}else{
		if((c_FullShader.m_init_id)!=0){
			this.m_shader_id=c_FullShader.m_init_id;
			this.m_u=c_FullShader.m_global_uniforms;
			this.m_active=1;
		}
	}
	return this;
}
c_FullShader.prototype.p_Update=function(){
	return 0;
}
function c_ShaderUniforms(){
	Object.call(this);
	this.m_vertcoords=0;
	this.m_normals=0;
	this.m_colors=0;
	this.m_flags=0;
	this.m_colorflag=0;
	this.m_lightflag=0;
	this.m_ambient_color=0;
	this.m_base_color=0;
	this.m_shininess=0;
	this.m_alphaflag=0;
	this.m_fogflag=0;
	this.m_fog_color=0;
	this.m_fog_range=0;
	this.m_texture=new_number_array(9);
	this.m_tex_position=new_number_array(9);
	this.m_tex_rotation=new_number_array(9);
	this.m_tex_scale=new_number_array(9);
	this.m_tex_blend=new_number_array(9);
	this.m_texfx_normal=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	this.m_vertCoordSet=new_number_array(9);
	this.m_texcoords0=0;
	this.m_texcoords1=0;
	this.m_texflag=0;
	this.m_light_type=new_number_array(9);
	this.m_light_matrix=new_number_array(9);
	this.m_light_att=new_number_array(9);
	this.m_light_color=new_number_array(9);
	this.m_light_spot=new_number_array(9);
	this.m_m_matrix=0;
	this.m_v_matrix=0;
	this.m_p_matrix=0;
	this.m_scaleInv=0;
	this.m_lightpMatrix=0;
	this.m_lightvMatrix=0;
}
c_ShaderUniforms.m_new=function(){
	return this;
}
c_ShaderUniforms.prototype.p_Link=function(t_shader_id){
	this.m_vertcoords=gl.getAttribLocation(t_shader_id,"aVertcoords");
	this.m_texcoords0=gl.getAttribLocation(t_shader_id,"aTexcoords0");
	this.m_texcoords1=gl.getAttribLocation(t_shader_id,"aTexcoords1");
	this.m_normals=gl.getAttribLocation(t_shader_id,"aNormals");
	this.m_colors=gl.getAttribLocation(t_shader_id,"aColors");
	this.m_p_matrix=_glGetUniformLocation(t_shader_id,"pMatrix");
	this.m_m_matrix=_glGetUniformLocation(t_shader_id,"mMatrix");
	this.m_v_matrix=_glGetUniformLocation(t_shader_id,"vMatrix");
	for(var t_i=0;t_i<=7;t_i=t_i+1){
		this.m_light_type[t_i]=_glGetUniformLocation(t_shader_id,"lightType["+String(t_i)+"]");
		this.m_light_matrix[t_i]=_glGetUniformLocation(t_shader_id,"lightMatrix["+String(t_i)+"]");
		this.m_light_color[t_i]=_glGetUniformLocation(t_shader_id,"lightColor["+String(t_i)+"]");
		this.m_light_att[t_i]=_glGetUniformLocation(t_shader_id,"lightAtt["+String(t_i)+"]");
		this.m_light_spot[t_i]=_glGetUniformLocation(t_shader_id,"lightSpot["+String(t_i)+"]");
	}
	this.m_base_color=_glGetUniformLocation(t_shader_id,"basecolor");
	this.m_ambient_color=_glGetUniformLocation(t_shader_id,"ambientcolor");
	this.m_shininess=_glGetUniformLocation(t_shader_id,"shininess");
	this.m_fog_color=_glGetUniformLocation(t_shader_id,"fogColor");
	this.m_fog_range=_glGetUniformLocation(t_shader_id,"fogRange");
	this.m_flags=_glGetUniformLocation(t_shader_id,"flags");
	this.m_texflag=_glGetUniformLocation(t_shader_id,"texflag");
	this.m_colorflag=_glGetUniformLocation(t_shader_id,"colorflag");
	this.m_lightflag=_glGetUniformLocation(t_shader_id,"lightflag");
	this.m_fogflag=_glGetUniformLocation(t_shader_id,"fogflag");
	this.m_alphaflag=_glGetUniformLocation(t_shader_id,"alphaflag");
	this.m_lightpMatrix=_glGetUniformLocation(t_shader_id,"lightpMatrix");
	this.m_lightvMatrix=_glGetUniformLocation(t_shader_id,"lightvMatrix");
	this.m_scaleInv=_glGetUniformLocation(t_shader_id,"scaleInv");
	for(var t_i2=0;t_i2<=7;t_i2=t_i2+1){
		this.m_texture[t_i2]=_glGetUniformLocation(t_shader_id,"uTexture["+String(t_i2)+"]");
		this.m_tex_position[t_i2]=_glGetUniformLocation(t_shader_id,"texPosition["+String(t_i2)+"]");
		this.m_tex_scale[t_i2]=_glGetUniformLocation(t_shader_id,"texScale["+String(t_i2)+"]");
		this.m_tex_rotation[t_i2]=_glGetUniformLocation(t_shader_id,"texRotation["+String(t_i2)+"]");
		this.m_tex_blend[t_i2]=_glGetUniformLocation(t_shader_id,"texBlend["+String(t_i2)+"]");
		this.m_vertCoordSet[t_i2]=_glGetUniformLocation(t_shader_id,"vertCoordSet["+String(t_i2)+"]");
	}
	this.m_texfx_normal[0]=_glGetUniformLocation(t_shader_id,"texfxNormal[0]");
	this.m_texfx_normal[1]=_glGetUniformLocation(t_shader_id,"texfxNormal[1]");
	if(this.m_vertcoords<0){
		bb_tutility_Dprint("**uniform assignment error: vertcoords does not exist","","","","","");
		return 0;
	}
	return 1;
}
function c_TPixmapGL(){
	c_TPixmap.call(this);
	this.m_pixels=null;
	this.m_format=0;
	this.m_pitch=0;
	this.implments={c_IPixmapManager:1};
}
c_TPixmapGL.prototype=extend_class(c_TPixmap);
c_TPixmapGL.m_new=function(){
	c_TPixmap.m_new.call(this);
	return this;
}
c_TPixmapGL.m_Init=function(){
	if(!((c_TPixmap.m_manager)!=null)){
		c_TPixmap.m_manager=(c_TPixmapGL.m_new.call(new c_TPixmapGL));
	}
	if(!((c_TPixmap.m_preloader)!=null)){
		c_TPixmap.m_preloader=c_TPixmapPreloader.m_new.call(new c_TPixmapPreloader,(c_PreloadHTML.m_new.call(new c_PreloadHTML)));
	}
	return 0;
}
c_TPixmapGL.prototype.p_ResizePixmap=function(t_neww,t_newh){
	var t_newpix=c_TPixmapGL.m_new.call(new c_TPixmapGL);
	if(t_neww<1 || t_newh<1){
		return (t_newpix);
	}
	t_newpix.m_pixels=HTMLResizePixmap(this.m_pixels,t_neww,t_newh,true);
	t_newpix.m_width=t_neww;
	t_newpix.m_height=t_newh;
	return (t_newpix);
}
c_TPixmapGL.prototype.p_ResizePixmapNoSmooth=function(t_neww,t_newh){
	var t_newpix=c_TPixmapGL.m_new.call(new c_TPixmapGL);
	if(t_neww<1 || t_newh<1){
		return (t_newpix);
	}
	t_newpix.m_pixels=HTMLResizePixmap(this.m_pixels,t_neww,t_newh,false);
	t_newpix.m_width=t_neww;
	t_newpix.m_height=t_newh;
	return (t_newpix);
}
c_TPixmapGL.prototype.p_LoadPixmap=function(t_f){
	var t_p=c_TPixmapGL.m_new.call(new c_TPixmapGL);
	var t_info=new_number_array(3);
	c_TPixmap.m_preloader.p_GetPixmapPreLoad((t_p),t_f);
	t_p.m_format=4;
	if((t_p.m_width)!=0){
		t_p.m_pitch=t_p.m_width;
	}
	if(!((t_p.m_width)!=0) && !((t_p.m_height)!=0) || !((t_p.m_pixels)!=null)){
		bb_tutility_Dprint("**Image Not Preloaded: "+t_f,"","","","","");
	}
	return (t_p);
}
c_TPixmapGL.prototype.p_CreatePixmap=function(t_w,t_h,t_format){
	var t_p=c_TPixmapGL.m_new.call(new c_TPixmapGL);
	t_p.m_pixels=CreateImageData(t_w,t_h);
	t_p.m_width=t_w;
	t_p.m_height=t_h;
	t_p.m_format=t_format;
	t_p.m_pitch=t_w;
	return (t_p);
}
c_TPixmapGL.prototype.p_FreePixmap=function(){
	this.m_pixels=null;
}
function c_PreloadHTML(){
	Object.call(this);
	this.m_p_map=c_ArrayIntMap.m_new.call(new c_ArrayIntMap);
	this.implments={c_IPreloadManager:1};
}
c_PreloadHTML.m_new=function(){
	return this;
}
c_PreloadHTML.prototype.p_IsLoaded=function(t_file_id){
	var t_f=this.m_p_map.p_Get3(t_file_id);
	if((t_f)!=null){
		return CheckIsLoaded(t_f.m_data);
	}
	return false;
}
c_PreloadHTML.prototype.p_PreLoadData=function(t_f,t_id){
	if(t_id<1){
		return;
	}
	t_f=bb_data_FixDataPath(t_f);
	t_f=t_f.split("//")[1];
	var t_d=c_PreloadData.m_new.call(new c_PreloadData);
	t_d.m_id=t_id;
	t_d.m_data=LoadImageData(t_f,t_id);
	this.m_p_map.p_Set4(t_id,t_d);
}
c_PreloadHTML.prototype.p_SetPixmapFromID=function(t_pixmap,t_id,t_f){
	var t_p=object_downcast((t_pixmap),c_TPixmapGL);
	if((t_p)!=null){
		if(t_id>0){
			var t_d=this.m_p_map.p_Get3(t_id);
			if((t_d)!=null){
				t_p.m_pixels=t_d.m_data;
				var t_info=GetImageInfo(t_p.m_pixels);
				t_p.m_width=t_info[0];
				t_p.m_height=t_info[1];
			}
		}
	}
}
function c_FrameBuffer(){
	Object.call(this);
}
function c_FrameBufferGL(){
	c_FrameBuffer.call(this);
	this.m_fbufferID=0;
	this.m_texture=null;
	this.m_depth_flag=0;
	this.m_rbufferID=0;
	this.m_UVW=1.0;
	this.m_UVH=1.0;
}
c_FrameBufferGL.prototype=extend_class(c_FrameBuffer);
c_FrameBufferGL.m_supportFBO=0;
c_FrameBufferGL.m_fboStack=null;
c_FrameBufferGL.m_gsurf=null;
c_FrameBufferGL.m_BindFBO=function(t_fbo){
	t_fbo.m_fbufferID=gl.createFramebuffer();
	_glBindTexture(3553,t_fbo.m_texture.m_gltex[0]);
	if(!t_fbo.m_texture.m_tex_smooth){
		gl.texParameteri(3553,10240,9728);
		gl.texParameteri(3553,10241,9728);
	}else{
		gl.texParameteri(3553,10240,9729);
		gl.texParameteri(3553,10241,9729);
	}
	gl.texParameteri(3553,10242,33071);
	gl.texParameteri(3553,10243,33071);
	_glBindFramebuffer(36160,t_fbo.m_fbufferID);
	gl.framebufferTexture2D(36160,36064,3553,t_fbo.m_texture.m_gltex[0],0);
	if(((t_fbo.m_depth_flag)!=0) && !((t_fbo.m_rbufferID)!=0)){
		t_fbo.m_rbufferID=gl.createRenderbuffer();
	}
	if((t_fbo.m_depth_flag)!=0){
		_glBindRenderbuffer(36161,t_fbo.m_rbufferID);
		gl.renderbufferStorage(36161,33189,t_fbo.m_texture.m_width,t_fbo.m_texture.m_height);
		gl.framebufferRenderbuffer(36160,36096,36161,t_fbo.m_rbufferID);
	}
	var t_status=gl.checkFramebufferStatus(36160);
	var t_1=t_status;
	if(t_1==36053){
		bb_tutility_Dprint("..FBO success","","","","","");
	}else{
		if(t_1==36061){
			bb_tutility_Dprint("**FBO: unsupported.","","","","","");
		}else{
			bb_tutility_Dprint("**FBO unsuccessful :"+String(t_status),"","","","","");
		}
	}
	if(t_fbo.m_texture.m_width>t_fbo.m_texture.m_height){
		t_fbo.m_UVW=(t_fbo.m_texture.m_height)/(t_fbo.m_texture.m_width);
		t_fbo.m_UVH=1.0;
	}else{
		if(t_fbo.m_texture.m_width<t_fbo.m_texture.m_height){
			t_fbo.m_UVW=1.0;
			t_fbo.m_UVH=(t_fbo.m_texture.m_width)/(t_fbo.m_texture.m_height);
		}else{
			t_fbo.m_UVW=1.0;
			t_fbo.m_UVH=1.0;
		}
	}
	if(t_fbo.m_texture.m_width<c_TRender.m_width || t_fbo.m_texture.m_height<c_TRender.m_height){
		if(c_TRender.m_width>c_TRender.m_height){
			t_fbo.m_UVH=(c_TRender.m_height)/(c_TRender.m_width);
		}else{
			t_fbo.m_UVW=(c_TRender.m_width)/(c_TRender.m_height);
		}
	}else{
		t_fbo.m_UVW=(c_TRender.m_width)/(t_fbo.m_texture.m_width);
		t_fbo.m_UVH=(c_TRender.m_height)/(t_fbo.m_texture.m_height);
	}
	if(!((c_FrameBufferGL.m_gsurf)!=null)){
		c_FrameBufferGL.m_gsurf=c_TSurface.m_new.call(new c_TSurface);
		c_FrameBufferGL.m_gsurf.p_AddVertex(-1.0,1.0,0.0,0.0,1.0,0.0);
		c_FrameBufferGL.m_gsurf.p_AddVertex(-1.0,-1.0,0.0,0.0,0.0,0.0);
		c_FrameBufferGL.m_gsurf.p_AddVertex(1.0,-1.0,0.0,1.0,0.0,0.0);
		c_FrameBufferGL.m_gsurf.p_AddVertex(1.0,1.0,0.0,1.0,1.0,0.0);
		c_FrameBufferGL.m_gsurf.p_AddTriangle(1,0,2);
		c_FrameBufferGL.m_gsurf.p_AddTriangle(2,0,3);
		c_FrameBufferGL.m_gsurf.m_reset_vbo=-1;
	}
	_glBindTexture(3553,0);
	_glBindFramebuffer(36160,0);
	_glBindRenderbuffer(36161,0);
	if(false && ((c_OpenglES20.m_GetGLError())!=0)){
		print("**FBO Create error");
	}
}
c_FrameBufferGL.m_framebuffer_active=null;
function c_MultiShader(){
	c_TShaderGLSL.call(this);
}
c_MultiShader.prototype=extend_class(c_TShaderGLSL);
c_MultiShader.m_VERTVARS0="";
c_MultiShader.m_LightVars="";
c_MultiShader.m_LightingEquation0="";
c_MultiShader.m_VERTP1="";
c_MultiShader.m_VERTP2="";
c_MultiShader.prototype.p_Vert_Texture=function(t_i){
	if(t_i==0){
		return "texcoord[0].xy = all_zeros.xy; ";
	}
	var t_str="vec2 scale; float cosang; float sinang; vec2 pos;";
	t_str=t_str+"/*NORMAL MAPPING ROTATION*//*-- tangent in aColors, cross to find bitangent*/if ((texflag > 0.0) && (texfxNormal[0] > 0.0)) {\tvec3 tangent = normalize(mMatrix*aColors).xyz;\tvec3 bitangent = normalize( cross(  normal.xyz, tangent.xyz ));\tmat3 nmMat = mat3( tangent.x, bitangent.x, normal.x,tangent.y, bitangent.y, normal.y,tangent.z, bitangent.z, normal.z);\tnmLight = nmMat * nmLight;\t}";
	for(var t_j=0;t_j<=t_i-1;t_j=t_j+1){
		t_str=t_str+("texcoord["+String(t_j)+"].xy = mix(aTexcoords0.xy, aTexcoords1.xy, vertCoordSet["+String(t_j)+"]);");
		t_str=t_str+("scale = texScale["+String(t_j)+"]; cosang = texRotation["+String(t_j)+"].x; sinang = texRotation["+String(t_j)+"].y; pos = texPosition["+String(t_j)+"]/scale.xy;"+"(texcoord["+String(t_j)+"]).x = ((texcoord["+String(t_j)+"].x + pos.x) * cosang - (texcoord["+String(t_j)+"].y + pos.y) * sinang)*scale.x;"+"(texcoord["+String(t_j)+"]).y = ((texcoord["+String(t_j)+"].x + pos.x) * sinang + (texcoord["+String(t_j)+"].y + pos.y) * cosang)*scale.y;");
	}
	return t_str;
}
c_MultiShader.m_VERTP3="";
c_MultiShader.m_VERTFOG="";
c_MultiShader.m_Vert_Lighting0="";
c_MultiShader.m_FRAGVARS0="";
c_MultiShader.m_FRAGVARS1="";
c_MultiShader.m_FRAGBLEND="";
c_MultiShader.m_Frag_VertexLighting0="";
c_MultiShader.m_FRAGP2="";
c_MultiShader.prototype.p_Frag_Texture=function(t_i){
	var t_str="";
	var t_clr="";
	if(t_i==0){
		t_str="finalcolor = vertcolor;";
	}
	if(t_i>0){
		t_str="if (!usenormalmap) { texture = texture2D(uTexture[0], (texcoord[0]).xy); finalcolor = BlendFunction(texBlend[0].x, texture, finalcolor, vertcolor); } if(!usenormalmap && (texture.a<alphaflag)) {discard;} /* fix for tegra3 */ \n";
		for(var t_j=1;t_j<=t_i-1;t_j=t_j+1){
			t_str=t_str+(" texture = texture2D(uTexture["+String(t_j)+"], (texcoord["+String(t_j)+"]).xy);");
			t_str=t_str+(" finalcolor = BlendFunction(texBlend["+String(t_j)+"].x, texture, finalcolor, vec4(1,1,1, vertcolor.w) ); ");
		}
	}
	return t_str;
}
c_MultiShader.m_FRAGCOLOR="";
c_MultiShader.m_Frag_LightVars="";
c_MultiShader.m_global_uniforms=null;
c_MultiShader.m_new=function(t_ppl,t_num_lights,t_num_texs,t_debug){
	c_TShaderGLSL.m_new.call(this);
	this.m_MAX_TEXTURES=4;
	this.m_MAX_LIGHTS=1;
	this.m_name="FullShader PPL"+String(t_ppl)+" LI"+String(t_num_lights)+" TX"+String(t_num_texs);
	var t_VP="";
	var t_FP="";
	if(t_ppl==0){
		t_VP=[c_MultiShader.m_VERTVARS0,c_MultiShader.m_LightVars,c_MultiShader.m_LightingEquation0,c_MultiShader.m_VERTP1,c_MultiShader.m_VERTP2,this.p_Vert_Texture(t_num_texs),c_MultiShader.m_VERTP3,c_MultiShader.m_VERTFOG,c_MultiShader.m_Vert_Lighting0,"}\n"].join(t_VP);
		t_FP=[c_MultiShader.m_FRAGVARS0,c_MultiShader.m_FRAGVARS1,c_MultiShader.m_FRAGBLEND,c_MultiShader.m_Frag_VertexLighting0,c_MultiShader.m_FRAGP2,this.p_Frag_Texture(t_num_texs),c_MultiShader.m_FRAGCOLOR].join(t_FP);
	}else{
		t_VP=[c_MultiShader.m_VERTVARS0,c_MultiShader.m_VERTP1,c_MultiShader.m_VERTP2,this.p_Vert_Texture(t_num_texs),c_MultiShader.m_VERTP3,c_MultiShader.m_VERTFOG,"}\n"].join(t_VP);
		t_FP=[c_MultiShader.m_FRAGVARS0,c_MultiShader.m_LightVars,c_MultiShader.m_Frag_LightVars,c_MultiShader.m_FRAGVARS1,c_MultiShader.m_FRAGBLEND,c_MultiShader.m_LightingEquation0,c_MultiShader.m_FRAGP2,this.p_Frag_Texture(t_num_texs),c_MultiShader.m_FRAGCOLOR].join(t_FP);
	}
	if(this.m_shader_id==0 && ((this.p_CompileShader(t_VP,35633))!=0) && ((this.p_CompileShader(t_FP,35632))!=0)){
		this.p_LinkShader();
		this.p_LinkVariables();
		c_MultiShader.m_global_uniforms=this.m_u;
	}else{
		if((this.m_shader_id)!=0){
			this.m_u=c_MultiShader.m_global_uniforms;
			this.m_active=1;
		}
	}
	return this;
}
c_MultiShader.m_new2=function(){
	c_TShaderGLSL.m_new.call(this);
	return this;
}
c_MultiShader.prototype.p_ResetShader=function(){
	return 1;
}
c_MultiShader.prototype.p_Update=function(){
	return 0;
}
function c_FastBrightShader(){
	c_TShaderGLSL.call(this);
}
c_FastBrightShader.prototype=extend_class(c_TShaderGLSL);
c_FastBrightShader.m_init_id=0;
c_FastBrightShader.m_global_uniforms=null;
c_FastBrightShader.prototype.p_ResetShader=function(){
	if(((this.p_CompileShader("attribute vec3 aVertcoords;attribute vec2 aTexcoords0; attribute vec4 aColors; uniform mat4 pMatrix;uniform mat4 vMatrix;uniform mat4 mMatrix;varying vec2 texcoord[1]; uniform float colorflag; uniform vec4 basecolor; uniform vec2 texPosition[1],  texScale[1], texRotation[1]; uniform float texflag; varying vec4 vertColor; varying vec2 varTex; void main(){ gl_Position = (pMatrix*mMatrix ) * vec4(aVertcoords, 1.0); vertColor = mix(basecolor , aColors, colorflag); vec2 scale = texScale[0];float cosang = texRotation[0].x; float sinang = texRotation[0].y; vec2 pos = texPosition[0]/scale; (texcoord[0]).x = ((aTexcoords0.x + pos.x) * cosang - (aTexcoords0.y + pos.y) * sinang)*scale.x; (texcoord[0]).y = ((aTexcoords0.x + pos.x) * sinang + (aTexcoords0.y + pos.y) * cosang)*scale.y; varTex.x = step(1.0,texflag); varTex.y = step(2.0,texflag); \n} ",35633))!=0) && ((this.p_CompileShader("#ifdef GL_ES \n precision highp float; \n #endif \n uniform sampler2D uTexture[1]; uniform vec4 ambientcolor; uniform float alphaflag; varying vec2 texcoord[1]; varying vec4 vertColor; varying vec2 varTex; const vec4 all_ones=vec4(1.0,1.0,1.0,1.0); void main(){   vec4 tex = texture2D( uTexture[0],texcoord[0] ); if (tex.w>=alphaflag) {gl_FragColor= vec4(ambientcolor.xyz,0.0) + mix(vertColor, vertColor * tex * 1.0, varTex.x ); \n} else { discard;} \n}",35632))!=0)){
		this.p_LinkShader();
		this.p_LinkVariables();
		c_FastBrightShader.m_global_uniforms=this.m_u;
		c_FastBrightShader.m_init_id=this.m_shader_id;
		if((this.m_active)!=0){
			bb_tutility_Dprint("..FastBrightShader success","","","","","");
		}
	}else{
		return 0;
	}
	return 0;
}
c_FastBrightShader.m_new=function(){
	c_TShaderGLSL.m_new.call(this);
	this.m_MAX_TEXTURES=2;
	this.m_MAX_LIGHTS=0;
	this.m_name="FastBrightShader";
	if(c_FastBrightShader.m_init_id==0 && this.m_shader_id==0){
		this.p_ResetShader();
	}else{
		if((c_FastBrightShader.m_init_id)!=0){
			this.m_shader_id=c_FastBrightShader.m_init_id;
			this.m_u=c_FastBrightShader.m_global_uniforms;
			this.m_active=1;
		}
	}
	return this;
}
c_FastBrightShader.prototype.p_Update=function(){
	return 0;
}
function bb_functions_CreateTexture(t_width,t_height,t_flags,t_frames){
	return c_TTexture.m_CreateTexture(t_width,t_height,t_flags,t_frames,null);
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
c_Stack5.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator13.m_new.call(new c_Enumerator13,this);
}
c_Stack5.m_NIL=null;
c_Stack5.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack5.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack5.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack5.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack5.m_NIL;
	}
	this.m_length=0;
}
function c_FBOStack(){
	c_Stack5.call(this);
}
c_FBOStack.prototype=extend_class(c_Stack5);
c_FBOStack.m_new=function(){
	c_Stack5.m_new.call(this);
	return this;
}
function c_Enumerator13(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator13.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator13.m_new2=function(){
	return this;
}
c_Enumerator13.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator13.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function bb_mojographics_Transform2D(t_mat,t_x,t_y,t_z){
	var t_t2d=new_number_array(3);
	t_t2d[0]=t_mat.m_grid[0][0]*t_x+t_mat.m_grid[1][0]*t_y+t_mat.m_grid[3][0];
	t_t2d[1]=t_mat.m_grid[0][1]*t_x+t_mat.m_grid[1][1]*t_y+t_mat.m_grid[3][1];
	t_t2d[2]=t_z;
	return t_t2d;
}
function c_PreloadData(){
	Object.call(this);
	this.m_data=null;
	this.m_id=0;
}
c_PreloadData.m_new=function(){
	return this;
}
function c_ArrayIntMap(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_ArrayIntMap.m_new=function(){
	this.m_data=new_object_array(32);
	this.m_length=31;
	return this;
}
c_ArrayIntMap.prototype.p_Get3=function(t_id){
	if(t_id<this.m_length){
		return this.m_data[t_id];
	}
	return null;
}
c_ArrayIntMap.prototype.p_Set4=function(t_id,t_obj){
	while(t_id>=this.m_length){
		this.m_length=this.m_length+32;
		this.m_data=resize_object_array(this.m_data,this.m_length+1);
	}
	this.m_data[t_id]=t_obj;
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
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
	bb_app__updateRate=0;
	c_TRender.m_shader2D=(c_BlankShader.m_new.call(new c_BlankShader));
	c_TRender.m_render=null;
	c_MojoEmulationDevice.m__device=null;
	c_MojoEmulationDevice.m__olddevice=null;
	c_MojoEmulationDevice.m__quadCache=null;
	c_TEntity.m_entity_list=c_EntityList.m_new.call(new c_EntityList);
	c_TTexture.m_useGlobalResizeSmooth=true;
	c_TRender.m_draw_list=c_List3.m_new.call(new c_List3);
	c_MojoEmulationDevice.m_firstTimeRun=false;
	c_TPixmap.m_preloader=null;
	c_Stack2.m_NIL=null;
	c_MiniB3DApp.m__resumed=false;
	c_TRender.m_tris_rendered=0;
	c_TTexture.m_tex_bind_stack=c_TextureStack.m_new.call(new c_TextureStack);
	c_Stack3.m_NIL=null;
	c_TCamera.m_cam_list=c_EntityList2.m_new.call(new c_EntityList2);
	c_TShader.m_process_list=c_List6.m_new.call(new c_List6);
	c_TShader.m_g_shader=null;
	c_TLight.m_light_list=c_List7.m_new.call(new c_List7);
	c_TRender.m_render_list=c_RenderAlphaList.m_new.call(new c_RenderAlphaList);
	c_TRender.m_render_alpha_list=c_RenderAlphaList.m_new.call(new c_RenderAlphaList);
	c_TRender.m_wireframe=0;
	c_TRender.m_temp_shader=null;
	c_ShortBuffer.m_i2f=null;
	c_TRender.m_alpha_pass=0;
	c_TRender.m_camera2D=c_TCamera.m_new.call(new c_TCamera);
	c_TRender.m_width=0;
	c_TRender.m_height=0;
	c_MiniB3DApp.m__suspend=false;
	c_TModelObj.m_override_texflags=-1;
	c_Stack4.m_NIL="";
	c_TModelObj.m_url_path="";
	c_TTexture.m_default_texflags=9;
	c_TTextureFilter.m_filter_list=c_List8.m_new.call(new c_List8);
	c_TTexture.m_tex_list=c_List9.m_new.call(new c_List9);
	c_TPixmap.m_manager=null;
	c_TBone.m_t_mat=c_Matrix.m_new.call(new c_Matrix);
	c_TBone.m_new_mat=c_Matrix.m_new.call(new c_Matrix);
	c_TEntity.m_temp_mat=c_Matrix.m_new.call(new c_Matrix);
	c_TLight.m_no_lights=0;
	c_TLight.m_max_lights=8;
	bb_random_Seed=1234;
	c_FPSCounter.m_startTime=0;
	c_FPSCounter.m_fpsCount=0;
	c_FPSCounter.m_totalFPS=0;
	c_OpenglES20.m_last_texture=null;
	c_OpenglES20.m_last_surf=null;
	c_OpenglES20.m_last_shader=0;
	c_OpenglES20.m_last_tex_count=8;
	c_OpenglES20.m_last_effect=c_EffectState.m_new.call(new c_EffectState);
	c_TShader.m_default_shader=null;
	c_OpenglES20.m_alpha_list=c_SurfaceAlphaList.m_new.call(new c_SurfaceAlphaList);
	c_OpenglES20.m_effect=c_EffectState.m_new.call(new c_EffectState);
	c_TRender.m_vbo_enabled=false;
	c_OpenglES20.m_total_errors=0;
	c_TLight.m_ambient_red=0.1;
	c_TLight.m_ambient_green=0.1;
	c_TLight.m_ambient_blue=0.1;
	c_OpenglES20.m__usePerPixelLighting=0;
	c_FullShader.m_shader=new_object_array(10);
	c_FullShader.m_fastbrightshader=null;
	c_OpenglES20.m__nullTexture=null;
	c_FrameBufferGL.m_supportFBO=0;
	c_TEntity.m_global_mat=c_Matrix.m_new.call(new c_Matrix);
	c_FullShader.m_init_id=0;
	c_MultiShader.m_VERTVARS0="/*generic opengl 2.0 shader*/ \n#ifdef GL_ES \n precision highp float; \n#endif \nattribute vec2 aTexcoords0, aTexcoords1;attribute vec3 aVertcoords;attribute vec3 aNormals;attribute vec4 aColors;uniform mat4 pMatrix, vMatrix, mMatrix;/*light*/ uniform float lightType[2];uniform mat4 lightMatrix[2];uniform vec3 lightSpot[2]; /*x=outercutoff,y=innercutoff,z=spot exponent*/ /*color*/ uniform vec4 basecolor; uniform float colorflag, lightflag; /*texture*/ uniform vec2 texPosition[5],  texScale[5]; uniform vec2 texRotation[5]; uniform float texflag; uniform float texfxNormal[2];uniform vec3 scaleInv; uniform int fogflag; uniform vec2 fogRange; uniform float vertCoordSet[5];varying vec2 texcoord[4]; varying vec4 normal; varying vec4 vertcolor;varying vec4 lightVec, halfVec; varying float fogBlend; varying vec3 nmLight;const vec4 all_zeros = vec4(0.0,0.0,0.0,0.0);const vec4 all_ones = vec4(1.0,1.0,1.0,1.0);const float LOG2 = 1.442695;const vec2 one_zero = vec2(1.0,0.0); \n";
	c_MultiShader.m_LightVars="uniform vec4 lightColor[2];uniform vec4 lightAtt[2];const vec3 LIGHTUNIT = vec3(0.0,0.0,-1.0);uniform float shininess;";
	c_MultiShader.m_LightingEquation0="vec4 LightFunction0 ( const vec4 lightcolor, const vec3 norm, inout vec4 specular ) {const int i=0; /*do per light, webgl restriction*/float lambertTerm = 0.0; vec4 shine4 = vec4(shininess,shininess,shininess,shininess);vec3 lightPos= lightMatrix[i][3].xyz;float spotlight = 1.0;float dist = 0.0;float d=1.0;if (lightType[i] == 1.0) {lightPos= one_zero.yyy; dist = lightAtt[i].w-0.0001;\t} else if (lightType[i] == 2.0) {dist = distance(lightPos.xyz , lightVec.xyz);} else if (lightType[i] ==3.0) {dist = distance(lightPos.xyz , lightVec.xyz);mat3 lightmat = mat3(lightMatrix[i][0].xyz, lightMatrix[i][1].xyz, lightMatrix[i][2].xyz);vec3 lightDir = normalize(lightmat * LIGHTUNIT ).xyz;vec3 lightV = lightPos.xyz - lightVec.xyz; spotlight = max(-dot(normalize(lightV), lightDir), 0.0);float spotlightFade = clamp((lightSpot[i].x - spotlight) / (lightSpot[i].x - lightSpot[i].y), 0.0, 1.0);spotlight = pow(spotlight * spotlightFade, lightSpot[i].z);};\tvec3 L = ( (texflag > 0.0) && (texfxNormal[0] > 0.0) ) ? nmLight : normalize(lightPos.xyz - lightVec.xyz); vec3 N = normalize(norm); float NdotL = clamp(dot(N,L),0.0,1.0);if (NdotL > 0.0) {\tif (dist > 0.0 && dist < lightAtt[i].w*10.0) {if (lightType[i] >1.0) {d = (spotlight ) / (  lightAtt[i].x + (lightAtt[i].y* dist)  ) ;}lambertTerm = clamp(NdotL * d  , 0.0, 1.0) ;if (shininess > 0.0) {\tspecular = pow( max(dot(halfVec.xyz, N) , 0.0), 100.0  ) *  d * shine4;\t}}}return (lightColor[i] * lambertTerm  );}";
	c_MultiShader.m_VERTP1="void main() {vec4 lightPos[5]; vec4 vertVec = all_ones; lightPos[0] = vec4(lightMatrix[0][3][0],lightMatrix[0][3][1],lightMatrix[0][3][2],1.0); vec4 specular = all_zeros;/*****IMPORTANT: I'm WORKING in WORLD SPACE******* and pMatrix = p*v */vertVec = mMatrix * vec4(aVertcoords, 1.0);normal = mMatrix * vec4(aNormals,0.0);normal = normalize(normal); float light = lightType[0] * (lightflag>0.0?1.0:0.0); float d = 0.0;float spotlight = 1.0;lightVec = all_ones; /*IMPORTANT! for android, divide by 0 in normalization error*/mat3 lightmat = mat3(lightMatrix[0][0].xyz, lightMatrix[0][1].xyz, lightMatrix[0][2].xyz);/*halfvec specular*/ halfVec = vec4(normalize((lightPos[0].xyz- vertVec.xyz) + -( vMatrix[3].xyz - vertVec.xyz )) , 0.0);nmLight = all_zeros.xyz; /*meaningless*/if (light == 1.0 ) {lightVec.xyz = lightmat * vec3(0.0,0.0,-1.0); nmLight = normalize(-lightVec.xyz);} else if (light == 2.0 ) { lightVec.xyz = vertVec.xyz; nmLight = normalize(lightPos[0].xyz - vertVec.xyz);\t} else if (light == 3.0 ) { vec3 lightDir = normalize(lightmat * vec3(0.0,0.0,1.0));lightVec.xyz = vertVec.xyz; nmLight = normalize(lightPos[0].xyz - vertVec.xyz);}\n";
	c_MultiShader.m_VERTP2="";
	c_MultiShader.m_VERTP3="vertcolor = mix (basecolor, aColors, colorflag); vec4 vertpos = pMatrix * vertVec; gl_Position = vertpos; ";
	c_MultiShader.m_VERTFOG="fogBlend = 0.0;if (fogflag == 1) {\tfloat fogz = length(vertpos.xyz);fogBlend = (fogz- fogRange.x) / (fogRange.y - fogRange.x);\tfogBlend = clamp(fogBlend, 0.0, 1.0);}else if (fogflag == 2) {\tfloat fogz = length(vertpos.xyz); float dens = 1.0/ (fogRange.y - fogRange.x);\tfogBlend = 1.0-exp2( -dens*(fogz- fogRange.x)* LOG2 );fogBlend = clamp(fogBlend, 0.0, 1.0);}else if (fogflag == 3) {\tfloat fogz = length(vertpos.xyz);float ff = (fogz- fogRange.x);\tfloat dens = 1.0/ (fogRange.y - fogRange.x);fogBlend = 1.0-exp2( -dens * ff * ff * sign(ff) * LOG2 );fogBlend = clamp(fogBlend, 0.0, 1.0);}";
	c_MultiShader.m_Vert_Lighting0="lightVec = LightFunction0( all_ones, normal.xyz, specular );";
	c_MultiShader.m_FRAGVARS0="#ifdef GL_ES \nprecision highp float; \n\n#endif \nvarying vec2 texcoord[4]; varying vec4 normal;varying vec4 vertcolor;varying vec4 lightVec, halfVec; /*using z component for light att  ;spotlight coefficient packed into halfvec.w*/varying float fogBlend;varying vec3 nmLight;uniform mat4 mMatrix;/*texture*/ uniform float texflag; uniform sampler2D uTexture[5];uniform vec2 texBlend[5];uniform float texfxNormal[2];/*light*/uniform float lightflag;";
	c_MultiShader.m_FRAGVARS1="/*material*/uniform vec4 ambientcolor;uniform float flags;uniform float alphaflag; uniform vec4 fogColor;const vec2 one_zero = vec2(1.0,0.0);const vec4 all_zeros = vec4(0.0,0.0,0.0,0.0);";
	c_MultiShader.m_FRAGBLEND="/*blendfunc*/vec4 BlendFunction(const float blend, const vec4 texture, const vec4 finalcolor, const vec4 vertcolorx) {vec4 color = one_zero.yyyy;    if (blend ==1.0) {color.xyz = mix(finalcolor.xyz, texture.xyz, texture.w );color.w = vertcolorx.a; return color;} else if (blend ==2.0) { color = (vertcolorx * texture * finalcolor);     return color;} else if(blend==3.0) {    color = ((color * vertcolorx) + (texture * finalcolor)); return color;} else if(blend==4.0) {    color = (vertcolorx * texture); return finalcolor+color;} else if(blend==5.0) {    color = (vertcolorx * texture); return finalcolor*color;} return (texture);}";
	c_MultiShader.m_Frag_VertexLighting0="vec4 LightFunction0 (const vec4 lightcolor, const vec3 norm, const vec4 specular ) {return lightVec;} ";
	c_MultiShader.m_FRAGP2="void main () { vec4 finalcolor = one_zero.xxxx;vec4 ambient = vec4(ambientcolor.xyz,0.0);vec4 light = one_zero.xxxx;vec4 specular = one_zero.yyyy;bool usenormalmap = (texflag > 0.0) && (texfxNormal[0] > 0.0); /*fixes webgl angle bug*/\nvec3 N = (( usenormalmap  ) ? (texture2D(uTexture[0],(texcoord[0]).xy).xyz * 2.0 - 1.0) : (normal.xyz));light = lightflag>0.0 ? LightFunction0( light, N, specular ) : one_zero.xxxx ; vec4 texture = one_zero.xxxx;\n";
	c_MultiShader.m_FRAGCOLOR="gl_FragColor = vec4(  mix( ((finalcolor.xyz * light.xyz +specular.xyz) + (finalcolor.xyz * ambient.xyz) ), fogColor.xyz, fogBlend), finalcolor.w );}";
	c_MultiShader.m_Frag_LightVars="uniform mat4 lightMatrix[2];uniform float lightType[2];uniform vec3 lightSpot[2];";
	c_MultiShader.m_global_uniforms=null;
	c_FastBrightShader.m_init_id=0;
	c_FastBrightShader.m_global_uniforms=null;
	c_FullShader.m_global_uniforms=null;
	c_FrameBufferGL.m_fboStack=c_FBOStack.m_new.call(new c_FBOStack);
	c_Stack5.m_NIL=null;
	c_FrameBufferGL.m_gsurf=null;
	c_FrameBufferGL.m_framebuffer_active=null;
	c_MojoSurface.m_list=new_string_array(0);
	c_MojoSurface.m_isLoading=false;
	c_TSprite.m_temp_mat=c_Matrix.m_new.call(new c_Matrix);
}
//${TRANSCODE_END}
