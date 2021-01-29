import React from 'react'
import { Link } from 'react-router-dom'

const HomeBanner = () => {
   return (
      <div id="carouselCarePointBanner" className="carousel slide carousel-fade" data-ride="carousel">
         <ol className="carousel-indicators">
            <li data-target="#carouselCarePointBanner" data-slide-to="0" className="active"></li>
            <li data-target="#carouselCarePointBanner" data-slide-to="1"></li>
            <li data-target="#carouselCarePointBanner" data-slide-to="2"></li>
         </ol>
         <div className="carousel-inner">
            <div className="carousel-item active slide1 d-flex">
               <div className="d-flex carousel-opac">
                  <div className="d-flex justify-content-center align-content-center my-auto text-white banner-opac">
                     <div className="p-4 my-auto">
                        <h1 className="text-uppercase mb-4"><span className="text-primary">franchise financial</span> institute</h1>
                        <p className="mb-4 text-white-50">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit nulla quaerat fuga quidem, voluptatum consequatur vel? Quibusdam tenetur sequi rem reprehenderit libero accusantium vero ipsa?</p>
                        <Link to="/products" className="btn btn-primary text-uppercase">about us</Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className="carousel-item slide2 d-flex">
               <div className="d-flex carousel-opac">
                  <div className="d-flex justify-content-center align-content-center my-auto text-white banner-opac">
                     <div className="p-4 my-auto">
                        <h1 className="text-uppercase mb-4"><span className="text-primary">share</span> in our <span className="text-primary">accolades</span></h1>
                        <p className="mb-4 text-white-50">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit nulla quaerat fuga quidem, voluptatum consequatur vel? Quibusdam tenetur sequi rem reprehenderit libero accusantium vero ipsa?</p>
                        <Link to="/products" className="btn btn-primary text-uppercase">achievements</Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className="carousel-item slide3 d-flex">
               <div className="d-flex carousel-opac">
                  <div className="d-flex justify-content-center align-content-center my-auto text-white banner-opac">
                     <div className="p-4 my-auto">
                        <h1 className="text-uppercase mb-4"><span className="text-primary">checkout</span> on our <span className="text-primary">latest offer</span></h1>
                        <p className="mb-4 text-white-50">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit nulla quaerat fuga quidem, voluptatum consequatur vel? Quibusdam tenetur sequi rem reprehenderit libero accusantium vero ipsa?</p>
                        <Link to="/products" className="btn btn-primary text-uppercase">promo</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Link className="carousel-control carousel-control-prev" to="#carouselCarePointBanner" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
         </Link>
         <Link className="carousel-control carousel-control-next" to="#carouselCarePointBanner" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
         </Link>
      </div>
   )
}

export default HomeBanner
