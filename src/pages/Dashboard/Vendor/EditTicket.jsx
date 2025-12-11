import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import AddTicketForm from "../../../components/Dashboard/Vendor/AddTicketForm";
import { imageUpload } from "../../../utils/imageUpload";
import { convertTo12Hour, convertTo24Hour } from "../../../utils/timeUtils";

const EditTicket = () => {
  useTitle("Edit Ticket");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [ticketData, setTicketData] = useState(location.state?.ticket || null);

  // Fetch & Pre-fill Data
  useEffect(() => {
    const prefillForm = (data) => {
      // Convert DB time (12h) to Input time (24h)
      const formattedData = {
        ...data,
        departureTime: convertTo24Hour(data.departureTime),
      };
      reset(formattedData);
    };

    if (!ticketData) {
      axiosSecure.get(`/tickets/${id}`).then((res) => {
        setTicketData(res.data);
        prefillForm(res.data);
      });
    } else {
      prefillForm(ticketData);
    }
  }, [id, reset, ticketData, axiosSecure]);

  // Handle Update
  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      let photoURL = ticketData.image;

      if (typeof data.image === "object" && data.image.length > 0) {
        photoURL = await imageUpload(data.image[0]);
      }

      // Convert back to 12h format for Database
      const formattedTime = convertTo12Hour(data.departureTime);

      const updatedInfo = {
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
      };

      const res = await axiosSecure.patch(`/tickets/update/${id}`, updatedInfo);

      if (res.data.modifiedCount > 0) {
        toast.success("Ticket updated successfully!");
        navigate("/dashboard/my-added-tickets");
      } else {
        toast.info("No changes made.");
      }
    } catch (error) {
      toast.error("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!ticketData)
    return (
      <div className="text-center mt-10">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-3xl font-black text-gradient">Edit Ticket</h2>
        <p className="text-gray-500">Update details for {ticketData.title}</p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <AddTicketForm
            handleSubmit={handleSubmit}
            onSubmit={handleUpdate}
            register={register}
            errors={errors}
            loading={loading}
            isEdit={true}
            oldImage={ticketData.image}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTicket;
