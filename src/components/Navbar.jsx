import React from "react";
import { useDispatch } from "react-redux";
import { useGetLogOutMutation } from "../redux/Api/contactApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { removeUser } from "../redux/services/authSlice";

const Navbar = () => {

  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");

  const dispatch = useDispatch();

  const [getLogOut] = useGetLogOutMutation();

  const nav = useNavigate();

  const logOutHandler = async () => {
    const { data } = await getLogOut(token);
    dispatch(removeUser());
    if (data?.success) {
      nav("/login");
    }
    // console.log(data);
  };

  return (
    <div className=" flex justify-around p-5 shadow-lg items-center">
      <h1 className=" font-semibold text-orange-500">Team K</h1>
      <div className="flex gap-5 items-center">
        <div className="flex flex-col">
          <h1 className="text-blue-700">{user?.name}</h1>
          <h1 className="text-yellow-500">{user?.email}</h1>
        </div>
        <button
          onClick={logOutHandler}
          className=" bg-red-500 text-white py-2 px-3 rounded-xl shadow-lg"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Navbar;
