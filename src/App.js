import BitsLogo from './images/IPC-Logo.jpeg'
import React, { useState } from 'react';
import './App.css';
import Axios from 'axios'
import Profile from './components/Profile'

const registerUrl = "http://localhost:8000/api/add-approval-data"


function App() {
  const [capture,setCapture] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedPost, setSelectedPost] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');

  const [values, setValues] = useState({
    visitor_name:'',
    visitor_mobile:'',
    purpose:'',
    coming_from_city:'',
    visitor_relation:'',
    visitor_email:'',
    accompanied_persons:'',
    requesting_to:'',
    department:'',
    post:'',
    error: false,
    success: false
  });

  const { 
    visitor_name,
    visitor_mobile,
    purpose,
    coming_from_city,
    visitor_relation,
    visitor_email,
    accompanied_persons,
    requesting_to,
    department,
    post 
  } = values;

  console.log(values)
  const handleChange = name => event => {
   
      setValues({ ...values, error: false, [name]: event.target.value });
  
  };

  const handleChangeDepartment = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleChangePost = (event) => {
    setSelectedPost(event.target.value);
  };

  const handleChangePurpose = (event) => {
    setSelectedPurpose(event.target.value);
  };


  const handleSubmit = async (event)=>{
    event.preventDefault();
  
    try{

   let data = {
      visitor_name,
      visitor_mobile,
      purpose: selectedPurpose,
      coming_from_city,
      visitor_relation,
      visitor_email,
      accompanied_persons,
      requesting_to,
      department: selectedDepartment,
      post: selectedPost 
   }

    let response
    try {
   
      response = await Axios.post(registerUrl, data);
      console.log(response)
      setValues({visitor_name:'',
      visitor_mobile:'',
      purpose:'',
      coming_from_city:'',
      visitor_relation:'',
      visitor_email:'',
      accompanied_persons:'',
      requesting_to:'',
      department:'',
      post:'',
      error: false,
      success: 'Form submitted succesfully'})

      setSelectedDepartment('')
      setSelectedPost('')
      setSelectedPurpose('')
    
    } catch (error) {

      setValues({...values,error:'server error'})

    }
       
 
        return response
            
    }catch(error){
      console.log(error)
            return error.response
    }  
   
  }




  return (
    <div className="App">
      <div>
        <div className='logo-wrapper'>
        
          <img src={BitsLogo}/>
      
        </div>
        <div style={{display:'flex',marginTop:'2em',justifyContent:'flex-end'}}>
        <div style={{backgroundColor:'#faca2c',height:'6px',width:'12%'}}>
          
          </div>
          <div style={{backgroundColor:'#6cbfe7',height:'6px',width:'12%'}}>
          
          </div>
          <div style={{backgroundColor:'#ed1c24',height:'6px',width:'12%'}}>
          
          </div>
        </div>
        <div style={{backgroundColor:'grey',height:'1px',width:'100%'}}></div>
        <div style={{ width:'80%', margin:'1em auto', color:'#211d70', fontWeight:'bold', fontSize:'22px'}}>BITS Pilani :: Entry/Exit Registration Portal</div>
        <div style={{ width:'80%', margin:'1em auto', fontSize:'17px'}}>
        Please fill the form below to obtain visit approval.
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            {values.error && <div style={{marginTop:'1em', color:'red'}}> {values.error} </div>}
            {values.success && <div style={{marginTop:'1em', color:'green'}}> {values.success} </div>}
            
            <div style={{marginTop:'1em'}}> Visitee Details</div>

            <div style={{marginTop:'1em'}}>
          
            <input required  name='requesting_to' style={{width:'20%'}} placeholder='Name' onChange={handleChange('requesting_to')} value={requesting_to}></input>
            </div>

            <div style={{marginTop:'2em'}}>
            {/* <input required  name='department' style={{width:'20%'}} placeholder='Department' onChange={handleChange('department')} value={department}></input> */}
            <select style={{width:'20%'}} value={selectedDepartment} onChange={handleChangeDepartment}>
        <option value="">-- Department --</option>
        <option value="CS">CS</option>
        <option value="EEE">EEE</option>
        <option value="Mechanical">Mechanical</option>
      </select>
            </div>

            <div style={{marginTop:'2em'}}>
            {/* <input required  name='post' style={{width:'20%'}} placeholder='Post' onChange={handleChange('post')} value={post}></input> */}
            <select style={{width:'20%'}} value={selectedPost} onChange={handleChangePost}>
            <option value="">-- Post --</option>
            <option value="Professor">Professor</option>
            <option value="Student">Student</option>
            <option value="Dean">Dean</option>
            </select>
            </div>

          <div style={{marginTop:'1em'}}> Visitor Details</div>
            <div style={{marginTop:'1em'}}>
            <input required  name='visitor_name' style={{width:'20%'}} placeholder='Name' onChange={handleChange('visitor_name')} value={visitor_name}></input>
            </div>

            <div style={{marginTop:'2em'}}>
            <input required  name='visitor_mobile' style={{width:'20%'}} placeholder='Mobile' onChange={handleChange('visitor_mobile')} value={visitor_mobile}></input>
            </div>

            <div style={{marginTop:'2em'}}>
            {/* <input required  name='purpose' style={{width:'20%'}} placeholder='Purpose' onChange={handleChange('purpose')} value={purpose}></input> */}
            <select style={{width:'20%'}} value={selectedPurpose} onChange={handleChangePurpose}>
            <option value="">-- Purpose --</option>
            <option value="Meeting">Meeting</option>
            <option value="Other">Other</option>
            </select>
            </div>
            
            <div style={{marginTop:'2em'}}>
            <input required  name='coming_from_city' style={{width:'20%'}} placeholder='Coming from city' onChange={handleChange('coming_from_city')} value={coming_from_city}></input>
            </div>

            <div style={{marginTop:'2em'}}>
            <input required  name='visitor_relation' style={{width:'20%'}} placeholder='Relation to Visitee' onChange={handleChange('visitor_relation')} value={visitor_relation}></input>
            </div>

            <div style={{marginTop:'2em'}}>
            <input required  name='visitor_email' style={{width:'20%'}} placeholder='Email' onChange={handleChange('visitor_email')} value={visitor_email}></input>
            </div>

            <div style={{marginTop:'2em'}}>
            <input required  name='accompanied_persons' style={{width:'20%'}} placeholder='Number of Accompanying Persons' onChange={handleChange('accompanied_persons')} value={accompanied_persons}></input>
            </div>
      
         
            
           <button type="submit" style={{marginTop:'2em', cursor:'pointer'}}>Submit</button>
          </form>
        </div>
        <div style={{display:'flex',marginTop:'2em',justifyContent:'flex-start'}}>
        <div style={{backgroundColor:'#faca2c',height:'6px',width:'12%'}}>
          
          </div>
          <div style={{backgroundColor:'#6cbfe7',height:'6px',width:'12%'}}>
          
          </div>
          <div style={{backgroundColor:'#ed1c24',height:'6px',width:'12%'}}>
          
          </div>
         
        </div>
        <div style={{backgroundColor:'grey',height:'1px',width:'100%'}}></div>
      </div>

    </div>
  );
}

export default App;
