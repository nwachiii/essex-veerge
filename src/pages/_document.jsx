import NextDocument, {Html, Head, Main, NextScript} from 'next/document';
import {ColorModeScript} from '@chakra-ui/react';
import Script from 'next/script';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link href="/gearVeergeLogoWhite.svg" rel="icon" />
          <link
            rel="preload"
            href="/fonts/NeueHaasDisplay-BlackItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/NeueHaasDisplay-Black.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/NeueHaasDisplay-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/NeueHaasDisplay-BoldItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/NeueHaasDisplay-Light.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/NeueHaasDisplay-LightItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link href="https://fonts.cdnfonts.com/css/euclid-circular-b" rel="stylesheet" />
          <link href="https://fonts.cdnfonts.com/css/proxima-nova" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Nova+Script&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Rubik:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@700&family=Titillium+Web:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
          <Script
            id=""
            type="text/javascript"
          >{`window.$crisp=[];window.CRISP_WEBSITE_ID="8f082f57-4bfa-4a9c-99b7-1919788b893d";(function(){d=document;s=d.createElement("script")s.src="https://client.crisp.chat/l.js" s.async=1;d.getElementsByTagName("head")[0].appendChild(s)})()`}</Script>
        </body>
      </Html>
    );
  }
}
