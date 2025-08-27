export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '20px', backgroundColor: '#800000', color: '#FFF8E1', textAlign: 'center' }}>
          <h2>Main Header</h2>
        </header>

        <main style={{ padding: '40px' }}>
          {children}
        </main>

        <footer style={{ padding: '20px', backgroundColor: '#4A2A2A', color: '#FFF8E1', textAlign: 'center', marginTop: 'auto' }}>
          <p>Main Footer</p>
        </footer>
      </body>
    </html>
  );
}