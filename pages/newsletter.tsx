import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { validateEmail } from '../components/Helpers';

import Header from '../components/Head';

const Newsletter = () => {
  const submitHandler = event => {
	event.preventDefault();

	if( !validateEmail(email) ) {
		Swal.fire('Wystąpił błąd!', 'Podaj prawidłowy adres email', 'error');
	}
	else {

    axios({
      method: 'post',
      url: '/api/newsletter',
      data: {
        name: name,
        email: email,
      },
    })
      .then(function(response) {

		Swal.fire('Dziękujemy za zapis na newsletter', response.data, 'success');
		setEmail('');
		setName('');
      })
      .catch(function(error) {
		if( error.response.status === 403 )
		Swal.fire('Wystąpił błąd!', error.response.data, 'error');
		else
			Swal.fire('Wystąpił błąd!', error.response.message, 'error');
      });
	}
  };

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const changeNameHandler = event => {
    setName(event.target.value);
  };

  const changeEmailHandler = event => {
    setEmail(event.target.value);
  };

  return (
    <>
      <Header
        title="Newsletter Centrum Kształcenia Kadr Sportowych"
        description="newsletter ckks"
        query="/newsletter"
        image=""
		keywords="newsletter ckks"
      />
      <div className="container">
        <h1>Zapisz się na newsletter</h1>
        <h3>Zapisując się do newslettera CKKS otrzymujesz:</h3>
        <br />
        <ul>
          <li>
            jednorazowe hasło promocyjne! Wpisując je podczas zapisu otrzymasz
            rabat w wysokości - 15% od ceny podstawowej*,
          </li>
          <li>
            dostęp do aktualnych promocji, które są wysyłane wyłącznie do osób z
            bazy kontaktów CKKS,
          </li>
          <li>
            informacje o najnowszych terminach ruszających, nowościach i
            wydarzeniach,
          </li>
          <li>zaproszenia na bezpłatne webinary,</li>
          <li>pomoc w pozyskaniu dofinansowań.</li>
        </ul>
        <p>
          Zapisanie do newslettera jest jednoznaczne z{' '}
          <strong>
            wyrażeniem zgody na przetwarzanie podanych danych osobowych
          </strong>{' '}
          w celu wysyłki wiadomości typu Newsletter oraz potwierdzenie, iż
          zapoznałaś/eś się z Regulaminem CKKS.
        </p>
        <p>
          Wpisz poniżej swoje <strong>imię oraz adres e-mail,</strong> następnie{' '}
          <strong>
            potwierdź subskrypcję newslettera w otrzymanej wiadomości email
          </strong>
          . W każdej chwili będziesz miał możliwość zrezygnować z subskrypcji.
        </p>
        <p>
          *
          <em>
            Hasło promocyjne jest ważne przez 7 dni. Aby zachować rabat należy
            potwierdzić wpsiane hasło wpłatą zaliczki w terminie 7 dni. Rabat
            15% naliczony jest od ceny podstawowej, w przypadku zastosowania
            dwóch promocji zostanie wybrana korzystniejsza należność dla
            kursanta.
          </em>
        </p>

        <form className="form-container-static">
          <div className="form-inputs">
            <div className="sign-up-form-field">
              <input
                type="text"
                name="imie"
                value={name}
                onChange={changeNameHandler}
              />
              <label className="sign-up-form-label n-higher">Imię</label>
            </div>
            <div className="sign-up-form-field">
              <input
                type="text"
                name="email"
                value={email}
                onChange={changeEmailHandler}
              />
              <label className="sign-up-form-label n-higher">Asred email</label>
            </div>
            <input
              className="see-more-btn sign-up-btn"
              type="submit"
              value="Zapisz mnie"
              onClick={submitHandler}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Newsletter;
