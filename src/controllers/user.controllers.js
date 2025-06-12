import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user detail from the frontend
    // validation - not empty
    // check user already exists - username, email
    // check for images, check for avatar
    // upload them in the cloudinary, avatar
    // create user object - create entry in the db
    // remove password and refresh token from the response
    // check for user creation
    // return res
    const { username, email, fullName, password } = req.body;

    if (
        [username, fullName, email, password].some((field) => field?.trim() === "")
    ) {
        throw ApiError(404, "All fields are required");
    }

    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exist");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required!");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required!");
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Somethig went wrong while registering the user!")
    }

    res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully.")
    );


})

export { registerUser }