import { Component, Prop, Watch, State,Event,EventEmitter} from '@stencil/core';
import { TernaryPoint,Coordinate } from '../../Shared/types';

@Component({
	shadow:true,
  tag: 'ternary-graph',
  styleUrl: 'ternary-graph.css'
})
export class TernaryGraph{
  @Prop() 	public	recordArray: Array<TernaryPoint> =[{"A":100/3,"B":100/3,"C":100/3,"Label":"Central"}];
  @State()	private	plotArray: Array<Coordinate> = [];
	@Prop({ mutable: true,reflectToAttr: true })	public corners: {"A":{"X","Y"}, "B":{"X","Y"},"C":{"X","Y"}} =  {"A":{"X":10,"Y": 80},"B": {"X":50,"Y": 10},"C": {"X":90,"Y":80}};
	@Prop() private	circleRadius: number = 0.9;
	@Prop({ mutable: true,reflectToAttr: true }) public	aHex: string = "#ffffff";
	@Prop({ mutable: true,reflectToAttr: true }) public	aAxisHex: string = "#ffffff";
	@Prop({ mutable: true,reflectToAttr: true }) public	bHex: string = "#ffffff";
	@Prop({ mutable: true,reflectToAttr: true }) public	bAxisHex: string = "#ffffff";
	@Prop({ mutable: true,reflectToAttr: true }) public	cHex: string = "#ffffff";
	@Prop({ mutable: true,reflectToAttr: true }) public	cAxisHex: string = "#ffffff";
	@Prop({ mutable: true,reflectToAttr: true }) public	FadeEndHex: string = "#ffffff";
	@Prop({ mutable: true,reflectToAttr: true }) public	FillColour: string = "#ffffff";
	@Prop({ mutable: true }) public	OutlineHex: string = "#000000"
	@Prop({ mutable: true }) private	CentralPoint: {"X","Y","X2"?,"Y2"?} = {"X":0,"Y":0};
	@Prop() public showLabelsOnHover:boolean =false;
	@Prop() public mergeMatchingPoints:boolean=false;

	@Prop({ mutable: true }) private cFadeName:string = "cx" + this.corners.C.X +"cy"+ this.corners.C.Y + "rgb" + this.cHex.replace("#","");
	@Prop({ mutable: true }) private cFadeURL:string = "url(#" + this.cFadeName +")";
	@Prop({ mutable: true }) private bFadeName:string = "bx" + this.corners.B.X +"by"+ this.corners.B.Y + "rgb" + this.bHex.replace("#","");
	@Prop({ mutable: true }) private bFadeURL:string = "url(#" + this.bFadeName +")";
	@Prop({ mutable: true }) private aFadeName:string = "ax" + this.corners.A.X +"ay"+ this.corners.A.Y + "rgb" + this.aHex.replace("#","");
	@Prop({ mutable: true }) private aFadeURL:string = "url(#" + this.aFadeName +")";
	
	@Prop() public isSDITriangle: boolean = false;
	@Prop({ mutable: true }) private aCornerOverlayPath = "";
	@Prop({ mutable: true }) private bCornerOverlayPath = "";
	@Prop({ mutable: true }) private cCornerOverlayPath = "";

	@Prop({ mutable: true }) private abTextPathName:string = "ax" + this.corners.A.X + "ay" + this.corners.A.Y +"bx"+ this.corners.B.X + "by"+ this.corners.B.Y;
	@Prop({ mutable: true }) private bcTextPathName:string = "bx" + this.corners.B.X + "by" + this.corners.B.Y +"cx"+ this.corners.C.X + "cy"+ this.corners.C.Y;
	@Prop({ mutable: true }) private acTextPathName:string = "ax" + this.corners.A.X + "ay" + this.corners.A.Y +"cx"+ this.corners.C.X + "ay"+ this.corners.C.Y;
	@Prop({ mutable: true }) private abTextPathHref:string = "#" + this.abTextPathName;
	@Prop({ mutable: true }) private bcTextPathHref:string = "#" + this.bcTextPathName;
	@Prop({ mutable: true }) private acTextPathHref:string = "#" + this.acTextPathName;
	@Prop({ mutable: true }) private aAxisPlotArray: Array<Coordinate> = [];
	@Prop({ mutable: true }) private bAxisPlotArray: Array<Coordinate> = [];
	@Prop({ mutable: true }) private cAxisPlotArray: Array<Coordinate> = [];
	@Prop({ mutable: true }) private aAxisRotation: string = "-60";
	@Prop({ mutable: true }) private bAxisRotation: string = "0";
	@Prop({ mutable: true }) private cAxisRotation: string = "60";
	@Prop({ mutable: true }) private aAxisPath:string = "";
	@Prop({ mutable: true }) private bAxisPath:string = "";
	@Prop({ mutable: true }) private cAxisPath:string = "";
	@Prop() public	axisLabelFontSize : number = 3;
	@Prop() public	abAxisLabel :string;
	@Prop() public	acAxisLabel :string;
	@Prop() public	bcAxisLabel :string;

  @Event() private recordClicked: EventEmitter;	

	@Watch('aHex')
	@Watch('bHex')
	@Watch('cHex')
	@Watch('FadeEndHex')
 	UpdateColours() {
		this.setGradientNames();
  }
	
	@Watch('recordArray')
	@Watch('mergeMatchingPoints')
	UpdateRecordArray(){
		this.updatePlots();
	}

	@Watch('corners')
	updateCorners()
	{
		this.updatePlots();
		this.setTextPathNames();
		this.setCentralPoint()
		this.sdiOverlayPaths();
		this.ternaryAxisPaths();
		this.ternaryAxisLabelPoints();
	}

	@Watch('isSDITriangle')
	setSDI()
	{
		if (this.isSDITriangle)
		{
		this.corners = {"A": {"X":10,"Y": 10},"B": {"X":50,"Y": 80},"C":{"X":90,"Y":10}};
		this.aHex = "#51caf5";
		this.aAxisHex = "#1E97C0"
		this.bHex = "#70c59d";
		this.bAxisHex="#3d926a";
		this.cHex = "#f16a73";
		this.cAxisHex = "#BE3740";
		this.FadeEndHex = "#ffffff";
		this.FillColour = "transparent";
		this.aAxisRotation = "-60";
		this.bAxisRotation = "0";
		this.cAxisRotation = "60"
		this.updateCorners();
		this.UpdateColours();
		}
		else
		{
			this.corners = {"A":{"X":10,"Y": 80},"B": {"X":50,"Y": 10},"C": {"X":90,"Y":80}};
			this.aHex = "#ffffff";
			this.bHex = "#ffffff";
			this.cHex = "#ffffff";
			this.FadeEndHex = "#ffffff";
		}
	}

	private updatePlots()
	{
		if(this.recordArray !== null && this.recordArray !== undefined)
		{
			if(this.recordArray.length > 0)
			{
				this.updatePlotArray();
				this.checkTotalabcPoints();
			}
		}
	}

	componentWillLoad(){
		this.setGradientNames();
		this.setTextPathNames();
		this.updatePlots();
		this.setCentralPoint()
	}

	private setGradientNames()
	{ 
		if (this.corners !== null && this.corners !== undefined)
		{
			this.cFadeName = "cx" + this.corners.C.X +"cy"+ this.corners.C.Y + "rgb" + this.cHex.replace("#","");
			this.cFadeURL = "url(#" + this.cFadeName +")";
			this.aFadeName = "ax" + this.corners.A.X +"ay"+ this.corners.A.Y + "rgb" + this.aHex.replace("#","");
			this.aFadeURL = "url(#" + this.aFadeName +")";
			this.bFadeName = "bx" + this.corners.B.X +"by"+ this.corners.B.Y + "rgb" + this.cHex.replace("#","");
			this.bFadeURL = "url(#" + this.bFadeName +")";
		}
	}

	private HandleClick(record,event)
	{
		this.recordClicked.emit(record);
		console.log(event);
	}

	private setTextPathNames()
	{
		if (this.corners !== null && this.corners !== undefined)
		{
			this.abTextPathName = "ax" + this.corners.A.X + "ay" + this.corners.A.Y +"bx"+ this.corners.B.X + "by"+ this.corners.B.Y;
			this.bcTextPathName = "bx" + this.corners.B.X + "by" + this.corners.B.Y +"cx"+ this.corners.C.X + "cy"+ this.corners.C.Y;
			this.acTextPathName = "ax" + this.corners.A.X + "ay" + this.corners.A.Y +"cx"+ this.corners.C.X + "cy"+ this.corners.C.Y;
			this.abTextPathHref = "#" + this.abTextPathName;
			this.bcTextPathHref = "#" + this.bcTextPathName;
			this.acTextPathHref = "#" + this.acTextPathName;
		}
	}

	private checkTotalabcPoints()
	{
		var incorrectRecords  = "";
		for (let i = 0; i < this.recordArray.length ; i++) {
			if ((this.recordArray[i].A + this.recordArray[i].B + this.recordArray[i].C) != 100)
			{
					incorrectRecords += this.recordArray[i].Label + "\n";
			}
		};
		if (incorrectRecords.length > 0)
		{
		console.log('The following records have values that do not add up to 100 \n' + incorrectRecords);
		 throw new Error('The following records have values that do not add up to 100 \n' + incorrectRecords);
		}
	}

	private coord(TernaryPoint: TernaryPoint) {
  var a = TernaryPoint.A,
    	b = TernaryPoint.B,
			c = TernaryPoint.C,
			x = TernaryPoint.X,
    	y = TernaryPoint.Y,
    	z = TernaryPoint.Z;
	var sum;
	var sum2 =  undefined;
	var point = {"X" : 0, "Y": 0, "X2":undefined,"Y2":undefined};
	sum = a + b + c;
	if (x !== undefined && y !== undefined && z !== undefined)
	{
		sum2 = x + y + z;
	}
  if (sum !== 0) {
    a /= sum;
    b /= sum;
    c /= sum;
    point.X = (this.corners.A.X * a) + (this.corners.B.X * b ) + (this.corners.C.X * c);
		point.Y = (this.corners.A.Y * a) + (this.corners.B.Y * b ) + (this.corners.C.Y * c);
	}
	if (sum2 !== undefined && sum2 !== 0) {
    x /= sum2;
    y /= sum2;
    z /= sum2;
    point.X2 = (this.corners.A.X * x) + (this.corners.B.X * y ) + (this.corners.C.X * z);
		point.Y2 = (this.corners.A.Y * x) + (this.corners.B.Y * y ) + (this.corners.C.Y * z);
	}
	else
	{
		point.X2 = undefined;
		point.Y2 = undefined;
	}

  return point;
}

	private pathData()
	{
		var path ='M ' + this.corners.A.X + ',' +this.corners.A.Y +' L '+ this.corners.B.X + ','+ this.corners.B.Y + ' '+ this.corners.C.X + ','+this.corners.C.Y+  ' Z';
		return path;
	}

	private outlinePathData()
	{
		var path = this.corners.A.X + ',' +this.corners.A.Y +' '+ this.corners.B.X + ','+ this.corners.B.Y + ' '+ this.corners.C.X + ','+this.corners.C.Y;
		return path;
	}

	private setCentralPoint()
	{
		this.CentralPoint =  this.coord({A:100/3,B:100/3,C:100/3,"Label":"central"});
	}

	private abPathData()
	{ var ax = this.corners.A.X;
		var ay = this.corners.A.Y;
		var bx = this.corners.B.X;
		var by = this.corners.B.Y;
		
		if(this.corners.B.Y > this.corners.A.Y)
		{
			ax -= (this.axisLabelFontSize * 1.2);
			bx -= (this.axisLabelFontSize * 1.2);
		}

		var path ='M ' + ax + ',' + ay +' L '+ bx + ','+ by;
		return path;
	}

	private bcPathData()
	{
		var bx = this.corners.B.X;
		var by = this.corners.B.Y;
		var cx = this.corners.C.X;
		var cy = this.corners.C.Y;
		
		if(this.corners.B.Y > this.corners.C.Y)
		{
			bx += (this.axisLabelFontSize * 1.2);
			cx += (this.axisLabelFontSize * 1.2);
		}
		var path ='M ' + bx+ ',' + by+' L '+ cx + ','+ cy;
		return path;
	}

	private acPathData()
	{
		var ay = this.corners.A.Y;
		var cy = this.corners.C.Y;
		if ((this.corners.A.Y > this.corners.B.Y) || (this.corners.C.Y > this.corners.B.Y))
		{
			ay += (this.axisLabelFontSize * 1.2);
			cy += (this.axisLabelFontSize * 1.2);
		}
		else
		{
			ay -= (this.axisLabelFontSize * 0.3);
			cy -= (this.axisLabelFontSize * 0.3);
		}
		var path ='M ' + this.corners.A.X + ',' + ay +' L '+ this.corners.C.X + ','+ cy;
		return path;
	}

	private arrowPathData(record)
	{
		var x = record.X;
		var y = record.Y;
		var x2 = record.X2;
		var y2 = record.Y2;
		var path;
		if (record.X2 !== undefined && record.X2 !== null && record.Y2 !== undefined && record.Y2 !== null)
		{
		path ='M ' + x + ',' +y +' L '+ x2+ ','+ y2;
		}
		else
		{
		path ='';
		}
		return path;
	}
	
  private updatePlotArray() {
		var plots = [];
		var array: Array<TernaryPoint> = [...this.recordArray]

		if(this.mergeMatchingPoints)
		{
			var output = this.recordArray.reduce(function(o, cur) {
				var A = cur.A, B = cur.B, found = o.find(function(elem) {
						return (elem.A == A && elem.B == B)
				});
				if (found) found.Label += ", "+ cur.Label;
				else o.push(cur);
				return o;
			}, []);
			array = [...output]
		}

		plots = array.map( record => {
			if ((record.A + record.B + record.C) == 100)
			{
				var plot = this.coord(record);
				var plotObj = {"X":plot.X,"Y":plot.Y,"X2":plot.X2,"Y2":plot.Y2,"Label":record.Label};
				return plotObj;
			}
		});
		this.plotArray = plots.filter(record => record);
	}

	private hectagonPoints()
	{
		var radius = ((this.corners.C.X - this.corners.A.X ) * 0.1);
		var cx =this.CentralPoint.X
    var cy = this.CentralPoint.Y;
		var numberofsides = 6;
		var centerAng = 2*Math.PI / numberofsides;
		var startAng = Math.PI/2 - centerAng/2
      
	  var points = new Array();
	  for(var i=0 ; i<numberofsides ; i++)
			{ var ang = startAng + (i*centerAng);
			  var x = Math.round(cx + radius*Math.cos(ang));
			  var y = Math.round(cy - radius*Math.sin(ang)); 
			  points.push( {"ID":i,"X":x , "Y":y} );
			}
		return points;
	}

	private sdiOverlayPaths()
	{
		if(this.isSDITriangle)
		{
			var allPoints = this.hectagonPoints();
			var abMinorPoint; //A Second Pointer to B Second Pointer.
			var acMinorPoint //A Third Pointer to C Third Pointer.
			var bcMinorPoint //B Third Pointer to C Second Pointer.

			var aStartPoint;
			var aEndPoint;
			var aSecondPoint;
			var aThirdPoint;

			var bStartPoint;
			var bEndPoint;
			var bSecondPoint;
			var bThirdPoint;

			var cStartPoint;
			var cEndPoint;
			var cSecondPoint;
			var cThirdPoint;

			//Corner a.
			aStartPoint =  this.coord({A:(100/3)*2,B:100/3,C:0,"Label":"aStart"});
			aEndPoint =  this.coord({A:(100/3)*2,B:0,C:100/3,"Label":"aEnd"});
			//Find Top Left Points.
			//Lowest X
			aSecondPoint =   allPoints.reduce((min, p) => p.X < min.X ? p : min, allPoints[0]);
			//Second Lowest X Lowest Y
			aThirdPoint = allPoints.filter(a => a.Y < aSecondPoint.Y).reduce((min, p) => p.X < min.X ? p : min, allPoints[0]);
			
			
			//Corner b
			bStartPoint =  this.coord({A:(100/3),B:(100/3)*2,C:0,"Label":"bStart"});
			bEndPoint =  this.coord({A:0,B:(100/3)*2,C:100/3,"Label":"bEnd"});
			//Find Bottom Points.
			//Lowest X 
			bSecondPoint =   allPoints.reduce((max, p) => p.Y > max.Y ? p : max, allPoints[0]);
			var BottomPoints = allPoints.filter(a => a.Y == bSecondPoint.Y);
			bSecondPoint = 	BottomPoints.reduce((min, p) => p.X < min.X ? p : min, BottomPoints[0]);
			//Highest X
			bThirdPoint = 		BottomPoints.reduce((max, p) => p.X > max.X ? p : max, BottomPoints[0]);

			
			//Corner c.
			cStartPoint =  this.coord({A:0,B:100/3,C:(100/3)*2,"Label":"cEnd"});
			cEndPoint =  this.coord({A:(100/3),B:0,C:(100/3)*2,"Label":"cStart"});
			//Find Top Right Points.
			//Highest X
			cSecondPoint =   allPoints.reduce((min, p) => p.X > min.X ? p : min, allPoints[0]);
			//Second Highest X Lowest Y
			cThirdPoint = allPoints.filter(a => a.Y < cSecondPoint.Y).reduce((max, p) => p.X > max.X ? p : max, allPoints[0]);

			//Set Minor Points
			abMinorPoint = {"X":(aSecondPoint.X	+ bSecondPoint.X)	/2,	"Y":(aSecondPoint.Y + bSecondPoint.Y)	/2};
			acMinorPoint = {"X":(aThirdPoint.X 	+ cThirdPoint.X)	/2,	"Y":(aThirdPoint.Y 	+ cThirdPoint.Y)	/2};
			bcMinorPoint = {"X":(bThirdPoint.X 	+ cSecondPoint.X)	/2,	"Y":(bThirdPoint.Y 	+ cSecondPoint.Y)	/2};

			this.aCornerOverlayPath = "M "	+	aStartPoint.X		+	","	+	aStartPoint.Y		+ 
																" L "	+	aSecondPoint.X 	+ "," +	aSecondPoint.Y	+ 
																" " 	+ abMinorPoint.X 	+ ","	+	abMinorPoint.Y 	+
																" "		+	aSecondPoint.X 	+ "," +	aSecondPoint.Y	+ 
																" " 	+ aThirdPoint.X 	+ ","	+	aThirdPoint.Y 	+ 
																" " 	+ acMinorPoint.X 	+ ","	+	acMinorPoint.Y 	+ 
																" " 	+ aThirdPoint.X 	+ ","	+	aThirdPoint.Y 	+ 
																" " 	+ aEndPoint.X 		+ "," + aEndPoint.Y;
			
			this.bCornerOverlayPath =	"M "	+	bStartPoint.X		+	","	+	bStartPoint.Y		+
																" L " +	bSecondPoint.X	+	","	+	bSecondPoint.Y 	+
																" " 	+	abMinorPoint.X	+	","	+	abMinorPoint.Y 	+ 
																" " 	+	bSecondPoint.X	+	","	+	bSecondPoint.Y 	+  
																" " 	+ bThirdPoint.X 	+	","	+	bThirdPoint.Y 	+
																" " 	+ bcMinorPoint.X 	+	","	+	bcMinorPoint.Y 	+
																" " 	+ bThirdPoint.X 	+	","	+	bThirdPoint.Y 	+
																" "		+	bEndPoint.X			+	"," + bEndPoint.Y;
			
			this.cCornerOverlayPath = "M " 	+ cStartPoint.X 	+	"," +	cStartPoint.Y 	+
																" L " +	cSecondPoint.X	+ "," +	cSecondPoint.Y 	+
																" " 	+	bcMinorPoint.X	+ "," +	bcMinorPoint.Y 	+
																" " 	+	cSecondPoint.X	+ "," +	cSecondPoint.Y 	+
																" " 	+ cThirdPoint.X 	+ ","	+	cThirdPoint.Y		+
																" " 	+ acMinorPoint.X 	+ ","	+	acMinorPoint.Y	+
																" " 	+ cThirdPoint.X 	+ ","	+	cThirdPoint.Y		+
																" " 	+ cEndPoint.X 		+ "," + cEndPoint.Y;
		}
		else
		{
			this.aCornerOverlayPath = "";
			this.bCornerOverlayPath = "";
			this.cCornerOverlayPath = "";
		}
	}

	ternaryAxisPaths()
	{
		var aAxisEndPoint = this.coord({A:0,B:50,C:50});
		this.aAxisPath = "M " + this.corners.A.X +"," + this.corners.A.Y +" L " +aAxisEndPoint.X + "," +aAxisEndPoint.Y;

		var bAxisEndPoint = this.coord({A:50,B:0,C:50});
		this.bAxisPath = "M " + this.corners.B.X +"," + this.corners.B.Y +" L " +bAxisEndPoint.X + "," +bAxisEndPoint.Y;

		var cAxisEndPoint = this.coord({A:50,B:50,C:0});
		this.cAxisPath = "M " + this.corners.C.X +"," + this.corners.C.Y +" L " +cAxisEndPoint.X + "," +cAxisEndPoint.Y;
	}

	ternaryAxisLabelPoints()
	{
		var AAxisPoints: Array<Coordinate> = [];
		var AValue = 90;
		var BValue = 5;
		var CValue = 5;
		var Label = 9;
		var i;
		//Make A Points

		for (i = 0; i < 9; i++) { 
			var axisPoint = this.coord({A:AValue,B:BValue,C:CValue});
			AAxisPoints.push({"X":axisPoint.X,"Y":axisPoint.Y,"Label":Label.toString()+" 0"})
			AValue -=10;
			BValue +=5;
			CValue +=5;
			Label -=1;
		}
		this.aAxisPlotArray = [...AAxisPoints];

		var BAxisPoints: Array<Coordinate> = [];
		AValue = 5;
		BValue = 90;
		CValue = 5;
		Label = 9;

		for (i = 0; i < 9; i++) { 
			var axisPoint = this.coord({A:AValue,B:BValue,C:CValue});
			BAxisPoints.push({"X":axisPoint.X,"Y":axisPoint.Y,"Label":Label.toString()+" 0"})
			AValue +=5;
			BValue -=10;
			CValue +=5;
			Label -=1;
		}
		this.bAxisPlotArray = [...BAxisPoints];

		var CAxisPoints: Array<Coordinate> = [];
		AValue = 5;
		BValue = 5;
		CValue = 90;
		Label = 9;

		for (i = 0; i < 9; i++) { 
			var axisPoint = this.coord({A:AValue,B:BValue,C:CValue});
			CAxisPoints.push({"X":axisPoint.X,"Y":axisPoint.Y,"Label":Label.toString()+" 0"})
			AValue +=5;
			BValue +=5;
			CValue -=10;
			Label -=1;
		}
		this.cAxisPlotArray = [...CAxisPoints];
	}

  render() {
    return (
		<div> 
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
		<defs>
			<linearGradient id={this.cFadeName} gradientUnits="objectBoundingBox" x1={this.corners.C.X/100} y1={this.corners.C.Y/100} x2={this.CentralPoint.X/100} y2={this.CentralPoint.Y/100}>
			<stop offset="0%" stop-color={this.cHex} />
			<stop offset="99%" stop-color={this.cHex} stop-opacity="0"/>
			<stop offset="100%" stop-color={this.FadeEndHex} stop-opacity="0"/>
			</linearGradient>
			<linearGradient id={this.aFadeName} gradientUnits="objectBoundingBox" x1={this.corners.A.X/100} y1={this.corners.A.Y/100} x2={this.CentralPoint.X/100} y2={this.CentralPoint.Y/100}>
			<stop offset="0%" stop-color={this.aHex} />
			<stop offset="99%" stop-color={this.aHex} stop-opacity="0"/>
			<stop offset="100%" stop-color={this.FadeEndHex} stop-opacity="0"/>
			</linearGradient>
			<linearGradient id={this.bFadeName} gradientUnits="objectBoundingBox" x1={this.corners.B.X/100} y1={this.corners.B.Y/100} x2={this.CentralPoint.X/100} y2={this.CentralPoint.Y/100}>
			<stop offset="0%" stop-color={this.bHex} />
			<stop offset="99%" stop-color={this.bHex} stop-opacity="0"/>
			<stop offset="100%" stop-color={this.FadeEndHex} stop-opacity="0"/>
			</linearGradient>
		</defs>
		<g>
			<path d={this.aCornerOverlayPath} stroke={this.aAxisHex} stroke-width="0.5" fill="transparent"/>
			<path d={this.bCornerOverlayPath} stroke={this.bAxisHex} stroke-width="0.5" fill="transparent"/>
			<path d={this.cCornerOverlayPath} stroke={this.cAxisHex} stroke-width="0.5" fill="transparent"/>
			<path d={this.pathData()} fill={this.bFadeURL}/>
			<path d={this.pathData()} fill={this.aFadeURL}/>
			<path d={this.pathData()} fill={this.cFadeURL}/>
			<polygon points={this.outlinePathData()} class="triangle" fill={this.FillColour} stroke={this.OutlineHex} stroke-width="0.2" />
			<path id={this.abTextPathName} d={this.abPathData()} />
			<path id={this.bcTextPathName}  d={this.bcPathData()} />
			<path id={this.acTextPathName}  d={this.acPathData()} />
			<text font-size={this.axisLabelFontSize} fill="blue">
    	<textPath  startOffset="50%" text-anchor="middle" href={this.abTextPathHref} >{this.abAxisLabel}</textPath>
  		</text>
			<text font-size={this.axisLabelFontSize} fill="blue">
    	<textPath  startOffset="50%" text-anchor="middle" href={this.bcTextPathHref} >{this.bcAxisLabel}</textPath>
  		</text>
			<text font-size={this.axisLabelFontSize} fill="blue">
    	<textPath  startOffset="50%" text-anchor="middle" href={this.acTextPathHref} >{this.acAxisLabel}</textPath>
  		</text>
		</g>
		<g>
		{this.aAxisPlotArray.map((axisPlot) => 
				<text x={axisPlot.X} y={axisPlot.Y} font-size="1.5" fill={this.aAxisHex} text-anchor="middle" transform={"rotate("+this.aAxisRotation + " " + axisPlot.X +"," + axisPlot.Y +")"}>{axisPlot.Label}</text>
				)}
		{this.bAxisPlotArray.map((axisPlot) => 
				<text x={axisPlot.X} y={axisPlot.Y} font-size="1.5" fill={this.bAxisHex} text-anchor="middle" transform={"rotate("+this.bAxisRotation + " " + axisPlot.X +"," + axisPlot.Y +")"}>{axisPlot.Label}</text>
				)}
		{this.cAxisPlotArray.map((axisPlot) => 
				<text x={axisPlot.X} y={axisPlot.Y} font-size="1.5" fill={this.cAxisHex} text-anchor="middle" transform={"rotate("+this.cAxisRotation + " " + axisPlot.X +"," + axisPlot.Y +")"}>{axisPlot.Label}</text>
				)}
			<path d={this.aAxisPath} stroke-dasharray="0.5%,0.5%" stroke={this.aAxisHex} stroke-width="0.3" fill="transparent"/>
			<path d={this.bAxisPath} stroke-dasharray="0.5%,0.5%" stroke={this.bAxisHex} stroke-width="0.3" fill="transparent"/>
			<path d={this.cAxisPath} stroke-dasharray="0.5%,0.5%" stroke={this.cAxisHex} stroke-width="0.3" fill="transparent"/>
		</g>
		{this.plotArray.map((record) => 
			<g>
			<circle class="plot" cx={record.X} cy={record.Y} r={this.circleRadius} fill="black" onClick={event => this.HandleClick(record,event)} ></circle>
			<text  class={this.showLabelsOnHover ? "tooltiptexthover":"tooltiptext"} onClick={event => this.HandleClick(record,event)}  text-anchor="middle" x={record.X} y={record.Y - (this.circleRadius*1.2)} fill="black" font-size="2" font-weight="bold"> {record.Label} </text>
				<marker id="{record.Label}" markerWidth="10" markerHeight="10" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
      		<path d="M 0,0 L0,3 L3,1.5 z" />
    		</marker>
  			<path d={this.arrowPathData(record)} fill="none" stroke="black" stroke-width="0.7"  marker-end="url(#{record.Label})"/>
  		</g>
			)}
		</svg>
		</div>
    );
  }
}