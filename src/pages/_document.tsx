import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Include Font Awesome */}
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
                </Head>
                <body>
                    {/* Load Bootstrap JS asynchronously */}
                    <Script 
                        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                        strategy="beforeInteractive"  // Load before interactive rendering
                        crossOrigin="anonymous"
                    />
                    <Main />
                    <NextScript /> {/* Default next.js scripts */}
                </body>
            </Html>
        );
    }
}

export default MyDocument;