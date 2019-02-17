import { Component, Prop, Watch, State,Event,EventEmitter} from '@stencil/core';

@Component({
  tag: 'ternary-graph',
  styleUrl: 'ternary-graph.css'
})
export class TernaryGraph{
	//Added lots of defaults to start with.
  @Prop() recordArray: Array<{"A","B","C","X"?,"Y"?,"Z"?,"Label"}> =[{"A":100/3,"B":100/3,"C":100/3,"Label":"Central"}];
	
  @State() plotArray: Array<{"X","Y","X2"?,"Y2"?,"Label"}> = [];
	//Corners Order Blue Green Red.
	//Corners in the order ABC
	@Prop({ mutable: true }) corners: {"A":{"X","Y"}, "B":{"X","Y"},"C":{"X","Y"}} =  {"A":{"X":10,"Y": 80},"B": {"X":50,"Y": 10},"C": {"X":90,"Y":80}};
	@Prop() circleRadius: number = 0.9;
	@Prop() aHex: string = "#ffffff";
	@Prop() bHex: string = "#ffffff";
	@Prop() cHex: string = "#ffffff";
	@Prop() FadeEndHex: string = "#ffffff";
	@Prop({ mutable: true }) CentralPoint: {"X","Y","X2"?,"Y2"?} = {"X":0,"Y":0};

	@Prop({ mutable: true }) cFadeName:string = "cx" + this.corners.C.X +"cy"+ this.corners.C.Y + "rgb" + this.cHex.replace("#","");
	@Prop({ mutable: true }) cFadeURL:string = "url(#" + this.cFadeName +")";
	@Prop({ mutable: true }) bFadeName:string = "bx" + this.corners.B.X +"by"+ this.corners.B.Y + "rgb" + this.bHex.replace("#","");
	@Prop({ mutable: true }) bFadeURL:string = "url(#" + this.bFadeName +")";
	@Prop({ mutable: true }) aFadeName:string = "ax" + this.corners.A.X +"ay"+ this.corners.A.Y + "rgb" + this.aHex.replace("#","");
	@Prop({ mutable: true }) aFadeURL:string = "url(#" + this.aFadeName +")";

	@Prop() OutlineHex: string = "#000000"
	@Prop() hectagonHex: string = "#ffffff"
	@Prop() showHectagon: boolean = false;

	@Prop({ mutable: true }) abTextPathName:string = "ax" + this.corners.A.X + "ay" + this.corners.A.Y +"bx"+ this.corners.B.X + "by"+ this.corners.B.Y;
	@Prop({ mutable: true }) bcTextPathName:string = "bx" + this.corners.B.X + "by" + this.corners.B.Y +"cx"+ this.corners.C.X + "cy"+ this.corners.C.Y;
	@Prop({ mutable: true }) acTextPathName:string = "ax" + this.corners.A.X + "ay" + this.corners.A.Y +"cx"+ this.corners.C.X + "ay"+ this.corners.C.Y;
	@Prop({ mutable: true }) abTextPathHref:string = "#" + this.abTextPathName;
	@Prop({ mutable: true }) bcTextPathHref:string = "#" + this.bcTextPathName;
	@Prop({ mutable: true }) acTextPathHref:string = "#" + this.acTextPathName;
	@Prop() axisLabelFontSize : number = 3;
	@Prop() abAxisLabel :string;
	@Prop() acAxisLabel :string;
	@Prop() bcAxisLabel :string;
	@State() isDirty: boolean;

  @Event() recordClicked: EventEmitter;	

	@Watch('aHex')
	@Watch('bHex')
	@Watch('cHex')
	@Watch('FadeEndHex')
  cornerAndColourPropWatcher() {
		this.setGradientNames();
		this.SetDirty();
  }
	
	@Watch('recordArray')
	recordArrayPropWatcher(){
		this.updatePlotArray();
		this.checkTotalabcPoints();
		this.SetDirty();
	}

	@Watch('corners')
	updateCorners()
	{
		this.updatePlots();
		this.setTextPathNames();
		this.setCentralPoint()
		this.SetDirty();
	}

	@Watch('plotArray')
	@Watch('showHectagon')
	@Watch('hectagonHex')
	SetDirty(){
		this.isDirty = false;
		this.isDirty = true;
	}

	updatePlots()
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
		this.SetDirty();
	}

	setGradientNames()
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

	setTextPathNames()
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

	checkTotalabcPoints()
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

	coord(TernaryPoint: {"A","B","C","X"?,"Y"?,"Z"?,"Label"}) {
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

	pathData()
	{
		var path ='M ' + this.corners.A.X + ',' +this.corners.A.Y +' L '+ this.corners.B.X + ','+ this.corners.B.Y + ' '+ this.corners.C.X + ','+this.corners.C.Y+  ' Z';
		return path;
	}

	outlinePathData()
	{
		var path = this.corners.A.X + ',' +this.corners.A.Y +' '+ this.corners.B.X + ','+ this.corners.B.Y + ' '+ this.corners.C.X + ','+this.corners.C.Y;
		return path;
	}

	setCentralPoint()
	{
		this.CentralPoint =  this.coord({A:100/3,B:100/3,C:100/3,"Label":"central"});
	}

	abPathData()
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

	bcPathData()
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

	acPathData()
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

	arrowPathData(record)
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

	TernaryAlert(record){
     window.alert(record.Label);
	};
	
  updatePlotArray() {
		var plots = [];
		plots = this.recordArray.map( record => {
			if ((record.A + record.B + record.C) == 100)
			{
				var plot = this.coord(record);
				var plotObj = {"X":plot.X,"Y":plot.Y,"X2":plot.X2,"Y2":plot.Y2,"Label":record.Label};
				return plotObj;
			}
		});
		this.plotArray = plots.filter(record => record);
		this.SetDirty();
	}

	hectagonPoints()
	{
		var radius = ((this.corners.C.X - this.corners.A.X ) * 0.1);
		var hectagonPath = "";
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
			  points.push( {"X":x , "Y":y} );
			}
			points.map(point => hectagonPath += point.X + "," + point.Y + " ");
		return hectagonPath;
	}

  render() {
    return (
		<div> 
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
		<defs>
			<linearGradient id={this.cFadeName} gradientUnits="objectBoundingBox" x1={this.corners.C.X/100} y1={this.corners.C.Y/100} x2={this.CentralPoint.X/100} y2={this.CentralPoint.Y/100}>
			<stop offset="0%" stop-color={this.cHex} />
			<stop offset="90%" stop-color={this.cHex} stop-opacity="0"/>
			<stop offset="100%" stop-color={this.FadeEndHex} stop-opacity="0"/>
			</linearGradient>
			<linearGradient id={this.aFadeName} gradientUnits="objectBoundingBox" x1={this.corners.A.X/100} y1={this.corners.A.Y/100} x2={this.CentralPoint.X/100} y2={this.CentralPoint.Y/100}>
			<stop offset="0%" stop-color={this.aHex} />
			<stop offset="90%" stop-color={this.aHex} stop-opacity="0"/>
			<stop offset="100%" stop-color={this.FadeEndHex} stop-opacity="0"/>
			</linearGradient>
			<linearGradient id={this.bFadeName} gradientUnits="objectBoundingBox" x1={this.corners.B.X/100} y1={this.corners.B.Y/100} x2={this.CentralPoint.X/100} y2={this.CentralPoint.Y/100}>
			<stop offset="0%" stop-color={this.bHex} />
			<stop offset="90%" stop-color={this.bHex} stop-opacity="0"/>
			<stop offset="100%" stop-color={this.FadeEndHex} stop-opacity="0"/>
			</linearGradient>
		</defs>
		<g>
			<path d={this.pathData()} fill={this.bFadeURL}/>
			<path d={this.pathData()} fill={this.aFadeURL}/>
			<path d={this.pathData()} fill={this.cFadeURL}/>
			<polygon points={this.hectagonPoints()} class="polygon" stroke={this.hectagonHex} stroke-width="0.2" fill={this.hectagonHex} />
			<polygon points={this.outlinePathData()} class="triangle" stroke={this.OutlineHex} stroke-width="0.2" />
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
		{this.plotArray.map((record) => 
			<g>
				<p>{record.X}</p>
				<p>{record.Y}</p>
				<p>{record.X2}</p>
				<p>{record.Y2}</p>
			<circle class="plot" cx={record.X} cy={record.Y} r={this.circleRadius} fill="black" onClick={this.recordClicked.emit(record)} ></circle>
			<text  class="tooltiptext" text-anchor="middle" x={record.X} y={record.Y - (this.circleRadius*1.2)} fill="black" font-size="2" font-weight="bold"> {record.Label} </text>
				<marker id="{record.Label}" markerWidth="10" markerHeight="10" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
      		<path d="M 0,0 L0,3 L3,1.5 z" />
    		</marker>
  			<path d={this.arrowPathData(record)} fill="none" stroke="black" stroke-width="0.7" marker-end="url(#{record.Label})"/>
  		</g>
			)}
		</svg>
		</div>
    );
  }
}