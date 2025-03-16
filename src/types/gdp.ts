export interface GDPData {
  year: number;
  totalGDP: number;
  gdpPerCapita: number;
}

export interface APIResponse {
  [index: number]: {
    id: string;
    resultados: Array<{
      series: Array<{
        localidade: {
          id: string;
          nivel: {
            id: string;
            nome: string;
          };
          nome: string;
        };
        serie: {
          [key: string]: string;
        };
      }>;
    }>;
    variavel: string;
  };
}