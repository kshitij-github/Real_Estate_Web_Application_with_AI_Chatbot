// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import { userRoute } from './routes/userRoute.js';
// import { residencyRoute } from './routes/residencyRoute.js';
// dotenv.config()

// const app = express();



// const PORT = process.env.PORT || 3000;

// app.use(express.json())
// app.use(cookieParser())
// app.use(cors())

// app.listen(PORT, ()=> {
//     console.log(`Server is running on port ${PORT}`);
// });

// app.use('/api/user', userRoute)
// app.use('/api/residency',residencyRoute)





// app.use(express.json())
// app.use(cookieParser())
// app.use(cors())





// //import express from 'express';
// import { PrismaClient } from '@prisma/client';

// //const app = express();
// const prisma = new PrismaClient();

// // Middleware to parse JSON
// app.use(express.json());

// // Define routes

// Get all users
// app.get('/users', async (req, res) => {
//     try {
//         const users = await prisma.user.findMany();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while fetching users' });
//     }
// });

// // Create a new user
// app.post('/users', async (req, res) => {
//     const { name, email, image, bookedVisits, favResidenciesID } = req.body;
//     try {
    //         const user = await prisma.user.create({
//             data: {
//                 name,
//                 email,
//                 image,
//                 bookedVisits,
//                 favResidenciesID
//             }
//         });
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while creating a user' });
//     }
// });

// // Get all residencies
// app.get('/residencies', async (req, res) => {
//     try {
//         const residencies = await prisma.residency.findMany();
//         res.json(residencies);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while fetching residencies' });
//     }
// });

// // Create a new residency
// app.post('/residencies', async (req, res) => {
//     const { title, description, price, address, city, country, image, facilities, userEmail } = req.body;
//     try {
//         const residency = await prisma.residency.create({
//             data: {
//                 title,
//                 description,
//                 price,
//                 address,
//                 city,
//                 country,
//                 image,
//                 facilities,
//                 userEmail
//             }
//         });
//         res.status(201).json(residency);
//     } catch (error) {
    //         res.status(500).json({ error: 'An error occurred while creating a residency' });
    //     }
    // });
    
    // Start the server
    // const PORT = process.env.PORT || 8000;
    // app.listen(5000, () => {
        //     console.log(`Server is running on port ${PORT}`);
        // });
        
        
        import express from 'express';
        import dotenv from 'dotenv';
        import cookieParser from 'cookie-parser';
        import cors from 'cors';
        import { userRoute } from './routes/userRoute.js';
        import { residencyRoute } from './routes/residencyRoute.js';
        import { errorHandler } from './middleware/errorMiddleware.js';
        
        dotenv.config()
        
        const app = express();
        const PORT = process.env.PORT || 8000;
        
        app.use(express.json())
        app.use(cookieParser())
        app.use(cors())
        
        app.use('/api/user', userRoute)
        app.use('/api/residency', residencyRoute)
        
        // Error handling middleware
        app.use(errorHandler);
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });


app.post('/api/user/bookVisit/:propertyId',userRoute)

app.use('/api/user',userRoute)
