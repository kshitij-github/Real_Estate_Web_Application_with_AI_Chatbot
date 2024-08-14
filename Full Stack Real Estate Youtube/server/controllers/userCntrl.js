// import asyncHandler from "express-async-handler";

// import { prisma } from "../config/prismaConfig.js";

// export const createUser = asyncHandler(async (req, res) => {
//   console.log("creating a user");

//   let { email } = req.body;
//   const userExists = await prisma.user.findUnique({ where: { email: email } });
//   if (!userExists) {
//     const user = await prisma.user.create({ data: req.body });
//     res.send({
//       message: "User registered successfully",
//       user: user,
//     });
//   } else res.status(201).send({ message: "User already registered" });

//   // console.log(email);
// });

// // export const bookedVisit = asyncHandler(async (req, res) => {
// //   const { email, date } = req.body;
// //   const { id } = req.params;

// //   try {
// //     const alreadyBooked = await prisma.user.findUnique({
// //       where: { email },
// //       select: { bookedVisits: true },
// //     })

// //     if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
// //       res.status(400).json({ message: "This residency is already booked by you" })
// //     }
// //     else {
// //       await prisma.user.update({
// //         where: { email: email },
// //         data: {
// //           bookedVisits: { push: { id, data } }
// //         }
// //       })

// //       res.send("Your visit is booked successfully");
// //     }
// //   } catch (err) {
// //     throw new Error(err.message);
// //   }
// // });

// // function to book a visit to resd
// export const bookVisit = asyncHandler(async (req, res) => {
//   const { email, date } = req.body;
//   const { id } = req.params;

//   try {
//     const alreadyBooked = await prisma.user.findUnique({
//       where: { email },
//       select: { bookedVisits: true },
//     });

//     if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
//       res
//         .status(400)
//         .json({ message: "This residency is already booked by you" });
//     } else {
//       await prisma.user.update({
//         where: { email: email },
//         data: {
//           bookedVisits: { push: { id, date } },
//         },
//       });
//       res.send("your visit is booked successfully");
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

// // function to cancel the booking
// export const cancelBooking = asyncHandler(async (req, res)=>{

//   const {email} = req.body;
//   const {id} = req.params
//   try{
//     const user = await prisma.user.findUnique({
//       where: {email: email},
//       select: {bookedVisits: true}
//     })

//     const index = user.bookedVisits.findIndex((visit)=> visit.id === id)

//     if(index === -1){
//       res.status(404).json({message: "Booking not found"})
//     }else{
//       user.bookedVisits.splice(index, 1)
//       await prisma.user.update({
//         where: {email},
//         data: {
//           bookedVisits: user.bookedVisits
//         }
//       })
//       res.send("Booking cancelled successfully")
//     }

//   }catch(err){
//     throw new Error(err.message);
//   }
// })

// // function to get all bookings of a user
// export const getAllBookings = asyncHandler(async (req, res)=>{
//   const {email} = req.body

//   try{
//     const bookings =await prisma.user.findUnique({
//       where: {email},
//       select: {bookedVisits: true}
//     })
//     res.status(200).send(bookings)
//   }catch(err){
//     throw new Error(err.message);
//   }
// })

// // function to add a resd in favourite list of a user
// export const toFav = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const { rid } = req.params;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     })

//     if (user.favResidenciesID.includes(rid)) {
//       const updateUser = await prisma.user.update({
//         where: { email },
//         data: {
//           favResidenciesID: {
//             set: user.favResidenciesID.filter((id) => id !== rid),
//           }
//         }
//       });

//       res.send({ message: "Removed from favorites", user: updateUser });
//     } else {
//       const updateUser = await prisma.user.update({
//         where: { email },
//         data: {
//           favResidenciesID: {
//             push: rid
//           }
//         }
//       });
//       res.send({ message: "Updated favorites", user: updateUser });
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// })

// // function to get all favorites
// export const getAllFavorites = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   try {
//     const favResd = await prisma.user.findUnique({
//       where: { email },
//       select: { favResidenciesID: true },
//     });
//     res.status(200).send(favResd);
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

// userCntrl.js
// import asyncHandler from "express-async-handler";
// import { prisma } from "../config/prismaConfig.js";

// export const createUser = asyncHandler(async (req, res) => {
//   console.log("Creating a user");
//   const { email } = req.body;
  
//   try {
//     const userExists = await prisma.user.findUnique({
//       where: { email: email },
//     });

//     if (!userExists) {
//       const user = await prisma.user.create({
//         data: { email },
//       });
//       res.send({
//         message: "User registered successfully",
//         user: user,
//       });
//     } else {
//       res.status(201).send({ message: "User already registered" });
//     }
//   } catch (error) {
//     console.error("Error in createUser:", error);
//     res.status(500).send({ message: "Something went wrong" });
//     throw error;
//   }
// });


// import asyncHandler from "express-async-handler";
// import { prisma } from "../config/prismaConfig.js";

// export const createUser = asyncHandler(async (req, res) => {
//   console.log("Creating a user");
//   const { email } = req.body;
  
//   try {
//     console.log("Attempting to find user with email:", email);
//     let user = await prisma.user.findUnique({
//       where: { email: email },
//     });

//     if (!user) {
//       console.log("User not found, creating new user");
//       user = await prisma.user.create({
//         data: { email },
//       });
//       console.log("New user created:", user);
//       res.status(201).json({
//         message: "User registered successfully",
//         user: user,
//       });
//     } else {
//       console.log("User already exists:", user);
//       res.status(200).json({ message: "User already registered", user: user });
//     }
//   } catch (error) {
//     console.error("Error in createUser:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// });

// export const recordLogin = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await prisma.user.update({
//       where: { email: email },
//       data: {
//         lastLogin: new Date(),
//         loginHistory: {
//           create: {
//             timestamp: new Date(),
//           },
//         },
//       },
//       include: {
//         loginHistory: true,
//       },
//     });

//     res.status(200).json({ message: "Login recorded successfully", user: user });
//   } catch (error) {
//     console.error("Error in recordLogin:", error);
//     res.status(500).json({ message: "Failed to record login" });
//   }
// });




// // function to book a visit to resd
// export const bookVisit = asyncHandler(async (req, res) => {
//   const { email, date } = req.body;
//   const { id } = req.params;

//   try {
//     const alreadyBooked = await prisma.user.findUnique({
//       where: { email },
//       select: { bookedVisits: true },
//     });

//     if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
//       res
//         .status(400)
//         .json({ message: "This residency is already booked by you" });
//     } else {
//       await prisma.user.update({
//         where: { email: email },
//         data: {
//           bookedVisits: { push: { id, date } },
//         },
//       });
//       res.send("your visit is booked successfully");
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

// // funtion to get all bookings of a user
// export const getAllBookings = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   try {
//     const bookings = await prisma.user.findUnique({
//       where: { email },
//       select: { bookedVisits: true },
//     });
//     res.status(200).send(bookings);
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

// // function to cancel the booking
// export const cancelBooking = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const { id } = req.params;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email: email },
//       select: { bookedVisits: true },
//     });

//     const index = user.bookedVisits.findIndex((visit) => visit.id === id);

//     if (index === -1) {
//       res.status(404).json({ message: "Booking not found" });
//     } else {
//       user.bookedVisits.splice(index, 1);
//       await prisma.user.update({
//         where: { email },
//         data: {
//           bookedVisits: user.bookedVisits,
//         },
//       });

//       res.send("Booking cancelled successfully");
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

// // function to add a resd in favourite list of a user
// export const toFav = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const { rid } = req.params;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (user.favResidenciesID.includes(rid)) {
//       const updateUser = await prisma.user.update({
//         where: { email },
//         data: {
//           favResidenciesID: {
//             set: user.favResidenciesID.filter((id) => id !== rid),
//           },
//         },
//       });

//       res.send({ message: "Removed from favorites", user: updateUser });
//     } else {
//       const updateUser = await prisma.user.update({
//         where: { email },
//         data: {
//           favResidenciesID: {
//             push: rid,
//           },
//         },
//       });
//       res.send({ message: "Updated favorites", user: updateUser });
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

// // function to get all favorites
// export const getAllFavorites = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   try {
//     const favResd = await prisma.user.findUnique({
//       where: { email },
//       select: { favResidenciesID: true },
//     });
//     res.status(200).send(favResd);
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

// import asyncHandler from "express-async-handler";
// import { prisma } from "../config/prismaConfig.js";

// export const createUser = asyncHandler(async (req, res) => {
//   console.log("Creating a user");
//   const { email } = req.body;
  
//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     console.log("Attempting to find user with email:", email);
//     let user = await prisma.user.findUnique({
//       where: { email: email },
//     });

//     if (!user) {
//       console.log("User not found, creating new user");
//       user = await prisma.user.create({
//         data: { email },
//       });
//       console.log("New user created:", user);
//       return res.status(201).json({
//         message: "User registered successfully",
//         user: user,
//       });
//     } else {
//       console.log("User already exists:", user);
//       return res.status(200).json({ message: "User already registered", user: user });
//     }
//   } catch (error) {
//     console.error("Error in createUser:", error);
//     return res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// });

// export const recordLogin = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     const user = await prisma.user.update({
//       where: { email: email },
//       data: {
//         lastLogin: new Date(),
//         loginHistory: {
//           create: {
//             timestamp: new Date(),
//           },
//         },
//       },
//       include: {
//         loginHistory: true,
//       },
//     });

//     return res.status(200).json({ message: "Login recorded successfully", user: user });
//   } catch (error) {
//     console.error("Error in recordLogin:", error);
//     return res.status(500).json({ message: "Failed to record login", error: error.message });
//   }
// });

// export const recordLogin = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     const user = await prisma.user.update({
//       where: { email: email },
//       data: {
//         lastLogin: new Date(),
//         loginHistory: {
//           create: {
//             timestamp: new Date(),
//           },
//         },
//       },
//       include: {
//         loginHistory: true,
//       },
//     });

//     return res.status(200).json({ message: "Login recorded successfully", user: user });
//   } catch (error) {
//     console.error("Error in recordLogin:", error);
//     return res.status(500).json({ message: "Failed to record login", error: error.message });
//   }
// });

// // function to book a visit to resd
// export const bookVisit = asyncHandler(async (req, res) => {
//   const { email, date } = req.body;
//   const { id } = req.params;

//   if (!email || !date || !id) {
//     return res.status(400).json({ message: "Email, date, and id are required" });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//       select: { bookedVisits: true },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.bookedVisits.some((visit) => visit.id === id)) {
//       return res.status(400).json({ message: "This residency is already booked by you" });
//     }

//     await prisma.user.update({
//       where: { email: email },
//       data: {
//         bookedVisits: { push: { id, date } },
//       },
//     });

//     return res.status(200).json({ message: "Your visit is booked successfully" });
//   } catch (error) {
//     console.error("Error in bookVisit:", error);
//     return res.status(500).json({ message: "Failed to book visit", error: error.message });
//   }
// });

// // function to get all bookings of a user
// export const getAllBookings = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     const bookings = await prisma.user.findUnique({
//       where: { email },
//       select: { bookedVisits: true },
//     });

//     if (!bookings) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json(bookings);
//   } catch (error) {
//     console.error("Error in getAllBookings:", error);
//     return res.status(500).json({ message: "Failed to get bookings", error: error.message });
//   }
// });

// // function to cancel the booking
// export const cancelBooking = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const { id } = req.params;

//   if (!email || !id) {
//     return res.status(400).json({ message: "Email and id are required" });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email: email },
//       select: { bookedVisits: true },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const index = user.bookedVisits.findIndex((visit) => visit.id === id);

//     if (index === -1) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     user.bookedVisits.splice(index, 1);
//     await prisma.user.update({
//       where: { email },
//       data: {
//         bookedVisits: user.bookedVisits,
//       },
//     });

//     return res.status(200).json({ message: "Booking cancelled successfully" });
//   } catch (error) {
//     console.error("Error in cancelBooking:", error);
//     return res.status(500).json({ message: "Failed to cancel booking", error: error.message });
//   }
// });

// // function to add a resd in favourite list of a user
// export const toFav = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const { rid } = req.params;

//   if (!email || !rid) {
//     return res.status(400).json({ message: "Email and residency id are required" });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     let updateUser;
//     if (user.favResidenciesID.includes(rid)) {
//       updateUser = await prisma.user.update({
//         where: { email },
//         data: {
//           favResidenciesID: {
//             set: user.favResidenciesID.filter((id) => id !== rid),
//           },
//         },
//       });
//       return res.status(200).json({ message: "Removed from favorites", user: updateUser });
//     } else {
//       updateUser = await prisma.user.update({
//         where: { email },
//         data: {
//           favResidenciesID: {
//             push: rid,
//           },
//         },
//       });
//       return res.status(200).json({ message: "Updated favorites", user: updateUser });
//     }
//   } catch (error) {
//     console.error("Error in toFav:", error);
//     return res.status(500).json({ message: "Failed to update favorites", error: error.message });
//   }
// });

// // function to get all favorites
// export const getAllFavorites = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     const favResd = await prisma.user.findUnique({
//       where: { email },
//       select: { favResidenciesID: true },
//     });

//     if (!favResd) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json(favResd);
//   } catch (error) {
//     console.error("Error in getAllFavorites:", error);
//     return res.status(500).json({ message: "Failed to get favorites", error: error.message });
//   }
// });

import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");

  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already registered" });
});

export const recordLogin = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const loginTime = new Date();

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    await prisma.user.update({
      where: { email },
      data: { lastLogin: loginTime },
    });
    res.send({ message: "Login recorded successfully" });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

// function to book a visit to resd

// funtion to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send("Booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to add a resd in favourite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });

      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});

