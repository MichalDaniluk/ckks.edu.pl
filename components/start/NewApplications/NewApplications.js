import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewApplications = () => {
  const [list, setList] = useState([]);

  async function loadApplications() {
    try {
      const response = await axios.get('/api/start/lastapplictions?_limit=4');
      setList(response.data);
    } catch (error) {
      console.error('NewApplications API error:', error);
      setList([]);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  // Don't render component if there's no data
  if (!list || list.length === 0) {
    return null;
  }

  return (
    <div className="signup-table__container">
      <h2 className="signup-table__main-title">Najnowsze zapisy:</h2>
      <div className="signup-table">
        <table>
          <thead>
            <tr>
              <th className="mobile">Lp.</th>
              <th className="mobile">Data zapisu</th>
              <th>Kurs</th>
              <th>Miejsce</th>
              <th>Kiedy Rusza</th>
              <th className="mobile">Rodzaj Kursu</th>
              <th className="mobile">Stan</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, lp) => (
              <tr key={item.id || lp}>
                <td className="mobile">{lp + 1}</td>
                <td className="mobile">
                  {item.applied_at ? new Date(item.applied_at).toLocaleDateString('pl-PL') : ''}
                </td>
                <td>
                  <span>{item.course_name ? item.course_name.substring(0, 30) : ''}</span>
                </td>
                <td>{item.course_place || ''}</td>
                <td>{item.course_start_date ? new Date(item.course_start_date).toLocaleDateString('pl-PL') : ''}</td>
                <td className="mobile">{item.course_type || ''}</td>
                <td className="mobile">{item.course_status || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewApplications;
