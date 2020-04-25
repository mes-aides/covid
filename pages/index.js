import {useState, useCallback} from 'react'

function HomePage() {
  const [salaireNet, setSalaireNet] = useState(1219)
  const [heuresHabituelles, setHeuresHabituelles] = useState(35)
  const [heuresChomees, setHeuresChomees] = useState(16)
  const [debutChomage, setDebutChomage] = useState()

  const handleClick = useCallback(() => {
    const payload = {
      "test": 'ok'
    }
    alert(JSON.stringify(payload, null, 2))
  })

  return <div>
    <style jsx>{`
    .form, .field {
      display: flex;
      flex-direction: column;
    }

    .form {
      max-width: 800px;
      margin: 0 auto;
    }

    .field {
      margin: 1em;
    }
    input {
      text-align: right;
    }
    `}</style>
    <h1>Estimez en moins d'une minute votre droit à la prime d'activité&nbsp;!</h1>
    <div className="form">
      <div className="field">
        <label for="salaireNet">Salaire net mensuel <strong>avant la crise</strong></label>
        <input id="salaireNet" value={salaireNet} onChange={event => setSalaireNet(event.target.value)} />
      </div>
      <div className="field">
        <label for="heuresHabituelles">Nombre d'heures par semaine <strong>habituellement</strong></label>
        <input id="heuresHabituelles" value={heuresHabituelles} onChange={event => setHeuresHabituelles(event.target.value)} />
      </div>
      <div className="field">
        <label for="heuresChomees">Nombre d'heures par semaine en chômage partiel</label>
        <input id="heuresChomees" value={heuresChomees} onChange={event => setHeuresChomees(event.target.value)} />
      </div>
      <div className="field">
        <label for="debutChomage">Débût de votre chômage partiel</label>
        <input id="debutChomage" type="date" value={debutChomage} onChange={event => setDebutChomage(event.target.value)} />
      </div>

      <button onClick={handleClick}>Valider</button>
    </div>
  </div>
}

export default HomePage
