import {useState, useCallback} from 'react'

function HomePage() {
  const [salaireNetJanvier, setSalaireNetJanvier] = useState(1220)
  const [salaireNetFevrier, setSalaireNetFevrier] = useState(1220)
  const [salaireNetMars, setSalaireNetMars] = useState(1220)

  const [calculEnCours, setCalculEnCours] = useState(false)
  const [resultat, setResultat] = useState(null)

  const mois = [{
    label:'Janvier',
    value: salaireNetJanvier,
    set: setSalaireNetJanvier,
  }, {
    label:'Février',
    value: salaireNetFevrier,
    set: setSalaireNetFevrier,
  }, {
    label:'Mars',
    value: salaireNetMars,
    set: setSalaireNetMars,
  }]

  const handleClick = useCallback(async () => {
    if (calculEnCours) {
      return
    }
    const salaires = mois.reduce((accum, item, index) => {

      accum[`2020-${(index+1).toString().padStart(2, "0")}`] = item.value

      return accum
    }, {})

    const payload = {
      individus: {
        _: {
          salaire_net: salaires,
        }
      },
      familles: {
        _: {
          parents: ['_'],
          ppa: {
            "2020-04": null
          }
        }
      },
      menages: {
        _: {
          personne_de_reference: ['_']
        }
      },
      foyers_fiscaux: {
        _: {
          declarants: ['_']
        }
      },
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    }
    setCalculEnCours(true)
    const response = await fetch('https://openfisca.mes-aides.org/calculate', params)
    const json = await response.json()

    setCalculEnCours(false)
    const ppa = json?.familles?._?.ppa
    if (ppa) {
      const result = Math.round(parseFloat(ppa['2020-04']))
      setResultat(result)
    }
  })

  return <div>
    <style jsx>{`
    .section {
      margin: 2em 0;
    }
    .form, .field {
      display: flex;
      flex-direction: column;
    }

    .form {
      max-width: 1200px;
      margin: 0 auto;
    }

    .field {
      margin: 1em 0;
    }
    input {
      text-align: right;
    }

    h1 {
      color: #d45500;
    }
    .resultat {
      font-size: 200%;
      text-align: right;
    }

    button {
      border: none;
      color: white;
      font-weight: bold;
      background-color: #d45500;
      padding: 1em;
    }
    a.titre {
      text-decoration: none;
    }
    `}</style>
    <a className="titre" href="https://COVID.MES-AIDES.ORG"><h1>COVID.MES-AIDES.ORG</h1></a>
    <h2>Chômage partiel et prime d'activité</h2>
    <p>Salarié.e.s, estimez très rapidement votre droit à la prime d'activité, à partir de vos rémunérations nettes totales&nbsp;- <u>salaire plus indemnités de chômage partiel</u>.</p>
    <div className="section form">
      {mois.map(m => {
        return (
          <div className="field" key={m.label}>
            <label htmlFor={`salaireNet${m.label}`}>Salaire net <strong>total</strong> du mois de <strong>{m.label}</strong> 2020</label>
            <input id={`salaireNet${m.label}`} value={m.value} onChange={event => m.set(event.target.value)} />
          </div>
        )
      })}
      <button onClick={handleClick}>{calculEnCours ? 'Calcul en cours…' : 'ÉVALUER'}</button>
    </div>
    <div className="section">
      { resultat !== null && (
        <div>
          {(
            resultat ? (
              <div>
                Selon ces premières informations, vous auriez le droit à&nbsp;:
                <div className="resultat">{resultat}&nbsp;€&nbsp;/&nbsp;mois pendant 3 mois</div>
                <p>Pour une meilleure estimation, prenez 7 minutes pour évaluer vos droits à plus de 100 aides sur <a href="https://mes-aides.org/foyer/demandeur">Mes-Aides.org</a>.</p>
              </div>
              ) : (
              <div>
                <p>D'après ces premières informations et si vous vivez seul et sans enfant, vous ne semblez pas pouvoir bénéficier de la prime d'activité.</p>
                <p>Toutefois, nous vous invitons à prendre un peu plus de 5 minutes pour évaluer vos droits à plus de 100 aides sur <a href="https://mes-aides.org/foyer/demandeur">Mes-Aides.org</a>.</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  </div>
}

export default HomePage
