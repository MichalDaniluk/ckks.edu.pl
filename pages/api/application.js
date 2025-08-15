export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Map frontend form data to correct NestJS API format
    const formData = req.body;
    
    // The form sends szkolenie_id (training/term ID)
    const szkoleniaId = parseInt(formData.szkolenie_id) || 0;
    
    // Map to the correct API structure based on actual database schema
    const apiData = {
      szkolenie_id: szkoleniaId,  // ID of the training term
      student: {
        imie_nazwisko: formData.name || '',
        email: formData.mail || '',
        telefon: formData.tel || '',
        adres: '', // Not provided in form
        pesel: '', // Not provided in form  
        wyksztalcenie: '', // Not provided in form
        zawod: '' // Not provided in form
      },
      uwagi: formData.uwagi || '',
      akceptacja: 'Tak', // Required acceptance
      zaliczka: 'Nie', // Default payment status
      status: 'Aktywny', // Active student status
      akceptacja_przetwarzanie: 'Tak', // Required data processing agreement
      kod_promocyjny: formData.kod_promocyjny || '',
      skad: 'Web' // Source of registration
    };

    // Try to submit to NestJS API first
    const response = await fetch(`${process.env.CKKS_API_URL}/api/application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData)
    });

    if (response.ok) {
      const data = await response.text();
      console.log('SUCCESS: Application submitted to NestJS API:', {
        timestamp: new Date().toISOString(),
        originalData: formData,
        mappedData: apiData,
        response: data
      });
      return res.status(200).json(data);
    } else {
      const errorText = await response.text();
      console.error('NestJS API Error:', {
        timestamp: new Date().toISOString(),
        status: response.status,
        error: errorText,
        originalData: formData,
        mappedData: apiData
      });
      
      // If it's a "Term not found" error, provide specific guidance
      if (errorText.includes('Term not found')) {
        return res.status(400).json({
          message: 'Wybrany termin kursu nie jest obecnie dostępny do zapisów. Skontaktuj się z nami pod numerem 71 307 12 11 lub e-mail: sekretariat@ckks.pl',
          error: 'Term not available for registration',
          status: 'error'
        });
      }
      
      return res.status(500).json({
        message: 'Wystąpił błąd podczas zapisywania zgłoszenia. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.',
        error: 'Application submission failed',
        status: 'error'
      });
    }
  } catch (error) {
    console.error('Application API Error:', {
      timestamp: new Date().toISOString(),
      data: req.body,
      error: error.message
    });
    
    return res.status(500).json({
      message: 'Wystąpił błąd podczas zapisywania zgłoszenia. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.',
      error: 'Network or server error',
      status: 'error'
    });
  }
}