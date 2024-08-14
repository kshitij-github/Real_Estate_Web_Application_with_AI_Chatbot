// import asyncHandler from "express-async-handler";

// import { prisma } from "../config/prismaConfig.js";

// export const createResidency = asyncHandler(async (req, res) => {
//   const {
//     title,
//     description,
//     price,
//     address,
//     country,
//     city,
//     facilities,
//     image,
//     userEmail,
//   } = req.body.data;

//   console.log(req.body.data);
//   try {
//     const residency = await prisma.residency.create({
//       data: {
//         title,
//         description,
//         price,
//         address,
//         country,
//         city,
//         facilities,
//         image,
//         owner: { connect: { email: userEmail } },
//       },
//     });

//     res.send({ message: "Residency created successfully", residency });
//   } catch (err) {
//     if (err.code === "P2002") {
//       throw new Error("A residency with address already there");
//     }
//     throw new Error(err.message);
//   }
// });

import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);

  try {
    // Check if the user exists before trying to connect
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    console.error("Error creating residency:", err);

    if (err.code === "P2002") {
      res
        .status(400)
        .send({ error: "A residency with this address already exists" });
    } else {
      res.status(500).send({ error: err.message });
    }
  }
});

// function to get all the documents/ residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a specific documents/ residencies
export const getResidency = asyncHandler(async (req, res)=>{
    const {id} = req.params;

    try{
        const residency = await prisma.residency.findUnique({
            where:{id}
        })
        res.send(residency)
    }catch(err){
        throw new Error(err.message);
    }
})

