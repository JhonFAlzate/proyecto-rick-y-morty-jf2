import { useEffect } from "react";
import '../../assets/components/styles/ResidentCard.css'
import useFetch from "../../hooks/use.Fetch";

const ApiRicki = ({ url, location }) => {
  const [resident, getResident] = useFetch(url);

  useEffect(() => {
    getResident();
  }, [location]);

   console.log(resident);

  return (
    
  resident?.results.map((posicion) => (
    
    <article className="resident" key={posicion.id}>
      <header  className="resident__header">
        <img className="resident__image" src={posicion?.image} alt="" />
        <div className="resident__status__container">
          <div className={`resident__status__circle ${posicion?.status}`}></div>

          <div className="resident__status">{posicion?.status}</div>
        </div>
      </header>
      <section className="resident__body">
        <h3 className="resident_name">{posicion?.name}</h3>

        <hr className="resident__hr" />

        <ul className="resident__list">
          <li className="resident__item">
            <span className="resident__label">Specie</span>{" "}
            <span className="resident__value"> {posicion?.species}</span>
          </li>
          <li className="resident__item">
            <span className="resident__label">Origin</span>{" "}
            <span className="resident__value"> {posicion?.origin.name}</span>
          </li>
          <li className="resident__item">
            <span className="resident__label">Eppisodes where appear</span>{" "}
            <span className="resident__value">{posicion?.episode.length}</span>
          </li>
        </ul>
      </section>
    </article>
  )
  ));
};

export default ApiRicki;
