import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';

function GraficaUsuarios(props) {
    
    const [chartData, setChartData] = useState({});

    const chart = () => {
        setChartData({
            labels: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            datasets: [
                {
                    label: 'Cantidad de Usuarios',
                    data: [100, 500, 700, 500, 2000, 5000,8000,10000,20000,21000,23000,28000],
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
            <Bar data={chartData} options={{
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

export default GraficaUsuarios;