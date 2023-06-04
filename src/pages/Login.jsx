import React from "react";
import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { useGetLoginMutation } from "../redux/Api/contactApi";
import { Link, useNavigate } from "react-router-dom";
import { useForm, zodResolver } from "@mantine/form";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { LoginSchema } from "../schemas/loginSchema";

const Login = () => {
	const [getLogin, { isLoading }] = useGetLoginMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { onSubmit, getInputProps } = useForm({
		validate: zodResolver(LoginSchema),
		initialValues: {
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (values) => {
		try {
			const { data } = await getLogin(values);

			dispatch(addUser({ user: data?.user, token: data?.token }));
			if (data?.success === true) {
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (isLoading) {
		<div className="">
			<h1 className=" flex justify-center items-center h-screen">
				Loading
			</h1>
		</div>;
	}

	return (
		<div className=" flex justify-center items-center h-screen bg-amber-200">
			<form
				onSubmit={onSubmit(handleSubmit)}
				className=" w-96 border p-5 bg-orange-400 flex flex-col gap-5 shadow-lg"
			>
				<h1 className=" text-center mb-3 text-blue-600 text-xl font-semibold ">
					Login
				</h1>
				<div className="flex flex-col gap-5">
					<TextInput
						mt="sm"
						label="Email"
						placeholder="Email"
						{...getInputProps("email")}
					/>
					<PasswordInput
						label="Password"
						placeholder="Password"
						{...getInputProps("password")}
					/>
					<div className=" flex justify-around">
						<h1 className="">Don't have an account?</h1>
						<Link to={"/register"}>
							<h1 className=" font-semibold cursor-pointer">
								Register
							</h1>
						</Link>
					</div>
					<button
						disabled={isLoading && true}
						type="submit"
						className=" bg-green-400 text-black py-2"
					>
						{isLoading ? (
							<Loader
								className=" w-10 mx-auto items-center "
								color="grape"
								variant="dots"
							/>
						) : (
							"LogIn"
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
