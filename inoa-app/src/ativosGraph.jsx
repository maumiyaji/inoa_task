
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
          {props.actives.map((act) => <li key={act.id} onClick={() => props.onChoice(act.id + " " + act.name)}>{act.name}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Sidebar(props) {
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);

  return (
    <div className={styles.sidenav}>
      <a href="#about">About</a>
      <DatePicker
        selected={selectedDateStart}
        onChange={(date) => {setSelectedDateStart(date);props.onStartDatePick(date)}}
        minDate={new Date(2025, 7, 1)}
        maxDate={new Date(2025, 7, 31)}
      />
      <DatePicker
        selected={selectedDateEnd}
        onChange={(date) => {setSelectedDateEnd(date);props.onEndDatePick(date)}}
        minDate={new Date(2025, 7, 1)}
        maxDate={new Date(2025, 7, 31)}
      />
      <ul>
        {props.choicesMade.map((ativo) => <li>{ ativo }</li>)}
      </ul>
      <button onClick={() => props.deletePick()}>Clear</button>
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

function Main() {
  // TRAZENDO A ACTIVE ESCOLHIDA & MONTANDO UMA ARRAY
  const [activeChoice, setChoice] = useState('');
  const [items, setItems] = useState([]);
  const handleChoice = (data) => {
    setChoice(data);
    if (!items.includes(data)) {
      setItems(prevItems => [...prevItems, data]);
    }
  };
  // TRAZENDO AS DATAS SELECIONADAS NO SIDEBAR
  const [startDate, setStartDate] = useState('');
  const handleStartDate = (data) => {
    setStartDate(data.toJSON());
  };
  const [endDate, setEndDate] = useState('');
  const handleEndDate = (data) => {
    setEndDate(data.toJSON());
  };
  const [delMe, setDelMe] = useState('');
  const [newArray, setNewArray] = useState([]);
  const handleDelete = () => {
    setItems([]);
    // setNewArray(items.filter(item => item !== delMe));
  }
  
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
    <Sidebar onStartDatePick={handleStartDate} onEndDatePick={handleEndDate} choicesMade={items} deletePick={handleDelete}/>
    <div className={styles.corner}>
      <Dropdown type="Ações" actives={acoes} width="250px" onChoice={handleChoice}/>
      <Dropdown type="FIIs" actives={fiis} onChoice={handleChoice}/>
      <Dropdown type="ETFs" actives={etfs} onChoice={handleChoice}/>
      <Dropdown type="BDRs" actives={bdrs} width="200px" onChoice={handleChoice}/>
      <Dropdown type="Commodities" actives={comms} width="150px" onChoice={handleChoice}/>
    </div>
    <p>{activeChoice}</p> {/* ULTIMA ACTIVE CLICADA*/}
    <p>{Number(activeChoice.slice(0,2))}</p>
    <p>{items.length}</p>
    <p>{newArray.length}</p>
    <p>{delMe}</p>
    <p>Start Date: {startDate.slice(0,10)}</p>
    <p>End Date: {endDate.slice(0,10)}</p>
    <div style={{width: "800px"}}>
      <Line data={chartData}/>
      <button onClick={addDataset}>Add Dataset</button>
    </div>
    </>
  );
}

export default Main;