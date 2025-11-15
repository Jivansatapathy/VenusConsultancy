import '@/styles/globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import ClientLayout from './client-layout';

export const metadata = {
  title: {
    default: 'Venus Hiring',
    template: '%s | Venus Hiring',
  },
  description: 'Venus Hiring - Your trusted recruitment partner. Connect with top-tier talent across the USA.',
  keywords: ['recruitment', 'hiring', 'talent', 'jobs', 'careers'],
  authors: [{ name: 'Venus Hiring' }],
  icons: {
    icon: '/venuslogo.png',
    apple: '/venuslogo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://venushiring.com',
    siteName: 'Venus Hiring',
    title: 'Venus Hiring - Your Trusted Recruitment Partner',
    description: 'Connect with top-tier talent across the USA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venus Hiring',
    description: 'Your trusted recruitment partner',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HW2KHD9DB2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HW2KHD9DB2');
            `,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

