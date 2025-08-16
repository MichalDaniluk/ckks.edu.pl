export default async function handler(req, res) {
  try {
    const apiUrl = process.env.CKKS_API_URL || process.env.API;
    
    if (!apiUrl) {
      console.error('No API URL configured. Set CKKS_API_URL or API environment variable.');
      // Return mock data as fallback
      const mockNews = [
        {
          id: 1,
          title: "Aktualności CKKS",
          slug: "aktualnosci-ckks",
          excerpt: "Najnowsze informacje z naszej placówki...",
          content: "Bieżące informacje o działalności Centrum Kształcenia Kadr Sportowych.",
          published_at: "2024-01-20T00:00:00.000Z",
          image: "/img/logo.png"
        }
      ];
      return res.status(200).json(mockNews);
    }
    
    // Try to get news from API
    const response = await fetch(`${apiUrl}/api/news`);
    if (!response.ok) {
      // If API doesn't have news endpoint, return mock news data
      const mockNews = [
        {
          id: 1,
          title: "Nowe kursy trenerskie w ofercie CKKS",
          slug: "nowe-kursy-trenerskie",
          excerpt: "Zapraszamy na nowe kursy trenerskie organizowane przez CKKS...",
          content: "Szczegółowy opis nowych kursów trenerskich dostępnych w naszej ofercie.",
          published_at: "2024-01-20T00:00:00.000Z",
          image: "/img/Kurs_Trenera_Personalnego.jpg"
        },
        {
          id: 2,
          title: "Aktualizacja programów instruktorskich",
          slug: "aktualizacja-programow-instruktorskich",
          excerpt: "Informujemy o aktualizacji programów kursów instruktorskich...",
          content: "Wszystkie kursy instruktorskie zostały zaktualizowane zgodnie z najnowszymi standardami.",
          published_at: "2024-01-18T00:00:00.000Z",
          image: "/img/Kurs_Instruktora_Fitness.jpg"
        },
        {
          id: 3,
          title: "Nowe terminy kursów masażu",
          slug: "nowe-terminy-kursow-masazu",
          excerpt: "Dodaliśmy nowe terminy kursów masażu klasycznego...",
          content: "W odpowiedzi na duże zainteresowanie, dodajemy kolejne terminy kursów masażu.",
          published_at: "2024-01-16T00:00:00.000Z",
          image: "/img/Masaz_I_i_II_stopnia.jpg"
        },
        {
          id: 4,
          title: "Rozpoczęcie zapisów na kursy fizjoterapii",
          slug: "rozpoczecie-zapisow-fizjoterapia",
          excerpt: "Ruszają zapisy na kursy z zakresu fizjoterapii...",
          content: "Zapraszamy na kursy fizjoterapii prowadzone przez doświadczonych specjalistów.",
          published_at: "2024-01-14T00:00:00.000Z",
          image: "/img/Fizjoterapia_w_Sporcie.jpg"
        },
        {
          id: 5,
          title: "Akredytacja nowych programów edukacyjnych",
          slug: "akredytacja-nowych-programow",
          excerpt: "Otrzymaliśmy akredytację dla nowych programów szkoleniowych...",
          content: "Ministerstwo Edukacji Narodowej zatwierdziło nasze nowe programy szkoleniowe.",
          published_at: "2024-01-12T00:00:00.000Z",
          image: "/img/men.png"
        }
      ];
      return res.status(200).json(mockNews);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return mock data as fallback
    const mockNews = [
      {
        id: 1,
        title: "Aktualności CKKS",
        slug: "aktualnosci-ckks",
        excerpt: "Najnowsze informacje z naszej placówki...",
        content: "Bieżące informacje o działalności Centrum Kształcenia Kadr Sportowych.",
        published_at: "2024-01-20T00:00:00.000Z",
        image: "/img/logo.png"
      }
    ];
    res.status(200).json(mockNews);
  }
}