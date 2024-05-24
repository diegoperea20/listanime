import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Animelist",
  description: "Animelist created by Diego Ivan Perea Montealegre",
  creator: "Diego Ivan Perea Montealegre",
  icons: {
    icon: './anime.ico', // Ruta correcta del ícono
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <Header />
        {children}
        <Footer />
      </body>
      
    </html>
  );
}
