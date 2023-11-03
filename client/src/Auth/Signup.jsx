import React from 'react';
import axios from 'axios';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function RegistrationForm() {
  // Define your initial form values
  const initialValues = {
    name: '',
    email: '',
    password: '',
    phoneno: '',
    Address: '',
    SecurityAnswer:''
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('First Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    phoneno: Yup.string()
      .matches(/^\d{10}$/, 'Invalid phone number')
      .required('Phone number is required'),
    Address: Yup.string().required('Address is required'),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, values);

        if (response) {
          console.log(response.data);
          if(response.data.success)
          {
            toast.success("Regsitered Successfully");
          }
          else
          {
            toast.info("Already Registered Please login");

          }
          // Handle successful registration here
        }
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    },
  });

  return (
    <>     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="online-shop.png"
          alt="E-commerce Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6 ">
<input type="hidden" name="remember" value="true" />
<div className="rounded-md shadow-sm -space-y-py">
<div className="mb-4">
  <label htmlFor="name" className="sr-only">
    Name
  </label>
  <input
    type="text"
    id="name"
    name="name"
    autoComplete="given-name"
    placeholder="First Name"
    {...formik.getFieldProps('name')}
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  />
  {formik.touched.name && formik.errors.name && (
    <p className="mt-2 text-sm text-red-600">{formik.errors.name}</p>
  )}
</div>
<div className="mb-4">
  <label htmlFor="email" className="sr-only">
    Email address
  </label>
  <input
    type="email"
    id="email"
    name="email"
    autoComplete="email"
    placeholder="Email address"
    {...formik.getFieldProps('email')}
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  />
  {formik.touched.email && formik.errors.email && (
    <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
  )}
</div>
<div className="mb-4">
  <label htmlFor="password" className="sr-only">
    Password
  </label>
  <input
    type="password"
    id="password"
    name="password"
    autoComplete="new-password"
    placeholder="Password"
    {...formik.getFieldProps('password')}
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  />
  {formik.touched.password && formik.errors.password && (
    <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
  )}
</div>
<div className="mb-4">
  <label htmlFor="phoneno" className="sr-only">
    Phone
  </label>
  <input
    type="text"
    id="phoneno"
    name="phoneno"
    autoComplete="phone"
    placeholder="Phone No."
    {...formik.getFieldProps('phoneno')}
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  />
  {formik.touched.phoneno && formik.errors.phoneno && (
    <p className="mt-2 text-sm text-red-600">{formik.errors.phoneno}</p>
  )}
</div>
<div className="mb-4">
  <label htmlFor="Address" className="sr-only">
    Address
  </label>
  <input
    type="text"
    id="Address"
    name="Address"
    autoComplete="Address"
    placeholder="Address"
    {...formik.getFieldProps('Address')}
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  />
  {formik.touched.Address && formik.errors.Address && (
    <p className="mt-2 text-sm text-red-600">{formik.errors.Address}</p>
  )}
</div>
<div className="mb-4">
  <label htmlFor="Address" className="sr-only">
    Address
  </label>
  <input
    type="text"
    id="SecurityAnswer"
    name="SecurityAnswer"
    autoComplete="SecurityAnswer"
    placeholder="What is your Code"
    {...formik.getFieldProps('SecurityAnswer')}
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  />
  {formik.touched.SecurityAnswer && formik.errors.SecurityAnswer && (
    <p className="mt-2 text-sm text-red-600">{formik.errors.SecurityAnswer}</p>
  )}
</div>
</div>

<div className="flex items-center justify-between">
<div className="flex items-center">
  <input
    id="remember-me"
    name="remember-me"
    type="checkbox"
    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
  />
  <label
    htmlFor="remember-me"
    className="ml-2 block text-sm text-gray-900"
  >
    Remember me
  </label>
</div>

<div className="text-sm">
  <a
    href="#"
    className="font-medium text-indigo-600 hover:text-indigo-500"
  >
    Forgot your password?
  </a>
</div>
</div>

<div>
<button
  type="submit"
  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
  Sign in
</button>
</div>
</form>

    </div>
  </div></>
 

  );
}

export default RegistrationForm;
