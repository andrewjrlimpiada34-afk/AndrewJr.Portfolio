import React, { createContext, useContext, useEffect, useState } from "react";
import { isFirebaseConfigured } from "../config/firebase";
import {
  defaultAboutContent,
  defaultCertificates,
  defaultHomeContent,
  defaultProjects,
  defaultSettings,
} from "../data/defaultContent";
import {
  getAboutContent,
  getCertificates,
  getHomeContent,
  getProjects,
  getSettings,
} from "../services/portfolioService";

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [homeContent, setHomeContent] = useState(defaultHomeContent);
  const [aboutContent, setAboutContent] = useState(defaultAboutContent);
  const [settings, setSettings] = useState(defaultSettings);
  const [projects, setProjects] = useState(defaultProjects);
  const [certificates, setCertificates] = useState(defaultCertificates);

  async function refreshData() {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const [
        nextHomeContent,
        nextAboutContent,
        nextSettings,
        nextProjects,
        nextCertificates,
      ] = await Promise.all([
        getHomeContent(),
        getAboutContent(),
        getSettings(),
        getProjects(),
        getCertificates(),
      ]);

      setHomeContent(nextHomeContent ? { ...defaultHomeContent, ...nextHomeContent } : defaultHomeContent);
      setAboutContent(nextAboutContent ? { ...defaultAboutContent, ...nextAboutContent } : defaultAboutContent);
      setSettings(nextSettings ? { ...defaultSettings, ...nextSettings } : defaultSettings);
      setProjects(nextProjects.length ? nextProjects : defaultProjects);
      setCertificates(nextCertificates.length ? nextCertificates : defaultCertificates);
    } catch (error) {
      setHomeContent(defaultHomeContent);
      setAboutContent(defaultAboutContent);
      setSettings(defaultSettings);
      setProjects(defaultProjects);
      setCertificates(defaultCertificates);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        loading,
        homeContent,
        aboutContent,
        settings,
        projects,
        certificates,
        refreshData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
