import User from "../models/User.model.js";

//Get User Profile
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
        res.status(500).json({
            success: false,
            message: `Server Error: , ${error.message}`
        });
    }
}

//Update a User Profile
export const updateProfile = async (req, res) => {
    try {
        const { bio } = req.body
        const updateUser = await User.findOneAndUpdate(
            { userId: req.user.userId },
            { bio },
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({
                success: false,
                message: "User profile update failed",
                data: updateUser
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updateUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error: , ${error.message}`
        });
    }
}

//Upload a Profile photo/avatar
export const uploadAvatar = async (req, res) => {
    try {

        if (!req.file || !req.file.path) {
            return res.status(400).json({
                success: false,
                message: "No image file provided"
            });
        }
        const avatarUrl = req.file.path;

        const updateAvatar = await User.findOneAndUpdate(
            { userId: req.user.userId },
            { avatar: avatarUrl },
            { new: true }
        )

        if (!updateAvatar) {
            return res.status(404).json({
                success: false,
                message: "User photo/avatar update failed",
            });
        }


        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: updateAvatar
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error: , ${error.message}`
        });
    }
}