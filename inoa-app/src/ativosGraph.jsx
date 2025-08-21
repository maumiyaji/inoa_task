
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './ativosGraph.module.css';

import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import chartData from "./data/chartData.json"

function Dropdown(props) {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>{props.type}</button>
      <div className={styles.dropcontent} style={{minWidth:props.width}}>
        <ul>
          {props.actives.map((act) => <li key={act.id} onClick={() => props.onDataSend(act.id + " " + act.name)}>{act.name}</li>)}
        </ul>
      </div>
    </div>
  );
}

let acoes = [
    {id: 1, name: 'VALE3 (Vale)'},
    {id: 2, name: 'PETR4 (Petrobras)'},
    {id: 3, name: 'ITUB4 (Itaú Unibanco)'},
    {id: 4, name: 'BBAS3 (Banco do Brasil)'},
    {id: 5, name: 'WEGE3 (Weg)'}
  ];
let fiis = [
    {id: 6, name: 'HGPO11 (CSHG Prime Offices)'},
    {id: 7, name: 'BDIV11 (BTG Pactual Infraestrutura)'},
    {id: 8, name: 'URPR11 (Urca Prime Renda)'},
    {id: 9, name: 'CFII11 (CF3 Fundo de Investimento)'},
    {id: 10, name: 'RBED11 (Rio Bravo Renda Educacional)'}
  ];
let etfs = [
  {id: 11, name: 'VOO (Vanguard S&P 500)'},
  {id: 12, name: 'SPY (SPDR S&P 500)'},
  {id: 13, name: 'IVV (iShares Core S&P 500)'},
  {id: 14, name: 'VTI (Vanguard Total Stock Market)'},
  {id: 15, name: 'QQQ (Invesco QQQ Trust Series I)'}
];
let bdrs = [
  {id: 16, name: 'AAPL34 (Apple)'},
  {id: 17, name: 'AMZO34 (Amazon)'},
  {id: 18, name: 'GOGL34 (Alphabet/Google)'},
  {id: 19, name: 'MSFT34 (Microsoft)'},
  {id: 20, name: 'NVDC34 (Nvidia)'}
];
let comms = [
  {id: 21, name: 'BGI (Boi Gordo)'},
  {id: 22, name: 'CCM (Milho)'},
  {id: 23, name: 'ICF (Café)'},
  {id: 24, name: 'SFI (Soja)'},
  {id: 25, name: 'SB (Açúcar)'},
];
let none = [];

function TesteData(props) {
  return (
    <>
    {props.datachoice && (
        <p>Data selecionada de {props.type}: {props.datachoice.toJSON()}</p>
    )}
    </>
  );
}

function Main() {
  const [childData, setChildData] = useState('');
  const [items, setItems] = useState([]);
  const handleChildData = (data) => {
    setChildData(data);
    setItems(prevItems => [...prevItems, data]);
  };
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const numbero = 0;
  /* const lineChartData = {
          labels: chartData.map((data) => data.label),
          datasets: [
            {
              label: items[0],
              data: chartData.map((data) => data.revenue[numbero].VAL),
              tension: .3,
              backgroundColor: "#064FF0",
              borderColor: "#064FF0"
            },
            {
              label: items[1],
              data: chartData.map((data) => data.revenue[1].VAL),
              tension: .3,
              backgroundColor: "#06AFF0",
              borderColor: "#06AFF0"
            },
            {
              label: items[2],
              data: chartData.map((data) => data.revenue[2].VAL),
              tension: .3,
              backgroundColor: "#b80000",
              borderColor: "#b80000"
            },
          ]
        }; */
  const [chartData, setChartData] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [30, 70, 50, 40],
            borderColor: 'blue',
            backgroundColor: 'lightblue',
          },
        ],
      });
  const addDataset = () => {
      const newDataset = {
        label: `Dataset ${chartData.datasets.length + 1}`,
        data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100], // Example random data
        borderColor: 'red', // Customize styling
        backgroundColor: 'lightcoral',
      };

      setChartData((prevData) => ({
        ...prevData,
        datasets: [...prevData.datasets, newDataset],
      }));
    };

  return (
    <>
    <div className={styles.corner}>
      <Dropdown type="Ações" actives={acoes} width="250px" onDataSend={handleChildData}/>
      <Dropdown type="FIIs" actives={fiis} onDataSend={handleChildData}/>
      <Dropdown type="ETFs" actives={etfs} onDataSend={handleChildData}/>
      <Dropdown type="BDRs" actives={bdrs} width="200px" onDataSend={handleChildData}/>
      <Dropdown type="Commodities" actives={comms} width="150px" onDataSend={handleChildData}/>
    </div>
    <p>Ativos 1: {items[0]}</p>
    <p>Ativos 2: {items[1]}</p>
    <p>Ativos 3: {items[2]}</p>
    {/* <ul>
        {items.map((ativo) => <li>{ ativo }</li>)}
    </ul> */}
      <DatePicker
          selected={selectedDateStart}
          onChange={(date) => setSelectedDateStart(date)}
          minDate={new Date(2025, 7, 1)}
          maxDate={new Date(2025, 7, 31)}
      />
      <DatePicker
          selected={selectedDateEnd}
          onChange={(date) => setSelectedDateEnd(date)}
          minDate={new Date(2025, 7, 1)}
          maxDate={new Date(2025, 7, 31)}
      />
      <TesteData type="Início" datachoice={selectedDateStart}/>
      <TesteData type="Fim" datachoice={selectedDateEnd}/>
      <div style={{width: "800px"}}>
        <Line data={chartData}/>
        <button onClick={addDataset}>Add Dataset</button>
      </div>
    </>
  );
}

export default Main;