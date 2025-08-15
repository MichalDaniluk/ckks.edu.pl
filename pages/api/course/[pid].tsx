/**
 * Course lookup by slug/href
 * 
 * Backend SQL Query:
 * SELECT * FROM kurs 
 * WHERE href = 'course-slug' 
 * LIMIT 1;
 */
export default async function handler(req, res) {
	const { pid } = req.query;
	
	if (!pid) {
		return res.status(400).json({'error':'Brak identyfikatora kursu'});
	}
	
	try {
		// First try to find by href (URL slug)
		let response = await fetch(`${process.env.CKKS_API_URL || 'http://localhost:3001'}/api/course/kurs/${pid}`);
		
		// If not found by href and pid looks like a number, try by ID
		if (!response.ok && /^\d+$/.test(pid)) {
			response = await fetch(`${process.env.CKKS_API_URL || 'http://localhost:3001'}/api/course/${pid}`);
		}
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const data = await response.json();
		res.status(200).json(data);
	}
	catch(error) {
		console.error('Course lookup error:', error);
		res.status(500).json({'error':'Niewłaściwy format danych'});
	}
}