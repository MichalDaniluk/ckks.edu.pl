import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import Link from 'next/link';
import Header from '@components/Head';

const Jobs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const changeNameHandler = event => {
    setName(event.target.value);
  };

  const changeEmailHandler = event => {
    setEmail(event.target.value);
  };

  const changePhoneHandler = event => {
    setPhone(event.target.value);
  };

  const changeNotesHandler = event => {
    setNotes(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

	axios({
		method: 'post',
		url:'/api/work',
		data: {
			email,
			name,
			phone,
			notes,
      }
	})
    .then(response => {
		Swal.fire('Dziękujemy za zapis!', response.data, 'success');
    })
	.catch(function(error) {
        Swal.fire('Wystąpił błąd', error.response.message, 'error');
      });
  };

  return (
    <>
      <Header
        title="Praca w CKKS"
        description="ckks praca instruktor"
        query="praca"
        image=""
		keywords="praca w ckks"
      />
      <div className="container">
        <h2>Praca</h2>
        <br />
        <p>
          W związku z ciągłym rozwojem naszej placówki Centrum Kształcenia Kadr
          Sportowych, stale poszukujemy instruktorów i trenerów do prowadzenia
          kursów na terenie kraju. Staramy się rozszerzać ofertę terytorialnie i
          docierać do wszystkich miast na, na które pozyskujemy klientów. Jeśli
          jesteś doświadczonym trenerem, sport i praca to Twoja pasja, lubisz
          przekazywać wiedzę i chętnie się nią dzielisz czekamy na Twoje
          zgłoszenie. Wypełnij i prześlij do nas poniższy formularz rekrutacji.
          Plik z CV wyślij na adres praca@ckks.pl
        </p>
        <form className="form-container-static">
          <div className="form-inputs">
            <div className="sign-up-form-field">
              <input
                type="text"
                value={name}
                required={false}
                placeholder="Imię i nazwisko"
                onChange={changeNameHandler}
				name="name"
				id="name"
              />
              <label className="sign-up-form-label n-higher">
                Imię i nazwisko
              </label>
            </div>
            <div className="sign-up-form-field">
              <input
                type="text"
                value={phone}
                required={false}
                placeholder="Nr telefonu"
                onChange={changePhoneHandler}
				name="phone"
				id="phone"
              />
              <label className="sign-up-form-label n-higher">Telefon</label>
            </div>
            <div className="sign-up-form-field">
              <input
                type="text"
                value={email}
                required={false}
                placeholder="Adres email"
                onChange={changeEmailHandler}
				name="email"
				id="email"
              />
              <label className="sign-up-form-label n-higher">Adres email</label>
            </div>
            <div className="sign-up-form-field">
              <textarea
                placeholder="Jakie kursy/szkolenia chcesz prowadzić"
                onChange={changeNotesHandler}
				name="notes"
				id="notes"
              >
                {notes}
              </textarea>
              <label className="sign-up-form-label n-higher">Uwagi</label>
            </div>
            <input type="checkbox" required={false} name="agree" id="agree"/>
            <p>
              Wyrażam zgodę na przetwarzanie moich danych osobowych przez
              Administratora - Centrum Kształcenia Kadr Sportowych Bartłomiej
              Cienciała z siedzibą Wrocław 52-131 Buforowa 4e. Niniejsza zgoda
              obejmuje przetwarzanie moich danych osobowych w celu organizacji i
              realizacji kursu. Oświadczam jednocześnie, iż swoje dane osobowe
              przekazuję dobrowolnie i oświadczam ponadto, że są one zgodne z
              prawdą. Oświadczam również, iż zostałem przez administratora
              danych zapoznany z treścią{' '}
              <strong>
                <Link href="/polityka">Polityki Prywatności</Link>
              </strong>{' '}
              CKKS, celach i sposobach przetwarzania danych oraz prawie dostępu,
              do treści swoich danych i prawie ich poprawiania, żądania
              usunięcia oraz żądania ograniczenia przetwarzania.
            </p>
            <input
              className="see-more-btn sign-up-btn"
              type="submit"
              value="Zapisz"
              onClick={submitHandler}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Jobs;
