
import {OverviewContextProvider} from "./overviewContext";
import {OverviewHeader} from "./_components/overviewHeader"

const  AdminPage = async () => {

  return (
    <div className="p-3 lg:px-8">
      <OverviewContextProvider >
        <OverviewHeader />
      </OverviewContextProvider>
    </div>
  )
}

export default AdminPage