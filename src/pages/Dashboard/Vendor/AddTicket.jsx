import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import AddTicketForm from "../../../components/Dashboard/Vendor/AddTicketForm";
import { imageUpload } from "../../../utils/imageUpload";
import { convertTo12Hour } from "../../../utils/timeUtils";

const AddTicket = () => {
  useTitle("Add Ticket");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      // Upload Image
      const imageFile = data.image[0];
      const photoURL = await imageUpload(imageFile);

      // Convert Time
      const formattedTime = convertTo12Hour(data.departureTime);

      // Prepare Data
      const ticketData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transportType: data.transportType,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        departureDate: data.departureDate,
        departureTime: formattedTime,
        description: data.description,
        perks: data.perks || [],
        image: photoURL,
        vendor: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      const res = await axiosSecure.post("/tickets", ticketData);

      if (res.data.insertedId) {
        toast.success("Ticket added successfully! Waiting for Admin approval.");
        reset();
        navigate("/dashboard/my-added-tickets");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add ticket. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-3xl font-black text-gradient">Add New Ticket</h2>
        <p className="text-gray-500">
          Fill out the details to create a new journey.
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <AddTicketForm
            handleSubmit={handleSubmit}
            onSubmit={handleFormSubmit}
            register={register}
            errors={errors}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTicket;
