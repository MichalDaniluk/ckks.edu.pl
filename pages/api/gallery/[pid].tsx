import { Fetcher } from '../../../utils/fetcher';

export default async function handler(req, res) {
	const { pid } = req.query;

	try {
		res.status(200).json( await Fetcher.request(`${process.env.API}/gallery/${pid}`) );
  }
  catch(error) {
	res.status(500).json({'error':'Niewłaściwy format danych'});
  }
}
