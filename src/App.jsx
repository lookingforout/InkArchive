import { useNavigate } from 'react-router-dom';


function App() {
  const navigator = useNavigate();
  const sofiPage = () => {
    navigator("/sofi");
  }

  return (
    <>
      <div>
        <p>nqkakuv tekst</p>
        <button onClick={sofiPage}>Sofi Page</button>
        <img className={style.snimka} src="src\assets\dancing_skely.gif"/>
      </div>
    </>
  )
}

export default App
