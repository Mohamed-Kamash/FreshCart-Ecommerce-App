import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    // main layout
  {path:"",canActivate:[authGuard],loadComponent:()=>import("./layouts/main-layout/main-layout.component").then((m)=>m.MainLayoutComponent),
  children:[
    {path:"",redirectTo:"home",pathMatch:'full'},
    {path:"home",loadComponent:()=>import("./components/home/home.component").then((m)=>m.HomeComponent),title:"Home"},
    {path:"cart",loadComponent:()=>import("./components/cart/cart.component").then((m)=>m.CartComponent),title:"Cart"},
    {path:"products",loadComponent:()=>import("./components/products/products.component").then((m)=>m.ProductsComponent),title:"Products"},
    {path:"categories",loadComponent:()=>import("./components/categories/categories.component").then((m)=>m.CategoriesComponent),title:"Categories"},
    {path:"brands",loadComponent:()=>import("./components/brands/brands.component").then((m)=>m.BrandsComponent),title:"Brands"},
    {path:"details/:idParameter",loadComponent:()=>import("./components/product-details/product-details.component").then((m)=>m.ProductDetailsComponent),title:"Product Details"},
    {path:"wishList",loadComponent:()=>import("./components/wish-list/wish-list.component").then((m)=>m.WishListComponent),title:"My Wish List"},
    {path:"checkOut/:cartID",loadComponent:()=>import("./components/check-out/check-out.component").then((m)=>m.CheckOutComponent),title:"Check Out"},
    {path:"allorders",loadComponent:()=>import("./components/allorders/allorders.component").then((m)=>m.AllordersComponent),title:"All Orders"},
  ]
},
// auth layout
{path:"",loadComponent:()=>import("./layouts/auth-layout/auth-layout.component").then((m)=>m.AuthLayoutComponent),
children:[
  {path:"login",loadComponent:()=>import("./components/login/login.component").then((m)=>m.LoginComponent)},
  {path:"register",loadComponent:()=>import("./components/register/register.component").then((m)=>m.RegisterComponent)},
  {path:"resetPassword",loadComponent:()=>import("./components/forgot-password/forgot-password.component").then((m)=>m.ForgotPasswordComponent)},
]},
//not found
{path:"**",loadComponent:()=>import("./components/not-found/not-found.component").then((m)=>m.NotFoundComponent),title:"Not Found 404"}
];
