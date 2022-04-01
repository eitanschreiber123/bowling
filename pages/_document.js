import Document,{Html,Head,Main,NextScript}from'next/document'
import{ServerStyleSheet,createGlobalStyle}from'styled-components'
export default class SiteDocument extends Document{
  render(){
    const sheet=new ServerStyleSheet()
    const main=sheet.collectStyles(<Main/>)
    const styleTags=sheet.getStyleElement()
    return(<Html>
        <Head>
          <meta charSet='utf-8'/>
          <title>Bowling app</title>
          <base href="/"/>
          <meta name='viewport'content='initial-scale=1.0, width=device-width'/>
          <link rel='stylesheet'type='text/css'href='https://cdnjs.cloudflare.com/ajax/libs/sanitize.css/2.0.0/sanitize.min.css'/>
          <link rel='stylesheet'type='text/css'href='https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.7.4/tachyons.min.css'/>
          <link rel="stylesheet"type="text/css"href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"/>
          <link rel="stylesheet"type="text/css"href="https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css"/>
          <link rel="preconnect"href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"rel="stylesheet"/>
          {styleTags}
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>)}}
