 import React from 'react';
 import { Link } from 'react-router-dom';




 function Index() {
     return (


<html>
    
      <div class="bg-color">
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark" >
          
          <h1 style={{color:'white'}}>Forex</h1>
          
        

          <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar nav ml-auto">
              
             <li class="nav-item">
              <div class="dropdown">
                <button
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                >
                  Login
                  
                   <span class="caret"></span> 
                </button>

                <ul class="dropdown-menu">
                  <li>
                    <Link to="/signin">User</Link>
                  </li>
                  <br></br>
                  <li>
                  <Link to="/adminsignin">Admin</Link>
                  </li>
                </ul>
                  
              </div>
              </li>
                <li class="nav-item">
                  <div class="dropdown">
                    <button
                      class="btn btn-primary dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                    >
                      Register
                      <span class="caret"></span>
                    </button>

                    <ul class="dropdown-menu">
                      <li>
                      <Link to="/signup">User</Link>
                      </li>
                      <br></br>
                      <li>
                      <Link to="/adminsignup">Admin</Link>
                      </li>
                    </ul>
                  </div>
                </li>

              
            </ul>
          </div>
          
        </nav>
      </div>
        
    </html>
    
    );
}
export default Index;