import { useRoutes } from "react-router-dom"
import routers from "./router"

function App() {

  const element = useRoutes(routers)

  return (
    <>
      {element}
    </>
  )
}

export default App
