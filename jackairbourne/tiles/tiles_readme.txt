help on how to use tiles
************************

NOTE: FOR THE JS VERSION THIS IS NOW PART OF THE SOURCECODE!

tiles that should be loaded by the engine must be named in the function load_tiles(). Each following/odd line 
must contain the tiles action code, at least a number:

0: no interaction with player, just deco

1: player can stand on this tile

2: savepoint

4: generic bonus

8: not used yet

16,32,64: enemy of type 0,1 or 2

128: direction switch, enemies will turn around when walking into such a tile. enemy and switch tiles are
     displayed only when in editing mode.

256 is reserved

512 is an additional life

These numbers may be combined (whereever it makes sense), as they represent the bits of the tile action number. 
Note: bits 16,32,64,128,256 are reserved (for enemy and animated tile handling).

Tiles must be in folder "tiles". BMPs use black (rgb 0,0,0) as transparent pixels, PNG can use the alpha channel, 
but only full or zero transparency is allowed (masked only).

Animated tiles: use the following filename convention to automaticly load multi-frame tiles:

myanitile__ani32x32x8.png

where "__ani" triggers the loader. the following width, length and number of frames is seperated by "x".
All frames must be in one row.

Additionally the framerate for the animated tile can be set, by adding the following to the next 
line (the tile action line):

eg.
myani__ani32x32x4.bmp
2; speed:10

this will show the next tile frame when the game main loop was executed 10 times. The tile image file must
fit the size given, in this example 128 x 32 pixels.

Also, if a tile should be aligned to the bottom left corner of a 32x32 map cell (and not as by default to
the upper left corner), for example the trees in this demo that are bigger than 32x32, the keyword "alignbottom" 
can be added to the tile action line.

NOTE the JS version uses a diffrent approach. it still uses the filename just explained, but doesn't load it, but 
extracts width, height and number of frames, then loads a sequence of images, eg:
myanithing__ani32x32x4.bmp
would expect:
myanithing0.png
myanithing1.png
myanithing2.png
myanithing3.png

to be present, in 32x32 pixels. Use PNGs only!
