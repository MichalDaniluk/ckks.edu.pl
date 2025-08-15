//// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	const { pid } = req.query;
	const response = await fetch(`${process.env.API}/galleryImages/${pid}`);

	try {
		const data = await response.json();
		res.status(200).json(data);
  }
  catch(error) {
	res.status(500).json({'error':'Niewłaściwy format danych'});
  }
}
