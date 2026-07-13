// import User from "../models/User.model.js";

// //Get User Profile
// export const getUserProfile = async (req, res) => {

//     try {
//         const { username } = req.params;
//         const user = await User.findOne({ username });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User profile not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Profile retrieved successfully",
//             data: user
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: `Server Error: , ${error.message}`
//         });
//     }
// }

// //Update a User Profile
// export const updateProfile = async (req, res) => {
//     try {
//         const body = req.body || {};

//         const { bio } = body;

//         // use bio safely
//         console.log(bio);
//         res.status(200).json({
//             success: true,
//             message: "Profile updated",
//             data: updatedUser
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// //Upload a Profile photo/avatar
// // export const uploadAvatar = async (req, res) => {
// //     try {

// //         if (!req.file || !req.file.path) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "No image file provided"
// //             });
// //         }
// //         const avatarUrl = req.file.path;

// //         const updateAvatar = await User.findOneAndUpdate(
// //             { userId: req.user.userId },
// //             { avatar: avatarUrl },
// //             { new: true }
// //         )

// //         if (!updateAvatar) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "User photo/avatar update failed",
// //             });
// //         }


// //         return res.status(200).json({
// //             success: true,
// //             message: "Profile picture updated successfully",
// //             data: updateAvatar
// //         });

// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: `Server Error: , ${error.message}`
// //         });
// //     }
// // };

// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         if (users.length === 0) {
//             return res.status(404).json({ message: "No users found" });
//         }
//         res.status(200).json({
//             message: "Users found",
//             totalUsers: users.length,
//             data: users
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: `Server Error: , ${error.message}`
//         });
//     }
// }

// export const uploadAvatar = async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Unauthorized'
//             });
//         }

//         const file = req.file || req.files?.avatar?.[0] || req.files?.image?.[0];
//         if (!file) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'No image file provided'
//             });
//         }

//         const avatarUrl = file.path || file.secure_url || file.filename;
//         if (!avatarUrl) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid uploaded file'
//             });
//         }

//         const userId = req.user._id || req.user.id || req.user.userId;
//         if (!userId) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'User identity not found'
//             });
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { avatar: avatarUrl },
//             { new: true, runValidators: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Profile picture updated successfully',
//             data: updatedUser
//         });
//     } catch (error) {
//         console.error('uploadAvatar error:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Server Error',
//             error: error.message
//         });
//     }
// };

import User from "../models/User.model.js";

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Server Error: ${error.message}`
        });
    }
};

// Update a User Profile
export const updateProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const userId = req.user._id || req.user.id || req.user.userId;
        const body = req.body || {};

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...(body.bio !== undefined && { bio: body.bio }),
                ...(body.username !== undefined && { username: body.username })
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated",
            data: updatedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Users found",
            totalUsers: users.length,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Server Error: ${error.message}`
        });
    }
};

// Upload a Profile Photo / Avatar
export const uploadAvatar = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const file = req.file || req.files?.avatar?.[0] || req.files?.image?.[0];

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided"
            });
        }

        const avatarUrl = file.path || file.secure_url || file.filename;

        if (!avatarUrl) {
            return res.status(400).json({
                success: false,
                message: "Invalid uploaded file"
            });
        }

        const userId = req.user._id || req.user.id || req.user.userId;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar: avatarUrl },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error("uploadAvatar error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};