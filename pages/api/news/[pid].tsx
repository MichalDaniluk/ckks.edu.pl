export default async function handler(req, res) {
	const { pid } = req.query;
	const response = await fetch(`${process.env.API}/news/${pid}`);

	try {
		const data = await response.json();
		res.status(200).json(data);
	}
	catch(error) {
		res.status(500).json({'error':'Niewłaściwy format danych'});
	}
}
