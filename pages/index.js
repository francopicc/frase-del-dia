import Head from 'next/head'
import Script from 'next/script'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home({ data }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Persevera y alcanza tu objetivo con frases dedicadas sobre el día a día."/>
        <title>La frase del día</title>
      </Head>
      <main>
        <Script src="https://kit.fontawesome.com/e80c9c3cc8.js"></Script>
        <Script src="javascript/home.js"></Script>
        <div className="bookmark-saved" id="bookmark-saved">
          <div className="phrase-bookmark">
              
          </div>
        </div>
        <div id="background-modal">

        </div>
        <p className="credits">LOS DATOS SE GUARDAN LOCALMENTE EN TU NAVEGADOR/APP</p>
        <div className="mobile-container">
            <div className="config-center-responsive">
                <div className="config-page">
                    <button id="dark-mode-turn" name="dark-mode">
                        <i className="fa-solid fa-moon fa-xl"></i>
                    </button>
                    {/* <button id="bell-turn" name="notification-switch">
                        <i className="fa-solid fa-bell fa-xl"></i>
                    </button> */}
                    <button id="saved-phrases" name="saved-phrases">
                        <i className="fa-solid fa-bookmark fa-xl"></i>
                    </button>
                </div>
            </div>
        <div className="mobile-style">
                <div className="container">
                    <h1>La frase del día</h1>
                    <p id="randomDesc">Una frase cada día, gratis y simple.</p>
                </div>
            </div>
            {
              (data.phrase == '' && data.author == '')
              ? (
                <div className="frase-dia">
                  <p>La pagina no esta disponible por el momento o no esta funcionando correctamente.</p>
                </div>
              )
              : (
                <div className="frase-dia">
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <p id="phrase">{ data.phrase || <Skeleton  width={350}/>}</p>
                    <p id="author">{"- " + data.author || <Skeleton width={50}/>}</p>
                  </SkeletonTheme>
                  <div className="save-phrase">
                      <button id="save-button" name="save-phrase">
                          <i className="fa-regular fa-heart fa-lg" id="heart-icon"></i>
                      </button>
                  </div>
                </div>
              )
            }
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(process.env.LOCAL_URL + '/api/hello', {
    headers: {
      'Authorization': 'Bearer ' + process.env.TOKEN_API
    }
  })
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}