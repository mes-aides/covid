import {Container} from 'next/app'

function App({ Component, pageProps }) {
  return (
    <Container>
      <style jsx global>{`
        html, body, #__next, .main {
          height: 100%;
        }

        body {
          font-family: sans-serif;
          max-width: 800px;
          margin: 0 auto;
        }

        body, input, button {
          font-size: 150%;          
        }

        .main {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        footer {
          margin: 0.5em 0;
        }

        a {
          color: #d45500;
          text-decoration: none;
        }
      `}</style>
      <div className="main">
        <Component {...pageProps} />
        <footer>
          <div><a href="https://github.com/mes-aides/covid">Site réalisé</a> par l'<a href="https://association.mes-aides.org">association Mes Aides</a>.</div>
          <div>Vous pouvez nous contacter <a href="mailto:equipe@mes-aides.org">par email</a>.</div>
        </footer>
      </div>
    </Container>
  )
}

export default App
