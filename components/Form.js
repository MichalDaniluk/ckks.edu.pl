import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import Swal from 'sweetalert2';
import FormInfo from './form/FormInfo';

const Form = ({ kursInfoState, closeForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmitForm = values => {
    if (!values['email'] && !values['tel']) {
      Swal.fire('Wystąpił błąd', 'Wpisz adres email lub nr telefonu', 'error');
      //  setError('neitherItemlist', {
      //    type: 'manual',
      //    message: 'Wpisz adres email lub nr telefonu',
      //  })
      return;
    }

    axios({
      method: 'post',
      url: '/api/application',
      data: {
        name: values['name'],
        mail: values['email'],
        szkolenie_id: values['kurs-info'],
        tel: values['tel'],
        uwagi: values['uwagi'],
        kod_partnerski: values['partner'],
        kod_promocyjny: values['kupon'],
        VAT: toggleState,
        NIP: values['NIP'],
        adresVAT: values['adresVat'],
        marketing: values['marketing'],
        rezerwacja: values['rezerwacja'],
      },
    })
      .then(function(response) {
        reset();
        Swal.fire('Dziękujemy za zapis!', response.data, 'success');
        closeForm();
      })
      .catch(function(error) {
        const errorMessage = error.response?.data?.message || 
                           error.response?.message || 
                           error.message || 
                           'Wystąpił nieoczekiwany błąd podczas zapisywania';
        Swal.fire('Wystąpił błąd', errorMessage, 'error');
      });
  };

  const [toggleState, setToggleState] = useState('noVat');
  const [tabHeight, setTabHeight] = useState(100);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setTabHeight(height);
  }

  const handleChange = event => {
    setToggleState(event.target.value);
  };

  const wrapperRef = useRef(null);
  const formContainer = useRef(null);

  return (
    <div className="sign-up-form-container" ref={wrapperRef}>
      <FormInfo state={kursInfoState} />

      <form
        ref={formContainer}
        className="form-container"
        action="post"
        onSubmit={handleSubmit(onSubmitForm)}
        style={{ height: calcHeight }}
      >
        <div
          className="grid md:grid-cols-2 md:gap-6 w-full p-2 md:p-4"
          style={{ height: calcHeight }}
        >
          <div className="left m-2">
            <div>
              <input
                className="w-full m-2 p-2 text-sm"
                type="text"
                placeholder="* Imię i nazwisko, które będzie na dokumentach"
                name="name"
                id="name"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Podaj imię i nazwisko',
                  },
                })}
              />
              <span className="form-field-error-text">
                {errors?.name?.message}
              </span>
            </div>

            <div>
              <input
                className="w-full m-2 p-2 text-sm"
                type="tel"
                placeholder="Numer telefonu"
                name="tel"
                id="tel"
                {...register('tel', {})}
              />
              <span className="form-field-error-text">
                {errors?.tel?.message}
              </span>
            </div>

            <div>
              <input
                className="w-full m-2 p-2 text-sm"
                type="email"
                placeholder="* Adres e-mail"
                name="email"
                id="email"
                {...register('email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Wpisz adres e-mail',
                  },
                })}
              />
              <span className="form-field-error-text">
                {errors?.email?.message}
              </span>
            </div>

            <div>
              <textarea
                className="w-full m-2 p-2 text-sm"
                placeholder="Uwagi"
                name="uwagi"
                id="uwagi"
                {...register('uwagi', {
                  maxLength: {
                    value: 1000,
                  },
                  message:
                    'Ta wiadomość jest za długa. Maksymalna długość wiadomości to 1000 znaków ',
                })}
              ></textarea>
              <span className="form-field-error-text">
                {errors?.uwagi?.message}
              </span>
            </div>

            <div>
              <input
                className="w-full m-2 p-2 text-sm"
                type="text"
                placeholder="Kod Partnerski"
                name="partner"
                id="partner"
                {...register('partner', {})}
              />
            </div>

            <div>
              <input
                className="w-full m-2 p-2"
                type="text"
                placeholder="Hasło promocyjne"
                name="kupon"
                id="kupon"
                {...register('kupon', {})}
              />
            </div>
          </div>

          <div className="right m-2">
            <div className="radio">
              <input
                type="checkbox"
                id="vatChoice1"
                name="vat-info"
                value="noVat"
                checked={toggleState == 'noVat' ? true : false}
                onChange={handleChange}
                {...register}
              />
              <label htmlFor="vatChoice1">Nie chcę otrzymać faktury</label>
            </div>
            <div className="radio">
              <input
                type="checkbox"
                id="vatChoice2"
                name="vat-info"
                value="yesVat"
                checked={toggleState == 'yesVat' ? true : false}
                onChange={handleChange}
                {...register}
              />
              <label htmlFor="vatChoice2">Chcę otrzymać fakturę na firmę</label>
            </div>
            <CSSTransition
              in={toggleState == 'yesVat'}
              timeout={700}
              classNames="showFormField"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div
                id="vatChoice2Field"
                className="sign-up-form-field"
                style={{ height: tabHeight }}
              >
                <input
                  type="text"
                  placeholder="NIP"
                  name="NIP"
                  id="NIP"
                  {...register('NIP', {})}
                />
                <label className="sign-up-form-label" htmlFor="NIP">
                  NIP
                </label>
              </div>
            </CSSTransition>
            <div className="radio">
              <input
                type="checkbox"
                id="vatChoice3"
                name="vat-info"
                value="privateVat"
                checked={toggleState == 'privateVat' ? true : false}
                onChange={handleChange}
                {...register}
              />
              <label htmlFor="vatChoice3">
                Chcę otrzymać fakturę na osobę prywatną
              </label>
            </div>
            <CSSTransition
              in={toggleState == 'privateVat'}
              timeout={700}
              classNames="showFormField"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div
                id="vatChoice3Field"
                className="sign-up-form-field"
                style={{ height: tabHeight }}
              >
                <input
                  type="text"
                  placeholder="Adres"
                  name="adresVat"
                  id="adresVat"
                  {...register('adresVat', {})}
                />
                <label className="sign-up-form-label" htmlFor="adresVat">
                  Adres
                </label>
              </div>
            </CSSTransition>

            <div className="kurs-info" style={{ display: 'none' }}>
              <input
                className="kurs-info"
                type="text"
                {...register('kurs-info')}
                id="kurs-info"
                name="kurs-info"
                style={{
                  content: `${kursInfoState.termin_id ||
                    kursInfoState.szkolenie_id}`,
                }}
                value={parseInt(
                  kursInfoState.termin_id || kursInfoState.szkolenie_id
                )}
              />
              <input
                {...register('rezerwacja', {})}
                type="hidden"
                name="rezerwacja"
                id="rezerwacja"
                value={kursInfoState.brakmiejsc}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-2 p-4 md:p-12 w-full md:absolute md:bottom-0">
          <div className="text-xs">
            <input
              name="regulamin"
              type="checkbox"
              {...register('regulamin', {
                required: {
                  value: true,
                  message:
                    'Aby zapisać się na kurs musisz zaakceptować regulamin',
                },
              })}
            />{' '}
            * Akceptuję{' '}
            <a className="link-simple" href="/regulamin">
              regulamin
            </a>{' '}
            znajdujący się na stronie.
            <span className="form-field-error-text">
              {errors?.regulamin?.message}
            </span>
            <span className="block text-xs">
              <input
                className=""
                name="rodo"
                type="checkbox"
                {...register('rodo', {
                  required: {
                    value: true,
                    message: 'Akceptacja zasad RODO jest wymagana',
                  },
                })}
              />{' '}
              * Wyrażam zgodę na przetwarzanie moich danych osobowych przez
              Administratora - Centrum Kształcenia Kadr Sportowych Bartłomiej
              Cienciała z siedzibą Wrocław 52-131 Buforowa 4e. Niniejsza zgoda
              obejmuje przetwarzanie moich danych osobowych w celu organizacji i
              realizacji kursu. Oświadczam jednocześnie, iż swoje dane osobowe
              przekazuję dobrowolnie i oświadczam ponadto, że są one zgodne z
              prawdą. Oświadczam również, iż zostałem przez administratora
              danych zapoznany z treścią{' '}
              <a className="link-simple" href="/polityka">
                Polityki Prywatności
              </a>{' '}
              CKKS, celach i sposobach przetwarzania danych oraz prawie dostępu,
              do treści swoich danych i prawie ich poprawiania, żądania
              usunięcia oraz żądania ograniczenia przetwarzania.
            </span>
            <span className="form-field-error-text">
              {errors?.rodo?.message}
            </span>
            <span className="block text-xs">
              <input type="checkbox" {...register('marketing', {})} /> Wyrażam
              zgodę na wysyłanie przez Centrum Kształcenia Kadr Sportowych
              informacji w celach marketingowych w formie korespondencji e-mail
              na wskazany adres
            </span>
          </div>

          <button
            type="submit"
            className="see-more-btn mt-2"
            onClick={handleSubmit}
          >
            Wyślij
          </button>
        </div>
      </form>
      <div className="closeModalElement" onClick={closeForm}></div>
    </div>
  );
};

export default Form;
