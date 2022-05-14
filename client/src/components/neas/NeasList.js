import React, {useState, useEffect} from 'react'
import Nea from './Nea';

function NeasList() {
  // States to manage pagination:
  const [neas, setNeas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [created, setCreated] = useState(null);

  useEffect(() => {

    const fetchNeas = async () => {
      const response = await fetch('http://localhost:3001/api/astronomy/neas');
      const data = await response.json();
      if (data.response) {
        setNeas(data.neas);
        setLoading(false);
      }
    }

    fetchNeas();

  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const neaData = {
        designation: event.target.designation.value,
        discovery_date: event.target.discovery_date.value,
        h_mag: event.target.h_mag.value,
        moid_au: event.target.moid_au.value,
        q_au_1: event.target.q_au_1.value ,
        period_yr: event.target.period_yr.value,
        i_deg: event.target.i_deg.value,
        pha: event.target.pha.value,
        orbit_class: event.target.orbit_class.value,
    }
    const response = await fetch('/api/astronomy/neas/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(neaData)
    });
    const data = await response.json();
    if (data.response) {
      setCreated('success');
    }
    else {
      setCreated('failure');
    }
    // event.target.reset();
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit} className='list-form'>

        <h4>Create new NEA:</h4>

        <label htmlFor="designation">Designation: </label>
        <input type="text" name='designation' />

        <label htmlFor="date">Date: </label>
        <input type="text" name='date' />

        <label htmlFor="h_mag">H_mag: </label>
        <input type="text" name='h_mag' />

        <label htmlFor="moid_au">Moid_au: </label>
        <input type="text" name='moid_au' />

        <label htmlFor="q_au_1">Q_au_1: </label>
        <input type="text" name='q_au_1' />

        <label htmlFor="q_au_2">Q_au_2: </label>
        <input type="text" name='q_au_2' />

        <label htmlFor="period_yr">Period_yr: </label>
        <input type="text" name='period_yr' />

        <label htmlFor="i_deg">I_deg: </label>
        <input type="text" name='i_deg' />

        <label htmlFor="pha">Pha: </label>
        <input type="text" name='pha' />

        <label htmlFor="orbit_class">Orbit_class: </label>
        <input type="text" name='orbit_class' />

        <input type='submit' value='Create'/>
      </form>

      {created === 'success' && <p>New NEA created.</p>}
      {created === 'failure' && <p>Incorrect parameters. Please, try again...</p>}

      <section className='neas-section'>
        {loading ?
          <div className="loading">Loading...</div>
          :
          <>
            <div className='nea-container'>
              {neas.length > 0 && neas.map(nea => {
                return (
                  <Nea key={nea.designation} {...nea} setNeas={setNeas} neas={neas} />
                )
              })}
            </div>
          </>
        }
      </section>


    </>
  )
}

export default NeasList