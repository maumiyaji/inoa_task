
import styles from './ativosMenu.module.css';

function Dropdown(props) {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>{props.type}</button>
      <div className={styles.dropcontent} style={{minWidth:props.width}}>
        <ul>
          {props.actives.map((act) => <li key={act.id}><a href="link">{act.name}</a></li>)}
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
    {id: 5, name: 'WEGE3 (Weg)'},
    {id: 6, name: 'BPAC11 (BTG Pactual)'},
    {id: 7, name: 'SANB11 (Santander Brasil)'}
  ];
let fiis = [
    {id: 8, name: 'HGPO11 (CSHG Prime Offices)'},
    {id: 9, name: 'BDIV11 (BTG Pactual Infraestrutura)'},
    {id: 10, name: 'URPR11 (Urca Prime Renda)'},
    {id: 11, name: 'CFII11 (CF3 Fundo de Investimento)'},
    {id: 12, name: 'RBED11 (Rio Bravo Renda Educacional)'},
    {id: 13, name: 'ALUG11 (Investo MSCI US Real Estate)'},
    {id: 14, name: 'MXRF11 (Maxi Renda)'}
  ];
let etfs = [
  {id: 15, name: 'VOO (Vanguard S&P 500)'},
  {id: 16, name: 'SPY (SPDR S&P 500)'},
  {id: 17, name: 'IVV (iShares Core S&P 500)'},
  {id: 18, name: 'VTI (Vanguard Total Stock Market)'},
  {id: 19, name: 'QQQ (Invesco QQQ Trust Series I)'},
  {id: 20, name: 'VUG (Vanguard Growth)'},
  {id: 21, name: 'VEA (Vanguard FTSE Developed Markets)'},
];
let bdrs = [
  {id: 22, name: 'AAPL34 (Apple)'},
  {id: 23, name: 'AMZO34 (Amazon)'},
  {id: 24, name: 'GOGL34 (Alphabet/Google)'},
  {id: 25, name: 'MSFT34 (Microsoft)'},
  {id: 26, name: 'NVDC34 (Nvidia)'},
  {id: 27, name: 'BABA34 (Alibaba)'},
  {id: 28, name: 'MELI34 (MercadoLibre)'},
];
let comms = [
  {id: 29, name: 'BGI (Boi Gordo)'},
  {id: 30, name: 'CCM (Milho)'},
  {id: 31, name: 'ICF (Café)'},
  {id: 32, name: 'SFI (Soja)'},
  {id: 33, name: 'SB (Açúcar)'},
  {id: 34, name: 'ETN (Etanol)'},
];
let none = [];

function Menu() {
  return (
    <div className={styles.corner}>
      <Dropdown type="Ações" actives={acoes} width="250px"/>
      <Dropdown type="FIIs" actives={fiis}/>
      <Dropdown type="ETFs" actives={etfs}/>
      <Dropdown type="BDRs" actives={bdrs} width="200px"/>
      <Dropdown type="Commodities" actives={comms} width="150px"/>
    </div>
  );
}

export default Menu;