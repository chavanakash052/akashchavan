import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { defaultPortfolio, PortfolioData } from "@/lib/portfolioDefaults";

type Ctx = {
  data: PortfolioData;
  resumeUrl: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const PortfolioContext = createContext<Ctx>({
  data: defaultPortfolio,
  resumeUrl: null,
  loading: true,
  refresh: async () => {},
});

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolio);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data: row } = await supabase
      .from("portfolio_content")
      .select("data, resume_url")
      .eq("id", 1)
      .maybeSingle();
    if (row?.data) setData({ ...defaultPortfolio, ...(row.data as Partial<PortfolioData>) } as PortfolioData);
    if (row?.resume_url) setResumeUrl(row.resume_url);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, resumeUrl, loading, refresh: load }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
