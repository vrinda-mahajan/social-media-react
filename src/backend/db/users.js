import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Full Stack web developer",
    portfolio:"https://google.com",
    profilePic:"https://user-images.githubusercontent.com/72399705/171922243-52f7fd8f-f532-462c-bac6-805b250e76ee.png",
  },
  {
    _id: uuid(),
    firstName: "Rose",
    lastName: "Bush",
    username: "roseBush",
    password: "roseBush123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "UI/UX Designer",
    portfolio:"https://google.com",
    profilePic:"https://user-images.githubusercontent.com/72399705/171921587-7ba45164-322a-4fc8-bf68-351a2c04f93a.png",
  },{
    _id: uuid(),
    firstName: "Ginger",
    lastName: "Plant",
    username: "gingerPlant",
    password: "gingerPlant123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Frontend Engineer at Google",
    portfolio:"https://google.com",
    profilePic:"https://user-images.githubusercontent.com/72399705/171921792-75aaec3f-3d95-4fb1-8d15-814250af03ad.png",
  },{
    _id: uuid(),
    firstName: "Ray",
    lastName: "Sin",
    username: "raySin",
    password: "raySin123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Frontend Developer",
    portfolio:"https://google.com",
    profilePic:"https://user-images.githubusercontent.com/72399705/171922013-0a78a11e-123b-42ee-a195-dacb69dd1b92.png",
  },
];
