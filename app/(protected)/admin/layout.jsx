import {Navbar} from "./_components/navbar";
import {Header} from "./_components/header"


export const metadata = {
    title: "system shop",
    description: "store for all categories products",
  };
  
  export default function AdminLayout({ children }) {
    return (
          <div className="md:flex items-start">
            <Navbar />
            <aside className="min-w-full md:min-w-0" style={{width: 'calc(100% - 250px)'}}>
              <Header />
              {children}
            </aside>
          </div>
    );
  }