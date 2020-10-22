import React , {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import '../css/grafica.css';

function Grafica(props) {

    const [chartData, setChartData] = useState({})

    const chart = () => {
        setChartData({
            labels: ['Marzo','Abril','Mayo','Junio','Julio','Agosto'],
            datasets: [
                {
                    label: 'Horas de visualizacion',
                    data: [200, 700, 140, 30, 40, 600],
                    backgroundColor: [
                        'rgba(44, 211, 75,0.6)'                   
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
        <div >
            <center><h1>Graficos</h1></center>
            <Line data={chartData} options={{
                responsive: true,
                tittle: {text: 'Visualizaciones', display: true},
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10,
                                beginAtZero: true
                            },
                            gridLines: {
                                display: false
                            }
                        }
                    ]
                }
            }}/>
        </div>
    );
}

export default Grafica;