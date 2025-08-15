
import React from 'react';

type Props = {
	imagePath?:string
	name:string[]
	phone?:string[]
	email:string[]
	title?:string
	department?:string[]
}
export const ContactPerson:React.FC<Props> = ({department=[], imagePath=null, title=null, name, phone=null, email}) => {
  return (
    <div>
      <h3>
        {department.map((dep,idx)=>{
          return (<div key={idx}><strong>{dep}</strong></div>);
        })}
      </h3>
      <div className="contact_person">
        {imagePath && <img className="contact-image" src={imagePath} />}
        <div className="contact-desc">
          {title && <h4 style={{margin:'1rem 0'}}>{title}</h4>}
          <span>
          {name.map((na,idx)=>{
            return (<div key={idx}><strong>{na}</strong></div>);
          })}
          <br />
          <em className="fa fa-phone" aria-hidden="true">
            {phone === null && <br/>}
            {phone !== null && phone.map((pnumber,idx)=>{
              return (<div key={idx} className="fa fa-phone" aria-hidden="true">{pnumber === ' ' ? <br/> : pnumber}</div>);
            })}
          </em>
          <br />
          {email.map((em,idx)=>{
            return (<div key={idx}><a href={`mailto:${em}`}>{em === ' ' ? <br/> : em }</a></div>);
          })}
          </span>
        </div>
      </div>
    </div>
  );
};
