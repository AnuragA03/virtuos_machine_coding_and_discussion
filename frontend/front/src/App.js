import React, { useState, useEffect } from 'react';
// import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [StudentName, setStudentName] = useState('');
  const [CollegeName, setCollegeName] = useState('');
  const [Round1Marks, setRound1Marks] = useState('');
  const [Round2Marks, setRound2Marks] = useState('');
  const [Round3Marks, setRound3Marks] = useState('');
  const [TechnicalRoundMarks, setTechnicalRoundMarks] = useState('');
  const [error, setError] = useState('');

  //fetch users from backend
  useEffect(() => {
    fetch('/api/ranked')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  //handle form submission to create a new user
  const handleSubmit = (e) => {
    // e.preventDefault();

    const newUser = {
      StudentName,
      CollegeName,
      Round1Marks,
      Round2Marks,
      Round3Marks,
      TechnicalRoundMarks
    };

    fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error); // Backend validation error
        } else {
          setUsers([...users, data]); // Add the new user to the list
          setStudentName('');
          setCollegeName('');
          setRound1Marks('');
          setRound2Marks('');
          setRound3Marks('');
          setTechnicalRoundMarks('');
          setError(''); // Clear previous errors
        }
      })
      .catch(error => console.error('Error creating user:', error));
  };


  return (
    <div>
      <h1>Users List</h1>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.StudentName} - Round1Marks: {user.Round1Marks} - Round2Marks: {user.Round2Marks} - Round3Marks : {user.Round3Marks} - TechnicalRoundMarks : {user.TechnicalRoundMarks} - Total Marks : {user.TotalMarks} - Result : {user.Result} - Rank : {user.rank}
          </li>
        ))}
      </ul> */}
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        {/* <style>
          {`
      th, td {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #ccc;
      }
      th {
        border-bottom: 2px solid black;
        text-align: left;
      }
    `}  
        </style> */}
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Round 1 Marks</th>
            <th>Round 2 Marks</th>
            <th>Round 3 Marks</th>
            <th>Technical Round Marks</th>
            <th>Total Marks</th>
            <th>Result</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.StudentName}</td>
              <td>{user.Round1Marks}</td>
              <td>{user.Round2Marks}</td>
              <td>{user.Round3Marks}</td>
              <td>{user.TechnicalRoundMarks}</td>
              <td>{user.TotalMarks}</td>
              <td>{user.Result}</td>
              <td>{user.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create a New User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={StudentName} onChange={(e) => setStudentName(e.target.value)} />
        </label>
        <br />
        <label>
          CollegeName:
          <input type="text" value={CollegeName} onChange={(e) => setCollegeName(e.target.value)} />
        </label>
        <br />
        <label>
          Round 1 Marks:
          <input type="number" value={Round1Marks} onChange={(e) => setRound1Marks(e.target.value)} />
        </label>
        <br />
        <label>
          Round 2 Marks:
          <input type="number" value={Round2Marks} onChange={(e) => setRound2Marks(e.target.value)} />
        </label>
        <br />
        <label>
          Round 3 Marks:
          <input type="number" value={Round3Marks} onChange={(e) => setRound3Marks(e.target.value)} />
        </label>
        <br />
        <label>
          Technical Round Marks:
          <input type="number" value={TechnicalRoundMarks} onChange={(e) => setTechnicalRoundMarks(e.target.value)} />
        </label>
        <br />
        <br />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default App;
