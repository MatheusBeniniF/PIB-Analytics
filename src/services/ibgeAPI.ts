import axios from 'axios';
import { APIResponse, GDPData } from '../types/gdp';

const BASE_URL = 'https://servicodados.ibge.gov.br/api/v3';
const YEARS = Array.from({ length: 24 }, (_, i) => 2000 + i).join('|'); // "2000|2001|...|2023"

const fetchWithRetry = async (url: string, retries = 3): Promise<APIResponse | null> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.warn(`Tentativa ${i + 1} falhou:`, error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return null;
};

export const fetchGDPData = async (): Promise<GDPData[]> => {
  try {
    const [totalGDPResponse, populationResponse] = await Promise.all([
      fetchWithRetry(`${BASE_URL}/agregados/6784/periodos/${YEARS}/variaveis/9810?localidades=N1`),
      fetchWithRetry(`${BASE_URL}/agregados/6579/periodos/${YEARS}/variaveis/9324?localidades=N1`) // População total
    ]);

    if (!totalGDPResponse || !populationResponse) {
      throw new Error("Dados inválidos da API");
    }

    const totalGDPSeries = totalGDPResponse[0]?.resultados?.[0]?.series?.[0]?.serie || {};
    const populationSeries = populationResponse[0].resultados?.[0]?.series?.[0]?.serie || {};
    
    const data = Object.keys(totalGDPSeries)
      .map((year) => ({
        year: parseInt(year),
        totalGDP: parseFloat(totalGDPSeries[year].replace(/\./g, "").replace(",", ".")) || 0,
        gdpPerCapita:
          (parseFloat(totalGDPSeries[year].replace(/\./g, "").replace(",", ".")) || 0) /
          (parseFloat(populationSeries[year]?.replace(/\./g, "").replace(",", ".")) || 1),
      }))
      .sort((a, b) => a.year - b.year);

    return data;
  } catch (error) {
    console.error("Erro ao buscar dados do PIB:", error);
    return [];
  }
};
