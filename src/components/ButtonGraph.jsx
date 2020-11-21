import React,{useState,useEffect} from 'react';
import {Pie} from 'react-chartjs-2';

function GraficoBotones(props) {
   
    const [chartData, setChartData] = useState({})

    const chart = () => {
        setChartData({
            labels: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            datasets: [
                {
                    label: 'Horas de visualizacion',
                    data: [10, 50, 70, 50, 200, 500,800,100,200,210,230,200],
                    backgroundColor: [
                        'rgba(176,224,230,0.6)',
                        'rgba(0, 0, 254,0.6)',
                        'rgba(154, 117, 254,0.6)',
                        'rgba(44, 211, 75,0.6)',
                        'rgba(44, 12, 75,0.6)',
                        'rgba(248, 81, 243,0.6)',
                        'rgba(75,192,192,0.6)',
                        'rgba(54,162,235,0.6)',
                        'rgba(255,206,86,0.6)',
                        'rgba(153,102,255,0.6)',
                        'rgba(255,159,64,0.6)',
                        'rgba(255,99,132,0.6)'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }

    useEffect(() => {
        chart()
    },[])
    
   
    return (
        <div>
            <Pie data={chartData}></Pie>
        </div>
    );
}

export default GraficoBotones;