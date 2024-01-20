import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import formImagee from "./formImagee.jpg";

//2 methods to generate pdf, using jsPDF and react-to-print
//jsPDF automatically generates pdf on submission and react-to-print gives option to print as well as save the form in exam manner as pdf , just like Google Forms

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    freetextfield: "",
  });

  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const componentRef = useRef();

  //save as pdf, i.e react-to-print library function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    //if any field is empty then this validation will be triggered
    if (!formData.name || !formData.email || !formData.phonenumber) {
      setError("All fields are required");
      return;
    }
    // email validation
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // phone number validation
    if (!isValidPhoneNumber(formData.phonenumber)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    //if validation is successful then update the backend
    try {
      const response = await fetch("https://pdf-form.onrender.com/api/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form.");
      }

      setError(null); //clear any previous errors
      setSubmitted(true);
      setShowSuccess(true);

      alert("Form submitted successfully!");
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      setError("Failed to submit the form.");
    }
  };

  //generate pdf automtically after submission with required info from form
  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text(20, 20, `Name: ${formData.name}`);
    pdf.text(20, 30, `Email: ${formData.email}`);
    pdf.text(20, 40, `Phone Number: ${formData.phonenumber}`);
    pdf.text(20, 50, `Free Text Field: ${formData.freetextfield}`);
    pdf.save("form_submission.pdf");
  };

  const isValidEmail = (email) => {
    // validation logic email
    const emailParts = email.split("@");
    return (
      emailParts.length === 2 && emailParts[0] && emailParts[1].includes(".")
    );
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // validation logic phn number
    return phoneNumber.length === 10 && !isNaN(phoneNumber);
  };
  useEffect(() => {
    if (submitted) {
      // triggers after submission
      handlePrint();
      generatePDF();
    }
  }, [submitted, handlePrint]);


  //an addition to the UI , where we can choose the country code while entering phone number
  //used a public api to fetch the country codes

  useEffect(() => {
    fetchCountryCodes();
  }, []);

  const fetchCountryCodes = async () => {
    try {
      const response = await fetch("https://restcountries.com/v2/all");
      if (!response.ok) {
        throw new Error("Failed to fetch country codes");
      }

      const data = await response.json();
      const codes = data.map((country) => ({
        name: country.name,
        code:`+${country.callingCodes[0]}`,
      }));
      setCountryCodes(codes);
    } catch (error) {
      console.error("Failed to fetch country codes", error);
    }
  };

  //end of functions

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-white">
      <div className="w-full lg:w-1/2 flex">

      {/* ui for form is divided in 2 forms, on left we have image and on right side we have input fields, designed using tailwind css */}
        
        <div className="w-full relative">
          <img
            src={formImagee}
            alt="Your Image Alt Text"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* input fiedls */}
        <div className="w-full p-8 bg-white rounded-r-lg" ref={componentRef}>
          <h2 className="text-3xl font-bold mb-2 text-center">
            Admission Form
          </h2>

          <div className="flex flex-col mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border p-3 rounded focus:outline-none focus:shadow-outline"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border p-3 rounded focus:outline-none focus:shadow-outline"
              placeholder="Enter your email address"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country Code
            </label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="w-full border p-3 rounded focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>Select Country Code</option>
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleInputChange}
              className="w-full border p-3 rounded focus:outline-none focus:shadow-outline"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Free Text Field (optional)
            </label>
            <textarea
              name="freetextfield"
              value={formData.freetextfield}
              onChange={handleInputChange}
              className="w-full border p-3 rounded focus:outline-none focus:shadow-outline"
              placeholder="Add any additional information (optional)"
            />
          </div>

          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              name="terms"
              value="checked"
              className="h-5 w-5 text-teal-500 border-2 background-gray-500 focus:border-teal-500 focus:ring-teal-500"
            />
            <p className="text-sm font-latoBold text-gray-500">
              I agree to the Terms and Service.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-black text-white p-3 rounded w-full hover:bg-pink-200 hover:text-black focus:outline-none focus:shadow-outline mt-4"
          >
            Submit
          </button>
              {/* in case the form fails to submit, below will show an error */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
