import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { DealerRegistrationComponent } from './components/dealer-registration/dealer-registration.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DealerListComponent } from './components/dealer-list/dealer-list.component';
import {ControlStripComponent} from "./components/control-strip/control-strip.component";
import {CartComponent} from "./components/cart/cart.component";

export const routes: Routes = [
    {path: '' , redirectTo: 'home', pathMatch: 'full'},
    {path:'home' , component:HomeComponent},
    {path:'products' , component:ProductsComponent},
    {path: 'add-product/:pid', component: CreateProductComponent},
    {path: 'product-details/:pid' , component: ProductDetailsComponent},
    {path: 'search' , component: ProductSearchComponent},
    {path: 'aboutus' , component: AboutusComponent},
    {path: 'register' , component: DealerRegistrationComponent},
    {path: 'login' , component: LoginComponent},
    {path: 'logout' , component: LogoutComponent},    
    {path: 'dealers' , component: DealerListComponent},
    {path: 'control_strip', component: ControlStripComponent},
    { path: 'cart', component: CartComponent }
];
