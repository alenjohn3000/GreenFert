import { Routes } from '@angular/router';
import { Guestmaster } from './guest/guestmaster/guestmaster';
import { Guesthome } from './guest/guesthome/guesthome';
import { Adminmaster } from './admin/adminmaster/adminmaster';
import { Adminhome } from './admin/adminhome/adminhome';
import { Login } from './guest/login/login';
import { Loginreg } from './guest/loginreg/loginreg';
import { Fpassword } from './guest/fpassword/fpassword';
import { Cregister } from './guest/cregister/cregister';
import { Sregister } from './guest/sregister/sregister';
import { District } from './admin/district/district';
import { Districtview } from './admin/districtview/districtview';
import { Location } from './admin/location/location';
import { Locationview } from './admin/locationview/locationview';
import { Pcategory } from './admin/pcategory/pcategory';
import { Pcategoryview } from './admin/pcategoryview/pcategoryview';
import { Districtedit } from './admin/districtedit/districtedit';
import { Pcategoryedit } from './admin/pcategoryedit/pcategoryedit';
import { Locationedit } from './admin/locationedit/locationedit';
import { Product } from './admin/product/product';
import { Productupdate } from './admin/productupdate/productupdate';
import { Wcassign } from './admin/wcassign/wcassign';
import { Wcregister } from './admin/wcregister/wcregister';
import { Wcview } from './admin/wcview/wcview';
import { Productview } from './admin/productview/productview';
import { Productedit } from './admin/productedit/productedit';
import { Sview } from './admin/sview/sview';
import { Customermaster } from './customer/customermaster/customermaster';
import { Customerhome } from './customer/customerhome/customerhome';
import { Wcmaster } from './wastecollector/wcmaster/wcmaster';
import { Wchome } from './wastecollector/wchome/wchome';
import { Smaster } from './shopowner/smaster/smaster';
import { Shome } from './shopowner/shome/shome';
import { Shrequest } from './shopowner/shrequest/shrequest';
import { Shreplies } from './shopowner/shreplies/shreplies';
import { Shhistory } from './shopowner/shhistory/shhistory';
import { About } from './customer/about/about';
import { Contact } from './customer/contact/contact';
import { Cart } from './customer/cart/cart';
import { Categoryp } from './customer/categoryp/categoryp';
import { Allproduct } from './customer/allproduct/allproduct';
import { Allcategory } from './customer/allcategory/allcategory';
import { Productsview } from './customer/productsview/productsview';
import { Payment } from './customer/payment/payment';
import { Paddress } from './customer/paddress/paddress';
import { Orders } from './customer/orders/orders';
import { Orderview } from './admin/orderview/orderview';
import { Ordermasterview } from './admin/ordermasterview/ordermasterview';
import { Sregadmin } from './admin/sregadmin/sregadmin';
import { Adddetails } from './wastecollector/adddetails/adddetails';
import { Wcdetails } from './admin/wcdetails/wcdetails';
import { Pickedup } from './wastecollector/pickedup/pickedup';
import { Todayview } from './admin/todayview/todayview';
import { Wcassignview } from './admin/wcassignview/wcassignview';
import { Collectionrequest } from './admin/collectionrequest/collectionrequest';
import { Collectionrequestreplied } from './admin/collectionrequestreplied/collectionrequestreplied';
import { Reportsales } from './admin/reportsales/reportsales';
import { Adminprofile } from './admin/adminprofile/adminprofile';
import { Adminprofileedit } from './admin/adminprofileedit/adminprofileedit';
import { Profile } from './customer/profile/profile';
import { Profileedit } from './customer/profileedit/profileedit';
import { Shprofile } from './shopowner/shprofile/shprofile';
import { Shprofileedit } from './shopowner/shprofileedit/shprofileedit';
import { Wcprofile } from './wastecollector/wcprofile/wcprofile';
import { Wcprofileedit } from './wastecollector/wcprofileedit/wcprofileedit';
import { Categoryview } from './shopowner/categoryview/categoryview';
import { Categoryproduct } from './shopowner/categoryproduct/categoryproduct';
import { Productsingleview } from './shopowner/productsingleview/productsingleview';
import { Scart } from './shopowner/scart/scart';
import { Spaddress } from './shopowner/spaddress/spaddress';
import { Spayment } from './shopowner/spayment/spayment';
import { Gabout } from './guest/gabout/gabout';
import { Gcontact } from './guest/gcontact/gcontact';
import { Pstatus } from './shopowner/pstatus/pstatus';
import { Sshop } from './shopowner/sshop/sshop';
import { Spview } from './shopowner/spview/spview';
import { Scontact } from './shopowner/scontact/scontact';
import { Sabout } from './shopowner/sabout/sabout';
import { Sorders } from './shopowner/sorders/sorders';

export const routes: Routes = [
    { path: '', redirectTo: 'guestmaster/guesthome', pathMatch: 'full' },
    {
        path: 'guestmaster', component: Guestmaster,
        children: [
            { path: 'guesthome', component: Guesthome },
            { path: 'cregister', component: Cregister },
            { path: 'sregister', component: Sregister },
            {path: 'gabout', component: Gabout },
            {path: 'gcontact', component: Gcontact },
        ]
    },
    {
        path: 'adminmaster', component: Adminmaster,
        children: [
            { path: 'adminhome', component: Adminhome },
            { path: 'district', component: District },
            { path: 'districtview', component: Districtview },
            { path: 'location', component: Location },
            { path: 'locationview', component: Locationview },
            { path: 'pcategory', component: Pcategory },
            { path: 'pcategoryview', component: Pcategoryview },
            { path: 'districtedit/:id', component: Districtedit },
            { path: 'pcategoryedit/:id', component: Pcategoryedit },
            { path: 'locationedit/:id', component: Locationedit },
            { path: 'product', component: Product },
            { path: 'productupdate/:id', component: Productupdate },
            { path: 'wcassign/:id', component: Wcassign },
            { path: 'wcregister', component: Wcregister },
            { path: 'wcview', component: Wcview },
            { path: 'productview', component: Productview },
            { path: 'productedit/:id', component: Productedit },
            { path: 'sview', component: Sview },
            { path: 'orderview', component: Orderview },
            { path: 'ordermasterview/:id', component: Ordermasterview },
            { path: 'sregadmin', component: Sregadmin },
            { path: 'wcdetails', component: Wcdetails },
            { path: 'todayview/:id/:date', component: Todayview },
            { path: 'wcassignview', component: Wcassignview },
            { path: 'collectionrequest', component: Collectionrequest },
            { path: 'collectionrequest-replied', component: Collectionrequestreplied },
            { path: 'reports-sales', component: Reportsales },
            { path: 'adminprofile', component: Adminprofile },
            { path: 'adminprofileedit', component: Adminprofileedit },

        ]
    },
    { path: 'login', component: Login },
    { path: 'loginreg', component: Loginreg },
    { path: 'fpassword', component: Fpassword },
    {
        path: 'customermaster', component: Customermaster,
        children: [
            { path: 'customerhome', component: Customerhome },
            { path: 'about', component: About },
            { path: 'contact', component: Contact },
            { path: 'cart', component: Cart },
            { path: 'categoryp/:id', component: Categoryp },
            { path: 'allproduct', component: Allproduct },
            { path: 'allcategory', component: Allcategory },
            { path: 'productsview/:id', component: Productsview },
            { path: 'payment/:addressid', component: Payment },
            { path: 'paddress', component: Paddress },
            { path: 'orders', component: Orders },
            { path: 'profile', component: Profile },
            { path: 'profileedit', component: Profileedit }
        ]
    },

    {
        path: 'wcmaster', component: Wcmaster,
        children: [
            { path: 'wchome', component: Wchome },
            { path: 'adddetails/:id', component: Adddetails },
            { path: 'pickedup', component: Pickedup },
            { path: 'profile', component: Wcprofile },
            { path: 'profileedit', component: Wcprofileedit },

        ]
    },
    {
        path: 'smaster', component: Smaster,
        children: [
            { path: 'shome', component: Shome },
            { path: 'shrequest', component: Shrequest },
            { path: 'shreplies', component: Shreplies },
            { path: 'shhistory', component: Shhistory },
            { path: 'profile', component: Shprofile },
            { path: 'profileedit', component: Shprofileedit },
            { path: 'categoryview', component: Categoryview },
            { path: 'categoryproduct/:id', component: Categoryproduct },
            { path: 'productsingleview/:id', component: Productsingleview },
            { path: 'scart', component: Scart },
            { path: 'spaddress', component: Spaddress },
            { path: 'spayment/:addressid', component: Spayment },
            {path:'pstatus',component:Pstatus},
            {path:'sshop',component:Sshop},
            {path:'spview',component:Spview},
            {path:'scontact',component:Scontact},
            {path:'sabout',component:Sabout},
            {path:'sorders',component:Sorders},
        ]
    },

];

