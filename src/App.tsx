import React, { Fragment, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loading } from "./components/pages/Loading";
import { AdminLogin } from "./components/forms/admin/login";
import { useSelector } from "react-redux";
import { RootState } from "./reduxKit/store";
import DefaultLayout from "./layout/DefaultLayout";
import Cookies from "js-cookie";
// import ECommerce from "./components/pages/Dashboard/Ecommerce";
import SubServiceForm from "./components/pages/Form/SubServiceForm";
import BrandData from "./components/pages/Form/AddBrand"; 
import SubService from "./components/Table/SubService";
import SellerList from "./components/pages/seller/sellerList";
import BrandList from "./components/Table/BrandList";
import ServiceListSection from "./components/Table/ServiceListSection";
import AddService from "./components/pages/Form/AddService";
import SellerListSection from "./components/pages/seller/sellerList";
import SellerProfile from "./components/Table/SellerProfile";
import AddProduct from "./components/pages/product/AddProduct";
import UserList from "./components/pages/user-management/userDetails";
import GetUserById from "./components/pages/user-management/getUserById";
import AddRegion from "./components/pages/Form/AddRegion";
import RegionListSection from "./components/Table/RegionListSection";
import GetOffer from "./components/pages/offer-management/getOffer";
import ProductListSection from "./components/pages/product/productList";
import ProductItem from "./components/pages/product/productListItem";
import LevelForm from "./components/pages/level/createLevel";
import LevelListSection from "./components/pages/level/getLevels";

export const App: React.FC = React.memo(() => {
  const { isLoggedGGAdmin } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const isLoginRoute = location.pathname === "/admin/login";
  
  const accessToken = Cookies.get("accessToken");

  // console.log("Check if the user is logged in: ", isLoggedGGAdmin);
  console.log("Admin token is: ", accessToken);

  // Redirect to login page if token is missing and not already on the login page
  if (!accessToken && !isLoginRoute) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Fragment>
      <Toaster position="top-center" />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/admin/login"  element={<AdminLogin />} />
        </Routes>
        {!isLoginRoute && isLoggedGGAdmin && (
          <DefaultLayout>
            <Routes>
              {/* <Route path="/" element={<ECommerce />} /> */}
              <Route path="/seller/sellerList" element={<SellerList />} />
              <Route path="/brand" element={<BrandData />} />
              <Route path="/addservice" element={<AddService />} />
              <Route path="/brandAdd" element={<BrandData />} />
              <Route path="/sellerlist" element={<SellerListSection />} />
              <Route path="/sellerprofile" element={<SellerProfile />} />
              <Route path="/subserviceform" element={<SubServiceForm />} />
              <Route path="/brandlist" element={<BrandList />} />
              <Route path="/levelform" element={<LevelForm />} />
              <Route path="/getlevels" element={<LevelListSection />} />
              <Route path="/servicelistsection" element={<ServiceListSection />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path="/getuser/:userId" element={<GetUserById />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/productList" element={<ProductListSection/>} />
              <Route path="/productList/:id" element={<ProductItem/>} />
              <Route path="/subservice" element={<SubService />} />
              <Route path="/addregion" element={<AddRegion />} />
              <Route path="/regionlist" element={<RegionListSection />} />
              <Route path="/getoffer" element={<GetOffer />} />
            </Routes>
          </DefaultLayout>
        )}
      </Suspense>
    </Fragment>
  );
});
