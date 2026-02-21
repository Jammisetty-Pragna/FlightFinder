import React, { useEffect, useState } from 'react'
import '../styles/NewFlight.css'
import axios from 'axios';

const NewFlight = () => {

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const id = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:6001/fetch-user/${id}`);
      setUserDetails(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("User fetch error:", err);
    }
  };

  const [flightName, setFlightName] = useState(localStorage.getItem('username'));
  const [flightId, setFlightId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [totalSeats, setTotalSeats] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  const handleSubmit = async () => {
    try {
      const inputs = {
        flightName,
        flightId,
        origin,
        destination,
        departureTime: startTime,
        arrivalTime,
        basePrice,
        totalSeats
      };

      await axios.post('http://localhost:6001/add-Flight', inputs);

      alert('Flight added successfully!!');

      setFlightId('');
      setOrigin('');
      setDestination('');
      setStartTime('');
      setArrivalTime('');
      setBasePrice(0);
      setTotalSeats(0);

    } catch (err) {
      console.log("Add flight error:", err);
      alert("Failed to add flight");
    }
  };

  return (
    <div className='NewFlightPage'>

      {!userDetails ? (
        <h3>Loading...</h3>
      ) : userDetails.approval === 'not-approved' ? (

        <div className="notApproved-box">
          <h3>Approval Required!!</h3>
          <p>Your application is under processing. It needs approval from the administrator.</p>
        </div>

      ) : (

        <div className="NewFlightPageContainer">

          <h2>Add new Flight</h2>

          <span className='newFlightSpan1'>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" value={flightName} disabled />
              <label>Flight Name</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" value={flightId} onChange={(e) => setFlightId(e.target.value)} />
              <label>Flight Id</label>
            </div>
          </span>

          <span>
            <div className="form-floating">
              <select className="form-select mb-3" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                <option value="" disabled>Select Departure</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
              <label>Departure City</label>
            </div>

            <div className="form-floating mb-3">
              <input type="time" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              <label>Departure Time</label>
            </div>
          </span>

          <span>
            <div className="form-floating">
              <select className="form-select mb-3" value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="" disabled>Select Destination</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
              <label>Destination City</label>
            </div>

            <div className="form-floating mb-3">
              <input type="time" className="form-control" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
              <label>Arrival Time</label>
            </div>
          </span>

          <span className='newFlightSpan2'>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} />
              <label htmlFor="seats">Total seats</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
              <label htmlFor="price">Base price</label>
            </div>
          </span>

          <button className='btn btn-primary' onClick={handleSubmit}>Add now</button>

        </div>
      )}

    </div>
  );
};

export default NewFlight;
