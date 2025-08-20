
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './ativosGraph.module.css';

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

  return (
    <>
    <div className={styles.corner}>
      <Dropdown type="Ações" actives={acoes} width="250px" onDataSend={handleChildData}/>
      <Dropdown type="FIIs" actives={fiis} onDataSend={handleChildData}/>
      <Dropdown type="ETFs" actives={etfs} onDataSend={handleChildData}/>
      <Dropdown type="BDRs" actives={bdrs} width="200px" onDataSend={handleChildData}/>
      <Dropdown type="Commodities" actives={comms} width="150px" onDataSend={handleChildData}/>
    </div>
    <p>Data from Child: {childData}</p>
    <ul>
        {items.map((ativo) => <li>{ ativo }</li>)}
    </ul>
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
    </>
  );
}

export default Main;