import React, { Component } from "react";
import Employees from "../employees/employees";
import Search from "../search/search";
//import "./directory.css";

class Directory extends Component {

  state = {
    employees: [],
    empSort: [],
    search: "",
    sorted: false,
  };

  
  componentDidMount = () => {
    fetch(`https://randomuser.me/api/?results=25&nat=us&inc=name,email,phone,id,picture,dob`)
      .then(res => res.json())
      .then(json => {
        this.setState({ employees: json.results })
      })
  };

 
  sortEmp = () => {
    let { employees, search } = this.state;
    let empSort = employees.filter(sorted => {
      return (
        sorted.name.first.toLowerCase().includes(search.toLowerCase()) ||
        sorted.name.last.toLowerCase().includes(search.toLowerCase()) ||
        sorted.email.toLowerCase().includes(search.toLowerCase())
      )
    })
    this.setState({ empSort })
  }

  // grab search term, activate sorted  
  startSort = event => {
    this.setState({ search: event.target.value }, () => {
      this.sortEmp();
      this.setState({ sorted: true });
    });
  };

  render = () => {

    return (

      <div>
        <div className="jumbotron">
          <h2 className="display-4">
            Employee Directory
          </h2>
          <p >
            Search for a Team Member!
          </p>
          <Search
            name="search"
            startSort={this.startSort}
            label="Search"
          />
        </div>

        <div className="container">
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Headshot  </th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Birthdate  </th>
              </tr>
            </thead>
            <tbody>

              {/* if it's not sorted, map accordingly */}
              {!this.state.sorted ? this.state.employees.map(employee => (


                < Employees
                  key={employee.id.value}
                  firstName={employee.name.first}
                  lastName={employee.name.last}
                  phone={employee.phone}
                  email={employee.email}
                  icon={employee.picture.medium}
                  dob={employee.dob.date}

                />

              ))
                // otherwise map the sorted employees
                : this.state.empSort.map(employee => (

                  <Employees
                    key={employee.id.value}
                    firstName={employee.name.first}
                    lastName={employee.name.last}
                    phone={employee.phone}
                    email={employee.email}
                    icon={employee.picture.medium}
                    dob={employee.dob.date}
                  />

                ))};
          </tbody>
          </table>

        </div>

      </div >

    )

  }

}

export default Directory;