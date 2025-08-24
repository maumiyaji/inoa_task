
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import DadosTabela from "./data/chartData.json"

import styles from './ativosGraph.module.css';
import logo from './img/logo-white.png';

function Welcome() {
  return (
    <div className={styles.welcome}>
      <p>Olá! Para consultar os ativos:</p>
        <ul>
          <li>Selecione as datas de início e fim do período, na barra lateral;</li>
          <li>Escolha os ativos no menu superior.</li>
        </ul>
      <p>Obs.: Ao definir um novo período, será preciso escolher novamente os ativos.</p>
    </div>
  );
}

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
      <img src={logo}  style={{marginLeft: "30px"}}/>
      <p>DATA DE INÍCIO</p>
      <div className={styles.datefield}>
        <DatePicker
          showIcon={true}
          selected={selectedDateStart}
          onChange={(date) => {setSelectedDateStart(date);props.onStartDatePick(date)}}
          minDate={new Date(2025, 7, 1)}
          maxDate={new Date(2025, 7, 31)}
        />
      </div>
      <p>DATA DE TÉRMINO</p>
      <div className={styles.datefield}>
        <DatePicker
          showIcon={true}
          selected={selectedDateEnd}
          onChange={(date) => {setSelectedDateEnd(date);props.onEndDatePick(date)}}
          minDate={new Date(2025, 7, 1)}
          maxDate={new Date(2025, 7, 31)}
        />
      </div>
      <p>ATIVOS:</p>
      <ul>
        {props.choicesMade.map((ativo) => <li key={ativo.id}>{ ativo.slice(2) }</li>)}
      </ul>
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
  const [items, setItems] = useState([]);
  const handleChoice = (data) => {
    if (!items.includes(data) && startDate && endDate) {
      setItems(prevItems => [...prevItems, data]);
      addDataset(data); // PASSANDO O NOME DO ATIVO PARA MONTAR O CHART
    };
    if (startDate && endDate) {
      setIsVisible(true);
    }
  };
  // TRAZENDO AS DATAS SELECIONADAS NO SIDEBAR
  const [startDate, setStartDate] = useState('');
  const [indexStartDate, setIndexStartDate] = useState();
  const handleStartDate = (data) => {
    setStartDate(data.toJSON().slice(0,10));
    setIndexStartDate(Number(data.toJSON().slice(8,10))-1);
    clearGraph(); handleDelete();
  };
  const [endDate, setEndDate] = useState('');
  const [indexEndDate, setIndexEndDate] = useState();
  const handleEndDate = (data) => {
    setEndDate(data.toJSON().slice(0,10));
    setIndexEndDate(Number(data.toJSON().slice(8,10))-1);
    clearGraph(); handleDelete();
  };
  // LIMPANDO AS ESCOLHAS
  const handleDelete = () => {
    setItems([]);
  }
  // EXIBINDO O GRAFICO (FIRST TIME)
  const [isVisible, setIsVisible] = useState();

  const [newColor, setNewColor] = useState();
  const getRandomColor = () => {
    // Generate a random integer between 0 and 16777215 (0xFFFFFF)
    const randomNumber = Math.floor(Math.random() * 0xFFFFFF);
    // Convert the number to a hexadecimal string and pad with leading zeros if necessary
    const hexColor = randomNumber.toString(16).padStart(6, '0');
    setNewColor(`#${hexColor.toUpperCase()}`); // Returns the color in #RRGGBB format
  }
  // MONTANDO O GRAFICO
  const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
      });
  const addDataset = (data) => {
      const newRangeDataset = DadosTabela.slice(indexStartDate,indexEndDate+1);
      getRandomColor();
      const newDataset = {
        label: data.slice(2),
        data: newRangeDataset.map((valor) => valor.values[Number(data.slice(0,2)) - 1].val),
        borderColor: newColor,
        backgroundColor: newColor,
      };
      setChartData((prevData) => ({
        labels: newRangeDataset.map((valor) => valor.label),
        datasets: [...prevData.datasets, newDataset],
      }));
    };
  const clearGraph = () => {
    setChartData({
        labels: [],
        datasets: [],
      });
    }

  // MAIN
  return (
    <div style={{marginLeft: "300px"}}>

    <Sidebar onStartDatePick={handleStartDate} onEndDatePick={handleEndDate} choicesMade={items}/>
    
    <div className={styles.corner}>
      <Dropdown type="Ações" actives={acoes} width="250px" onChoice={handleChoice}/>
      <Dropdown type="FIIs" actives={fiis} onChoice={handleChoice}/>
      <Dropdown type="ETFs" actives={etfs} onChoice={handleChoice}/>
      <Dropdown type="BDRs" actives={bdrs} width="200px" onChoice={handleChoice}/>
      <Dropdown type="Commodities" actives={comms} width="150px" onChoice={handleChoice}/>
    </div>
    <br/>
    <div>
      {!isVisible && <Welcome/>}
    </div>
    
    <div>
    {isVisible && <button className={styles.clear} onClick={() => { //BOTAO PARA LIMPAR O GRAFICO (ESVAZIA A ARRAY DE ATIVOS)
      handleDelete(),clearGraph()}}>Clique aqui para limpar o gráfico e escolher novos ativos</button>}
    </div>
    <br />
    <div style={{width: "800px"}}>
      {isVisible && <Line data={chartData}/>}
    </div>

    </div>
  );
}

export default Main;