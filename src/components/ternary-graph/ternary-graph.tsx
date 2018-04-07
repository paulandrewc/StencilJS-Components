import { Component, Prop, Watch} from '@stencil/core';


@Component({
  tag: 'ternary-graph',
  styleUrl: 'ternary-graph.css'
})
export class TernaryGraph{
	//Added lots of defaults to start with.
  @Prop() recordArray: Array<{"A","B","C","Label"}> = [
		{"A": 40, "B": 40, "C": 20, "Label": "John Carrey"},
		{"A": 20, "B": 30, "C": 50, "Label": "Fiona Brown"},
		{"A": 10, "B": 10, "C": 90, "Label": "Super Red"},
		{"A": 0,  "B": 0,  "C": 100,"Label": "Uber Red"},
		{"A": 90, "B": 10, "C": 10, "Label": "Super Blue"},
		{"A": 100,"B": 0,  "C": 0,  "Label": "Uber Blue"},
		{"A": 10, "B": 90, "C": 10, "Label": "Super Green"},
		{"A": 0,  "B": 100,"C": 0,  "Label": "Uber Green"},
		{"A": 42, "B": 42 ,"C": 44, "Label": "James Humphrey"},
		{"A": 10, "B": 45 ,"C": 70, "Label": "Ashley Wardell"}
	];
	
  @Prop({ mutable: true }) plotArray: Array<{"X","Y","Label"}> = [];
	//Corners Order Blue Green Red.
	//Corners in the order ABC
	@Prop() corners: {"A":{"X","Y"}, "B":{"X","Y"},"C":{"X","Y"}} = {"A":{"X":10,"Y": 90},"B": {"X":50,"Y": 10},"C": {"X":90,"Y":90}};
	@Prop() circleRadius: number = 0.9;
	@Prop() aHex: string = "#5579ff";  
	@Prop() bHex: string = "#70c49c";
	@Prop() cHex: string = "#ff4246";
  @Prop() cFadeEndHex: string = "#ffffff";
	@Prop() cFadeEndOpacity: string = "0.1";
	@Prop({ mutable: true }) cFadeName:string = "cx" + this.corners.C.X +"cy"+ this.corners.C.Y + "rgb" + this.cHex.replace("#","");
	@Prop({ mutable: true }) cFadeURL:string = "url(#" + this.cFadeName +")";
  @Prop() abMixHex: string = "#008844";
	@Prop() abMixOpacity: string = "0.7"
	@Prop({ mutable: true }) abFadeName:string = "ax" + this.corners.A.X + "ay" + this.corners.A.Y +"bx"+ this.corners.B.X + "by"+ this.corners.B.Y + "argb" + this.aHex.replace("#","") + "brgb" +this.bHex.replace("#","");
	@Prop({ mutable: true }) abFadeURL:string = "url(#" + this.abFadeName +")";

	@Watch('corners')
  cornerPropWatcher() {
    this.setGradientNames();
  }
	
	@Watch('recordArray')
	recordArrayPropWatcher(){
		this.updatePlotArray();
	}

	componentWillLoad(){
		this.updatePlotArray();
		this.setGradientNames();
	}

	coord(TernaryPoint: {"A","B","C","Label"}) {
  var a = TernaryPoint.A,
    b = TernaryPoint.B,
    c = TernaryPoint.C;
	var sum;
	var point = {"X" : 0, "Y": 0};
  sum = a + b + c;
  if (sum !== 0) {
    a /= sum;
    b /= sum;
    c /= sum;
    point.X = (this.corners.A.X * a) + (this.corners.B.X * b ) + (this.corners.C.X * c);
    point.Y = (this.corners.A.Y * a) + (this.corners.B.Y * b ) + (this.corners.C.Y * c);
  }
  return point;
}

	pathData()
	{
		var path ='M ' + this.corners.A.X + ',' +this.corners.A.Y +' L '+ this.corners.B.X + ','+ this.corners.B.Y + ' '+ this.corners.C.X + ','+this.corners.C.Y+  ' Z';
		return path;
	}

	TernaryAlert(record){
     window.alert(record.Label);
	};
	
  updatePlotArray() {
		var plots = [];
		
		for (let i = 0; i < this.recordArray.length ; i++) {
		var plot = this.coord(this.recordArray[i]);
		var plotObj = {"X":plot.X,"Y":plot.Y,"Label":this.recordArray[i].Label};
		//cannot use this spread syntax because it is an array of objects which makes it not iterable.
		//this.plotArray = [...plots,plotObj]
		plots.push(plotObj);
	};
	this.plotArray = plots;
	}
	
	setGradientNames()
	{
		this.cFadeName = "cx" + this.corners.C.X +"cy"+ this.corners.C.Y + "rgb" + this.cHex.replace("#","");
		this.cFadeURL = "url(#" + this.cFadeName +")";
		this.abFadeName =  "ax" + this.corners.A.X + "ay" + this.corners.A.Y +"bx"+ this.corners.B.X + "by"+ this.corners.B.Y + "argb" + this.aHex.replace("#","") + "brgb" +this.bHex.replace("#","");
		this.abFadeURL = "url(#" + this.abFadeName +")";
	}

  render() {
    return (
		<div> 
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50%" height="50%" viewBox="0 0 100 100">
		<defs>
			<linearGradient id={this.abFadeName} gradientUnits="objectBoundingBox" x1={this.corners.A.X/100} y1={this.corners.A.Y/100} x2={this.corners.B.X/100} y2={this.corners.B.Y/100}>
				<stop offset="0%" stop-color={this.aHex}/>
				<stop offset="80%" stop-color={this.abMixHex} stop-opacity={this.abMixOpacity}/>
				<stop offset="100%" stop-color={this.bHex}/>   
			</linearGradient>
			<linearGradient id={this.cFadeName} gradientUnits="objectBoundingBox" x1={this.corners.C.X/100} y1={this.corners.C.Y/100} x2={(this.corners.C.X/3)/100} y2={((this.corners.B.Y + this.corners.A.Y)/2)/100}>
			<stop offset="0%" stop-color={this.cHex} />
			<stop offset="100%" stop-color={this.cFadeEndHex} stop-opacity={this.cFadeEndOpacity} />
			</linearGradient>
		</defs>
		<g>
			<path d={this.pathData()} fill={this.abFadeURL}/>
			<path d={this.pathData()} fill={this.cFadeURL}/>
		</g>
		{this.plotArray.map((record) => 
			<g>
				<p>{record.X}</p>
				<p>{record.Y}</p>
			<circle class="plot" cx={record.X} cy={record.Y} r={this.circleRadius} fill="black" onClick={this.TernaryAlert.bind(this,record)} ></circle>
			<text class="tooltiptext" x={record.X+(this.circleRadius*1.5)} y={record.Y +this.circleRadius} fill="black" font-size="2"> {record.Label} </text>
  		</g>
      )}
		</svg>
		</div>
    );
  }
}