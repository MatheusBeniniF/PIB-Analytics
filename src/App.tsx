import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BarChart3, Table } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchGDPData } from "./services/ibgeAPI";
import GDPChart from "./components/GDPChart";
import GDPTable from "./components/GDPTable";

function App() {
  const {
    data: gdpData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gdpData"],
    queryFn: fetchGDPData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !gdpData || gdpData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-lg font-semibold">
          Erro ao carregar os dados do PIB. Tente novamente mais tarde.
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  to="/"
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600"
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Gráfico PIB
                </Link>
                <Link
                  to="/table"
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600"
                >
                  <Table className="h-5 w-5 mr-2" />
                  Tabela PIB
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h1 className="text-2xl font-bold mb-6">
                    Evolução do PIB Brasileiro
                  </h1>
                  <GDPChart data={gdpData} />
                </div>
              }
            />
            <Route
              path="/table"
              element={
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h1 className="text-2xl font-bold mb-6">PIB por Ano</h1>
                  <GDPTable data={gdpData} />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
