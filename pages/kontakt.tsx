import React from 'react';

import Header from '../components/Head';
import PageTop from '../components/PageTop';
import {ContactPerson} from '../components/ContactPerson';

const Contact = () => {
  return (
    <>
      <Header
        title="Kontakt z Centrum Kształcenia Kadr Sportowych"
        description="kontakt kursy kurs ckks.pl"
        query="kontakt"
        image="/img/header/kontakt.jpg"
        keywords="kontakt ckks kontakt z firmą"
      />
      <PageTop title="Kontakt z Centrum Kształcenia Kadr Sportowych" bgImage="/img/header/kontakt.jpg" />

    <div className="container contact-container">
			<div className="contact-branch">
			<ContactPerson key="m_bartlomiejcienciala.jpg" imagePath="https://ckks.pl/o/m_bartlomiejcienciala.jpg" title='Dyrektor CKKS' name={['mgr Bartłomiej Cienciała']}  email={['dyrektor@ckks.pl']} />
			<ContactPerson key="m_iwonakandora.jpg" imagePath="https://ckks.pl/o/m_iwonakandora.jpg" title='z-ca Dyrektora CKKS' name={['mgr Iwona Kandora']} phone={['793 244 744']} email={['iwona.kandora@ckks.pl']} />
			</div>
			<div className="contact-branch">
				<ContactPerson key="m_EwelinaP.jpg" department={['Obsługa Klienta']} imagePath="https://ckks.pl/o/m_EwelinaP.jpg" name={['Ewelina Piotrowicz']} phone={['73 333 03 03', '71 307 12 11']} email={['sekretariat@ckks.pl','ewelina.piotrowicz@ckks.pl']} />
				<ContactPerson key="m_grzegorzaugust.jpg" department={['Obsługa Klienta']} imagePath="https://ckks.pl/o/m_grzegorzaugust.jpg" name={['mgr Grzegorz August']} phone={['534 988 150',' ']} email={['grzegorz.august@ckks.pl',' ']} />
				{/*<ContactPerson key="seba" department={['Obsługa Klienta']} imagePath="https://ckks.pl/o/m_seba.jpg" name={['Sebastian Całka']} phone={['574 771 701',' ']} email={['sebastian.calka@ckks.pl',' ']} />*/}
			</div>
			<div className="contact-branch">
				<ContactPerson key="jaskulska" department={['Zaświadczenia i Księgowość']} name={['Aleksandra Jaskulska']} phone={['83 307 01 70']} email={['ksiegowosc@ckks.pl']} imagePath="https://ckks.pl/o/aleksandra.jaskulska.jpg"/>
				<ContactPerson key="florczak" department={['Zaświadczenia']} name={['Karolina Florczak']} phone={['83 307 01 70']} email={['zaswiadczenia@ckks.pl']} imagePath=""/>
				<ContactPerson key="muszynska" department={['Marketing, współpraca']} name={['Katarzyna Muszyńska']} phone={['577797732']} email={['katarzyna.muszynska@ckks.pl']} imagePath=""/>
				<ContactPerson key="ewelinac" department={['Konsultacje psychologiczno-pedagogiczne']} name={['Ewelina Cienciała']} phone={['885 107 911']} email={['psychologewelinacienciala@gmail.com']} imagePath="https://ckks.pl/o/psycholog.ewelina.cienciala.jpg"/>
			</div>

		<div className="main-grid">
			<div>
				<div>
					<h4><strong>Nr konta bankowego:</strong></h4>
					<p>
						Centrum Kształcenia Kadr Sportowych
						<br /> 08 1140 2004 0000 3702 6852 8371
					</p>
					<h4><strong>IBAN</strong></h4>
					<p>PL081140 2004 0000 3702 6852 8371</p>

					<h4><strong>BIC</strong></h4>
					<p>BREXPLPWMBK</p>
				</div>
			</div>
			<div>
				<h4><strong>Godziny otwarcia:</strong></h4>
				<p>poniedziałek - piątek &nbsp;8:00-16:00</p>
				<h4><strong>Dodatkowe dane placówki:</strong></h4>
				<p>
					RSPO: 126872
					<br /> NIP: 563-213-76-64
					<br /> Regon: 060261515
					<br /> Regon placówki: 360835770
					<br /> RIS: 2.02/00078/2015
					<br /> <br />
					<br />
				</p>
			</div>
		</div>



		<div className="main-grid">
			<div>
				<h4><strong>Dział obsługi klientów i kursów</strong></h4>
				<p>ul. Piłsudskiego 13/29, 21-500 Biała Podlaska</p>
			</div>
			<div>
				<h4><strong>Kadra, współpraca i organizacja</strong></h4>
				<p>ul. Buforowa 4e, 52-131 Wrocław</p>
			</div>
		</div>
	</div>
    </>
  );
};

export default Contact;
