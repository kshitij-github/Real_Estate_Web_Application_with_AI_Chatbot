import express from "express";
import { createUser, getAllBookings, cancelBooking, toFav, getAllFavorites, recordLogin } from "../controllers/userCntrl.js";

const router = express.Router();


router.post("/register",   createUser);
// router.post("/bookVisit/:id",   bookVisit);
router.post("/allBookings",   getAllBookings);
router.post("/removeBooking/:id",   cancelBooking);
router.post("/toFav/:rid",   toFav);
router.post("/allFav/",   getAllFavorites);
router.post("/login", recordLogin);

export default router;

export { router as userRoute };