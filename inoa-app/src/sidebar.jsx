import styles from './sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidenav}>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#clients">Clients</a>
      <a href="#contact">Contact</a>
  </div>
  );
}

export default Sidebar;