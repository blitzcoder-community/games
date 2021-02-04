Graphics 1200,600,32,2
Dim world(1010,110)


Color 255,255,255

bank=CreateBank(110*1010*4)
loadlevel(bank)

wr=WriteFile("jumperworld_data.js")

For j=0 To 100
; a$="world["+j+"] = ["
 a$=""
 For i=0 To 1000
  If i<1000
   a$=a$+world(i,j)+","
  Else
   a$=a$+world(i,j)+","
  EndIf
 Next
 Print a$
 WriteLine wr,a$
Next

CloseFile wr

WaitKey()
End

Function loadlevel(bank)
; to be replaced entirely by <script src="...>
 re=ReadFile("jumperworld.dta")
 su=ReadBytes(bank,re,0,1001*101*4)
 For j=0 To 100
  For i=0 To 1000
   world(i,j)=PeekInt(bank,(i*4)+(j*4000))
  Next
 Next
 CloseFile re
End Function
