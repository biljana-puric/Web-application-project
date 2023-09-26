import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get("http://localhost:4000/user/getAllUsers")
  }

  login(usernameForm, passwordForm){
    const data = {
      username: usernameForm,
      password: passwordForm
    }

    return this.http.post("http://localhost:4000/user/login", data)
  }

  deleteUser(username){
    const data={
      username: username
    }
    return this.http.post("http://localhost:4000/user/deleteUser", data)
  }

  getMyInfo(username){
    const data = {
      username: username
    }
    return this.http.post("http://localhost:4000/user/getMyInfo", data)
  }

  registerClient(username, password, phone, mail, firstname, lastname, image){
    const data={
      username: username,
      password: password,
      type: "client",
      phone: phone,
      mail: mail,
      firstname: firstname,
      lastname: lastname,
      image: image
    }

    return this.http.post("http://localhost:4000/user/register", data)
  }

  acceptReg(username){
    const data ={
      username: username
    }
    return this.http.post("http://localhost:4000/user/acceptReg", data)
  }

  declineReg(username){
    const data={
      username: username
    }
    return this.http.post("http://localhost:4000/user/declineReg", data)
  }

  getAllRequestsForReg(){
    return this.http.get("http://localhost:4000/user/getAllRequestsForReg")
  }

  checkUsername(username){
    const data ={
      username: username
    }
    return this.http.post("http://localhost:4000/user/checkUsername", data)
  }

  checkMail(mail){
    const data ={
      mail: mail
    }
    return this.http.post("http://localhost:4000/user/checkMail", data)
  }

  getAllAgencies(){
    return this.http.get('http://localhost:4000/user/getAllAgencies')
  }

  getAllComments(agency){
    const data={
      agency: agency
    }
    return this.http.post('http://localhost:4000/user/getAllComments', data)
  }

  searchAgencyByName(searchParamName){
    const data = {
      searchParamName : searchParamName
    }
    return this.http.post('http://localhost:4000/user/searchAgencyByName', data)
  }

  searchAgencyBoth(searchParamName, searchParamAddress){
    const data = {
      searchParamName : searchParamName,
      searchParamAddress : searchParamAddress
    }
    return this.http.post('http://localhost:4000/user/searchAgencyBoth', data)
  }

  searchAgencyByAddress(searchParamAddress){
    const data = {
      searchParamAddress : searchParamAddress
    }
    return this.http.post('http://localhost:4000/user/searchAgencyByAddress', data)
  }

  changePassword(username, password){
    const data={
      username: username,
      password: password
    }
    return this.http.post("http://localhost:4000/user/changePassword", data)
  }

  updateProfileClient(username, firstname, lastname, phone, mail){
    const data={
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      mail: mail,
      username: username
    }
    return this.http.post("http://localhost:4000/user/updateProfileClient", data)
  }

  updateProfileAgency(username, firstname, lastname, country, city, street, description, mail, phone){
    const data={
      firstname: firstname,
      lastname: lastname,
      country : country,
      city: city,
      street: street,
      description: description,
      phone: phone,
      mail: mail,
      username: username
    }
    return this.http.post("http://localhost:4000/user/updateProfileAgency", data)
  }

  registerAgency(username, password, phone, mail, name_of_agency, country, city, street, postal, number_of_agency, description, image){
    console.log("SERVIS POZVAN")
    const data={
      username: username,
      password: password,
      type: "agency",
      phone: phone,
      mail: mail,
      name_of_agency: name_of_agency,
      country: country,
      city: city,
      street: street,
      postal: postal,
      number_of_agency: number_of_agency,
      description: description,
      image: image
    }

    return this.http.post("http://localhost:4000/user/register", data)
  }
}
