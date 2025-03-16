import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GDPTable from "../components/GDPTable";

describe("GDPTable", () => {
  const mockData = [
    { year: 2020, totalGDP: 1000000, gdpPerCapita: 5000 },
    { year: 2021, totalGDP: 1100000, gdpPerCapita: 5500 },
  ];

  it("renders table with correct data", () => {
    render(<GDPTable data={mockData} />);

    // Check if years are displayed
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();

    // Check if headers are present
    expect(screen.getByText("Ano")).toBeInTheDocument();
    expect(screen.getByText("PIB Total (USD)")).toBeInTheDocument();
    expect(screen.getByText("PIB per Capita (USD)")).toBeInTheDocument();
  });
});
