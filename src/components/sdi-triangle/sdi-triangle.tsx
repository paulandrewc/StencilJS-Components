import { Component, Prop} from '@stencil/core';


@Component({
  tag: 'sdi-triangle',
  styleUrl: 'sdi-triangle.css'
})
export class SdiTriangle {
	//Added lots of defaults to start with.
  @Prop() recordArray: Array<{"Blue","Green","Red","Name"}> = [
		{"Blue": 40, "Green": 40, "Red": 20, "Name": "John Carrey"},
		{"Blue": 20, "Green": 30, "Red": 50, "Name": "Fiona Brown"},
		{"Blue": 10, "Green": 10, "Red": 90, "Name": "Super Red"},
		{"Blue": 0,  "Green": 0,  "Red": 100,"Name": "Uber Red"},
		{"Blue": 90, "Green": 10, "Red": 10, "Name": "Super Blue"},
		{"Blue": 100,"Green": 0,  "Red": 0,  "Name": "Uber Blue"},
		{"Blue": 10, "Green": 90, "Red": 10, "Name": "Super Green"},
		{"Blue": 0,  "Green": 100,"Red": 0,  "Name": "Uber Green"},
		{"Blue": 42, "Green": 42 ,"Red": 44, "Name": "James Humphrey"},
		{"Blue": 10, "Green": 45 ,"Red": 70, "Name": "Ashley Wardell"}
	];
	
  @Prop({ mutable: true }) plotArray: Array<{"X","Y","Name"}> = [];
  //Corners Order Blue Green Red.
  @Prop() corners: Array<{"X","Y"}> = [{"X":10,"Y": 10},{"X":50,"Y": 90},{"X":90,"Y":10}];
  @Prop() circleRadius: number = 0.9;
  @Prop() redHex: string = "#ff4246";
  @Prop() blueHex: string = "#5579ff";
  @Prop() greenHex: string = "#70c49c";
  @Prop() redFadeEndHex: string = "#ffffff";
	@Prop() redFadeEndOpacity: string = "0.1";
	@Prop({ mutable: true }) redFadeName:string = this.redHex.replace("#","");
	@Prop({ mutable: true }) redFadeURL:string = "url(#" + this.redFadeName +")";
  @Prop() blueGreenMixHex: string = "#008844";
	@Prop() blueGreenMixOpacity: string = "0.7"
	@Prop({ mutable: true }) blueGreenFadeName:string = this.blueHex.replace("#","") + this.greenHex.replace("#","");
	@Prop({ mutable: true }) blueGreenFadeURL:string = "url(#" + this.blueGreenFadeName +")";

  coord(SDIPoint: {"Blue","Green","Red","Name"}) {
  var a = SDIPoint["Blue"],
    b = SDIPoint["Green"],
    c = SDIPoint["Red"];
  var sum, pos = [0, 0];
  sum = a + b + c;
  if (sum !== 0) {
    a /= sum;
    b /= sum;
    c /= sum;
    pos[0] = (this.corners[0]["X"] * a) + (this.corners[1]["X"] * b ) + (this.corners[2]["X"] * c);
    pos[1] = (this.corners[0]["Y"] * a) + (this.corners[1]["Y"] * b ) + (this.corners[2]["Y"] * c);
	//probably a nicer way to do this but need the name to pull through too.
	pos[2] = SDIPoint["Name"];
  }
  return pos;
}

	pathData()
	{
		var path ='M ' + this.corners[1]["X"] + ',' +this.corners[1]["Y"] +' L '+ this.corners[2]["X"]+ ','+ this.corners[2]["Y"] + ' '+ this.corners[0]["X"]+ ','+this.corners[0]["Y"]+  ' Z';
		return path;
	}

	sdiAlert(record){
     window.alert(record['Name']);
	};
	
  componentWillLoad() {
		var plots = [];
		
		for (let i = 0; i < this.recordArray.length ; i++) {
		var plot = this.coord(this.recordArray[i]);
		var plotObj = {"X":plot[0],"Y":plot[1],"Name":plot[2]};
		//cannot use this spread syntax because it is an array of objects which makes it not iterable.
		//this.plotArray = [...plots,plotObj]
		plots.push(plotObj);
	};
	this.plotArray = plots;
	this.redFadeName = this.redHex.replace("#","");
  this.redFadeURL = "url(#" + this.redFadeName +")";
	this.blueGreenFadeName = this.blueHex.replace("#","") + this.greenHex.replace("#","");
	this.blueGreenFadeURL = "url(#" + this.blueGreenFadeName +")";
  }

  render() {
    return (
		<div>
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50%" height="50%" viewBox="0 0 100 100">
		<defs>
			<linearGradient id={this.blueGreenFadeName} gradientUnits="objectBoundingBox" x1="0" x2="0.5" y2="1	">
				<stop offset="0%" stop-color={this.blueHex}/>
				<stop offset="80%" stop-color={this.blueGreenMixHex} stop-opacity={this.blueGreenMixOpacity}/>
				<stop offset="100%" stop-color={this.greenHex}/>   
			</linearGradient>
			<linearGradient id={this.redFadeName} gradientUnits="objectBoundingBox" x1="1" y1="0" x2="0.3" y2="0.5">
			<stop offset="0%" stop-color={this.redHex} />
			<stop offset="100%" stop-color={this.redFadeEndHex} stop-opacity={this.redFadeEndOpacity} />
			</linearGradient>
		</defs>
		<g>
			<path d={this.pathData()} fill={this.blueGreenFadeURL}/>
			<path d={this.pathData()} fill={this.redFadeURL}/>
		</g>
		{this.plotArray.map((record) => 
			<g>
			<circle class="plot" cx={record["X"]} cy={record["Y"]} r={this.circleRadius} fill="black" onClick={this.sdiAlert.bind(this,record)} ></circle>
			<text class="tooltiptext" x={record["X"]+(this.circleRadius*1.5)} y={record["Y"] +this.circleRadius} fill="black" font-size="2"> {record["Name"]} </text>
  		</g>
      )}
		</svg>
		</div>
    );
  }
}