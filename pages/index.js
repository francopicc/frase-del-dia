import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'

export default function Home({ data }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>La frase del día</title>
      </Head>
      <main>
      <p class="credits">CREADO POR FRANCO PICCIRILLI</p>
      <div class="mobile-container">
          <div class="config-center-responsive">
              <div class="config-page">
                  <button id="dark-mode-turn">
                      <i class="fa-solid fa-moon fa-xl"></i>
                  </button>
                  <button id="bell-turn">
                      <i class="fa-solid fa-bell fa-xl"></i>
                  </button>
              </div>
          </div>
      <div class="mobile-style">
              <div class="container">
                  <h1>La frase del día</h1>
                  <p>Una frase cada día, gratis y simple.</p>
              </div>
          </div>
          {
            (data.phrase == '' && data.author == '')
            ? (
              <div class="frase-dia">
                <p>Ocurrio un error: No se encontro la frase. 😕</p>
              </div>
            )
            : (
              <div class="frase-dia">
                <p id="phrase">{ data.phrase }</p>
                <p id="author">- { data.author }</p>
                <div class="save-phrase">
                    <button id="save-button">
                        <i class="fa-regular fa-heart fa-lg"></i>
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
  const res = await fetch('https://frase-del-dia.vercel.app/api/hello')
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}