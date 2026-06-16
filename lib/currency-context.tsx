"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Currency = "USD" | "GBP" | "GHS";

type Rates = { GBP: number; GHS: number };

const FALLBACK_RATES: Rates = { GBP: 0.789, GHS: 16.42 };
const SYMBOLS: Record<Currency, string> = { USD: "$", GBP: "£", GHS: "₵" };

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: Rates;
  convert: (usdAmount: number) => number;
  format: (usdAmount: number, opts?: { compact?: boolean; decimals?: number }) => string;
  ratesLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES);
  const [ratesLoading, setRatesLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.frankfurter.dev/v2/rates?base=USD&quotes=GBP,GHS")
      .then((r) => r.json())
      .then((data: { base: string; quote: string; rate: number }[]) => {
        if (!Array.isArray(data)) return;
        const updated = { ...FALLBACK_RATES };
        data.forEach((item) => {
          if (item.quote === "GBP") updated.GBP = item.rate;
          if (item.quote === "GHS") updated.GHS = item.rate;
        });
        setRates(updated);
      })
      .catch(() => {
        // Fallback rates already in state
      })
      .finally(() => setRatesLoading(false));
  }, []);

  function convert(usdAmount: number): number {
    if (currency === "USD") return usdAmount;
    if (currency === "GBP") return usdAmount * rates.GBP;
    if (currency === "GHS") return usdAmount * rates.GHS;
    return usdAmount;
  }

  function format(
    usdAmount: number,
    { compact = false, decimals }: { compact?: boolean; decimals?: number } = {}
  ): string {
    const amount = convert(usdAmount);
    const symbol = SYMBOLS[currency];
    if (compact) {
      if (amount >= 1_000_000)
        return `${symbol}${(amount / 1_000_000).toFixed(2)}m`;
      if (amount >= 1_000) return `${symbol}${(amount / 1_000).toFixed(1)}k`;
    }
    return `${symbol}${amount.toLocaleString("en-GB", {
      minimumFractionDigits: decimals ?? 0,
      maximumFractionDigits: decimals ?? 0,
    })}`;
  }

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, rates, convert, format, ratesLoading }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    // Safe fallback outside provider (advisor portal etc.)
    return {
      currency: "USD",
      setCurrency: () => {},
      rates: FALLBACK_RATES,
      convert: (n) => n,
      format: (n, opts) => {
        const compact = opts?.compact ?? false;
        if (compact && n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}m`;
        if (compact && n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
        return `$${n.toLocaleString("en-GB")}`;
      },
      ratesLoading: false,
    };
  }
  return ctx;
}

export { CurrencyProvider, useCurrency };
