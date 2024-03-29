import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {


      // get user details from frontend ✅
      const { fullname, email, password, username } = req.body
      console.log("email: ", email)

      if (
            [fullname, email, password, username].some((field) =>
                  field?.trim() === "")
      ) {
            throw new ApiError(400, "All fields are required")
      }

      // validation - not empty ✅
      const existedUser = User.findOne({
            $or: [{ username }, { email }]
      })

      // check if user already exists: username, email ✅
      if (existedUser) {
            throw new ApiError(409, "this username or email has already exist");
      }

      // check for images, check for avatar✅
      const avaterLocalPath = req.files?.avatar[0]?.path;
      const coverImageLocalPath = req.files?.coverImage[0]?.path;

      if (!avaterLocalPath) {
            throw new ApiError(400, "Avatar file is required");
      }

      // upload them to cloudinary, avatar✅
      const avatar = await uploadOnCloudinary(avaterLocalPath);
      const coverImage = await uploadOnCloudinary(coverImageLocalPath);

      if (!avatar) {
            throw new ApiError(400, "Avatar file is required");
      }

      // create user object - create entry in db ✅
      const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
      })

      // remove password and refresh token field from response✅
      const createdUser = await User.findById(user._id).select("-password -refreshToken")

      // check for user creation✅
      if (!createdUser) {
            throw new ApiError(500, "Something went wrong while regestring the user")
      }

      // return res✅
      return res.status(201).json(
            new ApiResponse(200, createdUser, "user registered successfully")
      )
})

export { registerUser };