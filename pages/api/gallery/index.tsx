//// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Fetcher } from '../../../utils/fetcher';

export default async function handler(req, res) {
	try {
		res.status(200).json( await Fetcher.request(`${process.env.API}/gallery`));
  }
  catch(error) {
	res.status(500).json({'error':'Niewłaściwy format danych'});
  }
}
