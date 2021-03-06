//polynomial of form y=a0+a1x+a2x^2+...
//if there are n data points, we can determine n coefficients,
//thus a0,a1,a2,...,an-1
//process data from textarea into an array
var times=new Array();
function getAverage(){
	var avg=0;
	for(var i=1;i<times.length;i++){
		avg+=times[i];
	}
	avg/=times.length;
	console.log('Average time='+avg);
}
function process(x,y)
{
	var xvals=x.split(',');
	var yvals=y.split(',');
	if(xvals.length!=yvals.length)
	{
		return 'err';
	}
	else
	{
		var data=new Array();
		data[0]=new Array();
		data[1]=new Array();
		for(var i=0, n=xvals.length;i<n;i++)
		{
			data[0].push(xvals[i]/1);
			data[1].push(yvals[i]/1);
		}
		return data;
	}
}

function constructVDMmatrix(data){
	var vanDerMonde=new Array();
	for(var i=0;i<data.length;i++){
		vanDerMonde[i]=new Array();
		for(var j=0;j<data.length;j++){
			var _temp=1;
			for(var k=0;k<j;k++){
				_temp*=data[i];
			}
			vanDerMonde[i].push(_temp);
		}
	}
	return vanDerMonde;
}

function generate()
{
	var x=document.getElementById('data-x').value;
	var y=document.getElementById('data-y').value;
	var data=process(x,y);
	var t0 = performance.now();
	var VDMmatrix=constructVDMmatrix(data[0]);
	var coeff=gaussianElimination(VDMmatrix,data[1]);
	var t1 = performance.now();
	console.log(t1-t0);
	times.push(t1-t0);
	var poly='';
	for(var i=0;i<coeff.length;i++){
		if(coeff[i]!=0){
		if(poly!='')
		poly+='+'+coeff[i]+'x<sup>'+i+'</sup>';
		else
		poly+=coeff[i]+'x<sup>'+i+'</sup>';	
}
	}
	document.getElementById('answer').innerHTML=poly;
}
function gaussianElimination(VDMmatrix,yVals){
	for(var i=0;i<VDMmatrix.length;i++){
		var temp=VDMmatrix[i][i];
		yVals[i]/=temp;
		for(var j=0;j<VDMmatrix.length;j++){
			VDMmatrix[i][j]/=temp;
		}
		for(var k=0;k<VDMmatrix.length;k++){
			var _temp=VDMmatrix[k][i];
			if(i!=k){
				for(var l=0;l<VDMmatrix.length;l++){
					VDMmatrix[k][l]=VDMmatrix[k][l]-(_temp*VDMmatrix[i][l]);
				}
				yVals[k]=yVals[k]-(_temp*yVals[i]);
			}
		}
	}
	return yVals;
}
