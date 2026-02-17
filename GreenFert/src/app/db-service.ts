import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private http:HttpClient) {}
  getlogin(data:any)
  {
    return this.http.post('http://localhost:3000/loginaction/',data).toPromise();
  }
  getdistrict(data:any)
  {
    return this.http.post('http://localhost:3000/districtaction/',data).toPromise();
  }
  getcategory(data:any)
  {
    return this.http.post('http://localhost:3000/categoryaction/',data).toPromise();
  }
   sregisteraction(data:any)
  {
    return this.http.post('http://localhost:3000/sregisteraction/',data).toPromise();
  }
  wcregisteraction(data:any)
  {
    return this.http.post('http://localhost:3000/wcregisteraction/',data).toPromise();
  }
  pregisteraction(data:any)
  {
    return this.http.post('http://localhost:3000/pregisteraction/',data).toPromise();
  }
   cregisteraction(data:any)
  {
    return this.http.post('http://localhost:3000/cregisteraction/',data).toPromise();
  }
districtview()
{
  return this.http.get('http://localhost:3000/districtview/').toPromise();
}
categoryview()
{
  return this.http.get('http://localhost:3000/categoryview/').toPromise();
}
wcview()
{
  return this.http.get('http://localhost:3000/wcview/').toPromise();
}
wcshops(data:any)
{
  return this.http.post('http://localhost:3000/wcshops/',data).toPromise();
}
wcassign(data:any)
{
  return this.http.post('http://localhost:3000/wcassign/',data).toPromise();
}
pview()
{
  return this.http.get('http://localhost:3000/pview/').toPromise();
}
sview()
{
  return this.http.get('http://localhost:3000/sview/').toPromise();
}
locationview()
{
  return this.http.get('http://localhost:3000/locationview/').toPromise();
}
deletedistrict(data:any)
{
  return this.http.post('http://localhost:3000/deletedistrict/',data).toPromise();

}
deletecategory(data:any)
{
  return this.http.post('http://localhost:3000/deletecategory/',data).toPromise();
}
deletep(data:any)
{
  return this.http.post('http://localhost:3000/deletep/',data).toPromise();
}
deletes(data:any)
{
  return this.http.post('http://localhost:3000/deletes/',data).toPromise();
}
accepts(data:any)
{
  return this.http.post('http://localhost:3000/accepts/',data).toPromise();
}
deletewc(data:any)
{
  return this.http.post('http://localhost:3000/deletewc/',data).toPromise();
}
assigning(data:any)
{
  return this.http.post('http://localhost:3000/assigning/',data).toPromise();
}
deletelocation(data:any)
{
  return this.http.post('http://localhost:3000/deletelocation/',data).toPromise();
}
Addtocart(data:any)
{
  return this.http.post('http://localhost:3000/Addtocart/',data).toPromise();
}
cpview(data:any)
{
  return this.http.post('http://localhost:3000/cpview/',data).toPromise();
}
dlocation()
{
  return this.http.get('http://localhost:3000/dlocation/').toPromise();

}
pdata(data:any)
{
  return this.http.post('http://localhost:3000/pdata/',data).toPromise();
}
ddistrict(data:any)
{
  return this.http.post('http://localhost:3000/ddistrict/',data).toPromise();

}
locationaction(data:any)
{
  return this.http.post('http://localhost:3000/locationaction/',data).toPromise();
}
getDistrictdetailsbyid(districtid:any)
{
  return this.http.post('http://localhost:3000/getDistrictdetailsbyid',districtid).toPromise();
}
productbycategory(categoryid:any)
{
  return this.http.post('http://localhost:3000/productbycategory',categoryid).toPromise();
}
productbypid(productid:any)
{
  return this.http.post('http://localhost:3000/productbypid',productid).toPromise();
}
wcsview(districtid:any)
{
  return this.http.post('http://localhost:3000/wcsview',districtid).toPromise();
}
getStockdetailsbyid(districtid:any)
{
  return this.http.post('http://localhost:3000/getStockdetailsbyid',districtid).toPromise();
}
getProductdetailsbyid(productid:any)
{
  return this.http.post('http://localhost:3000/getProductdetailsbyid',productid).toPromise();
}
getCategorydetailsbyid(categoryid:any)
{
  return this.http.post('http://localhost:3000/getCategorydetailsbyid/',categoryid).toPromise();
}
getLocationdetailsbyid(locationid:any)
{
  return this.http.post('http://localhost:3000/getLocationdetailsbyid/',locationid).toPromise();
}
updatecategory(data:any)
{
  return this.http.post('http://localhost:3000/updatecategory/',data).toPromise();

}
updatedistrict(data:any)
{
  return this.http.post('http://localhost:3000/updatedistrict/',data).toPromise();
}
updatestock(data:any)
{
  return this.http.post('http://localhost:3000/updatestock/',data).toPromise();
}
updatep(data:any)
{
  return this.http.post('http://localhost:3000/updatep/',data).toPromise();
}
markCollected(data:any)
{
  return this.http.post('http://localhost:3000/markCollected/',data).toPromise();
}
markcancelled(data:any)
{
  return this.http.post('http://localhost:3000/markcancelled/',data).toPromise();
}
updatelocation(data:any)
{
  return this.http.post('http://localhost:3000/updatelocation/',data).toPromise();
}
getwcdetails(data:any)
{
  return this.http.post('http://localhost:3000/getwcdetails/',data).toPromise();
}
getshopdetails(data:any)
{
  return this.http.post('http://localhost:3000/getshopdetails/',data).toPromise();
}
deletecp(data:any)
{
  return this.http.post('http://localhost:3000/deletecp/',data).toPromise();
}
finalpayment(data:any)
{
  return this.http.post('http://localhost:3000/finalpayment/',data).toPromise();
}
updatepdetails(data:any)
{
  return this.http.post('http://localhost:3000/updatepdetails/',data).toPromise();
}
plocationadd(data:any)
{
  return this.http.post('http://localhost:3000/plocationadd/',data).toPromise();
}
cpviewt(data:any)
{
  return this.http.post('http://localhost:3000/cpviewt/',data).toPromise();
}
addressview(data:any) {
  return this.http.post('http://localhost:3000/addressview/',data).toPromise();
}
Buy(data:any)
{
  return this.http.post('http://localhost:3000/Buy/',data).toPromise();
}
cartnum(data:any)
{
  return this.http.post('http://localhost:3000/cartnum/',data).toPromise();
}
orderview()
{
  return this.http.get('http://localhost:3000/orderview/').toPromise();
}
senttodel(data:any)
{
  return this.http.post('http://localhost:3000/senttodel/',data).toPromise();
}
ordermview(data:any)
{
  return this.http.post('http://localhost:3000/ordermview/',data).toPromise();
}
customerorderview(data:any)
{
  return this.http.post('http://localhost:3000/customerorderview/',data).toPromise();
}
assiview(data:any)
{
  return this.http.post('http://localhost:3000/assiview/',data).toPromise();
}
removeass(data:any)
{
  return this.http.post('http://localhost:3000/removeass/',data).toPromise();
}
getshopdetailsbyid(data:any)
{
  return this.http.post('http://localhost:3000/getshopdetailsbyid/',data).toPromise();
}
getwdetails(data:any)
{
  return this.http.post('http://localhost:3000/getwdetails/',data).toPromise();
}
getwstatus(data:any)
{
  return this.http.post('http://localhost:3000/getwstatus/',data).toPromise();
}
getstatusview(data:any)
{
  return this.http.post('http://localhost:3000/getstatusview/',data).toPromise();
}
wctodayview(data: any)
{
  return this.http.post('http://localhost:3000/wctodayview/',data).toPromise();
}
wcdd(data: any): Promise<any> {
  return this.http
    .post<any>('http://localhost:3000/wcdd/', data)
    .toPromise();
}
admindashboard(data: any)
{
  return this.http.post('http://localhost:3000/admindashboard/',data).toPromise();
}
collectionrequest(data:any)
{
  return this.http.post('http://localhost:3000/collectionrequest/',data).toPromise();
}
collectionrequestview(data:any)
{
  return this.http.post('http://localhost:3000/collectionrequestview/',data).toPromise();
}
collectionrequestreply(data:any)
{
  return this.http.post('http://localhost:3000/collectionrequestreply/',data).toPromise();
}
collectionrequestbyowner(data:any)
{
  return this.http.post('http://localhost:3000/collectionrequestbyowner/',data).toPromise();
}
shopownercollectedtoday(data:any)
{
  return this.http.post('http://localhost:3000/shopownercollectedtoday/',data).toPromise();
}
shopownercollectionhistory(data:any)
{
  return this.http.post('http://localhost:3000/shopownercollectionhistory/',data).toPromise();
}


getadminprofile(data:any)
{
  return this.http.post('http://localhost:3000/getadminprofile/',data).toPromise();
}
updateadminprofile(data:any)
{
  return this.http.post('http://localhost:3000/updateadminprofile/',data).toPromise();
}
getcustomerprofile(data:any)
{
  return this.http.post('http://localhost:3000/getcustomerprofile/',data).toPromise();
}
updatecustomerprofile(data:any)
{
  return this.http.post('http://localhost:3000/updatecustomerprofile/',data).toPromise();
}
getshopownerprofile(data:any)
{
  return this.http.post('http://localhost:3000/getshopownerprofile/',data).toPromise();
}
updateshopownerprofile(data:any)
{
  return this.http.post('http://localhost:3000/updateshopownerprofile/',data).toPromise();
}
getcollectorprofile(data:any)
{
  return this.http.post('http://localhost:3000/getcollectorprofile/',data).toPromise();
}
updatecollectorprofile(data:any)
{
  return this.http.post('http://localhost:3000/updatecollectorprofile/',data).toPromise();
}
getownerdiscount(data:any)
{
  return this.http.post('http://localhost:3000/getownerdiscount/',data).toPromise();
}

upload(file: File): Observable<HttpEvent<any>> { 
const formData: FormData = new FormData(); 
formData.append('file', file); 
const req = new HttpRequest('POST', `http://localhost:3000/upload`, 
formData, { 
reportProgress: true, 
responseType: 'json' 
}); 
return this.http.request(req); 
} 

}
