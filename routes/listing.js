const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner}=require("../views/middleware.js");


const listingController=require("../controllers/listings.js");



const validateListing=(err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }

}

router
.route("/",)
.get(wrapAsync(listingController.index))
.post(isLoggedIn,validateListing,wrapAsync(listingController.createListing));


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.deleteListing));
 

 

 
  
  
  router.get("/new",isLoggedIn,listingController.renderNewForm);
        
      
  

  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditform));


  
  module.exports=router;