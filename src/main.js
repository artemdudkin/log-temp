import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
//import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Brush, Legend,
//  ReferenceArea, ReferenceLine, ReferenceDot, ResponsiveContainer,
//  LabelList, Label } from 'recharts';

import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line}  from 'recharts';
import * as d3 from "d3";



class ChartComponent extends React.Component {
	componentDidMount() {
		return axios({
		        method: "GET",
		        url: "http://alinadudkina.ru:8089/get3?source=200iwi",
//			withCredentials:true 
		}).then(data => {
			this.setState({ data: data.data.data.map(_=>{
				const t = {time:_.time}
				if (_.data[0]) try{ t.t1 = Math.round(+_.data[0]*10)/10.0 } catch (e) {}				
				if (_.data[1]) try{ t.t2 = Math.round(+_.data[1]*10)/10.0 } catch (e) {}
				return t;
			}) })
		})
/*		this.setState({ data: [
			{"time":1515359251693,"t1":21.88,"t2":19.50},
			{"time":1515359259673,"t1":21.88,"t2":18.88},
			{"time":1515359267790,"t1":21.88,"t2":18.31},
			{"time":1515359275831,"t1":21.94,"t2":17.69},
			{"time":1515359283850,"t1":21.88,"t2":17.19},
			{"time":1515359291875,"t1":21.94,"t2":16.63},
			{"time":1515359299871,"t1":21.88,"t2":16.13},
			{"time":1515359307871,"t1":21.88,"t2":15.63}
		]});*/
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}

		const {data} = this.state;
		if (data.length ==0) {
			return <div>No data</div>
		}

//console.log("data", data)
//console.log("min", data.reduce((a, b)=>{return {t1:Math.min(a.t1, b.t1)} } ));
		const start = new Date();
		start.setHours(0,0,0,0);
		const s = start.getTime();

		const aa = 86400000 - (data[data.length-1].time - data[0].time);
		const bb = data[0].time - s;
		const domain=['dataMin-'+bb, 'dataMax+'+(aa-bb)];
		console.log("s", s, "aa", aa, "bb", bb, "domain", domain);
		return (

			<div>
			<LineChart width={600} height={200} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<XAxis dataKey="time" tickFormatter={d3.timeFormat('%H:%M:%S')} type="number" domain={domain}/>
				<YAxis type="number" domain={['dataMin', 'dataMax']} />
				<CartesianGrid strokeDasharray="4 4"/>
				<Tooltip labelFormatter={d3.timeFormat('%H:%M:%S')} />
				<Legend />
				<Line name="комната" type="monotone" dataKey="t1" stroke="#82ca9d" dot={false} strokeWidth={2}/>
			</LineChart>
			<LineChart width={600} height={200} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<XAxis dataKey="time" tickFormatter={d3.timeFormat('%H:%M:%S')} type="number" domain={domain}/>
				<YAxis type="number" domain={['dataMin', 'dataMax']}/>
				<CartesianGrid strokeDasharray="4 4"/>
				<Tooltip labelFormatter={d3.timeFormat('%H:%M:%S')}/>
				<Legend />
				<Line name="улица" type="monotone" dataKey="t2" stroke="#8884d8" dot={false} strokeWidth={2}/>
			</LineChart>
			</div>
		)
	}
}

render(
	<ChartComponent />,
	document.getElementById("app")
);
