import NavBar from "./CustomeNavBar";
import Footer from "./Footer";

const Base = ({ title = "My Blog App",children }) => {
  return (
    <div>
      <NavBar />
      <main>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Base