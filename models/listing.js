const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:{
        type:"String",
        default:"https://media.istockphoto.com/id/1298306226/photo/young-woman-riding-bicycle-on-wooden-pier-in-the-maldives.jpg?s=2048x2048&w=is&k=20&c=prVoFozADVOSe_I5KdDcYs-2tNDJMVG1l35SeEtpEGo=",

        set:(v)=>v===""? "https://media.istockphoto.com/id/1298306226/photo/young-woman-riding-bicycle-on-wooden-pier-in-the-maldives.jpg?s=2048x2048&w=is&k=20&c=prVoFozADVOSe_I5KdDcYs-2tNDJMVG1l35SeEtpEGo=": v
    },
    filename:String,
    

},

    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",

    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;